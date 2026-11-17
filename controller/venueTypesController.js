const { VenueTypes, Venue, Types } = require("../models");
const { validateVenueTypes, validateVenueTypesUpdate } = require("../validations/venueTypesValidation");
const { Op } = require("sequelize");

exports.createVenueTypes = async (req, res) => {
    const { error } = validateVenueTypes(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const item = await VenueTypes.create(req.body);
        res.status(201).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getVenueTypess = async (req, res) => {
    try {
        const items = await VenueTypes.findAll({
            include: [
                { model: Venue, as: "venue" },
                { model: Types, as: "type" }
            ]
        });
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getVenueTypesById = async (req, res) => {
    try {
        const item = await VenueTypes.findByPk(req.params.id, {
            include: [
                { model: Venue, as: "venue" },
                { model: Types, as: "type" }
            ]
        });
        if (!item) {
            return res.status(404).send({ message: "VenueTypes not found" });
        }
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.updateVenueTypes = async (req, res) => {
    const { error } = validateVenueTypesUpdate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const item = await VenueTypes.findByPk(req.params.id);
        if (!item) {
            return res.status(404).send({ message: "VenueTypes not found" });
        }
        await item.update(req.body);
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.deleteVenueTypes = async (req, res) => {
    try {
        const item = await VenueTypes.findByPk(req.params.id);
        if (!item) {
            return res.status(404).send({ message: "VenueTypes not found" });
        }
        await item.destroy();
        res.status(200).send({ message: "VenueTypes deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.searchVenueTypess = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).send({ message: "Search query is required" });
        }

        const whereClause = !isNaN(query) ? { id: query } : {};
        const items = await VenueTypes.findAll({
            where: whereClause,
            include: [
                { model: Venue, as: "venue" },
                { model: Types, as: "type" }
            ]
        });
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
