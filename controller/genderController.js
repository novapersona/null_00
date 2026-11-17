const { Gender, Customer, HumanCategory } = require("../models");
const { validateGender, validateGenderUpdate } = require("../validations/genderValidation");
const { Op } = require("sequelize");

exports.createGender = async (req, res) => {
    const { error } = validateGender(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const item = await Gender.create(req.body);
        res.status(201).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getGenders = async (req, res) => {
    try {
        const items = await Gender.findAll({
            include: [
                { model: Customer, as: "customers" },
                { model: HumanCategory, as: "human_categories" }
            ]
        });
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getGenderById = async (req, res) => {
    try {
        const item = await Gender.findByPk(req.params.id, {
            include: [
                { model: Customer, as: "customers" },
                { model: HumanCategory, as: "human_categories" }
            ]
        });
        if (!item) {
            return res.status(404).send({ message: "Gender not found" });
        }
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.updateGender = async (req, res) => {
    const { error } = validateGenderUpdate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const item = await Gender.findByPk(req.params.id);
        if (!item) {
            return res.status(404).send({ message: "Gender not found" });
        }
        await item.update(req.body);
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.deleteGender = async (req, res) => {
    try {
        const item = await Gender.findByPk(req.params.id);
        if (!item) {
            return res.status(404).send({ message: "Gender not found" });
        }
        await item.destroy();
        res.status(200).send({ message: "Gender deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.searchGenders = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).send({ message: "Search query is required" });
        }

        const items = await Gender.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.iLike]: `%${query}%` } }
                ]
            },
            include: [
                { model: Customer, as: "customers" },
                { model: HumanCategory, as: "human_categories" }
            ]
        });
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
