const { Venue, Region, District, VenueTypes, VenuePhoto, Seat, Event } = require("../models");
const { validateVenue, validateVenueUpdate } = require("../validations/venueValidation");
const { Op } = require("sequelize");

exports.createVenue = async (req, res) => {
    const { error } = validateVenue(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const item = await Venue.create(req.body);
        res.status(201).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getVenues = async (req, res) => {
    try {
        const items = await Venue.findAll({
            include: [
                { model: Region, as: "region" },
                { model: District, as: "district" },
                { model: VenueTypes, as: "venue_types" },
                { model: VenuePhoto, as: "photos" },
                { model: Seat, as: "seats" },
                { model: Event, as: "events" }
            ]
        });
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getVenueById = async (req, res) => {
    try {
        const item = await Venue.findByPk(req.params.id, {
            include: [
                { model: Region, as: "region" },
                { model: District, as: "district" },
                { model: VenueTypes, as: "venue_types" },
                { model: VenuePhoto, as: "photos" },
                { model: Seat, as: "seats" },
                { model: Event, as: "events" }
            ]
        });
        if (!item) {
            return res.status(404).send({ message: "Venue not found" });
        }
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.updateVenue = async (req, res) => {
    const { error } = validateVenueUpdate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const item = await Venue.findByPk(req.params.id);
        if (!item) {
            return res.status(404).send({ message: "Venue not found" });
        }
        await item.update(req.body);
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.deleteVenue = async (req, res) => {
    try {
        const item = await Venue.findByPk(req.params.id);
        if (!item) {
            return res.status(404).send({ message: "Venue not found" });
        }
        await item.destroy();
        res.status(200).send({ message: "Venue deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.searchVenues = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).send({ message: "Search query is required" });
        }

        const items = await Venue.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.iLike]: `%${query}%` } },
                    { address: { [Op.iLike]: `%${query}%` } },
                    { phone: { [Op.iLike]: `%${query}%` } }
                ]
            },
            include: [
                { model: Region, as: "region" },
                { model: District, as: "district" },
                { model: VenueTypes, as: "venue_types" },
                { model: VenuePhoto, as: "photos" },
                { model: Seat, as: "seats" },
                { model: Event, as: "events" }
            ]
        });
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
