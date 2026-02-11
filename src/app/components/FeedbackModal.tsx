import React, { useEffect, useState } from "react";
import {
  Box,
  Modal,
  Typography,
  TextField,
  Button,
  Container,
  Rating,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import apiClient from "@/api/apiClient";

interface FeedbackModalProps {
  open: boolean;
  onClose: () => void;
  projectId: number | null;
  role: "buyer" | "seller";          // buyer = rating seller, seller = rating buyer
}

type RatingsState = {
  quality: number;
  timeline: number;
  costs: number;
  communication: number;
  overall: number;
};

const initialRatings: RatingsState = {
  quality: 0,
  timeline: 0,
  costs: 0,
  communication: 0,
  overall: 0,
};

const maxCommentLength = 500;

const FeedbackModal: React.FC<FeedbackModalProps> = ({
  open,
  onClose,
  projectId,
  role,
}) => {
  const [ratings, setRatings] = useState<RatingsState>(initialRatings);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [targetUser,setTargetUser] = useState<any>();
  const isBuyerRatingSeller = role === "buyer";

  const buyerCriteria: { key: keyof RatingsState; label: string }[] = [
    { key: "quality", label: "Seller quality of work" },
    { key: "timeline", label: "Seller commitment to timeline" },
    { key: "costs", label: "Seller costs" },
    { key: "communication", label: "Seller communication" },
    { key: "overall", label: "Overall" },
  ];

  useEffect( () => {
    if (open) {
      setRatings(initialRatings);
      setComment("");
      setSubmitting(false);
      setShowThankYou(false);
      if(isBuyerRatingSeller){
        let res =  apiClient.get("")
      }
    }
  }, [open]);

  const handleRatingChange = (
    key: keyof RatingsState,
    value: number | null
  ) => {
    setRatings((prev) => ({ ...prev, [key]: value || 0 }));
  };

  const handleSubmit = async () => {
    if (submitting) return;
    if (!projectId) {
      console.warn("projectId missing");
      return;
    }

    setSubmitting(true);
    try {
      if (role === "buyer") {
        const res = await apiClient.get(`/bids/completedbid/${projectId}`)
        console.log("buyer's target user",res.data.Data)
        // setTargetUser(res.data.Data)
        await apiClient.post("/ratings/postFeedbackBuyer", {
          projectId,
          toUserId:res.data.Data?.seller?.id,
          qualityOfWork: ratings.quality,
          commitmentToTimeline: ratings.timeline,
          costs: ratings.costs,
          communication: ratings.communication,
          overall: ratings.overall,
          comment,
        });
      } else {
        // /ratings/postFeedbackSeller
        const res = await apiClient.get(`/projects/completedproject/${projectId}`)
        // setTargetUser(res.data.Data)
        console.log("Seller's Target User",res.data.Data);
        await apiClient.post("/ratings/postFeedbackSeller", {
          projectId,
          toUserId:res.data?.Data?.user?.id,
          qualityOfWork: ratings.quality,
          commitmentToTimeline: ratings.timeline,
          costs: ratings.costs,
          communication: ratings.communication,
          overall: ratings.overall,
          comment,
        });
      }

      setShowThankYou(true);
    } catch (error) {
      console.error("Failed to submit feedback:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCommentChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    if (value.length <= maxCommentLength) {
      setComment(value);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: 420 },
          outline: "none",
        }}
      >
        <Container
          disableGutters
          sx={{
            bgcolor: "#ffffff",
            borderRadius: 4,
            boxShadow: "0 15px 40px rgba(15, 23, 42, 0.2)",
            p: 3,
          }}
        >
          <Box sx={{ position: "relative" }}>
            <IconButton
              size="small"
              onClick={onClose}
              sx={{
                position: "absolute",
                top: -4,
                right: -4,
                color: "#A3A4B8",
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          {showThankYou ? (
            // -------- Thank-you view (same for buyer & seller) --------
            <Box sx={{ textAlign: "center", pt: 3, pb: 1 }}>
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  backgroundColor: "#5459FD",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mx: "auto",
                  mb: 2,
                }}
              >
                <CheckCircleOutlineIcon
                  sx={{ fontSize: 36, color: "#ffffff" }}
                />
              </Box>

              <Typography
                variant="h6"
                sx={{ fontWeight: 700, mb: 1, color: "#303056" }}
              >
                Thank you for your feedback!
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: "#7b7d96",
                  maxWidth: 320,
                  mx: "auto",
                  mb: 3,
                }}
              >
                Your feedback has been successfully submitted. We appreciate you
                taking the time to share your experience.
              </Typography>

              <Button
                variant="contained"
                fullWidth
                sx={{
                  borderRadius: 999,
                  textTransform: "none",
                  fontWeight: 600,
                  backgroundColor: "#5459FD",
                  "&:hover": { backgroundColor: "#4449e6" },
                }}
                onClick={onClose}
              >
                Back to Project
              </Button>
            </Box>
          ) : (
            // ---------------- Feedback form view ----------------
            <Box sx={{ pt: 1 }}>
              <Typography
                variant="h6"
                sx={{
                  textAlign: "center",
                  fontWeight: 700,
                  mb: 3,
                  color: "#303056",
                }}
              >
                Rate your experience
              </Typography>

              {/* Ratings */}
              {isBuyerRatingSeller ? (
                // Buyer -> Seller: multi-criteria
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2.5,
                    mb: 3,
                  }}
                >
                  {buyerCriteria.map(({ key, label }) => (
                    <Box
                      key={key}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 0.5,
                      }}
                    >
                      <Rating
                        value={ratings[key]}
                        onChange={(_, value) =>
                          handleRatingChange(key, value)
                        }
                        sx={{
                          "& .MuiRating-iconFilled": {
                            color: "#FFC107",
                          },
                          "& .MuiRating-iconEmpty": {
                            color: "#E2E4F3",
                          },
                        }}
                      />
                      <Typography
                        variant="body2"
                        sx={{ color: "#7b7d96", fontWeight: 500 }}
                      >
                        {label}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              ) : (
                // Seller -> Buyer: single overall rating
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    mb: 3,
                    gap: 1,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ color: "#7b7d96", fontWeight: 500 }}
                  >
                    Overall
                  </Typography>
                  <Rating
                    value={ratings.overall}
                    onChange={(_, value) =>
                      handleRatingChange("overall", value)
                    }
                    sx={{
                      "& .MuiRating-iconFilled": {
                        color: "#FFC107",
                      },
                      "& .MuiRating-iconEmpty": {
                        color: "#E2E4F3",
                      },
                    }}
                  />
                </Box>
              )}

              {/* Comment */}
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ mb: 1, color: "#303056", fontWeight: 600 }}
                >
                  Comment (Optional)
                </Typography>
                <TextField
                  placeholder="Leave your comments here..."
                  value={comment}
                  onChange={handleCommentChange}
                  multiline
                  minRows={4}
                  fullWidth
                  variant="outlined"
                  InputProps={{
                    sx: {
                      borderRadius: 3,
                      "& textarea": { fontSize: 14 },
                    },
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 0.5,
                  }}
                >
                  <Typography variant="caption" sx={{ color: "#A3A4B8" }}>
                    Max characters: {maxCommentLength}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#A3A4B8" }}>
                    {comment.length}/{maxCommentLength}
                  </Typography>
                </Box>
              </Box>

              {/* Actions */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 2,
                  gap: 1.5,
                }}
              >
                <Button
                  variant="text"
                  fullWidth
                  onClick={onClose}
                  sx={{
                    borderRadius: 999,
                    textTransform: "none",
                    fontWeight: 600,
                    color: "#5459FD",
                    backgroundColor: "#F4F5FF",
                    "&:hover": {
                      backgroundColor: "#E6E7FF",
                    },
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleSubmit}
                  disabled={submitting}
                  sx={{
                    borderRadius: 999,
                    textTransform: "none",
                    fontWeight: 600,
                    backgroundColor: "#5459FD",
                    "&:hover": { backgroundColor: "#4449e6" },
                  }}
                >
                  {submitting ? "Submitting..." : "Submit Review"}
                </Button>
              </Box>
            </Box>
          )}
        </Container>
      </Box>
    </Modal>
  );
};

export default FeedbackModal;