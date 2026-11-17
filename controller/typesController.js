const { Types, VenueTypes } = require("../models");
const { validateTypes, validateTypesUpdate } = require("../validations/typesValidation");
const { Op } = require("sequelize");

exports.createTypes = async (req, res) => {
    const { error } = validateTypes(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const item = await Types.create(req.body);
        res.status(201).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getTypess = async (req, res) => {
    try {
        const items = await Types.findAll({
            include: [
                { model: VenueTypes, as: "venue_types" }
            ]
        });
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getTypesById = async (req, res) => {
    try {
        const item = await Types.findByPk(req.params.id, {
            include: [
                { model: VenueTypes, as: "venue_types" }
            ]
        });
        if (!item) {
            return res.status(404).send({ message: "Types not found" });
        }
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.updateTypes = async (req, res) => {
    const { error } = validateTypesUpdate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const item = await Types.findByPk(req.params.id);
        if (!item) {
            return res.status(404).send({ message: "Types not found" });
        }
        await item.update(req.body);
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.deleteTypes = async (req, res) => {
    try {
        const item = await Types.findByPk(req.params.id);
        if (!item) {
            return res.status(404).send({ message: "Types not found" });
        }
        await item.destroy();
        res.status(200).send({ message: "Types deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.searchTypess = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).send({ message: "Search query is required" });
        }

        const items = await Types.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.iLike]: `%${query}%` } }
                ]
            },
            include: [
                { model: VenueTypes, as: "venue_types" }
            ]
        });
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
