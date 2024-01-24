const asyncHandler = require("express-async-handler")
const sachModel = require('../models/sach')
const uuid = require('uuid');

const sachControllers = {
    // them moi sach
    create: asyncHandler(async (req, res) => {
        const { TENSACH, DONGIA, SOQUYEN, NAMXUATBAN, MANXB, TACGIA } = req.body

        // kiem tra cac truong
        if (!TENSACH || !DONGIA || !SOQUYEN || !NAMXUATBAN || !MANXB || !TACGIA) {
            return res.status(400).json({
                errorCode: 1,
                message: 'Tất cả các trường là bắt buộc!'
            })
        }

        // kiem tra cac truong la so
        if (isNaN(parseInt(DONGIA)) || isNaN(parseInt(SOQUYEN)) || isNaN(parseInt(NAMXUATBAN))) {
            return res.status(400).json({
                errorCode: 1,
                message: 'Một số trường phải là số!'
            })
        }

        try {
            const id = uuid.v4()

            // them moi sach
            const sach = await sachModel.create({
                TENSACH,
                DONGIA,
                SOQUYEN,
                NAMXUATBAN,
                MANXB,
                TACGIA,
                _id: id,
                MASACH: id
            })

            if (sach) {
                return res.status(200).json({
                    message: "Thêm mới sách thành công!",
                    errorCode: 0
                })
            } else {
                return res.status(404).json({
                    message: "Thêm mới sách thất bại!",
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
    // cap nhat thong tin sach
    edit: asyncHandler(async (req, res) => {
        const { MASACH } = req.params
        const { TENSACH, DONGIA, SOQUYEN, NAMXUATBAN, MANXB, TACGIA } = req.body

        // kiem tra cac truong
        if (!TENSACH || !DONGIA || !SOQUYEN || !NAMXUATBAN || !MANXB || !TACGIA) {
            return res.status(400).json({
                errorCode: 1,
                message: 'Tất cả các trường là bắt buộc!'
            })
        }

        // kiem tra gia tri so
        if (isNaN(parseInt(DONGIA)) || isNaN(parseInt(SOQUYEN)) || isNaN(parseInt(NAMXUATBAN))) {
            return res.status(400).json({
                errorCode: 1,
                message: 'Một số trường phải là số!'
            })
        }

        try {
            // cap nhat thong tin sach
            const sach = await sachModel.findOneAndUpdate(
                { MASACH },
                {
                    $set: {
                        TENSACH,
                        DONGIA,
                        SOQUYEN,
                        NAMXUATBAN,
                        MANXB,
                        TACGIA
                    }
                },
                { new: true }
            )

            if (sach) {
                return res.status(201).json({
                    message: "Cập nhật sách thành công!",
                    data: sach,
                    errorCode: 0
                })
            } else {
                return res.status(404).json({
                    message: "Cập nhật sách thất bại!",
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
    // lay tat ca sach
    getAll: asyncHandler(async (req, res) => {
        const { page } = req.query
        const LENGTH = 6
        let star = 0
        if (!isNaN(parseInt(page)) && parseInt(page) > 0) {
            star = (LENGTH * page) - LENGTH
        }

        try {
            // lay tat ca sach
            const tatCaSach = await sachModel.find()
                .skip(star)
                .limit(LENGTH)
                .populate('MANXB');

            // kiem tra hang hoa vua lay
            if (tatCaSach) {
                return res.status(201).json({
                    errorCode: 0,
                    data: tatCaSach,
                    message: "Lấy tất cả sách thành công!"
                })
            } else {
                return res.status(404).json({
                    errorCode: 2,
                    message: "Sách không tồn tại!"
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
    // lay thong tin sach
    getOne: asyncHandler(async (req, res) => {
        const { MASACH } = req.query

        // kiem tra cac truong
        if (!MASACH) {
            return res.status(400).json({
                errorCode: 1,
                message: "Không tồn tại mã sách!"
            });
        }

        try {
            // tim kiem theo MASACH
            const sach = await sachModel.findOne({ MASACH }).populate('MANXB')

            if (sach) {
                return res.status(201).json({
                    errorCode: 0,
                    message: 'Lấy thông tin sách thành công!',
                    data: sach
                })
            } else {
                return res.status(404).json({
                    errorCode: 2,
                    message: "Sách không tồn tại!"
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
    // dem so luong sach
    getCount: asyncHandler(async (req, res) => {
        try {
            // dem so luong sach
            const soLuong = await sachModel.countDocuments()

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
    // tim kiem theo ten va tac gia
    search: asyncHandler(async (req, res) => {
        const { key, type, page } = req.query

        const LENGTH = 6
        let star = 0
        if (!isNaN(parseInt(page))) {
            star = LENGTH * page
        }
        try {
            // lay tat ca sach
            let search = {}
            const searchValue = { $regex: key, $options: 'i' }

            if (type === 'name') {
                search = { TENSACH: searchValue }
            } else {
                search = { TACGIA: searchValue }
            }

            const tatCaSach = await sachModel.find({ ...search })
                .skip(star)
                .limit(LENGTH)
                .populate('MANXB');

            // kiem tra hang hoa vua lay
            if (tatCaSach) {
                return res.status(201).json({
                    errorCode: 0,
                    data: tatCaSach,
                    message: "Lấy tất cả sách thành công!"
                })
            } else {
                return res.status(404).json({
                    errorCode: 2,
                    message: "Sách không tồn tại!"
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
}

module.exports = sachControllers