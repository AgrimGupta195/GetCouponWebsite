import { create } from "zustand";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios.js";

export const useCouponStore = create((set, get) => ({
    coupons: [],
    loading: false,

    getCoupon: async () => {
        set({ loading: true });
        try {
            const res = await axiosInstance.get("/admin/coupons");
            set({ loading: false, coupons: res.data });
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch coupons");
            set({ loading: false });
        }
    },

    addCoupon: async ({code,discount}) => {
        set({ loading: true });
        try {
            const response = await axiosInstance.post("/admin/add", { code,discount });
            set((state) => ({
                coupons: [...state.coupons, response.data],
                loading: false,
            }));
            toast.success("Coupon added successfully!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to add coupon");
            set({ loading: false });
        }
    },

    updateCoupon:async(id,{code,discount})=>{
        set({ loading: true });
        try {
            const response = await axiosInstance.put(`/admin/edit/${id}`, { code,discount });
            set((state) => ({
                coupons: state.coupons.map((coupon) =>
                    coupon._id === id ? { ...coupon, code, discount } : coupon
                ),
                loading: false,
            }));
            toast.success("Coupon updated successfully!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update coupon");            
        }

    },

    deleteCoupon: async (couponId) => {
        set({ loading: true });
        try {
            await axiosInstance.delete(`/admin/delete/${couponId}`);
            set((state) => ({
                coupons: state.coupons.filter((coupon) => coupon._id !== couponId),
                loading: false,
            }));
            toast.success("Coupon deleted successfully!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete coupon");
            set({ loading: false });
        }
    },

    toggleFeaturedProduct: async (couponId) => {
        set({ loading: true });
        try {
            const response = await axiosInstance.patch(`/admin/isAvailable/${couponId}`);
            set({
                coupons: get().coupons.map((coupon) =>
                    coupon._id === couponId ? { ...coupon, isAvailable: !coupon.isAvailable } : coupon
                ),
                loading: false,
            });
            toast.success("Coupon availability updated successfully!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update coupon availability");
            set({ loading: false });
        }
    },
    getCouponForCustomer: async () => {
        set({ loading: true });
        try {
            const res = await axiosInstance.get("/coupons/coupons");
            set({ loading: false, coupons: res.data });
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch coupons");
            set({ loading: false });
        }
    },
    claimCoupon: async (couponId) => {
        set({ loading: true });
        try {
            const response = await axiosInstance.post(`/coupons/claim/${couponId}`);
            await get().getCouponForCustomer();
            set({ loading: false });
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to claim coupon");
            set({ loading: false });
        }
    },
}));
