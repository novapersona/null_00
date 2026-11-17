const { HumanCategory, Gender, Event } = require("../models");
const { validateHumanCategory, validateHumanCategoryUpdate } = require("../validations/humanCategoryValidation");
const { Op } = require("sequelize");

exports.createHumanCategory = async (req, res) => {
    const { error } = validateHumanCategory(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const item = await HumanCategory.create(req.body);
        res.status(201).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getHumanCategorys = async (req, res) => {
    try {
        const items = await HumanCategory.findAll({
            include: [
                { model: Gender, as: "gender" },
                { model: Event, as: "events" }
            ]
        });
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getHumanCategoryById = async (req, res) => {
    try {
        const item = await HumanCategory.findByPk(req.params.id, {
            include: [
                { model: Gender, as: "gender" },
                { model: Event, as: "events" }
            ]
        });
        if (!item) {
            return res.status(404).send({ message: "HumanCategory not found" });
        }
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.updateHumanCategory = async (req, res) => {
    const { error } = validateHumanCategoryUpdate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const item = await HumanCategory.findByPk(req.params.id);
        if (!item) {
            return res.status(404).send({ message: "HumanCategory not found" });
        }
        await item.update(req.body);
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.deleteHumanCategory = async (req, res) => {
    try {
        const item = await HumanCategory.findByPk(req.params.id);
        if (!item) {
            return res.status(404).send({ message: "HumanCategory not found" });
        }
        await item.destroy();
        res.status(200).send({ message: "HumanCategory deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.searchHumanCategorys = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).send({ message: "Search query is required" });
        }

        const items = await HumanCategory.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.iLike]: `%${query}%` } }
                ]
            },
            include: [
                { model: Gender, as: "gender" },
                { model: Event, as: "events" }
            ]
        });
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
