import axiosClient from "../utils/axiosClient";

const getURL = (url = '') => `/theoDoiMuonSach/${url}`;

export const theoDoiMuonSachAPI = {
    create: async (data) => await axiosClient.post(getURL(), data),
    update: async (MADOCGIA, MASACH, NGAYMUON, TRANGTHAI) => await axiosClient.put(getURL(`edit?MADOCGIA=${MADOCGIA}&MASACH=${MASACH}&NGAYMUON=${NGAYMUON}`), { TRANGTHAI }),
    getAll: async (status = 0, page = null, MADOCGIA = null) => {
        let url = getURL(`all?status=${status}`)

        if (page) {
            url += `&page=${page}`
        }

        if (MADOCGIA) {
            url += `&MADOCGIA=${MADOCGIA}`
        }

        return await axiosClient.get(url)
    },
    getCount: async () => await axiosClient.get(getURL('count')),
    getOne: async (MADOCGIA, MASACH, NGAYMUON) => await axiosClient.get(getURL(`detail?MADOCGIA=${MADOCGIA}&MASACH=${MASACH}&NGAYMUON=${NGAYMUON}`)),
};