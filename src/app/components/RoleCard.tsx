
import React from "react";
import { Card, CardContent, CardMedia, Typography, Button, Box } from "@mui/material";
// import { useNavigate } from "react-router-dom";
import theme from '../theme/theme'
import { useRouter } from "next/navigation";
interface RoleCardProps {
  title: string;
  description: string;
  image?: string;
  route: string;
  icon?: React.ReactNode;
}

const RoleCard: React.FC<RoleCardProps> = ({ title, description, image, route, icon }) => {
//   const navigate = useNavigate();
  const router = useRouter();
  return (
    <Card sx={{ backgroundColor: "transparent",display:"flex",justifyContent:"center", alignItems:"center", flexDirection:"column", padding:2, boxShadow:0, borderRadius:3, width:"100%", maxWidth: 345, maxHeight: 400 }}>
      {image && (
        <CardMedia component="img" height="180" image={image} alt={title} />
      )}
      <CardContent>
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" gap={1} mb={1}>
          {/* {icon} */}
          {icon && (
            <Box
              sx={{
                // border: `3px solid ${theme.palette.primary.main}`,
                backgroundColor: theme.palette.primary.main,
                borderRadius: "50%",
                padding: 1.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 64,
                height: 64,
                 "& svg": {
                  color: "#fff !important", // Force icon to appear white
                  stroke: "#fff", // for outlined icons
                  strokeWidth: 0.1,
                },
              }}
            >
              {icon}
            </Box>
          )}
          <Typography variant="h5" gutterBottom>{title}</Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mb: 2 }}>
          {description}
        </Typography>
        <Box textAlign="center">
          <Button variant="contained" sx={{width:"100%"}} onClick={() => router.push(route)}>
            Continue as {title}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RoleCard;
