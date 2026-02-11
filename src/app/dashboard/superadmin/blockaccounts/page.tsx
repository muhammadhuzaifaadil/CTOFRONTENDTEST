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
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AutoAwesomeMotionOutlinedIcon from "@mui/icons-material/AutoAwesomeMotionOutlined";
import SearchIcon from "@mui/icons-material/Search";
import Sidebar from "@/app/components/Sidebar";
import apiClient from "@/api/apiClient";

type AccountType = "Buyer" | "Seller";
type AccountStatus = "Active" | "Blocked";

interface Account {
  id: number;              // userId from backend
  name: string;
  type: AccountType;
  email: string;
  projects: number;        // not in API yet → 0
  registered: string;      // formatted createdAt
  status: AccountStatus;   // derived from isBlocked
}

const BlockAccounts: React.FC = () => {
  const theme = useTheme();

  const [accounts, setAccounts] = useState<Account[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | "Buyer" | "Seller">(
    "All",
  );
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  /* ---------- Fetch Buyers + Sellers from API ---------- */

  const fetchAccounts = async () => {
    try {
      const res = await apiClient.get("/superadmin/BuyersandSellers");
      const data = res.data.Data;

      const mapUserToAccount = (u: any, type: AccountType): Account => ({
        id: u.id,
        name:
          `${u.firstName ?? ""} ${u.lastName ?? ""}`.trim() || u.email,
        type,
        email: u.email,
        projects: 0, // no projects in this API yet
        registered: u.createdAt
          ? new Date(u.createdAt).toLocaleDateString("en-US")
          : "-",
        status: u.isBlocked ? "Blocked" : "Active",
      });

      const buyers: Account[] = (data.buyers ?? []).map((u: any) =>
        mapUserToAccount(u, "Buyer"),
      );
      const sellers: Account[] = (data.sellers ?? []).map((u: any) =>
        mapUserToAccount(u, "Seller"),
      );
    const merged = [...buyers, ...sellers].sort((a, b) => a.id - b.id); // ⬅️ sort by id asc

      setAccounts(merged);
    } catch (err) {
      console.error("Failed to fetch buyers and sellers", err);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  /* ---------- Derived counts for top cards ---------- */

  const totalAccounts = accounts.length;
  const activeAccounts = accounts.filter(
    (a) => a.status === "Active",
  ).length;
  const blockedAccounts = accounts.filter(
    (a) => a.status === "Blocked",
  ).length;

  /* ---------- Filtering (search + Buyer/Seller filter) ---------- */

  const filteredAccounts = useMemo(() => {
    const q = search.trim().toLowerCase();

    return accounts.filter((acc) => {
      if (statusFilter !== "All" && acc.type !== statusFilter) return false;

      if (q) {
        const haystack = `${acc.id} ${acc.name} ${acc.email}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }

      return true;
    });
  }, [accounts, search, statusFilter]);

  /* ---------- Selection helpers ---------- */

  const visibleIds = filteredAccounts.map((a) => a.id);
  const allVisibleSelected =
    visibleIds.length > 0 &&
    visibleIds.every((id) => selectedIds.includes(id));

  const toggleSelectAllVisible = () => {
    if (allVisibleSelected) {
      setSelectedIds((prev) => prev.filter((id) => !visibleIds.includes(id)));
    } else {
      setSelectedIds((prev) =>
        Array.from(new Set([...prev, ...visibleIds])),
      );
    }
  };

  const toggleSelectOne = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  /* ---------- Selected stats ---------- */

  const selectedAccounts = accounts.filter((a) =>
    selectedIds.includes(a.id),
  );
  const selectedActiveCount = selectedAccounts.filter(
    (a) => a.status === "Active",
  ).length;
  const selectedBlockedCount = selectedAccounts.filter(
    (a) => a.status === "Blocked",
  ).length;

  /* ---------- Bulk Block / Unblock ---------- */

  // /superadmin/bulkblockUser  [ 23, 22, ... ]
  const handleBlockSelected = async () => {
    if (!selectedActiveCount) return;

    const idsToBlock = selectedAccounts
      .filter((a) => a.status === "Active")
      .map((a) => a.id);

    try {
      await apiClient.patch("/superadmin/bulkblockUser", idsToBlock);

      // update local state
      setAccounts((prev) =>
        prev.map((acc) =>
          idsToBlock.includes(acc.id)
            ? { ...acc, status: "Blocked" }
            : acc,
        ),
      );
    } catch (err) {
      console.error("Failed to bulk block users", err);
    }
  };

  // adjust if you have a bulk-unblock endpoint
 const handleUnblockSelected = async () => {
  if (!selectedBlockedCount) return;

  const idsToUnblock = selectedAccounts
    .filter((a) => a.status === "Blocked")
    .map((a) => a.id);

  try {
    // 🔹 bulk unblock API – same pattern as bulkblockUser
    await apiClient.patch("/superadmin/bulkUnblockUser", idsToUnblock);

    // update local state
    setAccounts((prev) =>
      prev.map((acc) =>
        idsToUnblock.includes(acc.id)
          ? { ...acc, status: "Active" }
          : acc,
      ),
    );
  } catch (err) {
    console.error("Failed to bulk unblock users", err);
  }
};

  /* ================== RENDER ================== */

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
                Block Accounts
              </Typography>
              <Typography variant="caption" sx={{ color: "gray" }}>
                Review and manage platform accounts. Block or unblock suspicious
                activity.
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
          {/* Total Accounts */}
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
              <PeopleAltOutlinedIcon fontSize="small" />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="body2" color="text.secondary">
                Total Accounts
              </Typography>
              <Typography sx={{ fontSize: "1.5rem", fontWeight: 700 }}>
                {totalAccounts}
              </Typography>
            </Box>
          </Box>

          {/* Active Accounts */}
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
              <CheckCircleOutlineIcon fontSize="small" />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="body2" color="text.secondary">
                Active Accounts
              </Typography>
              <Typography sx={{ fontSize: "1.5rem", fontWeight: 700 }}>
                {activeAccounts}
              </Typography>
            </Box>
          </Box>

          {/* Blocked Accounts */}
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
              <AutoAwesomeMotionOutlinedIcon fontSize="small" />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="body2" color="text.secondary">
                Blocked Accounts
              </Typography>
              <Typography sx={{ fontSize: "1.5rem", fontWeight: 700 }}>
                {blockedAccounts}
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
              placeholder="Search by account ID, name, or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ flex: 1, fontSize: 14 }}
            />
          </Box>

          {/* Type filter */}
          <Select
            size="small"
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as "All" | "Buyer" | "Seller")
            }
            sx={{ width: 160, bgcolor: "white" }}
          >
            <MenuItem value="All">All Users</MenuItem>
            <MenuItem value="Buyer">Buyers</MenuItem>
            <MenuItem value="Seller">Sellers</MenuItem>
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
                  selectedIds.some((id) => visibleIds.includes(id))
                }
                onChange={toggleSelectAllVisible}
              />
            </Box>
            <Box sx={{ flex: "0 0 100px" }}>Account ID</Box>
            <Box sx={{ flex: "1 1 220px" }}>Name</Box>
            <Box sx={{ flex: "0 0 100px" }}>Type</Box>
            <Box sx={{ flex: "1 1 220px" }}>Email</Box>
            <Box sx={{ flex: "0 0 120px" }}>Registered</Box>
            <Box sx={{ flex: "0 0 120px" }}>Status</Box>
          </Box>

          {/* Data rows */}
          {filteredAccounts.map((acc) => {
            const isSelected = selectedIds.includes(acc.id);
            const isBlocked = acc.status === "Blocked";

            return (
              <Box
                key={acc.id}
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
                    onChange={() => toggleSelectOne(acc.id)}
                  />
                </Box>
                <Box sx={{ flex: "0 0 100px" }}>{acc.id}</Box>
                <Box sx={{ flex: "1 1 220px", fontWeight: isBlocked ? 600 : 400 }}>
                  {acc.name}
                </Box>
                <Box sx={{ flex: "0 0 100px" }}>
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
                    {acc.type}
                  </Box>
                </Box>
                <Box sx={{ flex: "1 1 220px" }}>{acc.email}</Box>
                <Box sx={{ flex: "0 0 120px" }}>{acc.registered}</Box>
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
                    {acc.status}
                  </Box>
                </Box>
              </Box>
            );
          })}

          {filteredAccounts.length === 0 && (
            <Box
              sx={{
                px: 2,
                py: 3,
                textAlign: "center",
                fontSize: 13,
                color: "text.secondary",
              }}
            >
              No accounts found for “{search}”.
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default BlockAccounts;