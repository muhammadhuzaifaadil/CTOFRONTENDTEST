"use client"

import React, { useEffect, useMemo, useState } from "react"
import Sidebar from "@/app/components/Sidebar"
import {
  Box,
  Button,
  Typography,
  Chip,
  useTheme,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material"
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined"
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined"
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined"
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined"
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined"
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined"
import TrendingDownOutlinedIcon from "@mui/icons-material/TrendingDownOutlined"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined"
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined"
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded"
import { RadarChart } from '@mui/x-charts';

import { LineChart } from "@mui/x-charts/LineChart"
import { PieChart } from "@mui/x-charts/PieChart"
import { BarChart } from "@mui/x-charts/BarChart"
import apiClient from "@/api/apiClient"

type ReportTabKey =
  | "platformOverview"
  | "buyerActivity"
  | "sellerActivity"
  | "sellerPerformance"
  | "qualityExperts"
  | "projectDelivery"
  | "qualityRisk"
  | "financialRevenue"
 const handleBuyerExport = async () => {
  try {
    const response = await apiClient.get('/superadmin/buyers/export', {
      responseType: 'blob', // 👈 REQUIRED
    });

    const blob = new Blob([response.data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'buyer-report.csv';
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('CSV export failed', error);
  }
};
 const handleSellerExport = async () => {
  try {
    const response = await apiClient.get('/superadmin/sellers/export', {
      responseType: 'blob', // 👈 REQUIRED
    });

    const blob = new Blob([response.data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'seller-report.csv';
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('CSV export failed', error);
  }
};
const Reports: React.FC = () => {
  const theme = useTheme()
  const [activeTab, setActiveTab] = useState<ReportTabKey>("platformOverview")
  const [overview,setOverview] = useState<any>();
  // ---------- STATIC DATA (EASY TO REPLACE WITH API) ----------

 

  useEffect(() => {
    apiClient.get('/superadmin/platformOverview')
      .then((response) => {
        console.log('Overview data:', response.data.Data);
        setOverview(response.data.Data);
      })
      .catch((error) => {
        console.error('Error fetching overview data:', error);
      });
  }, []);
  const tabs: { key: ReportTabKey; label: string }[] = [
    { key: "platformOverview", label: "Platform Overview" },
    { key: "buyerActivity", label: "Buyer Activity" },
    { key: "sellerActivity", label: "Seller Performance" },
    { key: "qualityExperts", label: "Quality Experts" },
    // { key: "projectDelivery", label: "Project & Delivery" },
    // { key: "qualityRisk", label: "Quality & Risk" },
    { key: "financialRevenue", label: "Financial & Revenue" },
  ]

  // Platform overview data
  const overviewSummaryCards = [
    {
      title: "Total Active Buyers",
      value: `${overview?.activeBuyers}`,
      icon: <PeopleAltOutlinedIcon sx={{ color: "#6366f1" }} />,
      iconBg: "#eef2ff",
    },
    {
      title: "Total Active Sellers",
      value: `${overview?.activeSellers}`,
      icon: <StorefrontOutlinedIcon sx={{ color: "#22c55e" }} />,
      iconBg: "#ecfdf3",
    },
    {
      title: "Certified Quality Experts",
      value: "156",
      icon: <VerifiedOutlinedIcon sx={{ color: "#f97316" }} />,
      iconBg: "#fff7ed",
    },
    {
      title: "Total Active Projects",
      value: `${overview?.activeProjects}`,
      icon: <WorkOutlineOutlinedIcon sx={{ color: "#6366f1" }} />,
      iconBg: "#eef2ff",
    },
    {
      title: "Completed Projects",
      value: `${overview?.completedProjects}`,
      icon: <DoneAllOutlinedIcon sx={{ color: "#22c55e" }} />,
      iconBg: "#ecfdf3",
    },
    {
      title: "Success Rate",
      value: `${overview?.successRate}%`,
      icon: <TrendingUpOutlinedIcon sx={{ color: "#22c55e" }} />,
      iconBg: "#ecfdf3",
    },
  ]

 const lineChartMonths = overview?.lineChart?.months ?? [];
const activeProjects = overview?.lineChart?.active ?? [];
const completedProjects = overview?.lineChart?.completed ?? [];

  const statusPieData = [
    { id: 0, value: overview?.completedProjects, label: "Completed" },
    { id: 1, value: overview?.activeProjects, label: "In Progress" },
    { id: 2, value: overview?.draftProjects, label: "Drafted" },
    { id: 3, value: overview?.disputedProjects, label: "Disputed" },
  ]
const PROJECT_CATEGORIES = ["ERP", "WebApp","MobileApp", "AI/ML", "Digital Marketing"];

const projectTypeCounts = useMemo(() => {
  if (!overview?.projectTypes) {
    return PROJECT_CATEGORIES.map(() => 0);
  }

  const normalize = (v: string) =>
    v.trim().toLowerCase();

  const map = new Map<string, number>();

  overview.projectTypes.forEach((p: any) => {
    const key = normalize(p.templateName);

    const match = PROJECT_CATEGORIES.find(
      c => normalize(c) === key
    );

    if (match) {
      map.set(match, p.count);
    }
  });

  return PROJECT_CATEGORIES.map(cat => map.get(cat) ?? 0);
}, [overview]);




  const healthSummary: { label: string; value: string; highlight?: boolean }[] = [
    { label: "Total Projects", value: "3,383" },
    { label: "Completed Without Disputes", value: "3,186" },
    { label: "Success Rate", value: "94.2%", highlight: true },
    { label: "Avg Duration (Days)", value: "31.5" },
  ]

  // -------------------------------------------------------------

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#111827",
      }}
    >
      <Sidebar />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          backgroundColor: "#f3f4f6",
          p: 3,
          gap: 2,
        }}
      >
        {/* HEADER */}
        <Box sx={{ display: "flex", flexDirection: "column", mb: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Reports
          </Typography>
          <Typography variant="body2" sx={{ color: "#6b7280" }}>
            Comprehensive analytics and insights across the platform
          </Typography>
        </Box>

        {/* TABS */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 1,
            mb: 2,
          }}
        >
          {tabs.map((tab) => {
            const selected = tab.key === activeTab
            return (
              <Button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                variant={selected ? "contained" : "outlined"}
                size="small"
                sx={{
                  textTransform: "none",
                  borderRadius: 999,
                  px: 2.5,
                  fontWeight: 500,
                  backgroundColor: selected ? theme.palette.primary.main : "#ffffff",
                  color: selected ? "#ffffff" : "#4b5563",
                  borderColor: selected ? "transparent" : "#e5e7eb",
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: selected
                      ? theme.palette.primary.dark
                      : "#f9fafb",
                    borderColor: selected ? "transparent" : "#d1d5db",
                    boxShadow: "none",
                  },
                }}
              >
                {tab.label}
              </Button>
            )
          })}
        </Box>

        {/* CONTENT WRAPPER */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2.5,
            bgcolor: "#f9fafb",
            borderRadius: 3,
            border: "1px solid #e5e7eb",
            p: 2.5,
          }}
        >
          {activeTab === "platformOverview" ? (
            <>
              {/* TOP SUMMARY CARDS */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: 2,
                }}
              >
                {overviewSummaryCards.map((card) => (
                  <Box
                    key={card.title}
                    sx={{
                      flex: "1 1 240px",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 1.5,
                      bgcolor: "#ffffff",
                      borderRadius: 2,
                      border: "1px solid #e5e7eb",
                      p: 1.75,
                    }}
                  >
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: 2,
                        bgcolor: card.iconBg,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {card.icon}
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.25 }}>
                      <Typography
                        variant="caption"
                        sx={{ textTransform: "uppercase", color: "#6b7280" }}
                      >
                        {card.title}
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {card.value}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>

              {/* ACTIVE VS COMPLETED LINE CHART */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  bgcolor: "#ffffff",
                  borderRadius: 2,
                  border: "1px solid #e5e7eb",
                  p: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "spaceBetween",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      Active vs Completed Projects
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#6b7280" }}>
                      Monthly trend over the last 6 months
                    </Typography>
                  </Box>
                </Box>

                <LineChart
                  xAxis={[{ scaleType: "point", data: lineChartMonths }]}
                  series={[
                    {
                      data: activeProjects,
                      label: "Active Projects",
                      color: "#4f46e5",
                    },
                    {
                      data: completedProjects,
                      label: "Completed Projects",
                      color: "#10b981",
                    },
                  ]}
                  height={260}
                  margin={{ top: 20, right: 20, bottom: 30, left: 40 }}
                  sx={{
                    "& .MuiLineElement-root": { strokeWidth: 2.2 },
                    "& .MuiMarkElement-root": { r: 3.5 },
                    "& .MuiChartsLegend-root": {
                      mt: 1,
                    },
                  }}
                />
              </Box>

              {/* SECOND ROW: PIE + BAR */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  gap: 2,
                }}
              >
                {/* Pie chart */}
                <Box
                  sx={{
                    flex: 1,
                    bgcolor: "#ffffff",
                    borderRadius: 2,
                    border: "1px solid #e5e7eb",
                    p: 2,
                  }}
                >
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                    Project Status Distribution
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: "#6b7280", mb: 1.5, display: "block" }}
                  >
                    All‑time project breakdown
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 2,
                    }}
                  >
                    <PieChart
                      series={[
                        {
                          innerRadius: 40,
                          outerRadius: 70,
                          data: statusPieData,
                        },
                      ]}
                      height={220}
                      width={220}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                      }}
                    >
                      {statusPieData.map((s) => (
                        <Box
                          key={s.id}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 2,
                          }}
                        >
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Box
                              sx={{
                                width: 10,
                                height: 10,
                                borderRadius: "50%",
                                bgcolor:
                                  s.label === "Completed"
                                    ? "#22c55e"
                                    : s.label === "In Progress"
                                    ? "#3b82f6"
                                    : s.label === "Cancelled"
                                    ? "#f97316"
                                    : "#ef4444",
                              }}
                            />
                            <Typography variant="body2">{s.label}</Typography>
                          </Box>
                          <Typography variant="body2" sx={{ color: "#6b7280" }}>
                            {s.value}%
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Box>

                {/* Bar chart */}
         <Box
      sx={{
        flex: 1,
        bgcolor: "#ffffff",
        borderRadius: 2,
        border: "1px solid #e5e7eb",
        p: 2,
      }}
    >
      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
        Project Types
      </Typography>

      <Typography
        variant="caption"
        sx={{ color: "#6b7280", mb: 1.5, display: "block" }}
      >
        Total projects by category
      </Typography>

      <BarChart
        xAxis={[
          {
            scaleType: "band",
            data: PROJECT_CATEGORIES,
          },
        ]}
        series={[
          {
            data: projectTypeCounts,
            color: "#3b82f6",
          },
        ]}
        height={220}
        margin={{ top: 20, right: 20, bottom: 40, left: 40 }}
        sx={{
          "& .MuiBarElement-root": { borderRadius: 4 },
          "& .MuiChartsAxis-tickLabel": { fontSize: 11 },
        }}
      />
    </Box>

              </Box>

              {/* PLATFORM HEALTH SUMMARY */}
              {/* <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  bgcolor: "#ffffff",
                  borderRadius: 2,
                  border: "1px solid #e5e7eb",
                  p: 2,
                  mt: 0.5,
                }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                  Platform Health Summary
                </Typography>
                <Typography variant="caption" sx={{ color: "#6b7280", mb: 1.5 }}>
                  Overall platform performance indicators
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    borderRadius: 2,
                    overflow: "hidden",
                    border: "1px solid #e5e7eb",
                  }}
                >
                  {healthSummary.map((item, index) => (
                    <Box
                      key={item.label}
                      sx={{
                        flex: 1,
                        p: 1.75,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: 0.5,
                        bgcolor: "#ffffff",
                        borderRight:
                          index !== healthSummary.length - 1
                            ? "1px solid #e5e7eb"
                            : "none",
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{ textTransform: "uppercase", color: "#6b7280" }}
                      >
                        {item.label}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          color: item.highlight ? "#16a34a" : "#111827",
                        }}
                      >
                        {item.value}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box> */}
            </>
          ) : activeTab === "buyerActivity" ? (
            <BuyerActivitySection />
          ) : activeTab === "sellerActivity" ? (
            <SellerPerformanceSection />
          ):activeTab === "qualityExperts"?
          (<QualityExpertSection />)
          //  :activeTab === "projectDelivery"?
          // (<ProjectDeliverySection />)
          // :activeTab === "qualityRisk"?
          // (<QualityRiskSection />)
          :activeTab === "financialRevenue"?
          (<FinancialRevenueSection />)
          
          
          : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                py: 10,
                gap: 1,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {tabs.find((t) => t.key === activeTab)?.label}
              </Typography>
              <Typography variant="body2" sx={{ color: "#6b7280" }}>
                This section will show analytics specific to{" "}
                {tabs.find((t) => t.key === activeTab)?.label}. You can keep the
                same layout and replace the data and charts via APIs later.
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}

/* ---------------- BUYER ACTIVITY SECTION ---------------- */

const BuyerActivitySection: React.FC = () => {
  // static data – easily replaceable by API later

  const [buyerReport,setBuyerReport] = useState<any>();
  useEffect(() => {
    apiClient.get('/superadmin/buyerReports')
      .then((response) => {
        console.log('Buyer Report data:', response.data.Data);
        setBuyerReport(response.data.Data);
      })
      .catch((error) => {
        console.error('Error fetching Buyer Report data:', error);
      });
  }, []);
  const filterFields = [
    { label: "Date Range", value: "Last 6 months" },
    { label: "Buyer Region", value: "All Regions" },
    { label: "Project Category", value: "All Categories" },
  ]

  const summaryCards = [
    {
      title: "Total Buyer Signups",
      value: `${buyerReport?.totalBuyers}`,
      // change: "+12% from last period",
      // trend: "up" as const,
    },
   
    {
      title: "Avg Project Budget",
      value: `$${buyerReport?.averageProjectBudget}`,
      // change: "+8.4% from last period",
      // trend: "up" as const,
    },
    {
      title: "Repeat Buyers",
      value: `${buyerReport?.repeatBuyersPercentage}%`,
      // change: "+4.5% from last period",
      // trend: "up" as const,
    },
  ]

  const weeks = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"]
  const weeklySignups = [120, 135, 150, 165, 170, 190]

  const projectsPerBuyerBuckets = [
    "1 project",
    "2–3 projects",
    "4–5 projects",
    "6–10 projects",
    "10+ projects",
  ]
  const projectsPerBuyerValues = [420, 310, 190, 90, 40]

  const budgetCategories = [
    "ERP",
    "WebApp",
    "MobileApp",
    "AI/ML",
    "Digital Marketing"
  ]
  const budgetValues = useMemo(() => {
  if (!buyerReport?.averageBudgetByCategory) {
    return budgetCategories.map(() => 0);
  }

  // Convert backend array to map
  const map = new Map<string, number>();

  buyerReport.averageBudgetByCategory.forEach((item: any) => {
    map.set(item.category, item.averageBudget);
  });

  // Return values in SAME ORDER as categories
  return budgetCategories.map(category => map.get(category) ?? 0);
}, [buyerReport]);

  const convMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
  const projectsPosted = [260, 270, 280, 290, 300, 310]
  const projectsHired = [210, 220, 230, 245, 255, 265]

  const retentionMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
  const oneTimeBuyers = [140, 150, 155, 160, 165, 170]
  const repeatBuyers = [80, 90, 100, 115, 120, 130]

  return (
    <>
      {/* FILTERS + TOP METRICS CARD */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          bgcolor: "#ffffff",
          borderRadius: 2,
          border: "1px solid #e5e7eb",
          p: 2,
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            Buyer Reports
          </Typography>
          <Button
            variant="contained"
            size="small"
            onClick={handleBuyerExport}
            startIcon={<DownloadOutlinedIcon />}
            sx={{
              textTransform: "none",
              borderRadius: 999,
              px: 2,
              boxShadow: "none",
              "&:hover": { boxShadow: "none" },
            }}
          >
            Export CSV
          </Button>
        </Box>

        {/* filter fields */}
        {/* <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
          }}
        >
          {filterFields.map((field) => (
            <Box
              key={field.label}
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 0.5,
              }}
            >
              <Typography variant="caption" sx={{ color: "#6b7280" }}>
                {field.label}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  px: 1.5,
                  py: 1,
                  borderRadius: 2,
                  border: "1px solid #e5e7eb",
                  bgcolor: "#ffffff",
                  cursor: "default",
                }}
              >
                <Typography variant="body2">{field.value}</Typography>
                <ArrowDropDownIcon sx={{ color: "#9ca3af" }} />
              </Box>
            </Box>
          ))}
        </Box> */}

        {/* summary metrics inside filter card */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
          }}
        >
          {summaryCards.map((card) => (
            <Box
              key={card.title}
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 0.5,
                borderRadius: 2,
                border: "1px solid #e5e7eb",
                bgcolor: "#f9fafb",
                p: 1.5,
              }}
            >
              <Typography
                variant="caption"
                sx={{ textTransform: "uppercase", color: "#6b7280" }}
              >
                {card.title}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {card.value}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                {/* <TrendingUpOutlinedIcon
                  sx={{ fontSize: 18, color: "#16a34a" }}
                /> */}
                {/* <Typography variant="caption" sx={{ color: "#16a34a" }}>
                  {card.change}
                </Typography> */}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      {/* BUYER SIGNUPS OVER TIME (area chart) */}
      {/* <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          bgcolor: "#ffffff",
          borderRadius: 2,
          border: "1px solid #e5e7eb",
          p: 2,
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
          Buyer Signups Over Time
        </Typography>
        <Typography variant="caption" sx={{ color: "#6b7280", mb: 1 }}>
          Weekly signup trends
        </Typography>

        <LineChart
          xAxis={[{ scaleType: "point", data: weeks }]}
          series={[
            {
              data: weeklySignups,
              label: "Buyer Signups",
              area: true,
              color: "#6366f1",
            },
          ]}
          height={260}
          margin={{ top: 20, right: 20, bottom: 30, left: 40 }}
          sx={{
            "& .MuiLineElement-root": { strokeWidth: 2 },
            "& .MuiMarkElement-root": { r: 2.8 },
          }}
        />
      </Box> */}

      {/* PROJECTS PER BUYER + AVG BUDGET */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
        }}
      >
        {/* Projects posted per buyer */}
        {/* <Box
          sx={{
            flex: 1,
            bgcolor: "#ffffff",
            borderRadius: 2,
            border: "1px solid #e5e7eb",
            p: 2,
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
            Projects Posted per Buyer
          </Typography>
          <Typography variant="caption" sx={{ color: "#6b7280", mb: 1.5 }}>
            Distribution of project counts by buyer
          </Typography>

          <BarChart
            layout="horizontal"
            yAxis={[
              {
                scaleType: "band",
                data: projectsPerBuyerBuckets,
              },
            ]}
            xAxis={[{ min: 0 }]}
            series={[{ data: projectsPerBuyerValues, color: "#4f46e5" }]}
            height={220}
            margin={{ top: 20, right: 20, bottom: 20, left: 90 }}
            sx={{
              "& .MuiBarElement-root": { borderRadius: 4 },
            }}
          />
        </Box> */}

        {/* Average budget by category */}
       <Box
  sx={{
    flex: 1,
    bgcolor: "#ffffff",
    borderRadius: 2,
    border: "1px solid #e5e7eb",
    p: 2,
  }}
>
  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
    Average Budget by Category
  </Typography>

  <Typography variant="caption" sx={{ color: "#6b7280", mb: 1.5 }}>
    Project budget trends across categories
  </Typography>

  <BarChart
    xAxis={[
      {
        scaleType: "band",
        data: budgetCategories,
      },
    ]}
    series={[
      {
        data: budgetValues,
        color: "#10b981",
      },
    ]}
    height={220}
    margin={{ top: 20, right: 20, bottom: 50, left: 50 }}
    sx={{
      "& .MuiBarElement-root": { borderRadius: 4 },
      "& .MuiChartsAxis-tickLabel": { fontSize: 11 },
    }}
  />
</Box>

      </Box>

      {/* POSTED VS HIRED + REPEAT VS ONE‑TIME */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
        }}
      >
        {/* Posted vs Hired conversion */}
        {/* <Box
          sx={{
            flex: 1,
            bgcolor: "#ffffff",
            borderRadius: 2,
            border: "1px solid #e5e7eb",
            p: 2,
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
            Posted vs Hired Conversion
          </Typography>
          <Typography variant="caption" sx={{ color: "#6b7280", mb: 1 }}>
            Project posting and hiring trends
          </Typography>

          <LineChart
            xAxis={[{ scaleType: "point", data: convMonths }]}
            series={[
              {
                data: projectsPosted,
                label: "Projects Posted",
                color: "#4f46e5",
              },
              {
                data: projectsHired,
                label: "Projects Hired",
                color: "#10b981",
              },
            ]}
            height={240}
            margin={{ top: 20, right: 20, bottom: 30, left: 40 }}
            sx={{
              "& .MuiLineElement-root": { strokeWidth: 2 },
              "& .MuiMarkElement-root": { r: 3 },
            }}
          />
        </Box> */}

        {/* Repeat vs One‑time buyers */}
        <Box
          sx={{
            flex: 1,
            bgcolor: "#ffffff",
            borderRadius: 2,
            border: "1px solid #e5e7eb",
            p: 2,
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
            Repeat vs One‑time Buyers
          </Typography>
          <Typography variant="caption" sx={{ color: "#6b7280", mb: 1 }}>
            A Pie Chart showing the distribution of one-time buyers versus repeat buyers.
          </Typography>

          <PieChart
  series={[
    {
      data: [
        { id: 0, value: buyerReport?.buyerDistribution?.oneTimeBuyers ?? 0, label: "One-time Buyers" },
        { id: 1, value: buyerReport?.buyerDistribution?.repeatBuyers ?? 0, label: "Repeat Buyers" },
      ],
      innerRadius: 45,
      outerRadius: 80,
    },
  ]}
  height={220}
/>

        </Box>
      </Box>
    </>
  )
}

/* ---------------- SELLER PERFORMANCE SECTION ---------------- */

const SellerPerformanceSection: React.FC = () => {
  // static data – easy to swap for API

  const [sellerReport,setSellerReport] = useState<any>();
  const sellerAverages = sellerReport?.sellerAverageRatings ?? [];

// Overall average seller rating (for summary card)
const avgSellerRating = React.useMemo(() => {
  if (!sellerAverages.length) return null;
  const sum = sellerAverages.reduce(
    (acc: number, s: any) => acc + (s.avgOverall ?? 0),
    0
  );
  return Number((sum / sellerAverages.length).toFixed(1));
}, [sellerAverages]);

// Rating distribution bands (percentage of sellers in each band)
const ratingBands = React.useMemo(() => {
  if (!sellerAverages.length) return [0, 0, 0, 0, 0];

  let band0 = 0; // > 4.5
  let band1 = 0; // 4–4.5
  let band2 = 0; // 3.5–4
  let band3 = 0; // 3–3.5
  let band4 = 0; // < 3

  sellerAverages.forEach((s: any) => {
    const r = s.avgOverall ?? 0;
    if (r > 4.5) band0++;
    else if (r > 4) band1++;
    else if (r > 3.5) band2++;
    else if (r > 3) band3++;
    else band4++;
  });

  const total = sellerAverages.length || 1;
  return [band0, band1, band2, band3, band4].map((c) =>
    Number(((c / total) * 100).toFixed(1)),
  );
}, [sellerAverages]);

// Top sellers table (sorted by avgOverall desc)
const topSellers = React.useMemo(() => {
  if (!sellerAverages.length) return [];

  return [...sellerAverages]
    .sort((a: any, b: any) => (b.avgOverall ?? 0) - (a.avgOverall ?? 0))
    .slice(0, 5)
    .map((s: any) => ({
      name: s.sellerName,
      // no real revenue info yet – placeholder
      revenue: "-",
      // 1 rating per project → ratingCount ≈ projects with rating
      completed: s.ratingCount ?? 0,
      rating: s.avgOverall ?? 0,
    }));
}, [sellerAverages]);

  useEffect(() => {
    apiClient.get('/superadmin/sellerReports')
      .then((response) => {
        console.log('Seller Report data:', response.data.Data);
        setSellerReport(response.data.Data);
      }
      )
      .catch((error) => {
        console.error('Error fetching Seller Report data:', error);
      });
  }, []);
  const summaryCards = [
  {
    title: "Projects Accepted",
    value: `${sellerReport?.projectsAccepted ?? 0}`,
  },
  {
    title: "Avg Seller Rating",
    value: `${sellerReport?.avgSellerRating ?? avgSellerRating ?? "0.0"}`,
  },
  {
    title: "Rejection Rate",
    value: `${sellerReport?.rejectionRate ?? 0}%`,
  },
];

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
  const projectsAccepted = [260, 270, 280, 275, 285, 295]
  const projectsCompleted = [250, 260, 270, 268, 280, 290]

  const onTimeDelivery = [92, 93, 94, 92, 93, 93]
  // const ratingBands = [60, 25, 10, 4, 1] // percentage in each band

  // const topSellers = [
  //   { name: "John Smith", revenue: "$98,000", completed: 24, rating: 4.9 },
  //   { name: "Sarah Johnson", revenue: "$88,500", completed: 21, rating: 4.8 },
  //   { name: "Michael Chen", revenue: "$82,300", completed: 19, rating: 4.7 },
  //   { name: "Emily Davis", revenue: "$79,200", completed: 18, rating: 4.7 },
  //   { name: "David Wilson", revenue: "$75,400", completed: 17, rating: 4.6 },
  // ]

  const flaggedSellers = [
    {
      name: "Alex Thompson",
      issue: "Low Rating (3.2)",
      projects: 12,
      onTime: "82%",
      severity: "High",
    },
    {
      name: "Jessica Brown",
      issue: "Repeated Disputes",
      projects: 8,
      onTime: "76%",
      severity: "High",
    },
    {
      name: "Robert Green",
      issue: "High Cancellation Rate",
      projects: 10,
      onTime: "81%",
      severity: "Medium",
    },
    {
      name: "Maria Garcia",
      issue: "Quality Concerns",
      projects: 6,
      onTime: "89%",
      severity: "Medium",
    },
  ]

  const severityColor = (sev: string) =>
    sev === "High"
      ? { bg: "#fee2e2", color: "#b91c1c" }
      : { bg: "#fef3c7", color: "#b45309" }

  return (
    <>
      {/* SUMMARY + EXPORT */}
      <Box display={"flex"} justifyContent={"space-between"}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>

          Seller Reports
        </Typography>
         <Button
          variant="contained"
          size="small"
          startIcon={<DownloadOutlinedIcon />}
          onClick={handleSellerExport}
          sx={{
            textTransform: "none",
            borderRadius: 999,
            px: 2.5,
            alignSelf: { xs: "flex-end", md: "center" },
            boxShadow: "none",
            "&:hover": { boxShadow: "none" },
          }}
        >
          Export CSV
        </Button>

        </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          alignItems: { xs: "flex-start", md: "center" },
          justifyContent: "space-between",
        }}
      >
        
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            flexWrap: "wrap",
            gap: 2,
            flex: 1,
          }}
        >
          {summaryCards.map((card) => (
            <Box
              key={card.title}
              sx={{
                flex: "1 1 200px",
                display: "flex",
                flexDirection: "column",
                gap: 0.5,
                bgcolor: "#ffffff",
                borderRadius: 2,
                border: "1px solid #e5e7eb",
                p: 1.5,
              }}
            >
              <Typography
                variant="caption"
                sx={{ textTransform: "uppercase", color: "#6b7280" }}
              >
                {card.title}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {card.value}
              </Typography>
              {/* <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                {card.trend === "up" ? (
                  <TrendingUpOutlinedIcon
                    sx={{ fontSize: 18, color: "#16a34a" }}
                  />
                ) : (
                  <TrendingDownOutlinedIcon
                    sx={{ fontSize: 18, color: "#dc2626" }}
                  />
                )}
                <Typography
                  variant="caption"
                  sx={{
                    color: card.trend === "up" ? "#16a34a" : "#dc2626",
                  }}
                >
                  {card.change}
                </Typography>
              </Box> */}
            </Box>
          ))}
        </Box>

       
      </Box>

      {/* PROJECTS ACCEPTED VS COMPLETED */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          bgcolor: "#ffffff",
          borderRadius: 2,
          border: "1px solid #e5e7eb",
          p: 2,
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
          Projects Accepted vs Completed
        </Typography>
        <Typography variant="caption" sx={{ color: "#6b7280", mb: 1 }}>
          Monthly performance trends
        </Typography>

        <LineChart
          xAxis={[{ scaleType: "point", data: sellerReport?.months ?? months }]}
          series={[
            {
              data: sellerReport?.projectsAcceptedMonthly ?? projectsAccepted,
              label: "Projects Accepted",
              color: "#4f46e5",
            },
            {
              data: sellerReport?.projectsCompletedMonthly ?? projectsCompleted,
              label: "Projects Completed",
              color: "#10b981",
            },
          ]}
          height={260}
          margin={{ top: 20, right: 20, bottom: 30, left: 40 }}
          sx={{
            "& .MuiLineElement-root": { strokeWidth: 2 },
            "& .MuiMarkElement-root": { r: 3 },
          }}
        />
      </Box>

      {/* ON‑TIME DELIVERY + RATING DISTRIBUTION */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
        }}
      >
        {/* On‑time delivery */}
        {/* <Box
          sx={{
            flex: 1,
            bgcolor: "#ffffff",
            borderRadius: 2,
            border: "1px solid #e5e7eb",
            p: 2,
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
            On‑time Delivery Rate
          </Typography>
          <Typography variant="caption" sx={{ color: "#6b7280", mb: 1.5 }}>
            Monthly percentage of on‑time deliveries
          </Typography>

          <BarChart
            xAxis={[
              {
                scaleType: "band",
                data: months,
              },
            ]}
            series={[{ data: onTimeDelivery, color: "#22c55e" }]}
            height={220}
            margin={{ top: 20, right: 20, bottom: 40, left: 40 }}
            sx={{
              "& .MuiBarElement-root": { borderRadius: 4 },
            }}
          />
        </Box> */}

        {/* Rating distribution */}
        <Box
          sx={{
            flex: 1,
            bgcolor: "#ffffff",
            borderRadius: 2,
            border: "1px solid #e5e7eb",
            p: 2,
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
            Seller Rating Distribution
          </Typography>
          <Typography variant="caption" sx={{ color: "#6b7280", mb: 1.5 }}>
            Overall rating breakdown
          </Typography>

          <BarChart
            xAxis={[
              {
                scaleType: "band",
                data: ["> 4.5★", "4–4.5★", "3.5–4★", "3–3.5★", "< 3★"],
              },
            ]}
            series={[{ data: ratingBands, color: "#f97316" }]}
            height={220}
            margin={{ top: 20, right: 20, bottom: 40, left: 40 }}
            sx={{
              "& .MuiBarElement-root": { borderRadius: 4 },
              "& .MuiChartsAxis-tickLabel": { fontSize: 11 },
            }}
          />
        </Box>
      </Box>

      {/* TOP PERFORMING SELLERS TABLE */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          bgcolor: "#ffffff",
          borderRadius: 2,
          border: "1px solid #e5e7eb",
          p: 2,
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
          Top Performing Sellers by Revenue
        </Typography>
        <Typography variant="caption" sx={{ color: "#6b7280", mb: 1.5 }}>
          Highest revenue‑generating sellers
        </Typography>

        {/* header row */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            borderBottom: "1px solid #e5e7eb",
            pb: 1,
            mb: 0.5,
          }}
        >
          <Typography sx={{ flex: 2 }} variant="caption" color="#6b7280">
            Seller Name
          </Typography>
          {/* <Typography sx={{ flex: 1 }} variant="caption" color="#6b7280">
            Total Revenue
          </Typography> */}
          <Typography sx={{ flex: 1 }} variant="caption" color="#6b7280">
            Projects Completed
          </Typography>
          <Typography sx={{ flex: 1 }} variant="caption" color="#6b7280">
            Rating
          </Typography>
        </Box>

        {topSellers.map((s, idx) => (
          <Box
            key={s.name}
            sx={{
              display: "flex",
              flexDirection: "row",
              py: 0.9,
              borderBottom:
                idx === topSellers.length - 1 ? "none" : "1px solid #f3f4f6",
            }}
          >
            <Typography sx={{ flex: 2 }} variant="body2">
              {s.name}
            </Typography>
            {/* <Typography sx={{ flex: 1 }} variant="body2" color="#16a34a">
              {s.revenue}
            </Typography> */}
            <Typography sx={{ flex: 1 }} variant="body2">
              {s.completed}
            </Typography>
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              <Typography variant="body2">{s.rating.toFixed(1)}</Typography>
              <StarRateRoundedIcon sx={{ fontSize: 16, color: "#facc15" }} />
            </Box>
          </Box>
        ))}
      </Box>

      {/* FLAGGED SELLERS PANEL */}
      {/* <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          bgcolor: "#fff7f7",
          borderRadius: 2,
          border: "1px solid #fecaca",
          p: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 1,
            mb: 0.5,
          }}
        >
          <WarningAmberOutlinedIcon sx={{ color: "#dc2626" }} />
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            Flagged Sellers – Requires attention
          </Typography>
        </Box>
        <Typography variant="caption" sx={{ color: "#6b7280", mb: 1.5 }}>
          Sellers below quality thresholds or with performance issues
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            borderBottom: "1px solid #fecaca",
            pb: 1,
            mb: 0.5,
          }}
        >
          <Typography sx={{ flex: 2 }} variant="caption" color="#6b7280">
            Seller Name
          </Typography>
          <Typography sx={{ flex: 2 }} variant="caption" color="#6b7280">
            Issue
          </Typography>
          <Typography sx={{ flex: 1 }} variant="caption" color="#6b7280">
            Projects
          </Typography>
          <Typography sx={{ flex: 1 }} variant="caption" color="#6b7280">
            On‑time Rate
          </Typography>
          <Typography sx={{ flex: 1 }} variant="caption" color="#6b7280">
            Severity
          </Typography>
        </Box>

        {flaggedSellers.map((s, idx) => {
          const { bg, color } = severityColor(s.severity)
          return (
            <Box
              key={s.name}
              sx={{
                display: "flex",
                flexDirection: "row",
                py: 0.75,
                borderBottom:
                  idx === flaggedSellers.length - 1
                    ? "none"
                    : "1px solid #fee2e2",
              }}
            >
              <Typography sx={{ flex: 2 }} variant="body2">
                {s.name}
              </Typography>
              <Typography sx={{ flex: 2 }} variant="body2" color="#b91c1c">
                {s.issue}
              </Typography>
              <Typography sx={{ flex: 1 }} variant="body2">
                {s.projects}
              </Typography>
              <Typography sx={{ flex: 1 }} variant="body2">
                {s.onTime}
              </Typography>
              <Box sx={{ flex: 1 }}>
                <Chip
                  label={s.severity}
                  size="small"
                  sx={{
                    backgroundColor: bg,
                    color,
                    fontWeight: 600,
                    borderRadius: 999,
                    fontSize: "0.7rem",
                  }}
                />
              </Box>
            </Box>
          )
        })}
      </Box> */}
    </>
  )
}

const QualityExpertSection: React.FC = () => {
  const [qualityReport, setQualityReport] = useState<any>();

  // useEffect(() => {
  //   // Replace with your real endpoint
  //   apiClient
  //     .get("/admin/QualityExpertReports")
  //     .then((response) => {
  //       console.log("Quality Expert Report data:", response.data.Data);
  //       setQualityReport(response.data.Data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching Quality Expert Report data:", error);
  //     });
  // }, []);

  const handleQualityExport = () => {
    // TODO: implement CSV export
    console.log("Export Quality Expert report as CSV");
  };

  // Top metrics (use API values if available, otherwise fall back to demo numbers)
  const summaryCards = [
    {
      title: "Total Quality Experts",
      value: qualityReport?.totalExperts ?? 156,
    },
    {
      title: "Avg Review Time",
      value: qualityReport?.averageReviewTime ?? "2.3 days",
    },
    {
      title: "Projects Reviewed",
      value: qualityReport?.projectsReviewed ?? 2847,
    },
    {
      title: "Active Disputes",
      value: qualityReport?.activeDisputes ?? 18,
    },
  ];

  // --- Demo chart data (replace with API mapping later) ---

  // Projects Reviewed Over Time (Line)
  const reviewMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const projectsReviewedOverTime = [420, 445, 460, 480, 505, 530];

  // Review Turnaround Rate (Bar)
  const turnaroundBuckets = ["<12h", "12–24h", "24–48h", "48–72h", ">72h"];
  const turnaroundPercentages = [35, 38, 17, 7, 3];

  // Issues Detected vs Missed (Grouped Bar)
  const issuesMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const issuesDetected = [96, 97, 95, 97, 98, 98];
  const issuesMissed = [4, 3, 5, 3, 2, 2];

  // Buyer vs Seller Satisfaction Scores (Bar)
  const satisfactionCategories = [
    "Timeliness",
    "Accuracy",
    "Communication",
    "Professionalism",
    "Clarity",
  ];
  const buyerSatisfaction = [4.6, 4.7, 4.5, 4.6, 4.7];
  const sellerSatisfaction = [4.5, 4.6, 4.4, 4.5, 4.6];

  // Performance Comparison (Radar)
  const radarLabels = [
    "Speed",
    "Accuracy",
    "Guideline Adherence",
    "Communication",
    "Consistency",
  ];
  metrics: [
  { name: "Quality", max: 5 },
  { name: "Speed", max: 5 },
  { name: "Accuracy", max: 5 },
  { name: "Communication", max: 5 },
]

  const radarAverage = [78, 82, 80, 76, 79];
  const radarTopPerformers = [92, 95, 94, 90, 93];
  const radarNewExperts = [65, 70, 68, 64, 67];

  // Tables: Top Experts + Reviews Requiring Attention
  const topExperts = useMemo(
    () =>
      qualityReport?.topExperts ?? [
        {
          name: "Sara Ahmed",
          reviews: 184,
          avgTurnaround: "2.1 days",
          avgRating: 4.9,
          issuesFound: 92,
          status: "Top Performer",
        },
        {
          name: "James Rodriguez",
          reviews: 167,
          avgTurnaround: "2.4 days",
          avgRating: 4.8,
          issuesFound: 81,
          status: "Top Performer",
        },
        {
          name: "Lina Chen",
          reviews: 151,
          avgTurnaround: "2.6 days",
          avgRating: 4.7,
          issuesFound: 75,
          status: "Strong Performer",
        },
      ],
    [qualityReport]
  );

  const attentionReviews = useMemo(
    () =>
      qualityReport?.attentionReviews ?? [
        {
          projectRef: "PRJ-1459",
          projectName: "Marketplace Redesign",
          buyer: "TechCorp Inc.",
          expert: "Sara Ahmed",
          age: "3 hours",
          severity: "High",
          status: "In Review",
        },
        {
          projectRef: "PRJ-1462",
          projectName: "Payment Gateway Audit",
          buyer: "FinBank",
          expert: "James Rodriguez",
          age: "7 hours",
          severity: "Medium",
          status: "Pending Action",
        },
        {
          projectRef: "PRJ-1468",
          projectName: "AI Model Validation",
          buyer: "Insight Labs",
          expert: "Lina Chen",
          age: "18 hours",
          severity: "High",
          status: "Over SLA",
        },
      ],
    [qualityReport]
  );

  return (
    <>
      {/* HEADER + SUMMARY METRICS */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          bgcolor: "#ffffff",
          borderRadius: 2,
          border: "1px solid #e5e7eb",
          p: 2,
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            Quality Expert Reports
          </Typography>

          <Button
            variant="contained"
            size="small"
            onClick={handleQualityExport}
            startIcon={<DownloadOutlinedIcon />}
            sx={{
              textTransform: "none",
              borderRadius: 999,
              px: 2,
              boxShadow: "none",
              "&:hover": { boxShadow: "none" },
            }}
          >
            Export CSV
          </Button>
        </Box>

        {/* Summary cards */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
          }}
        >
          {summaryCards.map((card) => (
            <Box
              key={card.title}
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 0.5,
                borderRadius: 2,
                border: "1px solid #e5e7eb",
                bgcolor: "#f9fafb",
                p: 1.5,
              }}
            >
              <Typography
                variant="caption"
                sx={{ textTransform: "uppercase", color: "#6b7280" }}
              >
                {card.title}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {card.value}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* PROJECTS REVIEWED OVER TIME */}
      <Box
        sx={{
          mt: 2,
          display: "flex",
          flexDirection: "column",
          bgcolor: "#ffffff",
          borderRadius: 2,
          border: "1px solid #e5e7eb",
          p: 2,
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
          Projects Reviewed Over Time
        </Typography>
        <Typography variant="caption" sx={{ color: "#6b7280", mb: 1 }}>
          Monthly review volume trends
        </Typography>

        <LineChart
          xAxis={[{ scaleType: "point", data: reviewMonths }]}
          series={[
            {
              data: projectsReviewedOverTime,
              label: "Projects Reviewed",
              color: "#6366f1",
              area: true,
            },
          ]}
          height={260}
          margin={{ top: 20, right: 20, bottom: 30, left: 40 }}
          sx={{
            "& .MuiLineElement-root": { strokeWidth: 2 },
            "& .MuiMarkElement-root": { r: 2.8 },
          }}
        />
      </Box>

      {/* TURNAROUND RATE + ISSUES DETECTED VS MISSED */}
      {/* <Box
        sx={{
          mt: 2,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
        }}
      > */}
        {/* Review Turnaround Rate */}
        {/* <Box
          sx={{
            flex: 1,
            bgcolor: "#ffffff",
            borderRadius: 2,
            border: "1px solid #e5e7eb",
            p: 2,
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
            Review Turnaround Rate
          </Typography>
          <Typography variant="caption" sx={{ color: "#6b7280", mb: 1.5 }}>
            Average time taken to complete reviews
          </Typography>

          <BarChart
            xAxis={[
              {
                scaleType: "band",
                data: turnaroundBuckets,
              },
            ]}
            series={[
              {
                data: turnaroundPercentages,
                label: "% of Reviews",
                color: "#10b981",
              },
            ]}
            height={240}
            margin={{ top: 20, right: 20, bottom: 40, left: 40 }}
            sx={{
              "& .MuiBarElement-root": { borderRadius: 4 },
              "& .MuiChartsAxis-tickLabel": { fontSize: 11 },
            }}
          />
        </Box> */}

        {/* Issues Detected vs Missed */}
        {/* <Box
          sx={{
            flex: 1,
            bgcolor: "#ffffff",
            borderRadius: 2,
            border: "1px solid #e5e7eb",
            p: 2,
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
            Issues Detected vs Missed
          </Typography>
          <Typography variant="caption" sx={{ color: "#6b7280", mb: 1.5 }}>
            Quality of defect detection across reviews
          </Typography>

          <BarChart
            xAxis={[
              {
                scaleType: "band",
                data: issuesMonths,
              },
            ]}
            series={[
              {
                data: issuesDetected,
                label: "Issues Detected (%)",
                color: "#22c55e",
              },
              {
                data: issuesMissed,
                label: "Issues Missed (%)",
                color: "#ef4444",
              },
            ]}
            height={240}
            margin={{ top: 20, right: 20, bottom: 40, left: 40 }}
            sx={{
              "& .MuiBarElement-root": { borderRadius: 4 },
              "& .MuiChartsAxis-tickLabel": { fontSize: 11 },
            }}
          />
        </Box> */}
      {/* </Box> */}

      {/* BUYER VS SELLER SATISFACTION */}
      <Box
        sx={{
          mt: 2,
          display: "flex",
          flexDirection: "column",
          bgcolor: "#ffffff",
          borderRadius: 2,
          border: "1px solid #e5e7eb",
          p: 2,
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
          Buyer vs Seller Satisfaction Scores
        </Typography>
        <Typography variant="caption" sx={{ color: "#6b7280", mb: 1.5 }}>
          Average ratings across different categories
        </Typography>

        <BarChart
          xAxis={[
            {
              scaleType: "band",
              data: satisfactionCategories,
            },
          ]}
          series={[
            {
              data: buyerSatisfaction,
              label: "Buyer Satisfaction",
              color: "#4f46e5",
            },
            {
              data: sellerSatisfaction,
              label: "Seller Satisfaction",
              color: "#22c55e",
            },
          ]}
          height={260}
          margin={{ top: 20, right: 20, bottom: 50, left: 40 }}
          sx={{
            "& .MuiBarElement-root": { borderRadius: 4 },
            "& .MuiChartsAxis-tickLabel": { fontSize: 11 },
          }}
        />
      </Box>

      {/* PERFORMANCE COMPARISON (RADAR) */}
      {/* <Box
        sx={{
          mt: 2,
          display: "flex",
          flexDirection: "column",
          bgcolor: "#ffffff",
          borderRadius: 2,
          border: "1px solid #e5e7eb",
          p: 2,
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
          Performance Comparison
        </Typography>
        <Typography variant="caption" sx={{ color: "#6b7280", mb: 1.5 }}>
          Key performance metrics for quality experts
        </Typography>

      <RadarChart
  height={260}
  series={[
    { data: radarAverage, label: "Average" },
    { data: radarTopPerformers, label: "Top Performers" },
    { data: radarNewExperts, label: "New Experts" },
  ]}
  radar={{
    startAngle: 0,
    labelGap: 5,
    labelFormatter: (name) => name,
    metrics: [
      { name: "Quality", max: 5 },
      { name: "Speed", max: 5 },
      { name: "Accuracy", max: 5 },
      { name: "Communication", max: 5 },
    ],
  }}
  sx={{
    "& .MuiChartsLegend-root": { mt: 1 },
  }}
  slotProps={{ legend: {} }}
/>



      </Box> */}

      {/* TABLES: TOP EXPERTS + REVIEWS REQUIRING ATTENTION */}
      <Box
        sx={{
          mt: 2,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
        }}
      >
        {/* Top Performing Quality Experts */}
        <Box
          sx={{
            flex: 1,
            bgcolor: "#ffffff",
            borderRadius: 2,
            border: "1px solid #e5e7eb",
            p: 2,
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
            Top Performing Quality Experts
          </Typography>

          <Box
            sx={{
              display: "flex",
              px: 1,
              py: 0.5,
              borderBottom: "1px solid #e5e7eb",
              fontSize: 12,
              fontWeight: 600,
              color: "#6b7280",
            }}
          >
            <Box sx={{ flex: 1 }}>Expert</Box>
            <Box sx={{ width: 70, textAlign: "right" }}>Reviews</Box>
            <Box sx={{ width: 100, textAlign: "right" }}>Avg Time</Box>
            <Box sx={{ width: 80, textAlign: "right" }}>Rating</Box>
            <Box sx={{ width: 100, textAlign: "right" }}>Issues Found</Box>
            <Box sx={{ width: 110, textAlign: "right" }}>Status</Box>
          </Box>

          {topExperts.map((expert: any) => (
            <Box
              key={expert.name}
              sx={{
                display: "flex",
                px: 1,
                py: 0.75,
                borderBottom: "1px solid #f3f4f6",
                fontSize: 13,
                alignItems: "center",
              }}
            >
              <Box sx={{ flex: 1 }}>{expert.name}</Box>
              <Box sx={{ width: 70, textAlign: "right" }}>
                {expert.reviews}
              </Box>
              <Box sx={{ width: 100, textAlign: "right" }}>
                {expert.avgTurnaround}
              </Box>
              <Box sx={{ width: 80, textAlign: "right" }}>
                {expert.avgRating.toFixed
                  ? expert.avgRating.toFixed(1)
                  : expert.avgRating}
              </Box>
              <Box sx={{ width: 100, textAlign: "right" }}>
                {expert.issuesFound}
              </Box>
              <Box sx={{ width: 110, textAlign: "right" }}>
                <Box
                  sx={{
                    display: "inline-flex",
                    px: 1,
                    py: 0.3,
                    borderRadius: 999,
                    fontSize: 11,
                    bgcolor: "#ecfdf3",
                    color: "#16a34a",
                    fontWeight: 600,
                  }}
                >
                  {expert.status}
                </Box>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Reviews Requiring Attention */}
        <Box
          sx={{
            flex: 1,
            bgcolor: "#ffffff",
            borderRadius: 2,
            border: "1px solid #e5e7eb",
            p: 2,
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
            Reviews Requiring Attention
          </Typography>

          <Box
            sx={{
              display: "flex",
              px: 1,
              py: 0.5,
              borderBottom: "1px solid #e5e7eb",
              fontSize: 12,
              fontWeight: 600,
              color: "#6b7280",
            }}
          >
            <Box sx={{ width: 90 }}>Project Ref</Box>
            <Box sx={{ flex: 1 }}>Project</Box>
            <Box sx={{ flex: 1 }}>Buyer</Box>
            <Box sx={{ width: 130 }}>Expert</Box>
            <Box sx={{ width: 90 }}>Age</Box>
            <Box sx={{ width: 80 }}>Severity</Box>
            <Box sx={{ width: 110, textAlign: "right" }}>Status</Box>
          </Box>

          {attentionReviews.map((item: any) => (
            <Box
              key={item.projectRef}
              sx={{
                display: "flex",
                px: 1,
                py: 0.75,
                borderBottom: "1px solid #f3f4f6",
                fontSize: 13,
                alignItems: "center",
              }}
            >
              <Box sx={{ width: 90 }}>{item.projectRef}</Box>
              <Box sx={{ flex: 1 }}>{item.projectName}</Box>
              <Box sx={{ flex: 1 }}>{item.buyer}</Box>
              <Box sx={{ width: 130 }}>{item.expert}</Box>
              <Box sx={{ width: 90 }}>{item.age}</Box>
              <Box sx={{ width: 80 }}>{item.severity}</Box>
              <Box sx={{ width: 110, textAlign: "right" }}>
                <Box
                  sx={{
                    display: "inline-flex",
                    px: 1,
                    py: 0.3,
                    borderRadius: 999,
                    fontSize: 11,
                    bgcolor:
                      item.status === "Over SLA" ? "#fee2e2" : "#fef9c3",
                    color:
                      item.status === "Over SLA" ? "#dc2626" : "#92400e",
                    fontWeight: 600,
                  }}
                >
                  {item.status}
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};
const ProjectDeliverySection: React.FC = () => {
  const [deliveryReport, setDeliveryReport] = useState<any>()
  const [filters, setFilters] = useState({
    projectType: "all",
    timeline: "last-6-months",
    client: "all",
  })

  useEffect(() => {
    apiClient
      .get("/admin/ProjectDeliveryReports")
      .then((response) => {
        console.log("Project Delivery data:", response.data.Data)
        setDeliveryReport(response.data.Data)
      })
      .catch((error) => {
        console.error("Error fetching Project Delivery data:", error)
      })
  }, [])

  const handleFilterChange =
    (field: keyof typeof filters) =>
    (event: any) => {
      setFilters((prev) => ({ ...prev, [field]: event.target.value }))
    }

  const handleApplyFilters = () => {
    // TODO: re‑fetch with filters
    console.log("Apply filters", filters)
  }

  const handleClearFilters = () => {
    setFilters({
      projectType: "all",
      timeline: "last-6-months",
      client: "all",
    })
  }

  const handleProjectExport = () => {
    // TODO: wire up export
    console.log("Export Project Delivery CSV")
  }

  // ----- SUMMARY CARDS -----
  const summaryCards = [
    {
      title: "Total Active Projects",
      value: deliveryReport?.totalProjects ?? 324,
      subtitle: "Across all clients",
    },
    {
      title: "Deliverables Completed",
      value: deliveryReport?.deliverablesCompleted ?? 2847,
      subtitle: "Successfully handed off",
    },
    {
      title: "Avg. Cycle Time",
      value: `${deliveryReport?.avgCycleTime ?? 31.5}d`,
      subtitle: "From kick‑off to delivery",
    },
    {
      title: "On‑time Delivery Rate",
      value: `${deliveryReport?.onTimeRate ?? 73.2}%`,
      subtitle: "Within agreed timelines",
    },
  ]

  // ----- STATIC / FALLBACK DATA -----
  const months = deliveryReport?.months ?? ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]

  const statusDistribution =
    deliveryReport?.statusDistribution ?? [
      { id: 0, label: "On Track", value: 62 },
      { id: 1, label: "At Risk", value: 18 },
      { id: 2, label: "Delayed", value: 20 },
    ]

  const delayBuckets =
    deliveryReport?.delayBuckets ?? [
      { label: "Ahead of schedule", value: 140 },
      { label: "On time", value: 210 },
      { label: "1–3 days late", value: 80 },
      { label: "3–7 days late", value: 45 },
      { label: "7+ days late", value: 22 },
    ]

  const milestoneLabels =
    deliveryReport?.milestoneLabels ??
    ["Discovery", "Design", "Dev", "QA Testing", "UAT", "Go Live"]

  const milestoneActual =
    deliveryReport?.milestoneActual ?? [4, 9, 22, 11, 7, 3]
  const milestoneTarget =
    deliveryReport?.milestoneTarget ?? [3, 7, 18, 9, 6, 3]

  const scopeChanges =
    deliveryReport?.scopeChangesMonthly ?? [5, 4, 6, 5, 4, 3]

  const techNames =
    deliveryReport?.techNames ??
    ["React", "Node.js", ".NET", "Python", "Java", "AWS", "Azure", "GCP"]
  const techUsage = deliveryReport?.techUsage ?? [35, 32, 18, 16, 14, 12, 10, 8]

  const recentProjects =
    deliveryReport?.recentProjects ?? [
      {
        id: "PRJ‑1042",
        name: "Customer Portal Revamp",
        client: "Acme Retail",
        seller: "Michael Chen",
        status: "On Track",
        start: "05 Jan 2026",
        end: "28 Mar 2026",
        delay: "+1d",
        scopeChanges: 2,
      },
      {
        id: "PRJ‑1038",
        name: "Data Platform Modernization",
        client: "Northwind Bank",
        seller: "Emily Davis",
        status: "At Risk",
        start: "18 Dec 2025",
        end: "15 Apr 2026",
        delay: "+6d",
        scopeChanges: 4,
      },
      {
        id: "PRJ‑1031",
        name: "Mobile Ordering App",
        client: "Urban Eats",
        seller: "Sarah Johnson",
        status: "Delayed",
        start: "02 Nov 2025",
        end: "09 Feb 2026",
        delay: "+11d",
        scopeChanges: 3,
      },
      {
        id: "PRJ‑1027",
        name: "CRM Integration Rollout",
        client: "Globex",
        seller: "John Smith",
        status: "On Track",
        start: "10 Oct 2025",
        end: "22 Jan 2026",
        delay: "0d",
        scopeChanges: 1,
      },
      {
        id: "PRJ‑1020",
        name: "Cloud FinOps Dashboard",
        client: "FinPlus",
        seller: "David Wilson",
        status: "On Track",
        start: "14 Sep 2025",
        end: "10 Jan 2026",
        delay: "-2d",
        scopeChanges: 0,
      },
    ]

  const statusChipStyles = (status: string) => {
    if (status === "On Track") {
      return { bg: "#dcfce7", color: "#15803d" }
    }
    if (status === "At Risk") {
      return { bg: "#fef9c3", color: "#a16207" }
    }
    return { bg: "#fee2e2", color: "#b91c1c" } // Delayed
  }

  const delayColor = (delay: string) => {
    if (delay.startsWith("-") || delay === "0d") return "#16a34a"
    if (delay.startsWith("+") && parseInt(delay) <= 3) return "#eab308"
    return "#dc2626"
  }

  return (
    <>
      {/* TITLE + EXPORT */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
          Project Delivery
        </Typography>
        <Button
          variant="contained"
          size="small"
          startIcon={<DownloadOutlinedIcon />}
          onClick={handleProjectExport}
          sx={{
            textTransform: "none",
            borderRadius: 999,
            px: 2.5,
            alignSelf: { xs: "flex-end", md: "center" },
            boxShadow: "none",
            "&:hover": { boxShadow: "none" },
          }}
        >
          Export CSV
        </Button>
      </Box>

      {/* FILTERS */}
      <Box
        sx={{
          mb: 2,
          bgcolor: "#ffffff",
          borderRadius: 2,
          border: "1px solid #e5e7eb",
          p: 2,
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
          Filters
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            alignItems: "center",
          }}
        >
          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel>Project Type</InputLabel>
            <Select
              label="Project Type"
              value={filters.projectType}
              onChange={handleFilterChange("projectType")}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="fixed">Fixed‑price</MenuItem>
              <MenuItem value="tm">Time &amp; Material</MenuItem>
              <MenuItem value="retainer">Retainer</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel>Timeline</InputLabel>
            <Select
              label="Timeline"
              value={filters.timeline}
              onChange={handleFilterChange("timeline")}
            >
              <MenuItem value="last-3-months">Last 3 months</MenuItem>
              <MenuItem value="last-6-months">Last 6 months</MenuItem>
              <MenuItem value="last-12-months">Last 12 months</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel>Client</InputLabel>
            <Select
              label="Client"
              value={filters.client}
              onChange={handleFilterChange("client")}
            >
              <MenuItem value="all">All clients</MenuItem>
              <MenuItem value="acme">Acme Retail</MenuItem>
              <MenuItem value="northwind">Northwind Bank</MenuItem>
              <MenuItem value="globex">Globex</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ flexGrow: 1 }} />

          <Button
            variant="contained"
            size="small"
            onClick={handleApplyFilters}
            sx={{
              textTransform: "none",
              borderRadius: 999,
              px: 2.5,
              boxShadow: "none",
              "&:hover": { boxShadow: "none" },
            }}
          >
            Apply Filters
          </Button>
          <Button
            variant="text"
            size="small"
            onClick={handleClearFilters}
            sx={{ textTransform: "none" }}
          >
            Clear
          </Button>
        </Box>
      </Box>

      {/* SUMMARY CARDS */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          flexWrap: "wrap",
          gap: 2,
          mb: 2,
        }}
      >
        {summaryCards.map((card) => (
          <Box
            key={card.title}
            sx={{
              flex: "1 1 220px",
              display: "flex",
              flexDirection: "column",
              gap: 0.5,
              bgcolor: "#ffffff",
              borderRadius: 2,
              border: "1px solid #e5e7eb",
              p: 1.5,
            }}
          >
            <Typography
              variant="caption"
              sx={{ textTransform: "uppercase", color: "#6b7280" }}
            >
              {card.title}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {card.value}
            </Typography>
            <Typography variant="caption" sx={{ color: "#9ca3af" }}>
              {card.subtitle}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* STATUS DISTRIBUTION + DELAY DISTRIBUTION */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          mb: 2,
        }}
      >
        {/* Project Status Distribution (Pie) */}
        {/* <Box
          sx={{
            flex: 1,
            bgcolor: "#ffffff",
            borderRadius: 2,
            border: "1px solid #e5e7eb",
            p: 2,
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
            Project Status Distribution
          </Typography>
          <Typography variant="caption" sx={{ color: "#6b7280", mb: 1.5 }}>
            Current status of active projects
          </Typography>

          <PieChart
            series={[
              {
                data: statusDistribution,
                innerRadius: 40,
                outerRadius: 80,
              },
            ]}
            height={220}
            slotProps={{
              legend: {
                direction: "column",
                position: { vertical: "middle", horizontal: "right" },
              },
            }}
          />
        </Box> */}

        {/* Delivery Delay Distribution */}
        <Box
          sx={{
            flex: 1,
            bgcolor: "#ffffff",
            borderRadius: 2,
            border: "1px solid #e5e7eb",
            p: 2,
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
            Delivery Delay Distribution
          </Typography>
          <Typography variant="caption" sx={{ color: "#6b7280", mb: 1.5 }}>
            Number of projects by delay bucket
          </Typography>

          <BarChart
            xAxis={[
              {
                scaleType: "band",
                data: delayBuckets.map((d:any) => d.label),
              },
            ]}
            series={[
              {
                data: delayBuckets.map((d:any) => d.value),
                color: "#6366f1",
              },
            ]}
            height={220}
            margin={{ top: 20, right: 20, bottom: 60, left: 40 }}
            sx={{
              "& .MuiBarElement-root": { borderRadius: 4 },
              "& .MuiChartsAxis-tickLabel": { fontSize: 11 },
            }}
          />
        </Box>
      </Box>

      {/* MILESTONE COMPLETION TIMELINE */}
      <Box
        sx={{
          mb: 2,
          bgcolor: "#ffffff",
          borderRadius: 2,
          border: "1px solid #e5e7eb",
          p: 2,
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
          Milestone Completion Timelines
        </Typography>
        <Typography variant="caption" sx={{ color: "#6b7280", mb: 1.5 }}>
          Average days vs target for each project phase
        </Typography>

        <BarChart
          xAxis={[
            {
              scaleType: "band",
              data: milestoneLabels,
            },
          ]}
          series={[
            {
              data: milestoneActual,
              label: "Actual (days)",
              color: "#4f46e5",
            },
            {
              data: milestoneTarget,
              label: "Target (days)",
              color: "#22c55e",
            },
          ]}
          height={260}
          margin={{ top: 20, right: 20, bottom: 60, left: 40 }}
          sx={{
            "& .MuiBarElement-root": { borderRadius: 4 },
            "& .MuiChartsAxis-tickLabel": { fontSize: 11 },
          }}
        />
      </Box>

      {/* SCOPE CHANGES OVER TIME */}
      <Box
        sx={{
          mb: 2,
          bgcolor: "#ffffff",
          borderRadius: 2,
          border: "1px solid #e5e7eb",
          p: 2,
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
          Scope Change Count
        </Typography>
        <Typography variant="caption" sx={{ color: "#6b7280", mb: 1.5 }}>
          Monthly trend of project scope modifications
        </Typography>

        <LineChart
          xAxis={[{ scaleType: "point", data: months }]}
          series={[
            {
              data: scopeChanges,
              label: "Scope changes",
              color: "#f97316",
            },
          ]}
          height={260}
          margin={{ top: 20, right: 20, bottom: 40, left: 40 }}
          sx={{
            "& .MuiLineElement-root": { strokeWidth: 2 },
            "& .MuiMarkElement-root": { r: 3 },
          }}
        />
      </Box>

      {/* TECHNOLOGY STACK USAGE */}
      <Box
        sx={{
          mb: 2,
          bgcolor: "#ffffff",
          borderRadius: 2,
          border: "1px solid #e5e7eb",
          p: 2,
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
          Technology Stack Usage
        </Typography>
        <Typography variant="caption" sx={{ color: "#6b7280", mb: 1.5 }}>
          Most commonly used technologies across projects
        </Typography>

        <BarChart
          xAxis={[
            {
              scaleType: "band",
              data: techNames,
            },
          ]}
          series={[
            {
              data: techUsage,
              color: "#0ea5e9",
            },
          ]}
          height={260}
          margin={{ top: 20, right: 20, bottom: 60, left: 40 }}
          sx={{
            "& .MuiBarElement-root": { borderRadius: 4 },
            "& .MuiChartsAxis-tickLabel": { fontSize: 11 },
          }}
        />
      </Box>

      {/* RECENT PROJECTS TABLE */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          bgcolor: "#ffffff",
          borderRadius: 2,
          border: "1px solid #e5e7eb",
          p: 2,
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
          Recent Projects
        </Typography>
        <Typography variant="caption" sx={{ color: "#6b7280", mb: 1.5 }}>
          Latest project details and delivery status
        </Typography>

        {/* Header row */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            borderBottom: "1px solid #e5e7eb",
            pb: 1,
            mb: 0.5,
          }}
        >
          <Typography sx={{ flex: 1.1 }} variant="caption" color="#6b7280">
            Project ID
          </Typography>
          <Typography sx={{ flex: 2 }} variant="caption" color="#6b7280">
            Project Name
          </Typography>
          <Typography sx={{ flex: 1.5 }} variant="caption" color="#6b7280">
            Client
          </Typography>
          <Typography sx={{ flex: 1.5 }} variant="caption" color="#6b7280">
            Seller
          </Typography>
          <Typography sx={{ flex: 1 }} variant="caption" color="#6b7280">
            Status
          </Typography>
          <Typography sx={{ flex: 1.2 }} variant="caption" color="#6b7280">
            Start Date
          </Typography>
          <Typography sx={{ flex: 1.2 }} variant="caption" color="#6b7280">
            Target / Actual
          </Typography>
          <Typography sx={{ flex: 0.8 }} variant="caption" color="#6b7280">
            Delay
          </Typography>
          <Typography sx={{ flex: 0.9 }} variant="caption" color="#6b7280">
            Scope Changes
          </Typography>
        </Box>

        {recentProjects.map((p:any, idx:any) => {
          const { bg, color } = statusChipStyles(p.status)
          return (
            <Box
              key={p.id}
              sx={{
                display: "flex",
                flexDirection: "row",
                py: 0.9,
                borderBottom:
                  idx === recentProjects.length - 1
                    ? "none"
                    : "1px solid #f3f4f6",
              }}
            >
              <Typography sx={{ flex: 1.1 }} variant="body2">
                {p.id}
              </Typography>
              <Typography sx={{ flex: 2 }} variant="body2">
                {p.name}
              </Typography>
              <Typography sx={{ flex: 1.5 }} variant="body2">
                {p.client}
              </Typography>
              <Typography sx={{ flex: 1.5 }} variant="body2">
                {p.seller}
              </Typography>
              <Box sx={{ flex: 1 }}>
                <Chip
                  label={p.status}
                  size="small"
                  sx={{
                    backgroundColor: bg,
                    color,
                    fontWeight: 600,
                    borderRadius: 999,
                    fontSize: "0.7rem",
                  }}
                />
              </Box>
              <Typography sx={{ flex: 1.2 }} variant="body2">
                {p.start}
              </Typography>
              <Typography sx={{ flex: 1.2 }} variant="body2">
                {p.end}
              </Typography>
              <Typography
                sx={{ flex: 0.8 }}
                variant="body2"
                color={delayColor(p.delay)}
              >
                {p.delay}
              </Typography>
              <Typography sx={{ flex: 0.9 }} variant="body2">
                {p.scopeChanges}
              </Typography>
            </Box>
          )
        })}
      </Box>
    </>
  )
}

const FinancialRevenueSection: React.FC = () => {
  const [financialReport, setFinancialReport] = useState<any>()
  const [period, setPeriod] = useState<"mtd" | "qtd" | "ytd">("mtd")

  useEffect(() => {
    apiClient
      .get("/admin/FinancialRevenueReports")
      .then((response) => {
        console.log("Financial Revenue data:", response.data.Data)
        setFinancialReport(response.data.Data)
      })
      .catch((error) => {
        console.error("Error fetching Financial Revenue data:", error)
      })
  }, [])

  const handleExport = () => {
    // TODO: implement export
    console.log("Export Financial Revenue CSV")
  }

  const summaryCards = [
    {
      title: "Platform Commission (MTD)",
      value: financialReport?.platformCommission ?? "$142,580",
      hint: "Net commission earned",
    },
    {
      title: "Total Released Value",
      value: financialReport?.totalReleased ?? "$2.85M",
      hint: "Payouts released to sellers",
    },
    {
      title: "Pending Payouts",
      value: financialReport?.pendingPayouts ?? "$386,420",
      hint: "Awaiting clearance / approval",
    },
    {
      title: "30‑Day Rev. Forecast",
      value: financialReport?.forecast30d ?? "$48,120",
      hint: "Projected commission",
    },
  ]

  const months =
    financialReport?.months ?? ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"]

  const commissionSeries =
    financialReport?.commissionMonthly ?? [
      14500, 15850, 16200, 17180, 18230, 19040, 19820, 20560,
    ]

  const unitVolume =
    financialReport?.unitVolume ?? [420, 455, 470, 488, 502, 515, 530, 548]

  const payoutShare =
    financialReport?.payoutShare ?? [
      { id: 0, label: "Platform Commission", value: 18 },
      { id: 1, label: "Seller Payouts", value: 77 },
      { id: 2, label: "Taxes & Fees", value: 5 },
    ]

  const qualityFee =
    financialReport?.qualityFee ?? [11200, 11840, 11950, 12300, 12620, 12940, 13110, 13350]

  const refunds =
    financialReport?.refunds ?? [42000, 38500, 36000, 34500, 32900, 31800]
  const disputes =
    financialReport?.disputes ?? [8200, 7800, 7600, 7400, 7100, 6900]
  const refundMonths =
    financialReport?.refundMonths ?? ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]

  const revCategories =
    financialReport?.categoryNames ??
    ["Web Dev", "Mobile Apps", "Data & AI", "UI/UX", "Marketing", "Consulting"]
  const revByCategory =
    financialReport?.categoryRevenue ?? [520000, 410000, 395000, 305000, 260000, 210000]

  const recentTx =
    financialReport?.recentTransactions ?? [
      {
        id: "TX‑98231",
        project: "Customer Portal Revamp",
        client: "Acme Retail",
        seller: "Michael Chen",
        status: "Released",
        amount: 24500,
        commission: 3675,
        payout: 20825,
        dispute: "No",
        date: "12 Jan 2026",
      },
      {
        id: "TX‑98192",
        project: "Data Platform Modernization",
        client: "Northwind Bank",
        seller: "Emily Davis",
        status: "Pending",
        amount: 31800,
        commission: 4770,
        payout: 27030,
        dispute: "No",
        date: "10 Jan 2026",
      },
      {
        id: "TX‑98160",
        project: "Mobile Ordering App",
        client: "Urban Eats",
        seller: "Sarah Johnson",
        status: "Under Review",
        amount: 28900,
        commission: 4335,
        payout: 24565,
        dispute: "Yes",
        date: "08 Jan 2026",
      },
      {
        id: "TX‑98134",
        project: "CRM Integration Rollout",
        client: "Globex",
        seller: "John Smith",
        status: "Released",
        amount: 19600,
        commission: 2940,
        payout: 16660,
        dispute: "No",
        date: "06 Jan 2026",
      },
      {
        id: "TX‑98092",
        project: "Cloud FinOps Dashboard",
        client: "FinPlus",
        seller: "David Wilson",
        status: "Released",
        amount: 15800,
        commission: 2370,
        payout: 13430,
        dispute: "No",
        date: "03 Jan 2026",
      },
    ]

  const monthlySummary =
    financialReport?.monthlySummary ?? {
      gmv: "$2,875,100",
      releasedValue: "$2,254,680",
      delta: "-$71,800",
      commissionRate: "17.3%",
      completedOrders: 457,
      disputeRate: "2.1%",
      avgOrderValue: "$6,295",
      refundsTotal: "$58,630",
    }

  const statusChipStyles = (status: string) => {
    if (status === "Released") {
      return { bg: "#dcfce7", color: "#15803d" }
    }
    if (status === "Pending") {
      return { bg: "#fef9c3", color: "#a16207" }
    }
    return { bg: "#fee2e2", color: "#b91c1c" } // Under Review / Failed
  }

  const disputeColor = (flag: string) =>
    flag === "Yes" ? "#b91c1c" : "#16a34a"

  const currency = (v: number) =>
    v.toLocaleString("en-US", { style: "currency", currency: "USD" })

  return (
    <>
      {/* HEADER + EXPORT */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
          Financial &amp; Revenue
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Select
            size="small"
            value={period}
            onChange={(e) =>
              setPeriod(e.target.value as "mtd" | "qtd" | "ytd")
            }
            sx={{ fontSize: 13, height: 32 }}
          >
            <MenuItem value="mtd">MTD</MenuItem>
            <MenuItem value="qtd">QTD</MenuItem>
            <MenuItem value="ytd">YTD</MenuItem>
          </Select>

          <Button
            variant="contained"
            size="small"
            startIcon={<DownloadOutlinedIcon />}
            onClick={handleExport}
            sx={{
              textTransform: "none",
              borderRadius: 999,
              px: 2.5,
              boxShadow: "none",
              "&:hover": { boxShadow: "none" },
            }}
          >
            Export CSV
          </Button>
        </Box>
      </Box>

      {/* SUMMARY CARDS */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          flexWrap: "wrap",
          gap: 2,
          mb: 2,
        }}
      >
        {summaryCards.map((card) => (
          <Box
            key={card.title}
            sx={{
              flex: "1 1 220px",
              display: "flex",
              flexDirection: "column",
              gap: 0.5,
              bgcolor: "#ffffff",
              borderRadius: 2,
              border: "1px solid #e5e7eb",
              p: 1.5,
            }}
          >
            <Typography
              variant="caption"
              sx={{ textTransform: "uppercase", color: "#6b7280" }}
            >
              {card.title}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {card.value}
            </Typography>
            <Typography variant="caption" sx={{ color: "#9ca3af" }}>
              {card.hint}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* PLATFORM COMMISSION EARNED (AREA / LINE) */}
      <Box
        sx={{
          mb: 2,
          bgcolor: "#ffffff",
          borderRadius: 2,
          border: "1px solid #e5e7eb",
          p: 2,
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
          Platform Commission Earned
        </Typography>
        <Typography variant="caption" sx={{ color: "#6b7280", mb: 1.5 }}>
          Monthly commission accrued across all projects
        </Typography>

        <LineChart
          xAxis={[{ scaleType: "point", data: months }]}
          series={[
            {
              data: commissionSeries,
              label: "Commission",
              color: "#6366f1",
              area: true,
            },
          ]}
          height={260}
          margin={{ top: 20, right: 20, bottom: 40, left: 50 }}
          sx={{
            "& .MuiLineElement-root": { strokeWidth: 2 },
            "& .MuiMarkElement-root": { r: 3 },
            "& .MuiAreaElement-root": { fillOpacity: 0.16 },
          }}
        />
      </Box>

      {/* UNIT VOLUME */}
      <Box
        sx={{
          mb: 2,
          bgcolor: "#ffffff",
          borderRadius: 2,
          border: "1px solid #e5e7eb",
          p: 2,
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
          Unit Transaction Volume
        </Typography>
        <Typography variant="caption" sx={{ color: "#6b7280", mb: 1.5 }}>
          Number of successful transactions per month
        </Typography>

        <BarChart
          xAxis={[
            {
              scaleType: "band",
              data: months,
            },
          ]}
          series={[
            {
              data: unitVolume,
              color: "#22c55e",
            },
          ]}
          height={260}
          margin={{ top: 20, right: 20, bottom: 40, left: 40 }}
          sx={{
            "& .MuiBarElement-root": { borderRadius: 4 },
          }}
        />
      </Box>

      {/* PAYOUT SHARE + QUALITY FEES */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          mb: 2,
        }}
      >
        {/* Seller Payouts Share (PIE) */}
        {/* <Box
          sx={{
            flex: 1,
            bgcolor: "#ffffff",
            borderRadius: 2,
            border: "1px solid #e5e7eb",
            p: 2,
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
            Seller Payouts Share
          </Typography>
          <Typography variant="caption" sx={{ color: "#6b7280", mb: 1.5 }}>
            Overall distribution of platform value
          </Typography>

          <PieChart
            series={[
              {
                data: payoutShare,
                innerRadius: 40,
                outerRadius: 80,
              },
            ]}
            height={220}
            slotProps={{
              legend: {
                direction: "column",
                position: { vertical: "middle", horizontal: "right" },
              },
            }}
          />
        </Box> */}

        {/* Quality‑based Fee Uplift (LINE) */}
        <Box
          sx={{
            flex: 1,
            bgcolor: "#ffffff",
            borderRadius: 2,
            border: "1px solid #e5e7eb",
            p: 2,
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
            Quality Score‑Based Fees
          </Typography>
          <Typography variant="caption" sx={{ color: "#6b7280", mb: 1.5 }}>
            Additional fee component from high‑quality projects
          </Typography>

          <LineChart
            xAxis={[{ scaleType: "point", data: months }]}
            series={[
              {
                data: qualityFee,
                label: "Quality fees",
                color: "#0ea5e9",
              },
            ]}
            height={220}
            margin={{ top: 20, right: 20, bottom: 40, left: 45 }}
            sx={{
              "& .MuiLineElement-root": { strokeWidth: 2 },
              "& .MuiMarkElement-root": { r: 3 },
            }}
          />
        </Box>
      </Box>

      {/* REFUNDS & DISPUTES */}
      <Box
        sx={{
          mb: 2,
          bgcolor: "#ffffff",
          borderRadius: 2,
          border: "1px solid #e5e7eb",
          p: 2,
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
          Refunds &amp; Disputes
        </Typography>
        <Typography variant="caption" sx={{ color: "#6b7280", mb: 1.5 }}>
          Monthly value of refunds processed and disputes raised
        </Typography>

        <BarChart
          xAxis={[
            {
              scaleType: "band",
              data: refundMonths,
            },
          ]}
          series={[
            {
              data: refunds,
              label: "Refunds",
              color: "#ef4444",
            },
            {
              data: disputes,
              label: "Disputes",
              color: "#22c55e",
            },
          ]}
          height={260}
          margin={{ top: 20, right: 20, bottom: 40, left: 50 }}
          sx={{
            "& .MuiBarElement-root": { borderRadius: 4 },
          }}
        />
      </Box>

      {/* REVENUE BY CATEGORY */}
      <Box
        sx={{
          mb: 2,
          bgcolor: "#ffffff",
          borderRadius: 2,
          border: "1px solid #e5e7eb",
          p: 2,
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
          Revenue by Highest Category
        </Typography>
        <Typography variant="caption" sx={{ color: "#6b7280", mb: 1.5 }}>
          Top earning project categories (released value)
        </Typography>

        <BarChart
          xAxis={[
            {
              scaleType: "band",
              data: revCategories,
            },
          ]}
          series={[
            {
              data: revByCategory,
              color: "#4f46e5",
            },
          ]}
          height={260}
          margin={{ top: 20, right: 20, bottom: 60, left: 60 }}
          sx={{
            "& .MuiBarElement-root": { borderRadius: 4 },
            "& .MuiChartsAxis-tickLabel": { fontSize: 11 },
          }}
        />
      </Box>

      {/* RECENT HIGH‑VALUE TRANSACTIONS */}
      <Box
        sx={{
          mb: 2,
          bgcolor: "#ffffff",
          borderRadius: 2,
          border: "1px solid #e5e7eb",
          p: 2,
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
          Recent High‑Value Transactions
        </Typography>
        <Typography variant="caption" sx={{ color: "#6b7280", mb: 1.5 }}>
          Latest large releases and their financial breakdown
        </Typography>

        {/* header */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            borderBottom: "1px solid #e5e7eb",
            pb: 1,
            mb: 0.5,
          }}
        >
          <Typography sx={{ flex: 1.2 }} variant="caption" color="#6b7280">
            Txn ID
          </Typography>
          <Typography sx={{ flex: 2 }} variant="caption" color="#6b7280">
            Project
          </Typography>
          <Typography sx={{ flex: 1.6 }} variant="caption" color="#6b7280">
            Client
          </Typography>
          <Typography sx={{ flex: 1.6 }} variant="caption" color="#6b7280">
            Seller
          </Typography>
          <Typography sx={{ flex: 1 }} variant="caption" color="#6b7280">
            Status
          </Typography>
          <Typography sx={{ flex: 1.1 }} variant="caption" color="#6b7280">
            Amount
          </Typography>
          <Typography sx={{ flex: 1.1 }} variant="caption" color="#6b7280">
            Commission
          </Typography>
          <Typography sx={{ flex: 1.1 }} variant="caption" color="#6b7280">
            Payout
          </Typography>
          <Typography sx={{ flex: 0.9 }} variant="caption" color="#6b7280">
            Dispute
          </Typography>
          <Typography sx={{ flex: 1.1 }} variant="caption" color="#6b7280">
            Date
          </Typography>
        </Box>

        {recentTx.map((t: any, idx: number) => {
          const { bg, color } = statusChipStyles(t.status)
          return (
            <Box
              key={t.id}
              sx={{
                display: "flex",
                flexDirection: "row",
                py: 0.9,
                borderBottom:
                  idx === recentTx.length - 1
                    ? "none"
                    : "1px solid #f3f4f6",
              }}
            >
              <Typography sx={{ flex: 1.2 }} variant="body2">
                {t.id}
              </Typography>
              <Typography sx={{ flex: 2 }} variant="body2">
                {t.project}
              </Typography>
              <Typography sx={{ flex: 1.6 }} variant="body2">
                {t.client}
              </Typography>
              <Typography sx={{ flex: 1.6 }} variant="body2">
                {t.seller}
              </Typography>
              <Box sx={{ flex: 1 }}>
                <Chip
                  label={t.status}
                  size="small"
                  sx={{
                    backgroundColor: bg,
                    color,
                    fontWeight: 600,
                    borderRadius: 999,
                    fontSize: "0.7rem",
                  }}
                />
              </Box>
              <Typography sx={{ flex: 1.1 }} variant="body2">
                {currency(t.amount)}
              </Typography>
              <Typography sx={{ flex: 1.1 }} variant="body2" color="#6366f1">
                {currency(t.commission)}
              </Typography>
              <Typography sx={{ flex: 1.1 }} variant="body2" color="#16a34a">
                {currency(t.payout)}
              </Typography>
              <Typography
                sx={{ flex: 0.9 }}
                variant="body2"
                color={disputeColor(t.dispute)}
              >
                {t.dispute}
              </Typography>
              <Typography sx={{ flex: 1.1 }} variant="body2">
                {t.date}
              </Typography>
            </Box>
          )
        })}
      </Box>

      {/* MONTHLY SUMMARY SNAPSHOT */}
      <Box
        sx={{
          mb: 2,
          bgcolor: "#eff6ff",
          borderRadius: 2,
          border: "1px solid #bfdbfe",
          p: 2,
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
          Monthly Revenue Snapshot (last 30 days)
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box sx={{ flex: "1 1 220px" }}>
            <Typography variant="caption" color="#6b7280">
              Gross Marketplace Volume (GMV)
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {monthlySummary.gmv}
            </Typography>
          </Box>

          <Box sx={{ flex: "1 1 220px" }}>
            <Typography variant="caption" color="#6b7280">
              Released Value
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {monthlySummary.releasedValue}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: monthlySummary.delta.startsWith("-")
                  ? "#dc2626"
                  : "#16a34a",
              }}
            >
              {monthlySummary.delta} vs last period
            </Typography>
          </Box>

          <Box sx={{ flex: "1 1 220px" }}>
            <Typography variant="caption" color="#6b7280">
              Avg Commission Rate
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {monthlySummary.commissionRate}
            </Typography>
          </Box>

          <Box sx={{ flex: "1 1 220px" }}>
            <Typography variant="caption" color="#6b7280">
              Completed Orders
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {monthlySummary.completedOrders}
            </Typography>
          </Box>

          <Box sx={{ flex: "1 1 220px" }}>
            <Typography variant="caption" color="#6b7280">
              Dispute Rate
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {monthlySummary.disputeRate}
            </Typography>
          </Box>

          <Box sx={{ flex: "1 1 220px" }}>
            <Typography variant="caption" color="#6b7280">
              Avg Order Value
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {monthlySummary.avgOrderValue}
            </Typography>
          </Box>

          <Box sx={{ flex: "1 1 220px" }}>
            <Typography variant="caption" color="#6b7280">
              Refunds Processed
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {monthlySummary.refundsTotal}
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default Reports
