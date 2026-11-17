const { Flat, CustomerAddress } = require("../models");
const { validateFlat, validateFlatUpdate } = require("../validations/flatValidation");
const { Op } = require("sequelize");

exports.createFlat = async (req, res) => {
    const { error } = validateFlat(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const item = await Flat.create(req.body);
        res.status(201).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getFlats = async (req, res) => {
    try {
        const items = await Flat.findAll({
            include: [
                { model: CustomerAddress, as: "addresses" }
            ]
        });
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getFlatById = async (req, res) => {
    try {
        const item = await Flat.findByPk(req.params.id, {
            include: [
                { model: CustomerAddress, as: "addresses" }
            ]
        });
        if (!item) {
            return res.status(404).send({ message: "Flat not found" });
        }
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.updateFlat = async (req, res) => {
    const { error } = validateFlatUpdate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const item = await Flat.findByPk(req.params.id);
        if (!item) {
            return res.status(404).send({ message: "Flat not found" });
        }
        await item.update(req.body);
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.deleteFlat = async (req, res) => {
    try {
        const item = await Flat.findByPk(req.params.id);
        if (!item) {
            return res.status(404).send({ message: "Flat not found" });
        }
        await item.destroy();
        res.status(200).send({ message: "Flat deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.searchFlats = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).send({ message: "Search query is required" });
        }

        const items = await Flat.findAll({
            where: {
                [Op.or]: [
                    { condition: { [Op.iLike]: `%${query}%` } }
                ]
            },
            include: [
                { model: CustomerAddress, as: "addresses" }
            ]
        });
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
