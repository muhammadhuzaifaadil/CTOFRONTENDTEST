// "use client"
// import {useState} from 'react';
// import DashBoardLayout from "@/app/layouts/DashboardLayout";
// import { Box, Button, Container, Divider, TextField, Typography, useTheme } from "@mui/material";
// import { useRouter } from "next/navigation";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined"
// import CustomTextField from "@/app/components/CustomTextField";
// import { useAuth } from "@/hooks/useAuth";
// import CategorySelect from '@/app/components/CategorySelect';

// const ProfileManagement:React.FC = ()=>{
//     const theme = useTheme()
//     const router = useRouter()
//     const { user, isAuthenticated, logout } = useAuth();
//     const [selectedCategory, setSelectedCategory] = useState("");
    
//      // Form state
//   type FormDataType = {
//   firstName: string;
//   middleName: string;
//   lastName: string;
//   email: string;
//   phoneCode: string;
//   phoneNumber: string;
//   phone: string;
//   gender: string;
//   address: string;
//   city: string;
//   country: string;
//   password: string;
//   confirmPassword: string;
//   experience: string;
//   companyName: string;
//   companyUrl: string;
//   category: string;
//   [key: string]: string; // <-- Add this line
// };
//      const [formData, setFormData] = useState<FormDataType>({
//         firstName: "",
//         middleName: "",
//         lastName: "",
//         email: "",
//         phoneCode: "",
//         phoneNumber: "",
//         phone: "",
//         gender: "",
//         address: "",
//         city: "",
//         country: "",
//         password: "",
//         confirmPassword: "",
//         experience: "",
//         companyName: "",
//         companyUrl: "",
//         category: "",
//       });

//       const handleFieldChange =
//       (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//         const value = e.target.value;
//         setFormData((prev) => ({ ...prev, [field]: value }));
//       };
//     return(
//         <DashBoardLayout>
            
//         <Box
//         sx={{
//           minHeight: "100vh",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "flex-start",
//           background: "white",
//           mt:3,
//           py: { xs: 2, sm: 4, md: 6 },
//         }}
//       >
//         {/* Back Button */}
//         <Box
//           sx={{
//             display: "flex",
//             width: "75%", // Wider alignment for main container
//             justifyContent: "flex-start",
//             mb: 2,
//           }}
//         >
//           <Button
//             startIcon={<ArrowBackIcon />}
//             onClick={() => router.push("/dashboard/seller")}
//             sx={{
//               textTransform: "none",
//               fontSize: "16px",
//               fontWeight: "600",
//               color: "black",
//             }}
//           >
//             Back to Dashboard
//           </Button>
//         </Box>

//         {/* Container */}
//             <Container
//           maxWidth={false}
//           sx={{
//             backgroundColor: theme.palette.background.default,
//             borderRadius: 3,
//             width: "1152px", // Larger width
//             height: "100%", // Fixed container height
//             p: { xs: 3, sm: 4, md: 5 },
//             boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             justifyContent: "flex-start",
//             transition: "0.3s ease",
//           }}
//         >

//           {/* Logo Headers */}
//           <Box sx={{display:"flex", flexDirection:'column',alignItems:'center',justifyContent:'center',gap:1}}>

                
//                  <AccountCircleOutlinedIcon
//       sx={{
//         height: 60,
//         width: 60,
//         color: "white", // icon color
//         backgroundColor: theme.palette.primary.main, // fill background with theme color
//         borderRadius: "60%", // make it circular
//         border: `2px solid ${theme.palette.primary.main}`, // solid border matching theme
//         padding: "12px", // centers the svg nicely
//       }}
//     /> 
//         <Typography variant="subtitle2" sx={{color:theme.palette.primary.main}}>
//             Profile Management
//           </Typography>
//           <Typography variant="subtitle1">
//             View Profile
//           </Typography>
                

//           </Box>


//           {/* Account Info */}

//        <Box sx={{gap:1, display:"flex",flexDirection:"column", width:"100%"}}>
//                  {/* Personal Information */}
//                  <Box>
//                <Typography
//                  variant="h6"
//                  sx={{
//                    fontWeight: "bold",
//                    color: theme.palette.primary.main,
//                    textAlign: "left",
//                  }}
//                >
//                  Account Information
//                </Typography>
//              </Box>
       
//              {/* Blue Divider */}
//              <Box>
//                <Divider
//                  sx={{
//                    mt: 1,
//                    borderBottomWidth: 3,
//                    borderColor: theme.palette.primary.main,
//                    opacity: 0.7,
//                    width: "100%",
//                  }}
//                />
//              </Box>
                
//                  {/* Contact Fields */}
//                  <Box
//                    sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", md: "row" } }}
//                  >
//                 <Box sx={{display:"flex",flexDirection:"column",width:"50%"}}>
//                  <Typography sx={{fontWeight:"bold"}}>
//                     Email Address

//                  </Typography>
//                    <TextField
//                      fullWidth
//                      label={`${user?.email}`}
//                      disabled
//                     //  placeholder="johndoe@example.com"
                     
//                     />
//                     <Typography sx={{display:"flex", justifyContent:"flex-end"}}>
//                         Email cannot be changed
//                     </Typography>
//                  </Box>
//                    <Box sx={{display:"flex",flexDirection:"column",width:"50%"}}>
//                  <Typography sx={{fontWeight:"bold"}}>
//                     User Role

//                  </Typography>
//                    <TextField
//                      fullWidth
//                      label={`${user?.role}`}
//                      disabled
//                     //  placeholder="johndoe@example.com"
                     
//                     />
//                     <Typography sx={{display:"flex", justifyContent:"flex-end"}}>
//                         Role cannot be changed
//                     </Typography>
//                  </Box>
             
       
         
                  
//                  </Box>
//                  {/* Address */}
                
//                </Box>

//           {/* Personal Info */}

// <Box sx={{gap:1, display:"flex",flexDirection:"column", width:"100%"}}>
//                  {/* Personal Information */}
//                  <Box>
//                <Typography
//                  variant="h6"
//                  sx={{
//                    fontWeight: "bold",
//                    color: theme.palette.primary.main,
//                    textAlign: "left",
//                  }}
//                >
//                  Personal Information
//                </Typography>
//                  </Box>
       
//              {/* Blue Divider */}
//                 <Box>
//                <Divider
//                  sx={{
//                    mt: 1,
//                    borderBottomWidth: 3,
//                    borderColor: theme.palette.primary.main,
//                    opacity: 0.7,
//                    width: "100%",
//                  }}
//                />
//                 </Box>
                
//                  {/* Contact Fields */}
//                  <Box
//                    sx={{ display: "flex", gap: 2, width:"100%", flexDirection: "column" }}
//                  >
//                    {/* Name Fields */}
//                            <Box
//                              sx={{ display: "flex", gap: 1,mt:1,width:"100%",justifyContent:"space-between", flexDirection: "row" }}
//                            >
//                              <CustomTextField
//                             //    sx={{display:"flex",width:"100%"}}
//                                fullWidth
//                                label="First Name"
//                                placeholder="John"
//                                required
//                                minChar={3}
//                                maxChar={50}
//                                value={formData.firstName}
//                                onChange={handleFieldChange("firstName")}
//                              />
//                              <CustomTextField
//                             //    sx={{display:"flex",width:"100%"}}
//                             fullWidth
//                                label="Middle Name"
//                                placeholder="Optional"
//                                minChar={3}
//                                maxChar={50}
//                                value={formData.middleName}
//                                onChange={handleFieldChange("middleName")}
//                              />
//                              <CustomTextField
//                             //    sx={{display:"flex",width:"100%"}}
//                             fullWidth
//                                label="Last Name"
//                                placeholder="Doe"
//                                required
//                                minChar={3}
//                                maxChar={50}
//                                value={formData.lastName}
//                                onChange={handleFieldChange("lastName")}
//                              />
//                             </Box>
                   
//                  {/* Phone Number */}
//                     <Box sx={{ display: "flex", gap: 1,mt:1,width:"100%",justifyContent:"space-between", flexDirection: "row" }}>
//                     <CustomTextField
//     sx={{width:"50%"}}
//     label="Phone Code"
//     required
//     isPhoneCode
//     value={formData.phoneCode}
//     onChange={handleFieldChange("phoneCode")}
//   />

//   <CustomTextField
//     fullWidth
//     label="Phone Number"
//     required
//     phoneFormat
//     placeholder="512345678"
//     value={formData.phoneNumber}
//     onChange={handleFieldChange("phoneNumber")}
//   />
//                 </Box>                  
//                 </Box>
                
//                </Box>


//           {/* Address */}
// <Box sx={{gap:1, mt:1, display:"flex",flexDirection:"column", width:"100%"}}>

// {/* Address Information */}
//                  <Box>
//                <Typography
//                  variant="h6"
//                  sx={{
//                    fontWeight: "bold",
//                    color: theme.palette.primary.main,
//                    textAlign: "left",
//                  }}
//                >
//                  Address
//                </Typography>
//                  </Box>
       
//              {/* Blue Divider */}
//                 <Box>
//                <Divider
//                  sx={{
//                    mt: 1,
//                    borderBottomWidth: 3,
//                    borderColor: theme.palette.primary.main,
//                    opacity: 0.7,
//                    width: "100%",
//                  }}
//                />
//                 </Box>


//                   <Box
//                    sx={{ display: "flex", gap: 2, width:"100%", flexDirection: "column" }}
//                  >
//                    {/* Surface Address */}
//                            <Box
//                              sx={{ display: "flex", gap: 1,mt:1,width:"100%", flexDirection: "row" }}
//                            >
//                              <CustomTextField
//                             //    sx={{display:"flex",width:"100%"}}
//                                fullWidth
//                                label="Surface Address"
//                                required
//                                minChar={3}
//                                maxChar={50}
//                                value={formData.address}
//                                onChange={handleFieldChange("address")

//                                }
//                              />
                            
//                             </Box>
//                    {/* country city */}
//                    <Box sx={{display:'flex', flexDirection:'row', width:'100%', gap:1,borderRadius:4, justifyContent:'space-between'}}>
//                                <CustomTextField
//               fullWidth
//               label="City"
//               placeholder = "Riyadh"
//               required
//               minChar={5}
//               maxChar={50}
//               unique
//               value={formData.city}
//               onChange={handleFieldChange("city")}
//             />
//              <CustomTextField
//     fullWidth
//     label="Country"
//     isCountry
//     placeholder="Select Country"
//     value={formData.country}
//     onChange={handleFieldChange("country")}
//   />



//                    </Box>
                                 
//                 </Box>




// </Box>

//           {/* Business Info */}
// <Box sx={{gap:1, mt:1, display:"flex",flexDirection:"column", width:"100%"}}>

// {/* Business Information */}
//                  <Box>
//                <Typography
//                  variant="h6"
//                  sx={{
//                    fontWeight: "bold",
//                    color: theme.palette.primary.main,
//                    textAlign: "left",
//                  }}
//                >
//                  Business Information
//                </Typography>
//                  </Box>
       
//              {/* Blue Divider */}
//                 <Box>
//                <Divider
//                  sx={{
//                    mt: 1,
//                    borderBottomWidth: 3,
//                    borderColor: theme.palette.primary.main,
//                    opacity: 0.7,
//                    width: "100%",
//                  }}
//                />
//                 </Box>

//                  {/* fields */}
//                    <Box
//                    sx={{ display: "flex", gap: 2, width:"100%", flexDirection: "column" }}
//                  >
//                      <Box sx={{ display: "flex", gap: 1,mt:1,width:"100%",justifyContent:"space-between", flexDirection: "row" }}>

//             <CategorySelect label="Business Category" value={selectedCategory} onChange={setSelectedCategory} />


// <CustomTextField
//               fullWidth
//               label="Experience in Years"
//               placeholder="5.0"
//               value={formData.experience}
//               onChange={handleFieldChange("experience")}
//             />

//                            </Box>

//                  <Box sx={{ display: "flex", gap: 1,mt:1,width:"100%",justifyContent:"space-between", flexDirection: "row" }}>

//             <CustomTextField
//               fullWidth
//               label="Company Name"
//               placeholder="Your Company Ltd."
//               required
//               minChar={3}
//               maxChar={50}
//               value={formData.companyName}
//               onChange={handleFieldChange("companyName")}
//             />
//             <CustomTextField
//               fullWidth
//               label="Company Domain URL"
//               placeholder="https://example.com"
//               value={formData.companyUrl}
//               onChange={handleFieldChange("companyUrl")}
//             />

//                            </Box>


//                  </Box>

// </Box>


//           {/* Button */}

//                  <Box sx={{display:"flex",justifyContent:'center',alignItems:"center", width:"100%",mt:2}}>

//                     <Button sx={{color:"white",backgroundColor:theme.palette.primary.main, width:"100%",borderRadius:3,py:1.1}}>
//                         Edit Profile
//                     </Button>
//                  </Box>
            
//         </Container>


        
//       </Box>

//         </DashBoardLayout>
//     )
// };

// export default ProfileManagement;


"use client"
import {useContext, useState} from 'react';
import DashBoardLayout from "@/app/layouts/DashboardLayout";
import { Box, Button, Container, Divider, TextField, Typography, useTheme } from "@mui/material";
import { useRouter } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined"
import CustomTextField from "@/app/components/CustomTextField";
import { useAuth } from "@/hooks/useAuth";
import CategorySelect from '@/app/components/CategorySelect';
import apiClient from '@/api/apiClient';
import { LanguageContext } from '@/app/contexts/LanguageContext';
import { useTranslations } from 'next-intl';

const ProfileManagement:React.FC = ()=>{
    const theme = useTheme()
    const router = useRouter()
    const { user, isAuthenticated, logout } = useAuth();
    const [selectedCategory, setSelectedCategory] = useState("");
    const {isArabic,locale} = useContext(LanguageContext)
    const t = useTranslations("ProfileManagement")
     // Form state
  type FormDataType = {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phoneCode: string;
  phoneNumber: string;
  phone: string;
  gender: string;
  address: string;
  city: string;
  country: string;
  password: string;
  confirmPassword: string;
  experience: string;
  companyName: string;
  companyUrl: string;
  category: string;
  [key: string]: string; // <-- Add this line
};
     const [formData, setFormData] = useState<FormDataType>({
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        phoneCode: "",
        phoneNumber: "",
        phone: "",
        gender: "",
        address: "",
        city: "",
        country: "",
        password: "",
        confirmPassword: "",
        experience: "",
        companyName: "",
        companyUrl: "",
        category: "",
      });

      const handleFieldChange =
      (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.target.value;
        setFormData((prev) => ({ ...prev, [field]: value }));
      };


  
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    // Construct raw payload
    const rawPayload = {
      FirstName: formData.firstName,
      MiddleName: formData.middleName,
      LastName: formData.lastName,
      email: user?.email, // not editable but sent
      PhoneCode: formData.phoneCode,
      PhoneNumber: formData.phoneNumber,
      Address: formData.address,
      City: formData.city,
      Country: formData.country,
      experience: formData.experience,
      CompanyName: formData.companyName,
      websiteUrl: formData.companyUrl,
      businessCategory: selectedCategory,
    };

    // ✅ Remove empty ("") or undefined/null fields
    const payload = Object.fromEntries(
      Object.entries(rawPayload).filter(
        ([, value]) => value !== "" && value !== undefined && value !== null
      )
    );

    console.log("📤 Submitting cleaned payload:", payload);

    const res = await apiClient.put(`/users/${user?.id}`, payload);

    if (res.data?.Success) {
      alert("✅ Profile updated successfully!");
    } else {
      alert("⚠️ Failed to update profile. Please try again.");
    }
  } catch (err: any) {
    console.error("❌ Error updating profile:", err);
    alert("Error updating profile. Check console for details.");
  }
};


    return(
        <DashBoardLayout>
            
        <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          background: "white",
          mt:3,
          py: { xs: 2, sm: 4, md: 6 },
        }}
      >
        {/* Back Button */}
        <Box
          sx={{
            display: "flex",
            width: "75%", // Wider alignment for main container
            justifyContent: "flex-start",
            mb: 2,
          }}
        >
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => router.push("/dashboard/seller")}
            sx={{
              textTransform: "none",
              fontSize: "16px",
              fontWeight: "600",
              color: "black",
            }}
          >
            {t("BackButton")}
          </Button>
        </Box>

        {/* Container */}
            <Container
          maxWidth={false}
          sx={{
            backgroundColor: theme.palette.background.default,
            borderRadius: 3,
            width: "1152px", // Larger width
            height: "100%", // Fixed container height
            p: { xs: 3, sm: 4, md: 5 },
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            transition: "0.3s ease",
          }}
        >

          {/* Logo Headers */}
          <Box sx={{display:"flex", flexDirection:'column',alignItems:'center',justifyContent:'center',gap:1}}>

                
                 <AccountCircleOutlinedIcon
      sx={{
        height: 60,
        width: 60,
        color: "white", // icon color
        backgroundColor: theme.palette.primary.main, // fill background with theme color
        borderRadius: "60%", // make it circular
        border: `2px solid ${theme.palette.primary.main}`, // solid border matching theme
        padding: "12px", // centers the svg nicely
      }}
    /> 
        <Typography variant="subtitle2" sx={{color:theme.palette.primary.main}}>
            {t("Header1")}
          </Typography>
          <Typography variant="subtitle1">
            {t("Header2")}
          </Typography>
                

          </Box>


          {/* Account Info */}

       <Box sx={{gap:1, display:"flex",flexDirection:"column", width:"100%"}}>
                 {/* Personal Information */}
                 <Box>
               <Typography
                 variant="h6"
                 sx={{
                   fontWeight: "bold",
                   color: theme.palette.primary.main,
                   textAlign: "left",
                 }}
               >
                 {t("AccountInfoHeader")}
               </Typography>
             </Box>
       
             {/* Blue Divider */}
             <Box>
               <Divider
                 sx={{
                   mt: 1,
                   borderBottomWidth: 3,
                   borderColor: theme.palette.primary.main,
                   opacity: 0.7,
                   width: "100%",
                 }}
               />
             </Box>
                
                 {/* Contact Fields */}
                 <Box
                   sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", md: "row" } }}
                 >
                <Box sx={{display:"flex",flexDirection:"column",width:"50%"}}>
                 <Typography sx={{fontWeight:"bold"}} display={"flex"} justifyContent={isArabic?"flex-end":"flex-start"}>
                    {t("AccountEmail")}

                 </Typography>
                   <TextField
                     fullWidth
                     label={`${user?.email}`}
                     disabled
                    //  placeholder="johndoe@example.com"
                     
                    />
                    <Typography sx={{display:"flex", justifyContent:isArabic?"flex-start":"flex-end"}}>
                        {t("AccountEmailCheck")}
                    </Typography>
                 </Box>
                   <Box sx={{display:"flex",flexDirection:"column",width:"50%"}}>
                 <Typography sx={{fontWeight:"bold"}} display={"flex"} justifyContent={isArabic?"flex-end":"flex-start"}>
                    {t("AccountRole")}

                 </Typography>
                   <TextField
                     fullWidth
                     label={`${user?.role}`}
                     disabled
                    //  placeholder="johndoe@example.com"
                     
                    />
                    <Typography sx={{display:"flex", justifyContent:isArabic?"flex-start":"flex-end"}}>
                        {t("AccountRoleCheck")}
                    </Typography>
                 </Box>
             
       
         
                  
                 </Box>
                 {/* Address */}
                
               </Box>

          {/* Personal Info */}

<Box sx={{gap:1, display:"flex",flexDirection:"column", width:"100%"}}>
                 {/* Personal Information */}
                 <Box>
               <Typography
                 variant="h6"
                 sx={{
                   fontWeight: "bold",
                   color: theme.palette.primary.main,
                   textAlign: isArabic?"right":"left",
                 }}
               >
                 {t("PersonalInfoHeader")}
               </Typography>
                 </Box>
       
             {/* Blue Divider */}
                <Box>
               <Divider
                 sx={{
                   mt: 1,
                   borderBottomWidth: 3,
                   borderColor: theme.palette.primary.main,
                   opacity: 0.7,
                   width: "100%",
                 }}
               />
                </Box>
                
                 {/* Contact Fields */}
                 <Box
                   sx={{ display: "flex", gap: 2, width:"100%", flexDirection: "column" }}
                 >
                   {/* Name Fields */}
                           <Box
                             sx={{ display: "flex", gap: 1,mt:1,width:"100%",justifyContent:"space-between", flexDirection: "row" }}
                           >
                             <CustomTextField
                            //    sx={{display:"flex",width:"100%"}}
                               fullWidth
                               label={`${t("PersonalInfoFirstName")}`}
                               placeholder="John"
                               isArabic={isArabic}
                               required
                               minChar={3}
                               maxChar={50}
                               value={formData.firstName}
                               onChange={handleFieldChange("firstName")}
                             />
                             <CustomTextField
                            //    sx={{display:"flex",width:"100%"}}
                            fullWidth
                               label={`${t("PersonalInfoMiddleName")}`}
                               placeholder="Optional"
                               isArabic={isArabic}
                               minChar={3}
                               maxChar={50}
                               value={formData.middleName}
                               onChange={handleFieldChange("middleName")}
                             />
                             <CustomTextField
                            //    sx={{display:"flex",width:"100%"}}
                            fullWidth
                               label={`${t("PersonalInfoLastName")}`}
                               placeholder="Doe"
                               isArabic={isArabic}
                               required
                               minChar={3}
                               maxChar={50}
                               value={formData.lastName}
                               onChange={handleFieldChange("lastName")}
                             />
                            </Box>
                   
                 {/* Phone Number */}
                    <Box sx={{ display: "flex", gap: 1,mt:1,width:"100%",justifyContent:"space-between", flexDirection: "row" }}>
                    <CustomTextField
    sx={{width:"50%"}}
    label={`${t("PersonalInfoPhoneCode")}`}
    isArabic={isArabic}
    required
    isPhoneCode
    value={formData.phoneCode}
    onChange={handleFieldChange("phoneCode")}
  />

  <CustomTextField
    fullWidth
    label={`${t("PersonalInfoPhoneNumber")}`}
    isArabic={isArabic}
    required
    phoneFormat
    placeholder="512345678"
    value={formData.phoneNumber}
    onChange={handleFieldChange("phoneNumber")}
  />
                </Box>                  
                </Box>
                
               </Box>


          {/* Address */}
<Box sx={{gap:1, mt:1, display:"flex",flexDirection:"column", width:"100%"}}>

{/* Address Information */}
                 <Box>
               <Typography
                 variant="h6"
                 sx={{
                   fontWeight: "bold",
                   color: theme.palette.primary.main,
                   textAlign: isArabic?"right":"left",
                 }}
               >
                 {t("AddressHeader")}
               </Typography>
                 </Box>
       
             {/* Blue Divider */}
                <Box>
               <Divider
                 sx={{
                   mt: 1,
                   borderBottomWidth: 3,
                   borderColor: theme.palette.primary.main,
                   opacity: 0.7,
                   width: "100%",
                 }}
               />
                </Box>


                  <Box
                   sx={{ display: "flex", gap: 2, width:"100%", flexDirection: "column" }}
                 >
                   {/* Surface Address */}
                           <Box
                             sx={{ display: "flex", gap: 1,mt:1,width:"100%", flexDirection: "row" }}
                           >
                             <CustomTextField
                            //    sx={{display:"flex",width:"100%"}}
                               fullWidth
                               label={`${t("AddressSurfaceAdd")}`}
                               isArabic={isArabic}
                               required
                               minChar={3}
                               maxChar={50}
                               value={formData.address}
                               onChange={handleFieldChange("address")

                               }
                             />
                            
                            </Box>
                   {/* country city */}
                   <Box sx={{display:'flex', flexDirection:'row', width:'100%', gap:1,borderRadius:4, justifyContent:'space-between'}}>
                               <CustomTextField
              fullWidth
              label={`${t("AddressCity")}`}
              placeholder = "Riyadh"
              isArabic={isArabic}
              required
              minChar={5}
              maxChar={50}
              unique
              value={formData.city}
              onChange={handleFieldChange("city")}
            />
             <CustomTextField
    fullWidth
    label={`${t("AddressCountry")}`}
    isArabic={isArabic}
    isCountry
    placeholder="Select Country"
    value={formData.country}
    onChange={handleFieldChange("country")}
  />



                   </Box>
                                 
                </Box>




</Box>

          {/* Business Info */}
<Box sx={{gap:1, mt:1, display:"flex",flexDirection:"column", width:"100%"}}>

{/* Business Information */}
                 <Box>
               <Typography
                 variant="h6"
                 sx={{
                   fontWeight: "bold",
                   color: theme.palette.primary.main,
                   textAlign: "left",
                 }}
               >
                 {t("BusinessInfoHeader")}
               </Typography>
                 </Box>
       
             {/* Blue Divider */}
                <Box>
               <Divider
                 sx={{
                   mt: 1,
                   borderBottomWidth: 3,
                   borderColor: theme.palette.primary.main,
                   opacity: 0.7,
                   width: "100%",
                 }}
               />
                </Box>

                 {/* fields */}
                   <Box
                   sx={{ display: "flex", gap: 2, width:"100%", flexDirection: "column" }}
                 >
                     <Box sx={{ display: "flex", gap: 1,mt:1,width:"100%",justifyContent:"space-between", flexDirection: "row" }}>

            <CategorySelect label={`${t("BusinessInfoCategory")}`} value={selectedCategory} onChange={setSelectedCategory} />


<CustomTextField
              fullWidth
              label={`${t("BusinessInfoExp")}`}
              isArabic={isArabic}
              placeholder="5.0"
              value={formData.experience}
              onChange={handleFieldChange("experience")}
            />

                           </Box>

                 <Box sx={{ display: "flex", gap: 1,mt:1,width:"100%",justifyContent:"space-between", flexDirection: "row" }}>

            <CustomTextField
              fullWidth
              label={`${t("BusinessInfoCompanyName")}`}
              isArabic={isArabic}
              placeholder="Your Company Ltd."
              required
              minChar={3}
              maxChar={50}
              value={formData.companyName}
              onChange={handleFieldChange("companyName")}
            />
            <CustomTextField
              fullWidth
              label={`${t("BusinessInfoCompanyURL")}`}
              isArabic={isArabic}
              placeholder="https://example.com"
              value={formData.companyUrl}
              onChange={handleFieldChange("companyUrl")}
            />

                           </Box>


                 </Box>

</Box>


          {/* Button */}

                 <Box sx={{display:"flex",justifyContent:'center',alignItems:"center", width:"100%",mt:2}}>

                    <Button onClick={handleSubmit} sx={{color:"white",backgroundColor:theme.palette.primary.main, width:"100%",borderRadius:3,py:1.1}}>
                        {t("EditProfileButton")}
                    </Button>
                 </Box>
            
        </Container>


        
      </Box>

        </DashBoardLayout>
    )
};

export default ProfileManagement;