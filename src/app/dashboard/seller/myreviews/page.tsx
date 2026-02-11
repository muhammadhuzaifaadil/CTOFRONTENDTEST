"use client";

import DashBoardLayout from "@/app/layouts/DashboardLayout";
import {
  Box,
  Button,
  Container,
  Typography,
  Rating,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import StarsIcon from "@mui/icons-material/Stars";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "@/app/contexts/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import apiClient from "@/api/apiClient";

type Review = {
  id: number;
  reviewerName: string;
  projectTitle: string;
  reviewText: string;
  postedOn: string;
  rating: number;
};

// const reviewsData: Review[] = [
//   {
//     id: 1,
//     reviewerName: "John Doe",
//     projectTitle: "Restaurant Menu and Promotional Materials",
//     reviewText:
//       "We're glad to hear you had a great experience. Your support means a lot to us.",
//     postedOn: "25/12/2025",
//     rating: 4.5,
//   },
//   {
//     id: 2,
//     reviewerName: "Mohammed Alharbi",
//     projectTitle: "Website Redesign for E-commerce Platform",
//     reviewText:
//       "We're glad to hear you had a great experience. Your support means a lot to us.",
//     postedOn: "25/12/2025",
//     rating: 4,
//   },
// ];

const MyReviews: React.FC = () => {
  const theme = useTheme();
  const router = useRouter();
  const { isArabic } = useContext(LanguageContext);
  const {user,accessToken} = useAuth();
  const [reviewsData,setReviewsData] = useState<any>([]);
const overallRating = reviewsData?.averageOverall ?? 0;


    
  // const getInitials = (name: string) =>
  //   name
  //     .split(" ")
  //     .filter(Boolean)
  //     .map((n) => n[0])
  //     .join("")
  //     .toUpperCase();


    const fetchReviews = async()=>{
      let result  = await apiClient.get("/ratings/getReviews")
      console.log("result",result.data.Data);
      setReviewsData(result.data.Data);

    }
    useEffect(()=>{
      fetchReviews()
    },[])

  return (
    <DashBoardLayout>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          background: "#f4f6ff",
          mt: { xs: 8, md: 3 },
          py: { xs: 2, sm: 4, md: 6 },
        }}
      >
        {/* Back button */}
        <Box
          sx={{
            display: "flex",
            flexDirection: isArabic ? "row-reverse" : "row",
            justifyContent: "flex-start",
            width: { xs: "95%", sm: "75%", md: "80%" },
            mb: 2,
          }}
        >
          <Button
            startIcon={
              <ArrowBackIcon
                sx={{
                  transform: isArabic ? "scaleX(-1)" : "none",
                  transition: "transform 0.2s ease",
                }}
              />
            }
            onClick={() => router.push("/dashboard/seller")}
            sx={{
              textTransform: "none",
              fontSize: { xs: "14px", sm: "16px" },
              fontWeight: 600,
              color: "black",
              flexDirection: isArabic ? "row-reverse" : "row",
              gap: 1,
            }}
          >
            Back 
          </Button>
        </Box>

        {/* Main card */}
        <Container
          maxWidth={false}
          sx={{
            backgroundColor: "#ffffff",
            borderRadius: 4,
            width: { xs: "100%", sm: "90%", md: "80%" },
            p: { xs: 2, sm: 4, md: 5 },
            boxShadow: "0 15px 40px rgba(15, 23, 42, 0.08)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            transition: "0.3s ease",
          }}
        >
          {/* Header */}
          {/* <Box sx={{ textAlign: "center", mb: 4 }}>
            <Box
              sx={{
                borderRadius: "50%",
                height: { xs: 56, sm: 64 },
                width: { xs: 56, sm: 64 },
                backgroundColor: theme.palette.primary.main,
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 1.5,
              }}
            >
              <StarsIcon sx={{ fontSize: { xs: 28, sm: 32 } }} />
            </Box>

            <Typography
              variant="subtitle1"
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 600,
                mb: 0.5,
              }}
            >
              My Reviews
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "#8486A0", maxWidth: 420, mx: "auto" }}
            >
              View your reviews on all your completed projects
            </Typography>
          </Box> */}

<Box sx={{ textAlign: "center", mb: 3 }}>
<StarsIcon
sx={{
borderRadius: "24px",
height: { xs: 40, sm: 45, md: 50 },
width: { xs: 40, sm: 45, md: 50 },
backgroundColor: theme.palette.primary.main,
color: "white",
p: 1,
}}
/>
<Typography variant="subtitle2" sx={{ color: theme.palette.primary.main }}>
{/* {/ {t("Header1")} /} */}
My Reviews
</Typography>
<Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
{/* {/ {t("Header2")} /} */}
View your reviews on all your completed projects
</Typography>
{/* {/ <Typography variant="body1" sx={{ color: "#6c757d" }}>
Header3
</Typography> /} */}
</Box>

          {/* Overall rating bar */}
          <Box
            sx={{
              width: "100%",
              borderRadius: 3,
              backgroundColor: "#f4f5fb",
              p: { xs: 1.5, sm: 2 },
              mb: 3,
              display: "flex",
              flexDirection: isArabic ? "row-reverse" : "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 600, color: "#3f3f60" }}
            >
              Overall
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: isArabic ? "row-reverse" : "row",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "#3f3f60" }}
              >
                {overallRating?.toFixed(2)}
              </Typography>
              <Rating
      name="overall-rating"
  value={overallRating}
                precision={0.5}
                readOnly
                sx={{
                  color: "#FFC107",
                  "& .MuiRating-iconEmpty": {
                    color: "#d0d2e0",
                  },
                }}
              />
            </Box>
          </Box>

          {/* All reviews header + sort */}
          <Box
            sx={{
              width: "100%",
              mb: 2,
              display: "flex",
              flexDirection: isArabic ? "row-reverse" : "row",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid #e2e3f0",
              pb: 1,
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 600, color: "#3f3f60" }}
            >
              All Reviews
            </Typography>

            {/* <Box
              sx={{
                display: "flex",
                flexDirection: isArabic ? "row-reverse" : "row",
                alignItems: "center",
                color: "#8c8fb0",
                fontSize: 14,
              }}
            >
              <Typography variant="body2" component="span">
                Sort by:&nbsp;
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: isArabic ? "row-reverse" : "row",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                    color: theme.palette.primary.main,
                  }}
                >
                  Most Recent
                </Typography>
                <KeyboardArrowDownIcon
                  sx={{
                    fontSize: 18,
                    color: theme.palette.primary.main,
                    ml: isArabic ? 0 : 0.3,
                    mr: isArabic ? 0.3 : 0,
                  }}
                />
              </Box>
            </Box> */}
          </Box>

          {/* Reviews list */}
          <Box sx={{ width: "100%" }}>
            {reviewsData.response?.map((review:any) => (
              <Box
                key={review.id}
                sx={{
                  width: "100%",
                  backgroundColor: "#ffffff",
                  borderRadius: 3,
                  boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05)",
                  p: { xs: 2, sm: 3 },
                  mb: 2.5,
                  display: "flex",
                  flexDirection: isArabic ? "row-reverse" : "row",
                  alignItems: "stretch",
                  justifyContent: "space-between",
                }}
              >
                {/* Left: avatar + text */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                    pr: isArabic ? 0 : 2,
                    pl: isArabic ? 2 : 0,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: isArabic ? "row-reverse" : "row",
                      alignItems: "center",
                      mb: 1,
                    }}
                  >
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        backgroundColor: theme.palette.primary.main,
                        color: "#ffffff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 14,
                        fontWeight: 600,
                        mr: isArabic ? 0 : 1.5,
                        ml: isArabic ? 1.5 : 0,
                      }}
                    >
                      {/* {review?.FromUser?.email} */}
                    </Box>
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: 600, color: "#3f3f60" }}
                    >
                      {review?.FromUser?.email}
                    </Typography>
                  </Box>

                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 600,
                      color: "#2f2f4f",
                      mb: 0.5,
                    }}
                  >
                    {review.projectTitle}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{ color: "#7b7d96", mb: 1.5, maxWidth: 600 }}
                  >
                    {review?.comment}
                  </Typography>

                  <Typography
                    variant="caption"
                    sx={{ color: "#a3a4b8" }}
                  >
                    Review posted on {review?.createdAt}
                  </Typography>
                </Box>

                {/* Right: rating */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: { xs: "flex-start", sm: "center" },
                    justifyContent: "flex-end",
                    mt: { xs: 1, sm: 0 },
                  }}
                >
                  <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: "#3f3f60" }}
              >
                {review?.overall?.toFixed(2)}
              </Typography>
                  <Rating
                    name={`review-rating-${review.id}`}
                    value={review.overall}
                    precision={0.5}
                    readOnly
                    sx={{
                      color: "#FFC107",
                      "& .MuiRating-iconEmpty": {
                        color: "#d0d2e0",
                      },
                    }}
                  />
                </Box>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>
    </DashBoardLayout>
  );
};

export default MyReviews;