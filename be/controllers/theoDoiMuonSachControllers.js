const asyncHandler = require("express-async-handler")
const theoDoiMuonSachModel = require('../models/theoDoiMuonSach')
const sachModel = require('../models/sach')

// cap nhat so luong sach
const updateCountBook = async (res, MASACH, number) => {
    // lay so luong sach
    const count = await sachModel.findOne({ MASACH })

    if (!count && count.SOQUYEN <= 0) {
        return res.status(400).json({
            message: "Lấy số lượng sách thất bại!",
            errorCode: 2
        })
    }

    const SOQUYEN = count.SOQUYEN + number

    //cap nhat so luong sach
    const sach = await sachModel.findOneAndUpdate(
        { MASACH },
        {
            $set: {
                SOQUYEN
            }
        },
        { new: true }
    )

    if (!sach) {
        return res.status(400).json({
            message: "Cập nhật số lượng sách thất bại!",
            errorCode: 2
        })
    }
}

const theoDoiMuonSachControllers = {
    // tao the muon
    create: asyncHandler(async (req, res) => {
        const { MADOCGIA, MASACH, NGAYMUON, NGAYTRA } = req.body

        // kiem tra cac truong
        if (!MADOCGIA || !MASACH || !NGAYMUON || !NGAYTRA) {
            return res.status(400).json({
                errorCode: 1,
                message: 'Tất cả các trường là bắt buộc!'
            })
        }

        // kiem tra ngay muon
        if (new Date() > new Date(NGAYMUON)) {
            return res.status(400).json({
                errorCode: 1,
                message: "Ngày mượn phải lớn hơn ngày hiện tại!"
            })
        }

        try {
            // them moi the muon
            const theoDoiMuonSach = await theoDoiMuonSachModel.create({
                MADOCGIA,
                MASACH,
                NGAYMUON,
                NGAYTRA
            })

            await updateCountBook(res, MASACH, -1)
            if (res.headersSent) {
                return;
            }

            if (theoDoiMuonSach) {
                return res.status(200).json({
                    message: "Thêm mới thẻ mượn thành công!",
                    errorCode: 0
                })
            } else {
                return res.status(404).json({
                    message: "Thêm mới thẻ mượn thất bại!",
                    errorCode: 2
                })
            }
        } catch (e) {
            return res.status(500).json({
                message: "Lỗi server!",
                errorCode: 3,
                error: e.message
            })
        }
    }),
    // cap nhat trang thai phieu muon
    edit: asyncHandler(async (req, res) => {
        const { MADOCGIA, MASACH, NGAYMUON } = req.query
        const { TRANGTHAI } = req.body

        // kiem tra cac truong
        if (!MADOCGIA || !MASACH || !NGAYMUON || !TRANGTHAI) {
            return res.status(400).json({
                errorCode: 1,
                message: 'Tất cả các trường là bắt buộc!'
            })
        }

        try {
            // cap nhat thong tin the muon
            const theoDoiMuonSach = await theoDoiMuonSachModel.findOneAndUpdate(
                { MADOCGIA, MASACH, NGAYMUON },
                {
                    $set: {
                        TRANGTHAI
                    }
                },
                { new: true }
            )

            if (TRANGTHAI === 2) {
                await updateCountBook(res, MASACH, +1)

                if (res.headersSent) {
                    return;
                }
            }

            if (theoDoiMuonSach) {
                return res.status(201).json({
                    message: "Cập nhật phiếu mượn thành công!",
                    data: theoDoiMuonSach,
                    errorCode: 0
                })
            } else {
                return res.status(404).json({
                    message: "Cập nhật phiếu mượn thất bại!",
                    errorCode: 2
                })
            }
        } catch (e) {
            return res.status(500).json({
                message: "Lỗi server!",
                errorCode: 3,
                error: e.message
            })
        }
    }),
    // lay tat ca phieu muon
    getAll: asyncHandler(async (req, res) => {
        const { page, status, MADOCGIA } = req.query
        const LENGTH = 6
        let star = 0
        if (!isNaN(parseInt(page))) {
            star = (LENGTH * page) - LENGTH
        }

        try {
            // lay tat phieu muon
            let search = {}
            if (status || +status === 0) {
                search = { TRANGTHAI: +status }
            }

            if (MADOCGIA) {
                search = { ...search, MADOCGIA }
            }

            const tatCaPhieuMuon = await theoDoiMuonSachModel.find(search)
                .skip(star)
                .limit(LENGTH)
                .populate([
                    { path: 'MASACH' },
                    { path: 'MADOCGIA', select: 'HOLOT TEN DIACHI DIENTHOAI' }
                ]);

            // kiem tra hang hoa vua lay
            if (tatCaPhieuMuon) {
                return res.status(201).json({
                    errorCode: 0,
                    data: tatCaPhieuMuon,
                    message: "Lấy tất cả phiếu mượn thành công!"
                })
            } else {
                return res.status(404).json({
                    errorCode: 2,
                    message: "Phiếu mượn không tồn tại!"
                })
            }
        } catch (err) {
            return res.status(500).json({
                errorCode: 3,
                message: "Lỗi server!",
                error: err.message
            })
        }
    }),
    // lay thong tin phieu muon
    getOne: asyncHandler(async (req, res) => {
        const { MADOCGIA, MASACH, NGAYMUON } = req.query

        // kiem tra cac truong
        if (!MASACH || !MADOCGIA || !NGAYMUON) {
            return res.status(400).json({
                errorCode: 1,
                message: "Tất cả các trường là bắt buộc!"
            });
        }

        try {
            // tim kiem theo MADOCGIA, MASACH, NGAYMUON
            const theoDoiMuonSach = await theoDoiMuonSachModel
                .findOne({ MASACH, MADOCGIA, NGAYMUON })
                .populate([
                    { path: 'MASACH' },
                    { path: 'MADOCGIA', select: 'HOLOT TEN DIACHI DIENTHOAI' }
                ])

            if (theoDoiMuonSach) {
                return res.status(201).json({
                    errorCode: 0,
                    message: 'Lấy thông tin phiếu mượn thành công!',
                    data: theoDoiMuonSach
                })
            } else {
                return res.status(404).json({
                    errorCode: 2,
                    message: "Phiếu mượn không tồn tại!"
                })
            }
        } catch (err) {
            return res.status(500).json({
                message: "Lỗi server!",
                error: err.message,
                errorCode: 3
            })
        }
    }),
    // dem so luong the muon
    getCount: asyncHandler(async (req, res) => {
        try {
            // dem so luong the muon
            const soLuong = await theoDoiMuonSachModel.countDocuments()

            if (!isNaN(parseInt(soLuong))) {
                return res.status(201).json({
                    data: soLuong,
                    errorCode: 0,
                    message: 'Đếm số lượng thành công!'
                })
            } else {
                return res.status(404).json({
                    message: "Không thể đếm số lượng!",
                    errorCode: 2
                })
            }
        } catch (err) {
            return res.status(500).json({
                message: "Lỗi server!",
                error: err.message,
                errorCode: 3
            })
        }
    }),
}

module.exports = theoDoiMuonSachControllers