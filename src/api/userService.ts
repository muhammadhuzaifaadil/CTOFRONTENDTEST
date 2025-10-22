import apiClient from "./apiClient";

const passwordUpdateService = async (data: {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}) => {
  const response = await apiClient.post("/users/update-password", data);
  return response.data;
};
export default passwordUpdateService;
