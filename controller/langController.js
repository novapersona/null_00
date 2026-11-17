const { Lang, Customer, Event } = require("../models");
const { validateLang, validateLangUpdate } = require("../validations/langValidation");
const { Op } = require("sequelize");

exports.createLang = async (req, res) => {
    const { error } = validateLang(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const item = await Lang.create(req.body);
        res.status(201).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getLangs = async (req, res) => {
    try {
        const items = await Lang.findAll({
            include: [
                { model: Customer, as: "customers" },
                { model: Event, as: "events" }
            ]
        });
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getLangById = async (req, res) => {
    try {
        const item = await Lang.findByPk(req.params.id, {
            include: [
                { model: Customer, as: "customers" },
                { model: Event, as: "events" }
            ]
        });
        if (!item) {
            return res.status(404).send({ message: "Lang not found" });
        }
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.updateLang = async (req, res) => {
    const { error } = validateLangUpdate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const item = await Lang.findByPk(req.params.id);
        if (!item) {
            return res.status(404).send({ message: "Lang not found" });
        }
        await item.update(req.body);
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.deleteLang = async (req, res) => {
    try {
        const item = await Lang.findByPk(req.params.id);
        if (!item) {
            return res.status(404).send({ message: "Lang not found" });
        }
        await item.destroy();
        res.status(200).send({ message: "Lang deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.searchLangs = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).send({ message: "Search query is required" });
        }

        const items = await Lang.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.iLike]: `%${query}%` } }
                ]
            },
            include: [
                { model: Customer, as: "customers" },
                { model: Event, as: "events" }
            ]
        });
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
