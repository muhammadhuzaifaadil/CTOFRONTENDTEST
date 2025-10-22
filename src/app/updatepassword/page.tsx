"use client"
import react,{useContext, useState} from "react";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  FormGroup,
  Typography,
  useTheme,
} from "@mui/material";
import CustomTextField from "../components/CustomTextField";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LockPersonSharpIcon from '@mui/icons-material/LockPersonSharp';
import { AuthContext } from "@/app/contexts/AuthContext";
import passwordUpdateService  from "@/api/userService";
import { useRouter } from "next/navigation";
import { LanguageContext } from "../contexts/LanguageContext";
import { useTranslations } from "next-intl";
const updatePassword :React.FC = () =>{
    const theme = useTheme();
    const router = useRouter();
  const { isAuthenticated, user } = useContext(AuthContext);
  const {locale,isArabic,toggleLanguage} = useContext(LanguageContext)
  const t = useTranslations("UpdatePassword")
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Redirect if not logged in
  if (!isAuthenticated&&!user) {
    router.push("/login");
    return null;
  }
    const arr = [
        `${t("firstrequirement")}`,
        `${t("secondrequirement")}`,
        `${t("thirdrequirement")}`,
        `${t("fourthrequirement")}`,
        `${t("fifthrequirement")}`
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMessage(null);
console.log("all passwords:")
console.log("current pass",form.currentPassword)
console.log("new pass",form.newPassword)
console.log("conifrm new pass",form.confirmNewPassword)
    try {
      const res = await passwordUpdateService(form);
      <Alert variant="filled" severity="success">
      You have successfully updated the password.
    </Alert>
      setMessage({ type: "success", text: res });
      setForm({ currentPassword: "", newPassword: "", confirmNewPassword: "" });
      if (user?.role === "buyer") router.push("/dashboard/buyer");
    else if (user?.role === "seller") router.push("/dashboard/seller");
    else router.push("/dashboard/admin");
      
    } catch (error: any) {
      <Alert variant="filled" severity="error">
      Password cannot be updated.
    </Alert>
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to update password",
      });
    } finally {
      setLoading(false);
    }
  };

    return (
        <Box sx={{
        minHeight: "100vh",
        width: "100%",
        maxWidth: "100%",
        overflowX: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background:theme.palette.primary.main,
        py: { xs: 2, sm: 4, md: 6 },
        px: { xs: 2, sm: 3 },
        }}
        >
            {/* Back Button */}
            <Box sx={{display:"flex", width:"50%", justifyContent:"flex-start"}}>
                        <Button startIcon={<ArrowBackIcon />} onClick={()=>router.push('/dashboard/buyer')} sx={{textTransform:"none", color:"white", fontSize:"16px", fontWeight:"600", marginTop:"20px",display:"flex",justifyContent:"flex-start"}}>Back to Dashboard</Button>
            

            {/* arabic english toggle */}
                          <Button
                            variant="outlined"
                            onClick={toggleLanguage}
                            sx={{ position:'absolute', ml:"685px",mt:1,textTransform: "none",
                        color: "white",
                        fontSize: "16px",
                        fontWeight: "600",
                        marginTop: "20px",
                        border:"ActiveBorder" }}
                          >
                            {locale === "en" ? "عربي" : "English"}
                          </Button>
            </Box>
            

            {/* form at center */}
            <Container
                                maxWidth="md"
                                sx={{
                                  backgroundColor: theme.palette.background.default,
                                  borderRadius: 3,
                                  width:"50%",
                                  p: { xs: 3, sm: 4, md: 6 },
                                  boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
                                }}
                              >
                {/* first half of form */}
            <Box sx={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",gap:1}}>
                                <LockPersonSharpIcon sx={{
                                    fontSize:"50px",
                                    height: 60,
                                    width: 60,
                                    backgroundColor:theme.palette.primary.main,
                                    color:"white",
                                    borderRadius: "60%",
                                    border: `2px solid ${theme.palette.primary.main}`,
                                    padding: "12px"
                                    }} />
                                <Typography variant="subtitle2" sx={{color:theme.palette.primary.main}}>{t("Header")}</Typography>
                                <Typography variant="subtitle1">{t("Header2")}</Typography>
                                <Typography variant="body1" sx={{color:"#6c757d", textAlign:"center"}}>{t("Content")}</Typography>
                            </Box>


                {/* Second Half of form */}
            <Box sx={{gap:1, display:"flex", flexDirection:"column", marginTop:"20px"}}>
            <CustomTextField 
            label={`${t("CurrentPassLabel")}`}
            fieldName="currentPassword" 
            placeholder={`${t("CurrentPassPlaceholder")}`} 
            onChange={handleChange} 
            isArabic={isArabic}
            value={form.currentPassword} 
            required type="password" 
            fullWidth />
            <CustomTextField 
            label={`${t("NewPasswordLabel")}`} 
            fieldName="newPassword" 
            placeholder={`${t("NewPasswordPlaceholder")}`}  
            type="password" 
            onChange={handleChange} 
            value={form.newPassword} 
            isArabic={isArabic}
            required 
            fullWidth />
            <CustomTextField 
            label={`${t("ConfirmNewPasswordLabel")}`} 
            fieldName="confirmNewPassword" 
            placeholder={`${t("ConfirmNewPasswordPlaceholder")}`} 
            onChange={handleChange} 
            isArabic={isArabic}
            value={form.confirmNewPassword} 
            confirmValue={form.newPassword}
            required type="password"
             fullWidth />            
                        <Box sx ={{display:"flex",flexDirection:"column", alignItems:"start", justifyContent:"flex-start", marginTop:"10px",backgroundColor:"lightgray", borderRadius:2}}>
                         <Typography variant="body1" sx={{marginLeft:2,marginTop:0.5}}>{t("PasswordRequirementsHeader")}</Typography>
                         <Box sx={{display: 'flex', flexDirection: 'column', gap: 0.5, mt: 1,marginLeft:2}}>
                             {arr.map((req, idx) => (
                                 <Typography key={idx} variant="body2" sx={{color: "#6c757d", display: 'flex', alignItems: 'flex-start'}}>
                                     {"\u2022\u00A0"}{req}
                                 </Typography>
                             ))}
                         </Box>
                        </Box>

            </Box>


                {/* Third Half of Form */}

                <Box sx={{display:"flex",flexDirection:"row", justifyContent:"center", alignItems:"center", gap:1 }}>
                <Button variant="contained" onClick={handleSubmit} disabled={loading} fullWidth sx={{ backgroundColor:theme.palette.primary.main, textTransform: "none", fontSize: "16px", fontWeight: "600", padding: "10px 0", borderRadius:4, marginTop:"20px" }}>Update Password</Button>
                <Button variant="outlined" fullWidth href="/" sx={{ color:"black", textTransform: "none", fontSize: "16px", fontWeight: "600", padding: "10px 0", borderRadius:4, marginTop:"10px", borderColor:"#ced4da",backgroundColor:"lightgray" }}>Cancel</Button>

                </Box>



                              </Container>
        </Box>

    );
}
export default updatePassword;