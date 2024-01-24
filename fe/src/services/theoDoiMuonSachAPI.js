import axiosClient from "../utils/axiosClient";

const getURL = (url = '') => `/theoDoiMuonSach/${url}`;

export const theoDoiMuonSachAPI = {
    create: async (data) => await axiosClient.post(getURL(), data),
    update: async (MADOCGIA, MASACH, NGAYMUON) => await axiosClient.put(getURL(`edit?MADOCGIA=${MADOCGIA}&MASACH=${MASACH}&NGAYMUON=${NGAYMUON}`)),
    getAll: async (status = null, page = null) => {
        let url = getURL('all')

        if (status) {
            url += `all?status=${status}`
        }

        if (page) {
            url += `&page=${page}`
        }

        return await axiosClient.get(url)
    },
    getCount: async () => await axiosClient.get(getURL('count')),
    getOne: async (MADOCGIA, MASACH, NGAYMUON) => await axiosClient.get(getURL(`detail?MADOCGIA=${MADOCGIA}&MASACH=${MASACH}&NGAYMUON=${NGAYMUON}`)),
};