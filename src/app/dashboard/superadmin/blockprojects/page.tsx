"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Button,
  InputBase,
  useTheme,
  Checkbox,
} from "@mui/material";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import SearchIcon from "@mui/icons-material/Search";
import Sidebar from "@/app/components/Sidebar";
import apiClient from "@/api/apiClient";

type WorkflowStatus = "In Progress" | "Pending" | "Completed";
type BlockStatus = "Active" | "Blocked";
type Category =
  | "Web Development"
  | "Mobile Development"
  | "Data Science"
  | "Web Design"
  | "Backend Development"
  | "System Integration";




const BlockProjects: React.FC = () => {
  const theme = useTheme();

const [projects, setProjects] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<
    "All Categories" | Category
  >("All Categories");
  const [statusFilter, setStatusFilter] = useState<
    "All Status" | WorkflowStatus
  >("All Status");
  const [blockFilter, setBlockFilter] = useState<"All" | BlockStatus>("All");
  const [selectedRefs, setSelectedRefs] = useState<string[]>([]);
  const [totalProjects, setTotalProjects] = useState(0);
  const [activeProjects, setActiveProjects] = useState(0);
  const [blockedProjects, setBlockedProjects] = useState(0);
const fetchProjects = async () => {
  try {
    const res = await apiClient.get("/superadmin/getProjects");
    const data = res.data.Data;
    setTotalProjects(data.totalProjects);
    setActiveProjects(data.activeProjects);
    setBlockedProjects(data.blockedProjects);
    const mapStatus = (s: string): WorkflowStatus => {
      // API has "Published" and "Completed"
      if (s === "Completed") return "Completed";
      // treat everything else as "In Progress" (adjust if you support more)
      return "In Progress";
    };

    const mapProjectFromApi = (p: any): any => {
      const user = p.user ?? {};

      // you don't have a real category in the API; pick something or derive from skills
      const category: Category = "Web Development" as Category;

      // parse numeric budget from `budgetRange` (e.g. "$400" or "1000")
      const budget = (() => {
        if (!p.budgetRange) return 0;
        const m = String(p.budgetRange).match(/\d+(\.\d+)?/);
        return m ? Number(m[0]) : 0;
      })();

      return {
        // you don't currently use `id` directly, but keep it for reference
        id: p.id,
        ref: `PRJ-${p.id}`, // used by selection logic
        name: p.title,
        company: user.company?.name ?? "-", // no company in API → "-"
        postedBy:
          [user.firstName, user.lastName].filter(Boolean).join(" ") ||
          user.email ||
          "-",
        category,
        budget,
        status: mapStatus(p.status),
        created: p.createdAt
          ? new Date(p.createdAt).toLocaleDateString("en-US")
          : "-",
        blockStatus: p.isBlocked ? "Blocked" : "Active",
      };
    };

    const mapped: any[] = (data.projects ?? [])
      .map(mapProjectFromApi)
      .sort((a:any, b:any) => a.id - b.id); // optional: sort by id asc

    setProjects(mapped);
  } catch (err) {
    console.error("Failed to fetch projects", err);
  }
};
useEffect(() => {
  fetchProjects();
}, []);

  const filteredProjects = useMemo(() => {
    const q = search.trim().toLowerCase();

    return projects.filter((p) => {
      if (categoryFilter !== "All Categories" && p.category !== categoryFilter)
        return false;
      if (statusFilter !== "All Status" && p.status !== statusFilter)
        return false;
      if (blockFilter !== "All" && p.blockStatus !== blockFilter) return false;

      if (q) {
        const haystack = `${p.ref} ${p.name} ${p.company} ${p.postedBy}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }

      return true;
    });
  }, [projects, search, categoryFilter, statusFilter, blockFilter]);

  // Selection helpers
  const visibleRefs = filteredProjects.map((p) => p.ref);
  const allVisibleSelected =
    visibleRefs.length > 0 &&
    visibleRefs.every((ref) => selectedRefs.includes(ref));

  const toggleSelectAllVisible = () => {
    if (allVisibleSelected) {
      setSelectedRefs((prev) => prev.filter((r) => !visibleRefs.includes(r)));
    } else {
      setSelectedRefs((prev) => Array.from(new Set([...prev, ...visibleRefs])));
    }
  };

  const toggleSelectOne = (ref: string) => {
    setSelectedRefs((prev) =>
      prev.includes(ref) ? prev.filter((x) => x !== ref) : [...prev, ref]
    );
  };

  // Counts for buttons
  const selectedProjects = projects.filter((p) =>
    selectedRefs.includes(p.ref)
  );
  const selectedActiveCount = selectedProjects.filter(
    (p) => p.blockStatus === "Active"
  ).length;
  const selectedBlockedCount = selectedProjects.filter(
    (p) => p.blockStatus === "Blocked"
  ).length;

  const handleBlockSelected = async () => {
  if (!selectedActiveCount) return;

  // numeric ids of selected ACTIVE projects
  const idsToBlock = selectedProjects
    .filter((p) => p.blockStatus === "Active")
    .map((p) => p.id);

  if (!idsToBlock.length) return;

  try {
    await apiClient.patch("/superadmin/bulkblockProjects", idsToBlock);

    // Refresh from backend so counts & list are correct
    await fetchProjects();
    setSelectedRefs([]);
  } catch (err) {
    console.error("Failed to bulk block projects", err);
  }
};

 const handleUnblockSelected = async () => {
  if (!selectedBlockedCount) return;

  // numeric ids of selected BLOCKED projects
  const idsToUnblock = selectedProjects
    .filter((p) => p.blockStatus === "Blocked")
    .map((p) => p.id);

  if (!idsToUnblock.length) return;

  try {
    await apiClient.patch("/superadmin/bulkUnblockProjects", idsToUnblock);

    // Refresh from backend so counts & list are correct
    await fetchProjects();
    setSelectedRefs([]);
  } catch (err) {
    console.error("Failed to bulk unblock projects", err);
  }
};

  const formatBudget = (value: number) =>
    value.toLocaleString("en-US", { maximumFractionDigits: 0 });

  const getWorkflowChipStyles = (status: WorkflowStatus) => {
    switch (status) {
      case "In Progress":
        return {
          bgcolor: "#EFF6FF",
          color: "#1D4ED8",
        };
      case "Pending":
        return {
          bgcolor: "#FFFBEB",
          color: "#D97706",
        };
      case "Completed":
        return {
          bgcolor: "#ECFDF3",
          color: "#16A34A",
        };
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#fafafa",
        gap: 2,
      }}
    >
      <Sidebar />

      {/* Main content */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          mt: 2,
          px: { xs: 2, sm: 3, md: 6 },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            maxWidth: 1200,
            mx: "auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                variant="h6"
                sx={{ color: theme.palette.primary.main, fontWeight: "bold" }}
              >
                Block Projects
              </Typography>
              <Typography variant="caption" sx={{ color: "gray" }}>
                Review and block illegal or fraudulent projects to maintain
                platform integrity.
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Upper Cards */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            width: "100%",
            maxWidth: 1200,
            mx: "auto",
            mt: 3,
            gap: 2,
          }}
        >
          {/* Total Projects */}
          <Box
            sx={{
              flex: "1 1 260px",
              minWidth: 260,
              display: "flex",
              alignItems: "center",
              p: 2.5,
              borderRadius: 3,
              border: "1px solid #E5E7EB",
              bgcolor: "#FFFFFF",
              gap: 2,
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                bgcolor: "#EEF2FF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: theme.palette.primary.main,
              }}
            >
              <WorkOutlineOutlinedIcon fontSize="small" />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="body2" color="text.secondary">
                Total Projects
              </Typography>
              <Typography sx={{ fontSize: "1.5rem", fontWeight: 700 }}>
                {totalProjects}
              </Typography>
            </Box>
          </Box>

          {/* Active Projects */}
          <Box
            sx={{
              flex: "1 1 260px",
              minWidth: 260,
              display: "flex",
              alignItems: "center",
              p: 2.5,
              borderRadius: 3,
              border: "1px solid #E5E7EB",
              bgcolor: "#FFFFFF",
              gap: 2,
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                bgcolor: "#ECFDF3",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#16A34A",
              }}
            >
              <TaskAltOutlinedIcon fontSize="small" />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="body2" color="text.secondary">
                Active Projects
              </Typography>
              <Typography sx={{ fontSize: "1.5rem", fontWeight: 700 }}>
                {activeProjects}
              </Typography>
            </Box>
          </Box>

          {/* Blocked Projects */}
          <Box
            sx={{
              flex: "1 1 260px",
              minWidth: 260,
              display: "flex",
              alignItems: "center",
              p: 2.5,
              borderRadius: 3,
              border: "1px solid #E5E7EB",
              bgcolor: "#FFFFFF",
              gap: 2,
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                bgcolor: "#FEF2F2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#DC2626",
              }}
            >
              <BlockOutlinedIcon fontSize="small" />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="body2" color="text.secondary">
                Blocked Projects
              </Typography>
              <Typography sx={{ fontSize: "1.5rem", fontWeight: 700 }}>
                {blockedProjects}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Search + Filters + Actions */}
        <Box
          sx={{
            width: "100%",
            maxWidth: 1200,
            mx: "auto",
            mt: 3,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 2,
          }}
        >
          {/* Search box */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              px: 2,
              py: 1.25,
              borderRadius: 999,
              bgcolor: "#F3F4F6",
              flex: 1,
            }}
          >
            <SearchIcon sx={{ color: "gray", fontSize: 20 }} />
            <InputBase
              placeholder="Search by project name, ID, or company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ flex: 1, fontSize: 14 }}
            />
          </Box>

          {/* Workflow status filter */}
          <Select
            size="small"
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(
                e.target.value as "All Status" | WorkflowStatus
              )
            }
            sx={{ minWidth: 140, bgcolor: "white" }}
          >
            <MenuItem value="All Status">All Status</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>

          {/* Block status filter */}
          <Select
            size="small"
            value={blockFilter}
            onChange={(e) =>
              setBlockFilter(e.target.value as "All" | BlockStatus)
            }
            sx={{ minWidth: 120, bgcolor: "white" }}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Blocked">Blocked</MenuItem>
          </Select>

          {/* Block / Unblock buttons */}
          <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
            <Button
              variant="outlined"
              color="error"
              onClick={handleBlockSelected}
              disabled={selectedActiveCount === 0}
              sx={{ textTransform: "none", borderRadius: 999 }}
            >
              Block ({selectedActiveCount})
            </Button>
            <Button
              variant="outlined"
              color="success"
              onClick={handleUnblockSelected}
              disabled={selectedBlockedCount === 0}
              sx={{ textTransform: "none", borderRadius: 999 }}
            >
              Unblock ({selectedBlockedCount})
            </Button>
          </Box>
        </Box>

        {/* Table */}
        <Box
          sx={{
            width: "100%",
            maxWidth: 1200,
            mx: "auto",
            mt: 3,
            borderRadius: 3,
            border: "1px solid #E5E7EB",
            bgcolor: "#FFFFFF",
            overflow: "hidden",
          }}
        >
          {/* Header row */}
          <Box
            sx={{
              display: "flex",
              bgcolor: "#F9FAFB",
              px: 2,
              py: 1,
              borderBottom: "1px solid #E5E7EB",
              fontSize: 12,
              fontWeight: 600,
              color: "text.secondary",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Box sx={{ flex: "0 0 40px" }}>
              <Checkbox
                size="small"
                checked={allVisibleSelected}
                indeterminate={
                  !allVisibleSelected &&
                  selectedRefs.some((ref) => visibleRefs.includes(ref))
                }
                onChange={toggleSelectAllVisible}
              />
            </Box>
            <Box sx={{ flex: "0 0 110px" }}>Project Ref</Box>
            <Box sx={{ flex: "1 1 230px" }}>Project Name</Box>
            {/* <Box sx={{ flex: "1 1 200px" }}>Company</Box> */}
            <Box sx={{ flex: "0 0 150px" }}>Posted By</Box>
            {/* <Box sx={{ flex: "0 0 150px" }}>Category</Box> */}
            <Box sx={{ flex: "0 0 130px" }}>Budget (SAR)</Box>
            <Box sx={{ flex: "0 0 110px" }}>Status</Box>
            <Box sx={{ flex: "0 0 120px" }}>Created</Box>
            <Box sx={{ flex: "0 0 120px" }}>Block Status</Box>
          </Box>

          {/* Data rows */}
          {filteredProjects.map((p) => {
            const isSelected = selectedRefs.includes(p.ref);
            const isBlocked = p.blockStatus === "Blocked";
            const workflowStyles = getWorkflowChipStyles(p.status);

            return (
              <Box
                key={p.ref}
                sx={{
                  display: "flex",
                  px: 2,
                  py: 1.5,
                  borderBottom: "1px solid #F3F4F6",
                  fontSize: 13,
                  alignItems: "center",
                  gap: 1,
                  bgcolor: isBlocked ? "#FEF2F2" : "inherit",
                }}
              >
                <Box sx={{ flex: "0 0 40px" }}>
                  <Checkbox
                    size="small"
                    checked={isSelected}
                    onChange={() => toggleSelectOne(p.ref)}
                  />
                </Box>
                <Box sx={{ flex: "0 0 110px" }}>{p.ref}</Box>
                <Box
                  sx={{
                    flex: "1 1 230px",
                    fontWeight: isBlocked ? 600 : 400,
                    color: isBlocked ? "#B91C1C" : "inherit",
                  }}
                >
                  {p.name}
                </Box>
                {/* <Box sx={{ flex: "1 1 200px" }}>{p.company}</Box> */}
                <Box sx={{ flex: "0 0 150px" }}>{p.postedBy}</Box>
                {/* <Box sx={{ flex: "0 0 150px" }}>
                  <Box
                    sx={{
                      display: "inline-flex",
                      px: 1.2,
                      py: 0.3,
                      borderRadius: 999,
                      bgcolor: "#F3F4F6",
                      fontSize: 11,
                    }}
                  >
                    {p.category}
                  </Box>
                </Box> */}
                <Box sx={{ flex: "0 0 130px" }}>
                  {formatBudget(p.budget)}
                </Box>
                <Box sx={{ flex: "0 0 110px" }}>
                  <Box
                    sx={{
                      display: "inline-flex",
                      px: 1.2,
                      py: 0.3,
                      borderRadius: 999,
                      fontSize: 11,
                      fontWeight: 600,
                      bgcolor: workflowStyles.bgcolor,
                      color: workflowStyles.color,
                    }}
                  >
                    {p.status}
                  </Box>
                </Box>
                <Box sx={{ flex: "0 0 120px" }}>{p.created}</Box>
                <Box sx={{ flex: "0 0 120px" }}>
                  <Box
                    sx={{
                      display: "inline-flex",
                      px: 1.2,
                      py: 0.3,
                      borderRadius: 999,
                      fontSize: 11,
                      fontWeight: 600,
                      bgcolor: isBlocked ? "#FEE2E2" : "#ECFDF3",
                      color: isBlocked ? "#DC2626" : "#16A34A",
                    }}
                  >
                    {p.blockStatus}
                  </Box>
                </Box>
              </Box>
            );
          })}

          {filteredProjects.length === 0 && (
            <Box
              sx={{
                px: 2,
                py: 3,
                textAlign: "center",
                fontSize: 13,
                color: "text.secondary",
              }}
            >
              No projects found for “{search}”.
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default BlockProjects;