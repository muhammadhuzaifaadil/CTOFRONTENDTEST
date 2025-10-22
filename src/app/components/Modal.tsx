import * as React from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  Stack,
} from "@mui/material";

interface PaymentData {
  paymentId: string;
  userName: string;
  role: string;
  project: string;
  amount: number;
  status: string;
  date: string;
}

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  action: "Halt" | "Release";
  data: PaymentData | null;
}

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 420,
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
};

export default function PaymentModal({
  open,
  onClose,
  action,
  data,
}: PaymentModalProps) {
  if (!data) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        {action === "Release" ? (
          <>
            <Box sx={{display:"flex", flexDirection:"column",gap:2}}>
            {/* Headers */}
            <Box sx={{display:'flex', flexDirection:'column'}}>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
              Release Payment
            </Typography>
            <Typography variant="caption" sx={{ mb: 2, fontWeight: 600 }}>
            Are you sure you want to release this payment? The recipient will be notified immediately
            </Typography>
            </Box>

            {/* Data */}
                <Box sx={{display:"flex", flexDirection:'column',width:"100%"}}>
                    {/* 1st row */}
                        <Box sx={{display:"flex", flexDirection:"row",justifyContent:"space-between",width:"100%"}}>
                            {/* data */}
                            <Box sx={{display:'flex', flexDirection:"column"}}>
                                <Typography variant="body2">Payment ID</Typography>
                                <Typography variant="caption">{data.paymentId}</Typography>
                            </Box>
                            <Box sx={{display:'flex', flexDirection:"column"}}>
                                <Typography variant="body2">User</Typography>
                                <Typography variant="caption">{data.userName}</Typography>
                            </Box>
                        </Box>
                    {/* 2nd row */}
                     <Box sx={{display:"flex", flexDirection:"row",justifyContent:"space-between",width:"100%"}}>
                            {/* data */}
                            <Box sx={{display:'flex', flexDirection:"column"}}>
                                <Typography variant="body2">Amount</Typography>
                                <Typography variant="caption">{data.amount}</Typography>
                            </Box>
                            <Box sx={{display:'flex', flexDirection:"column"}}>
                                <Typography variant="body2">Project</Typography>
                                <Typography variant="caption">{data.project}</Typography>
                            </Box>
                        </Box>

                </Box>

            {/* Reason For Halting */}
            {/* <Box sx={{display:"flex",width:"100%"}}> */}

                 <Stack spacing={2}>
               
              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                <Button variant="outlined" color="inherit" onClick={onClose}>
                  Cancel
                </Button>
                <Button variant="contained" color="success">
                  Confirm Release
                </Button>
              </Box>
            </Stack>

            {/* </Box> */}

            {/* Buttons */}

          </Box>
          </>
        ) : (
          <>
          <Box sx={{display:"flex", flexDirection:"column",gap:2}}>
            {/* Headers */}
            <Box sx={{display:'flex', flexDirection:'column'}}>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
              Halt Payment
            </Typography>
            <Typography variant="caption" sx={{ mb: 2, fontWeight: 600 }}>
              Please provide a reason for halting this payment, the user will be notified with this reason
            </Typography>
            </Box>

            {/* Data */}
                <Box sx={{display:"flex", flexDirection:'column',width:"100%"}}>
                    {/* 1st row */}
                        <Box sx={{display:"flex", flexDirection:"row",justifyContent:"space-between",width:"100%"}}>
                            {/* data */}
                            <Box sx={{display:'flex', flexDirection:"column"}}>
                                <Typography variant="body2">Payment ID</Typography>
                                <Typography variant="caption">{data.paymentId}</Typography>
                            </Box>
                            <Box sx={{display:'flex', flexDirection:"column"}}>
                                <Typography variant="body2">User</Typography>
                                <Typography variant="caption">{data.userName}</Typography>
                            </Box>
                        </Box>
                    {/* 2nd row */}
                     <Box sx={{display:"flex", flexDirection:"row",justifyContent:"space-between",width:"100%"}}>
                            {/* data */}
                            <Box sx={{display:'flex', flexDirection:"column"}}>
                                <Typography variant="body2">Amount</Typography>
                                <Typography variant="caption">{data.amount}</Typography>
                            </Box>
                            <Box sx={{display:'flex', flexDirection:"column"}}>
                                <Typography variant="body2">Project</Typography>
                                <Typography variant="caption">{data.project}</Typography>
                            </Box>
                        </Box>

                </Box>

            {/* Reason For Halting */}
            {/* <Box sx={{display:"flex",width:"100%"}}> */}

                 <Stack spacing={2}>
                <Typography variant="caption">Reason for Halting</Typography>
              <TextField
                label="Reason for Halt"
                multiline
                rows={3}
                placeholder="Enter reason..."
              />
              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                <Button variant="outlined" color="inherit" onClick={onClose}>
                  Cancel
                </Button>
                <Button variant="contained" color="error">
                  Confirm Halt
                </Button>
              </Box>
            </Stack>

            {/* </Box> */}

            {/* Buttons */}

          </Box>
            
            

           
          </>
        )}
      </Box>
    </Modal>
  );
}
