const { Sector, Seat } = require("../models");
const { validateSector, validateSectorUpdate } = require("../validations/sectorValidation");
const { Op } = require("sequelize");

exports.createSector = async (req, res) => {
    const { error } = validateSector(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const item = await Sector.create(req.body);
        res.status(201).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getSectors = async (req, res) => {
    try {
        const items = await Sector.findAll({
            include: [
                { model: Seat, as: "seats" }
            ]
        });
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getSectorById = async (req, res) => {
    try {
        const item = await Sector.findByPk(req.params.id, {
            include: [
                { model: Seat, as: "seats" }
            ]
        });
        if (!item) {
            return res.status(404).send({ message: "Sector not found" });
        }
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.updateSector = async (req, res) => {
    const { error } = validateSectorUpdate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const item = await Sector.findByPk(req.params.id);
        if (!item) {
            return res.status(404).send({ message: "Sector not found" });
        }
        await item.update(req.body);
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.deleteSector = async (req, res) => {
    try {
        const item = await Sector.findByPk(req.params.id);
        if (!item) {
            return res.status(404).send({ message: "Sector not found" });
        }
        await item.destroy();
        res.status(200).send({ message: "Sector deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.searchSectors = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).send({ message: "Search query is required" });
        }

        const items = await Sector.findAll({
            where: {
                [Op.or]: [
                    { sector_name: { [Op.iLike]: `%${query}%` } }
                ]
            },
            include: [
                { model: Seat, as: "seats" }
            ]
        });
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
