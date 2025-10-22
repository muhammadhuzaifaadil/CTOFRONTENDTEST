"use client"
import React, { useRef, useState } from "react";
import { Box, Button, Typography, Avatar,type SxProps,type Theme } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
  text: string;
  onFileSelect: (file: File | null) => void;
   sx?: SxProps<Theme>;
   isArabic:boolean;
}

export default function InputFileUpload({ text,onFileSelect,isArabic }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleRemove = () => {
    onFileSelect(null);
    setPreview(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <Box display="flex" flexDirection="column" gap={1}>
      <Typography variant="body2" fontWeight="500" display={"flex"} justifyContent={`${isArabic?"flex-start":"flex-end"}`}>
        {text || "Upload File"}
      </Typography>

      {preview ? (
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar src={preview} sx={{ width: 56, height: 56 }} />
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleRemove}
          >
            Remove
          </Button>
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
        accept="image/*"
        ref={inputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </Box>
  );
}
