"use client"
import UserTable from "@/app/components/UserTable";
import { Stack, Button, Box } from "@mui/material"
import { useRouter } from "next/navigation";
import { useState } from "react";

const ViewUsers:React.FC=()=>{
  const [type, setType] = useState<any>("");
  const router = useRouter();
    return(
        <Box display={"flex"} flexDirection={"column"}>
        <Box display={"flex"} justifyContent={"center"} sx={{gap:2,mt:2}}>
        <Button
          variant={type === "buyer" ? "contained" : "outlined"}
          onClick={() => setType("buyer")}
        >
          View Buyers
        </Button>
        <Button
          variant={type === "seller" ? "contained" : "outlined"}
          onClick={() => setType("seller")}
        >
          View Sellers
        </Button>
      </Box>
    
    <Box display={"flex"} flexDirection={"column"}>
        <Box display={"flex"} flexDirection={"row"} justifyContent={"flex-start"}>
        <Button sx={{color:"0015459FD"}} onClick={()=>router.push("/dashboard/admin")}>Back</Button>
      </Box>
      <UserTable type={type} />
      </Box>
      </Box>
    )
}
export default ViewUsers;