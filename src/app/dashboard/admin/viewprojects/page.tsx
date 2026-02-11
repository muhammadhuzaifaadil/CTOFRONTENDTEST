"use client"

import React, { useEffect, useState } from "react"
import Sidebar from "@/app/components/Sidebar"
import theme from "@/app/theme/theme"
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Chip,
  InputAdornment,
  useTheme,
} from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import { useRouter } from "next/navigation"
import apiClient from "@/api/apiClient"

const Projects: React.FC = () => {
  const muiTheme = useTheme()
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("All")
  const [adminProjects, setAdminProjects] = useState<any[]>([]);
  useEffect(()=>{
    apiClient.get(`/admin/projects`)
        .then((res) =>{
          if (res.data.Success) {
          console.log("admin Project Data",res.data.Data);
          setAdminProjects(res.data.Data);
          }
        })
        .catch((err) => console.error(err))
  },[])
  // Dummy array (can be replaced by API data later)
 const projects = adminProjects.map((project: any, index: number) => ({
  srNo: String(index + 1).padStart(2, "0"),
  projectId: project.id,
  projectName: project.title,

  // ✅ safe owner handling
  owner: project.user
    ? `${project.user.firstName ?? ""} ${project.user.lastName ?? ""}`.trim()
    : "—",

  // ✅ template is now inside project
  category: project.template?.name ?? "—",

  timeline: project.timeline ?? "—",

  // ✅ assigned if template exists
  assignedTo: project.template ? "Assigned" : "—",

  // ✅ normalize budget
  budget: Number(project.budgetRange?.replace(/[^0-9]/g, "")) || 0,

  status: project.status,
  statusColor: project.statusColor,
}))



  // Filtering logic (same pattern as before: search + select filter)
  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.srNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.owner.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter = statusFilter === "All" || p.category === statusFilter

    return matchesSearch && matchesFilter
  })

  const getStatusStyles = (status: string) => {
    if (status === "Completed") {
      return { bg: "#dcfce7", color: "#16a34a" }
    }
    if (status === "Assigned") {
      return { bg: "#e0e7ff", color: "#4f46e5" }
    }
    // Pending
    return { bg: "#fef9c3", color: "#a16207" }
  }

  return (
    <Box sx={{ display: "flex", width: "100%", backgroundColor: "#fafafa", gap: 2 }}>
      <Sidebar />

      <Box sx={{ display: "flex", flexDirection: "column", width: "100%", mt: 2 }}>
        {/* Header */}
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <Typography
            variant="h6"
            sx={{ color: theme.palette.primary.main, fontWeight: "bold" }}
          >
            Project Management
          </Typography>
          <Typography variant="caption" sx={{ color: "gray" }}>
            Monitor and control all projects
          </Typography>
        </Box>

        {/* Search + Category Filter (styled like the image) */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            mt: 3,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Search */}
          <TextField
            variant="outlined"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#9ca3af", fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
            sx={{
              maxWidth: 360,
              "& .MuiOutlinedInput-root": {
                borderRadius: 999,
                backgroundColor: "#ffffff",
                "& fieldset": {
                  borderColor: "#e5e7eb",
                },
                "&:hover fieldset": {
                  borderColor: "#d1d5db",
                },
                "&.Mui-focused fieldset": {
                  borderColor: muiTheme.palette.primary.main,
                },
              },
            }}
          />

          {/* Category Filter (right aligned, pill) */}
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            size="small"
            sx={{
              minWidth: 200,
              borderRadius: 999,
              bgcolor: "#ffffff",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#e5e7eb",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#d1d5db",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: muiTheme.palette.primary.main,
              },
            }}
          >
            <MenuItem value="All">All Categories</MenuItem>
            <MenuItem value="ERP">ERP</MenuItem>
            <MenuItem value="MobileApp">Mobile Application</MenuItem>
            <MenuItem value="WebApp">Web Development</MenuItem>
            <MenuItem value="AI/ML">AI/ML</MenuItem>
            <MenuItem value="Digital Marketing">Digital Marketing</MenuItem>
            <MenuItem value="UI/UX Design">UI/UX Design</MenuItem>
          </Select>
        </Box>

        {/* Table */}
        <TableContainer
          component={Paper}
          sx={{
            mt: 3,
            borderRadius: 3,
            boxShadow: "0px 1px 4px rgba(15,23,42,0.06)",
            overflow: "hidden",
          }}
        >
          <Table>
            <TableHead sx={{ backgroundColor: "#f9fafb" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Sr. No.</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Project Name</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Project Owner</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Category</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Timeline</TableCell>
                {/* <TableCell sx={{ fontWeight: 600 }}>Assigned To</TableCell> */}
                <TableCell sx={{ fontWeight: 600 }}>Budget</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredProjects.map((p) => {
                const { bg, color } = getStatusStyles(p.status)
                return (
                  <TableRow key={p.srNo} hover sx={{ cursor: "pointer" }} onClick={()=>{router.push(`/dashboard/admin/viewprojects/${p.projectId}`)}}>
                    <TableCell sx={{ color: "#6b7280" }}>{p.srNo}</TableCell>
                    <TableCell>{p.projectName}</TableCell>
                    <TableCell sx={{ color: "#6b7280" }}>{p.owner}</TableCell>
                    <TableCell sx={{ color: "#6b7280" }}>{p.category}</TableCell>
                    <TableCell sx={{ color: "#6b7280" }}>{p.timeline}</TableCell>
                    {/* <TableCell sx={{ color: "#6b7280" }}>{p.assignedTo}</TableCell> */}
                    <TableCell sx={{ color: "#6b7280" }}>
                      {`$${p.budget.toLocaleString()}`}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={p.status}
                        size="small"
                        sx={{
                          backgroundColor: `${p.statusColor}` || bg,
                          color:"black",
                          fontWeight: 600,
                          borderRadius: 1,
                          fontSize: "0.75rem",
                        }}
                      />
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  )
}

export default Projects
