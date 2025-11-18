"use client"
import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Typography, Avatar,type SxProps,type Theme } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
  text: string;
  onFileSelect: (file: File | null) => void;
   sx?: SxProps<Theme>;
   isArabic:boolean;
   initialUrl?:string;
   isPdf?:boolean;
}

// export default function InputFileUpload({ text,onFileSelect,isArabic,initialUrl,initialIsPdf }: Props) {
//   const inputRef = useRef<HTMLInputElement>(null);
//   const [preview, setPreview] = useState<string | null>(initialUrl || null);
//   const [isPdf, setIsPdf] = useState<boolean>(!!initialIsPdf);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       onFileSelect(file);
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleRemove = () => {
//     onFileSelect(null);
//     setPreview(null);
//     if (inputRef.current) inputRef.current.value = "";
//   };

//     useEffect(() => {
//     if (initialUrl) {
//       setPreview(initialUrl);
//     }
//   }, [initialUrl]);
//   return (
//     <Box display="flex" flexDirection="column" gap={1}>
//       <Typography variant="body2" fontWeight="500" display={"flex"} justifyContent={`${isArabic?"flex-end":"flex-start"}`}>
//         {text || "Upload File"}
//       </Typography>

//       {preview ? (
//         <Box display="flex" alignItems="center" justifyContent={isArabic?"flex-end":"flex-start"} gap={2}>
//           {isPdf?(
//             <>            
//           {/* <Avatar src={preview} sx={{ width: 56, height: 56 }} /> */}
//           <iframe src={`${initialUrl}`} width="600" height="800"></iframe>

//           <Button
//             variant="outlined"
//             color="error"
//             startIcon={<DeleteIcon />}
//             onClick={handleRemove}
//           >
//             Remove
//           </Button>
//           </>
// ):(
// <>  <Avatar src={preview} sx={{ width: 56, height: 56 }} />
//           <Button
//             variant="outlined"
//             color="error"
//             startIcon={<DeleteIcon />}
//             onClick={handleRemove}
//           >
//             Remove
//           </Button>
//           </>

// )}
//         </Box>
//       ) : (
//         <Button
//           // sx={{display:"flex",justifyContent:`${isArabic?"flex-end":"flex-start"}`}}
//           variant="outlined"
//           startIcon={<CloudUploadIcon />}
//           onClick={() => inputRef.current?.click()}
//         >
//           Choose File
//         </Button>
//       )}

//       <input
//         type="file"
//         accept="image/*"
//         ref={inputRef}
//         style={{ display: "none" }}
//         onChange={handleFileChange}
//       />
//     </Box>
//   );
// }


export default function InputFileUpload({
  text,
  onFileSelect,
  isArabic,
  initialUrl,
  isPdf: initialIsPdf,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(initialUrl || null);
  const [isPdf, setIsPdf] = useState<boolean>(!!initialIsPdf);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
      const pdfCheck = file.type === "application/pdf";
      setIsPdf(pdfCheck);

      if (pdfCheck) {
        // For local PDF preview
        setPreview(URL.createObjectURL(file));
      } else {
        // For images
        setPreview(URL.createObjectURL(file));
      }
    }
  };

  const handleRemove = () => {
    onFileSelect(null);
    setPreview(null);
    setIsPdf(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  useEffect(() => {
    if (initialUrl) {
      setPreview(initialUrl);
      setIsPdf(!!initialIsPdf);
    }
  }, [initialUrl, initialIsPdf]);

  return (
    <Box display="flex" flexDirection="column" gap={1}>
      <Typography
        variant="body2"
        fontWeight="500"
        display="flex"
        justifyContent={isArabic ? "flex-end" : "flex-start"}
      >
        {text || "Upload File"}
      </Typography>

      {preview ? (
        <Box
          display="flex"
          alignItems="center"
          justifyContent={isArabic ? "flex-end" : "flex-start"}
          gap={2}
        >
          {isPdf ? (
            <>
              <iframe
                src={preview}
                width="600"
                height="800"
                style={{ border: "1px solid #ccc" }}
              ></iframe>
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={handleRemove}
              >
                Remove
              </Button>
            </>
          ) : (
            <>
              <Avatar src={preview} sx={{ width: 56, height: 56 }} />
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={handleRemove}
              >
                Remove
              </Button>
            </>
          )}
        </Box>
      ) : (
        <Button
          variant="outlined"
          startIcon={<CloudUploadIcon />}
          onClick={() => inputRef.current?.click()}
        >
          Choose File
        </Button>
      )}

      <input
        type="file"
        accept="image/*,application/pdf" // <-- allow PDFs
        ref={inputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </Box>
  );
}
