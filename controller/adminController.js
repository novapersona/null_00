const { Admin } = require("../models");
const { validateAdmin, validateAdminUpdate } = require("../validations/adminValidation");
const { Op } = require("sequelize");

exports.createAdmin = async (req, res) => {
    const { error } = validateAdmin(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const item = await Admin.create(req.body);
        res.status(201).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getAdmins = async (req, res) => {
    try {
        const items = await Admin.findAll();
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getAdminById = async (req, res) => {
    try {
        const item = await Admin.findByPk(req.params.id);
        if (!item) {
            return res.status(404).send({ message: "Admin not found" });
        }
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.updateAdmin = async (req, res) => {
    const { error } = validateAdminUpdate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const item = await Admin.findByPk(req.params.id);
        if (!item) {
            return res.status(404).send({ message: "Admin not found" });
        }
        await item.update(req.body);
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.deleteAdmin = async (req, res) => {
    try {
        const item = await Admin.findByPk(req.params.id);
        if (!item) {
            return res.status(404).send({ message: "Admin not found" });
        }
        await item.destroy();
        res.status(200).send({ message: "Admin deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.searchAdmins = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).send({ message: "Search query is required" });
        }

        const items = await Admin.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.iLike]: `%${query}%` } },
                    { login: { [Op.iLike]: `%${query}%` } }
                ]
            }
        });
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
