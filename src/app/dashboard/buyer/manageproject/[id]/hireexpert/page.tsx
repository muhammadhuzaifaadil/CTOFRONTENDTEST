"use client";

import { use, useEffect, useMemo, useState } from "react";
import DashBoardLayout from "@/app/layouts/DashboardLayout";

import {
  Avatar,
  Box,
  Button,
  Container,
  InputAdornment,
  Modal,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import SearchIcon from "@mui/icons-material/Search";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIcon from "@mui/icons-material/Phone";
import PlaceIcon from "@mui/icons-material/Place";
import LinkIcon from "@mui/icons-material/Link";
import CloseIcon from "@mui/icons-material/Close";
import apiClient from "@/api/apiClient";
import { useAuth } from "@/hooks/useAuth";

type QualityExpert = {
  id: number;
  initials: string;
  name: string;
  specialization: string;
  experience: string;
  email: string;
  phone: string;
  address: string;
  assigned?: boolean;
};

const HireExpert = ({ params }: { params: Promise<{ id: number }> }) => {
  const theme = useTheme();
  const { id } = use(params);

  const [experts, setExperts] = useState<QualityExpert[]>([]);
  const [search, setSearch] = useState("");
  const [data, setData] = useState<any>();
  const {user} = useAuth()
  // Modal state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState<QualityExpert | null>(
    null
  );
const token = localStorage.getItem("accessToken");

  // TODO: replace with real project title from your API
  const projectTitle =
    data?.projectTitle || "E-Commerce Website Development";

  const fetchExperts = async () => {
    try {
      const result = await apiClient.get(`/users/QELookup/${id}`);

      if (result.data.Success) {
        const { AssignedQEs, AvailableQEs } = result.data.Data;

        const assignedMapped: QualityExpert[] = AssignedQEs.map((qe: any) => ({
          id: qe.id,
          initials: `${qe.firstName?.[0] ?? ""}${qe.lastName?.[0] ?? ""}`,
          name: `${qe.firstName} ${qe.lastName}`,
          specialization: "Quality Expert",
          experience: "—",
          email: qe.email,
          phone: qe.contact ?? "—",
          address: qe.company ?? "—",
          assigned: true,
        }));

        const availableMapped: QualityExpert[] = AvailableQEs.map(
          (qe: any) => ({
            id: qe.id,
            initials: `${qe.firstName?.[0] ?? ""}${qe.lastName?.[0] ?? ""}`,
            name: `${qe.firstName} ${qe.lastName}`,
            specialization: "Quality Expert",
            experience: "—",
            email: qe.email,
            phone: qe.contact ?? "—",
            address: qe.company ?? "—",
            assigned: false,
          })
        );

        setExperts([...assignedMapped, ...availableMapped]);
      }
    } catch (error) {
      console.error("Failed to fetch QEs", error);
    }
  };

  useEffect(() => {
    fetchExperts();
  }, []);

  const filteredExperts = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return experts;

    return experts.filter((e) => {
      return (
        e.name.toLowerCase().includes(q) ||
        e.email.toLowerCase().includes(q) ||
        e.specialization.toLowerCase().includes(q)
      );
    });
  }, [experts, search]);

  const handleOpenConfirm = (expert: QualityExpert) => {
    console.log("quality expert:",expert);
    // handleConfirmHire(expert)
    setSelectedExpert(expert);
    setConfirmOpen(true);
  };

  const handleCloseConfirm = () => {
    setConfirmOpen(false);
    setSelectedExpert(null);
  };

  const handleConfirmHire = async () => {
  if (!selectedExpert) return;

  try {
    console.log("expert handle confirm", selectedExpert);

    await apiClient.post(
      "/buyerhire/hireQE",
      {
        qeId: selectedExpert.id,
        projectId: id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    await fetchExperts(); // refresh list
  } catch (err) {
    console.error("Failed to confirm hire", err);
  } finally {
    handleCloseConfirm();
  }
};


  return (
    <DashBoardLayout>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: theme.palette.background.default,
          display: "flex",
          justifyContent: "center",
          mt: { xs: 6, sm: 4, md: 3 },
          py: { xs: 2, sm: 4, md: 6 },
        }}
      >
        <Container
          maxWidth={false}
          sx={{
            width: { xs: "95%", sm: "90%", md: "1152px" },
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          {/* Search Bar */}
          <Box>
            <TextField
              fullWidth
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, specialization, or email..."
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#9CA3AF" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "999px",
                  backgroundColor: "#FFFFFF",
                  boxShadow: "0 8px 25px rgba(15,23,42,0.06)",
                  "& fieldset": { borderColor: "transparent" },
                  "&:hover fieldset": { borderColor: "transparent" },
                  "&.Mui-focused fieldset": { borderColor: "#4F46E5" },
                },
              }}
            />
          </Box>

          {/* About Quality Experts */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              gap: 2,
              p: 3,
              borderRadius: 3,
              backgroundColor: "#E5F0FF",
              border: "1px solid #C7D7FE",
            }}
          >
            <Avatar
              sx={{
                bgcolor: "#4F46E5",
                width: 32,
                height: 32,
              }}
            >
              <InfoOutlinedIcon sx={{ fontSize: 20 }} />
            </Avatar>
            <Box>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 600, mb: 0.5, color: "#1E293B" }}
              >
                About Quality Experts
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#4B5563", fontSize: "0.9rem" }}
              >
                Quality Experts review project deliverables and milestones to
                ensure they meet the required standards before payment is
                released. They provide an independent quality assessment to
                protect your investment.
              </Typography>
            </Box>
          </Box>

          {/* Quality Experts – scrollable when list is long */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 3,
              maxHeight: filteredExperts.length > 3 ? "60vh" : "none",
              overflowY: filteredExperts.length > 3 ? "auto" : "visible",
              pr: filteredExperts.length > 3 ? 1 : 0,
              pb: filteredExperts.length > 3 ? 1 : 0,
            }}
          >
            {filteredExperts.length === 0 ? (
              <Box
                sx={{
                  width: "100%",
                  py: 6,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  No quality experts found
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Try adjusting your search by name, specialization, or email.
                </Typography>
              </Box>
            ) : (
              filteredExperts.map((expert) => (
                <Box
                  key={expert.id}
                  sx={{
                    flex: "1 1 280px",
                    maxWidth: { md: "calc(50% - 12px)" },
                    backgroundColor: expert.assigned ? "#F3FFFB" : "#FFFFFF",
                    borderRadius: 4,
                    border: expert.assigned
                      ? "1px solid #4ADE80"
                      : "1px solid #E5E7EB",
                    boxShadow: "0 8px 24px rgba(15,23,42,0.06)",
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                  }}
                >
                  {/* Top row: avatar + assigned badge */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      mb: 2,
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: "#4F46E5",
                        width: 48,
                        height: 48,
                        fontWeight: 700,
                      }}
                    >
                      {expert.initials}
                    </Avatar>

                    {expert.assigned && (
                      <Box
                        sx={{
                          px: 1.5,
                          py: 0.5,
                          borderRadius: "999px",
                          backgroundColor: "#ECFDF3",
                          border: "1px solid #22C55E",
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                          fontSize: "0.75rem",
                          color: "#15803D",
                        }}
                      >
                        <Box
                          sx={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            backgroundColor: "#22C55E",
                          }}
                        />
                        Assigned
                      </Box>
                    )}
                  </Box>

                  {/* Name & specialization */}
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 600, color: "#111827", mb: 0.5 }}
                  >
                    {expert.name}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.8,
                      mb: 2,
                    }}
                  >
                    <LinkIcon sx={{ fontSize: 16, color: "#4F46E5" }} />
                    <Typography
                      variant="body2"
                      sx={{ color: "#4F46E5", fontSize: "0.85rem" }}
                    >
                      {expert.specialization}
                    </Typography>
                  </Box>

                  {/* Contact details */}
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 0.8 }}
                  >
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <MailOutlineIcon
                        sx={{ fontSize: 16, color: "#9CA3AF" }}
                      />
                      <Typography
                        variant="body2"
                        sx={{ color: "#4B5563", fontSize: "0.85rem" }}
                      >
                        {expert.email}
                      </Typography>
                    </Box>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <PhoneIcon sx={{ fontSize: 16, color: "#9CA3AF" }} />
                      <Typography
                        variant="body2"
                        sx={{ color: "#4B5563", fontSize: "0.85rem" }}
                      >
                        {expert.phone}
                      </Typography>
                    </Box>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <PlaceIcon sx={{ fontSize: 16, color: "#9CA3AF" }} />
                      <Typography
                        variant="body2"
                        sx={{ color: "#4B5563", fontSize: "0.85rem" }}
                      >
                        {expert.address}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Divider */}
                  <Box
                    sx={{
                      borderBottom: "1px solid #E5E7EB",
                      my: 2,
                    }}
                  />

                  {/* Bottom CTA */}
                  {expert.assigned ? (
                    <Button
                      fullWidth
                      disabled
                      sx={{
                        borderRadius: "999px",
                        py: 1,
                        textTransform: "none",
                        fontWeight: 600,
                        bgcolor: "#E5E7EB",
                        color: "#6B7280",
                        boxShadow: "none",
                        "&:hover": {
                          bgcolor: "#E5E7EB",
                        },
                      }}
                    >
                      Already Assigned
                    </Button>
                  ) : (
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={() => handleOpenConfirm(expert)}
                      sx={{
                        borderRadius: "999px",
                        py: 1,
                        textTransform: "none",
                        fontWeight: 600,
                        backgroundColor: "#4F46E5",
                        boxShadow: "0 8px 20px rgba(79, 70, 229, 0.4)",
                        "&:hover": {
                          backgroundColor: "#4338CA",
                        },
                      }}
                    >
                      Hire Quality Expert
                    </Button>
                  )}
                </Box>
              ))
            )}
          </Box>
        </Container>

        {/* ===== Confirm Hire Modal ===== */}
        <Modal open={confirmOpen} onClose={handleCloseConfirm}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "#FFFFFF",
              borderRadius: 4,
              width: { xs: "90%", sm: 480, md: 520 },
              boxShadow: "0 20px 60px rgba(15,23,42,0.35)",
              p: 3.5,
            }}
          >
            {/* Header */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1.5,
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "#111827" }}
              >
                Confirm Quality Expert Hire
              </Typography>
              <IconButton size="small" onClick={handleCloseConfirm}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>

            {/* Subtext */}
            <Typography
              variant="body2"
              sx={{ color: "#6B7280", mb: 3, lineHeight: 1.5 }}
            >
              Are you sure you want to hire{" "}
              <span style={{ fontWeight: 600, color: "#4F46E5" }}>
                {selectedExpert?.name}
              </span>{" "}
              as the Quality Expert for this project?
            </Typography>

            {/* Summary Card */}
            <Box
              sx={{
                backgroundColor: "#F9FAFB",
                borderRadius: 3,
                p: 2.5,
                mb: 3,
              }}
            >
              <Box sx={{ mb: 1.5 }}>
                <Typography
                  variant="caption"
                  sx={{ color: "#9CA3AF", textTransform: "uppercase" }}
                >
                  Project
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 600, color: "#111827" }}
                >
                  {projectTitle}
                </Typography>
              </Box>

              <Box sx={{ mb: 1.5 }}>
                <Typography
                  variant="caption"
                  sx={{ color: "#9CA3AF", textTransform: "uppercase" }}
                >
                  Quality Expert
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 600, color: "#111827" }}
                >
                  {selectedExpert?.name}
                </Typography>
              </Box>

              <Box>
                <Typography
                  variant="caption"
                  sx={{ color: "#9CA3AF", textTransform: "uppercase" }}
                >
                  Specialization
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 600, color: "#111827" }}
                >
                  {selectedExpert?.specialization}
                </Typography>
              </Box>
            </Box>

            {/* Actions */}
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                fullWidth
                onClick={handleCloseConfirm}
                sx={{
                  borderRadius: "999px",
                  textTransform: "none",
                  fontWeight: 600,
                  bgcolor: "#F3F4F6",
                  color: "#111827",
                  "&:hover": { bgcolor: "#E5E7EB" },
                }}
              >
                Cancel
              </Button>
              <Button
                fullWidth
                variant="contained"
                onClick={handleConfirmHire}
                sx={{
                  borderRadius: "999px",
                  textTransform: "none",
                  fontWeight: 600,
                  backgroundImage:
                    "linear-gradient(to right, #4F46E5, #6366F1)",
                  boxShadow: "0 10px 25px rgba(79,70,229,0.5)",
                  "&:hover": {
                    backgroundImage:
                      "linear-gradient(to right, #4338CA, #4F46E5)",
                  },
                }}
              >
                Confirm Hire
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </DashBoardLayout>
  );
};

export default HireExpert;