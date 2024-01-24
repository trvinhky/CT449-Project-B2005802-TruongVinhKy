import axiosClient from "../utils/axiosClient";

const getURL = (url = '') => `/docGia/${url}`;

export const docGiaAPI = {
    register: async (data) => await axiosClient.post(getURL('register'), data),
    login: async (data) => await axiosClient.post(getURL('login'), data),
    getAll: async () => await axiosClient.get(getURL('all')),
    getCount: async () => await axiosClient.get(getURL('count')),
    getInfo: async (MADOCGIA) => await axiosClient.get(getURL(`detail?MADOCGIA=${MADOCGIA}`)),
    update: async (MADOCGIA, data) => await axiosClient.put(getURL(MADOCGIA), data),
};
