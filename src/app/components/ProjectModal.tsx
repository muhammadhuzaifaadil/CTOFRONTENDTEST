import React, { useEffect, useState } from "react";
import {
  Box,
  Modal,
  Typography,
  TextField,
  Button,
  Container,
  CircularProgress,
} from "@mui/material";
import apiClient from "@/api/apiClient"; // assuming this is your Axios instance
import { useRouter } from "next/navigation";
import InputFileUpload from "./InputFileUpload";

interface ProjectModalProps {
  open: boolean;
  onClose: () => void;
  projectId: number | null;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ open, onClose, projectId }) => {
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState<any>({});
    const router = useRouter();
  // Fetch project details when modal opens
  useEffect(() => {
    if (open && projectId) {
      fetchProject();
    }
  }, [open, projectId]);

  const fetchProject = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get(`/projects/${projectId}`);
      if (res.data?.Success) {
        setProject(res.data.Data);
        setForm(res.data.Data);
        console.log(res.data.Data);
      }
    } catch (err) {
      console.error("Failed to fetch project:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await apiClient.delete(`/projects/${projectId}`);
      window.location.reload();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleEdit = async () => {
    try {
      await apiClient.put(`/projects/${projectId}`, form);
      setEditMode(false);
      await fetchProject();
      window.location.reload();
    } catch (err) {
      console.error("Edit failed:", err);
    }
  };

  const PublishProject = async () =>{
    try {
      await apiClient.put(`/projects/updatepublish/${projectId}`)
      window.location.reload();
    } catch (error) {
      console.error("Edit failed:", error);
    }
  }
//   const isPdf = (url: string) => {
//     url.toLowerCase().endsWith(".pdf");}
// useEffect(()=>{
// isPdf(project?.attachment);
// },[project])

  if (!project && !loading) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Container
        maxWidth="sm"
        sx={{
          bgcolor: "background.paper",
          p: 4,
          mt: 2,
          // borderRadius: 2,
          boxShadow: 5,
          position: "relative",
          height:"100vh",
          overflowY:"scroll"
        }}
      >
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              {editMode ? "Edit Project" : "Project Details"}
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
              <TextField
                label="Title"
                value={form.title || ""}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                fullWidth
                InputProps={{ readOnly: !editMode }}
              />

              <TextField
                label="Outline"
                value={form.outline || ""}
                onChange={(e) => setForm({ ...form, outline: e.target.value })}
                fullWidth
                multiline
                minRows={2}
                InputProps={{ readOnly: !editMode }}
              />

              <TextField
                label="Requirements"
                value={form.requirements || ""}
                onChange={(e) => setForm({ ...form, requirements: e.target.value })}
                fullWidth
                multiline
                minRows={3}
                InputProps={{ readOnly: !editMode }}
              />

              <TextField
                label="Budget Range"
                value={form.budgetRange || ""}
                onChange={(e) => setForm({ ...form, budgetRange: e.target.value })}
                fullWidth
                InputProps={{ readOnly: !editMode }}
              />

              <TextField
                label="Timeline"
                value={form.timeline || ""}
                onChange={(e) => setForm({ ...form, timeline: e.target.value })}
                fullWidth
                InputProps={{ readOnly: !editMode }}
              />

              <TextField
                label="Skills Required"
                value={form.skillsRequired?.join(", ") || ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    skillsRequired: e.target.value.split(",").map((s) => s.trim()),
                  })
                }
                fullWidth
                InputProps={{ readOnly: !editMode }}
              />

              {form.attachment && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    // mt: 2,
                  }}
                >
                  <img
                    src={form.attachment}
                    alt="Project Attachment"
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                      borderRadius: "8px",
                    }}
                  />
                  {/* <InputFileUpload 
                      isArabic={false}
                      sx={{ display: "flex", width: "100%", textAlign: "center" }}
                      text="Logo"
                       onFileSelect={function (file: File | null): void {
                        throw new Error("Function not implemented.");
                      } }    
                      isPdf={true}
                      initialUrl={}
                      /> */}
                </Box>
              )}
            </Box>
              <Box sx={{display:"flex", justifyContent:"space-between"}}>

              <Box sx={{display:"flex",justifyContent:"flex-start",mt:1}}>
                <Button variant="contained" sx={{backgroundColor:"#5459FD"}} onClick={()=>{PublishProject()}}>Publish</Button>
              </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
                 mt: 1,
              }}
            >


              {editMode ? (
                <Button variant="contained" color="primary" onClick={handleEdit}>
                  Save Changes
                </Button>
              ) : (
                <Button variant="contained" color="secondary" onClick={() => setEditMode(true)}>
                  Edit
                </Button>
              )}

              <Button variant="outlined" color="error" onClick={handleDelete}>
                Delete
              </Button>
            </Box>
            </Box>
          </Box>
        )}
      </Container>
    </Modal>
  );
};

export default ProjectModal;
