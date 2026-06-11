import Notice from "../models/notice.js";

export default class NoticeController {

    createNotice = async (req, res) => {
        try {
            const notice = await Notice.create(req.body);

            res.status(201).json({
                success: true,
                message: "Notice created successfully",
                data: notice
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    };

    getAllNotices = async (req, res) => {
        try {
            const notices = await Notice.find();

            res.status(200).json({
                success: true,
                data: notices
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    };

    getNoticeById = async (req, res) => {
        try {
            const notice = await Notice.findById(req.params.id);

            if (!notice) {
                return res.status(404).json({
                    success: false,
                    message: "Notice not found"
                });
            }

            res.status(200).json({
                success: true,
                data: notice
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    };

    updateNotice = async (req, res) => {
        try {
            const notice = await Notice.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true, runValidators: true }
            );

            if (!notice) {
                return res.status(404).json({
                    success: false,
                    message: "Notice not found"
                });
            }

            res.status(200).json({
                success: true,
                message: "Notice updated successfully",
                data: notice
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    };

    deleteNotice = async (req, res) => {
        try {
            const notice = await Notice.findByIdAndDelete(req.params.id);

            if (!notice) {
                return res.status(404).json({
                    success: false,
                    message: "Notice not found"
                });
            }

            res.status(200).json({
                success: true,
                message: "Notice deleted successfully"
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    };
}
