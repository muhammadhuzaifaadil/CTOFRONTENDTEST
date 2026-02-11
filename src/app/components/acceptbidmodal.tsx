import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
} from "@mui/material";

type AcceptBidPopupProps = {
  open: boolean;
  bidId: number | null;
  sellerName?: string;
  proposedBudget?: string;
  proposedTimeline?: string;
  onClose: () => void;
  onConfirm: (args: {
    bidId: number;
    meetLink: string;
    description: string;
  }) => void;
};

const AcceptBidPopup: React.FC<AcceptBidPopupProps> = ({
  open,
  bidId,
  sellerName = "Seller",
  proposedBudget = "-",
  proposedTimeline = "-",
  onClose,
  onConfirm,
}) => {
  const [meetLink, setMeetLink] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleAcceptClick = () => {
    if (!bidId) return; // safety
    onConfirm({ bidId, meetLink, description });
  };

  

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "rgba(0,0,0,0.6)",
      }}
    >
      <Box
        sx={{
          bgcolor: "#FFFFFF",
          borderRadius: 3,
          boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
          width: { xs: "90%", sm: 520 },
          p: { xs: 3, sm: 4 },
          display: "flex",
          flexDirection: "column",
          gap: 2.5,
        }}
      >
        {/* Header */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, color: "#2C1E82", fontSize: "1.05rem" }}
          >
            Accept Bid
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", fontSize: 14 }}
          >
            Are you sure you want to accept this bid from{" "}
            <Box component="span" sx={{ fontWeight: 600, color: "text.primary" }}>
              {sellerName}
            </Box>
            ?
          </Typography>
        </Box>

        {/* Bid summary */}
        <Box sx={{ mt: 0.5, display: "flex", flexDirection: "column", gap: 0.5 }}>
          <Typography variant="body2" sx={{ fontSize: 14 }}>
            Proposed Budget:{" "}
            <Box component="span" sx={{ fontWeight: 600 }}>
              {proposedBudget}
            </Box>
          </Typography>
          <Typography variant="body2" sx={{ fontSize: 14 }}>
            Proposed Timeline:{" "}
            <Box component="span" sx={{ fontWeight: 600 }}>
              {proposedTimeline}
            </Box>
          </Typography>
        </Box>

        {/* Inputs */}
        <Box sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 1.5 }}>
          <TextField
            label="Meet Link"
            variant="outlined"
            size="small"
            fullWidth
            type="text"
            value={meetLink}
            onChange={(e) => setMeetLink(e.target.value)}
          />
          <TextField
            label="About Meeting"
            variant="outlined"
            fullWidth
            multiline
            minRows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Box>

        {/* Actions */}
        <Box
          sx={{
            mt: 2.5,
            display: "flex",
            justifyContent: "flex-end",
            gap: 1.5,
          }}
        >
          <Button
            onClick={onClose}
            sx={{
              textTransform: "none",
              borderRadius: 999,
              px: 3,
              border: "1px solid #C4C4E0",
              color: "#4A3FB3",
              bgcolor: "#FFFFFF",
              fontSize: 14,
              "&:hover": {
                bgcolor: "#F4F3FF",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleAcceptClick}
            sx={{
              textTransform: "none",
              borderRadius: 999,
              px: 3.5,
              fontSize: 14,
              bgcolor: "#34A853",
              "&:hover": {
                bgcolor: "#2E944A",
              },
            }}
          >
            Accept Bid
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
export default AcceptBidPopup;