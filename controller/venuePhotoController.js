const { VenuePhoto, Venue } = require("../models");
const { validateVenuePhoto, validateVenuePhotoUpdate } = require("../validations/venuePhotoValidation");
const { Op } = require("sequelize");

exports.createVenuePhoto = async (req, res) => {
    const { error } = validateVenuePhoto(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const item = await VenuePhoto.create(req.body);
        res.status(201).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getVenuePhotos = async (req, res) => {
    try {
        const items = await VenuePhoto.findAll({
            include: [
                { model: Venue, as: "venue" }
            ]
        });
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getVenuePhotoById = async (req, res) => {
    try {
        const item = await VenuePhoto.findByPk(req.params.id, {
            include: [
                { model: Venue, as: "venue" }
            ]
        });
        if (!item) {
            return res.status(404).send({ message: "VenuePhoto not found" });
        }
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.updateVenuePhoto = async (req, res) => {
    const { error } = validateVenuePhotoUpdate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const item = await VenuePhoto.findByPk(req.params.id);
        if (!item) {
            return res.status(404).send({ message: "VenuePhoto not found" });
        }
        await item.update(req.body);
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.deleteVenuePhoto = async (req, res) => {
    try {
        const item = await VenuePhoto.findByPk(req.params.id);
        if (!item) {
            return res.status(404).send({ message: "VenuePhoto not found" });
        }
        await item.destroy();
        res.status(200).send({ message: "VenuePhoto deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.searchVenuePhotos = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).send({ message: "Search query is required" });
        }

        const items = await VenuePhoto.findAll({
            where: {
                [Op.or]: [
                    { url: { [Op.iLike]: `%${query}%` } }
                ]
            },
            include: [
                { model: Venue, as: "venue" }
            ]
        });
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
