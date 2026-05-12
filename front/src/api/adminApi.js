import api from "./api";

// GET ALL USERS (ADMIN)
export const getAllUsers = async () => {
  const res = await api.get("/admin/users", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });

  return res.data;
};