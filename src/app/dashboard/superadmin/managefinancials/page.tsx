"use client"
import Sidebar from "@/app/components/Sidebar"
import {
  Box,
  TextField,
  Typography,
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Select,
  MenuItem,
  Chip,
} from "@mui/material"
import { useState } from "react"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import PauseCircleIcon from "@mui/icons-material/PauseCircle"
import React from "react"
import PaymentModal from "@/app/components/Modal"

interface PaymentData {
  paymentId: string
  userName: string
  role: string
  project: string
  amount: number
  status: "Pending Review" | "Released" | "Halted"
  date: string
}

const ManageFinancials: React.FC = () => {
  const theme = useTheme()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
const [selectedPayment, setSelectedPayment] = React.useState<PaymentData | null>(null);
const [action, setAction] = React.useState<"Halt" | "Release" | null>(null);
const [modalOpen, setModalOpen] = React.useState(false);

const handleOpenModal = (row: PaymentData, actionType: "Halt" | "Release") => {
  setSelectedPayment(row);
  setAction(actionType);
  setModalOpen(true);
};

  // Dummy array (can be replaced by API data later)
  const payments: any[] = [
    { paymentId: "PAY-001",projectRef:"Proj-012",projectName:"Project Name Default", postedBy: "John Smith",ownedBy:"UserOwner Company",  amount: 5000, status: "Pending Review" },
    { paymentId: "PAY-002",projectRef:"Proj-012",projectName:"Project Name Default", postedBy: "Sarah Johnson",ownedBy:"UserOwner Company",  amount: 1500, status: "Released" },
    { paymentId: "PAY-003",projectRef:"Proj-012",projectName:"Project Name Default", postedBy: "Mike Wilson",ownedBy:"UserOwner Company",  amount: 7200, status: "Halted"},
    { paymentId: "PAY-004",projectRef:"Proj-012",projectName:"Project Name Default", postedBy: "Emily Davis",ownedBy:"UserOwner Company",  amount: 3400, status: "Pending Review" },
    { paymentId: "PAY-005",projectRef:"Proj-012",projectName:"Project Name Default", postedBy: "Robert Brown",ownedBy:"UserOwner Company",  amount: 6100, status: "Released" },
    { paymentId: "PAY-006",projectRef:"Proj-012",projectName:"Project Name Default", postedBy: "Lisa Anderson",ownedBy:"UserOwner Company",  amount: 2000, status: "Pending Review"},
  ]

  // Filtering logic
  const filteredPayments = payments.filter((p) => {
    const matchesSearch =
      p.paymentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.project.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus =
      statusFilter === "All" || p.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <Box sx={{ display: "flex", width: "100%", backgroundColor: "#fafafa", gap: 2 }}>
      <Sidebar />

      <Box sx={{ display: "flex", flexDirection: "column", width: "100%", mt: 2 }}>
        {/* Header */}
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <Typography variant="h6" sx={{ color: theme.palette.primary.main, fontWeight: "bold" }}>
            Payment Management
          </Typography>
          <Typography variant="caption" sx={{ color: "gray" }}>
            Monitor and control all financial transactions
          </Typography>
        </Box>

        {/* Search + Filter */}
        <Box sx={{ display: "flex", flexDirection: "row", width: "100%", gap: 2, mt: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search by name, project, or payment ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            sx={{ width: 180 }}
          >
            <MenuItem value="All">All Status</MenuItem>
            <MenuItem value="Pending Review">Pending Review</MenuItem>
            <MenuItem value="Released">Released</MenuItem>
            <MenuItem value="Halted">Halted</MenuItem>
          </Select>
        </Box>

        {/* Table */}
        <TableContainer component={Paper} sx={{ mt: 3, borderRadius: 3, boxShadow: 1 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Payment ID</strong></TableCell>
                <TableCell><strong>projectRef</strong></TableCell>
                <TableCell><strong>projectName</strong></TableCell>
                <TableCell><strong>postedBy</strong></TableCell>
                <TableCell><strong>ownedBy</strong></TableCell>
                <TableCell><strong>Amount</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredPayments.map((p) => (
                <TableRow key={p.paymentId}>
                  <TableCell>{p.paymentId}</TableCell>
                  <TableCell>{p.projectRef}</TableCell>
                  <TableCell>
                    {p.projectName}
                  </TableCell>
                  <TableCell>{p.postedBy}</TableCell>
                  <TableCell>{p.ownedBy}</TableCell>
                  <TableCell>${p.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Chip
                      label={p.status}
                      size="small"
                      sx={{
                        backgroundColor:
                          p.status === "Released"
                            ? "#d4f5dd"
                            : p.status === "Pending Review"
                            ? "#fff7d1"
                            : "#fbd8d8",
                        color:
                          p.status === "Released"
                            ? "green"
                            : p.status === "Pending Review"
                            ? "#8c7000"
                            : "red",
                        fontWeight: 500,
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    {p.status !== "Released" ? (
                      <Button
                        variant="outlined"
                        color="success"
                        startIcon={<PlayArrowIcon />}
                        size="small"
                         onClick={() => handleOpenModal(p, "Release")}
                      >
                        Release
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        color="error"
                        startIcon={<PauseCircleIcon />}
                        size="small"
                        onClick={() => handleOpenModal(p, "Halt")}
                      >
                        Halt
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <PaymentModal
  open={modalOpen}
  onClose={() => setModalOpen(false)}
  action={action as "Halt" | "Release"}
  data={selectedPayment}
/>

      </Box>
    </Box>
  )
}

export default ManageFinancials;
