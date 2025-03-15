import { create } from "zustand";
import { toast } from "react-hot-toast";
import axiosInstance from "../lib/axios";
export const useUserStore = create((set, get) => ({
    user: null,
    loading: false,
    checkingAuth: true,
    login: async (email, password) => {
        set({ loading: true });
        try {
            const res = await axiosInstance.post("/admin/login", { email, password }, { withCredentials: true });
            set({ loading: false, user: res.data });
            toast.success("Logged in Successfully");
        } catch (error) {
            set({ loading: false });
            toast.error(error.response.data.message);
        }
    },

    logout: async () => {
        set({ loading: true });
        try {
            const res = await axiosInstance.post("/admin/logout", { withCredentials: true });
            set({ loading: false, user: null });
            toast.success("Logged out Successfully");
        } catch (error) {
            set({ loading: false });
            toast.error(error.response.data.message);
        }
    },

    checkAuth: async () => {
        set({ checkingAuth: true });
        try {
            const response = await axiosInstance.get("/admin/check",{withCredentials: true});
            set({ user: response.data, checkingAuth: false });
        } catch (error) {
            set({ checkingAuth: false, user: null });
        }
    },
}));


