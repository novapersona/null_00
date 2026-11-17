const { Region, District, Venue, CustomerAddress } = require("../models");
const { validateRegion, validateRegionUpdate } = require("../validations/regionValidation");
const { Op } = require("sequelize");

exports.createRegion = async (req, res) => {
    const { error } = validateRegion(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const item = await Region.create(req.body);
        res.status(201).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getRegions = async (req, res) => {
    try {
        const items = await Region.findAll({
            include: [
                { model: District, as: "districts" },
                { model: Venue, as: "venues" },
                { model: CustomerAddress, as: "customer_addresses" }
            ]
        });
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getRegionById = async (req, res) => {
    try {
        const item = await Region.findByPk(req.params.id, {
            include: [
                { model: District, as: "districts" },
                { model: Venue, as: "venues" },
                { model: CustomerAddress, as: "customer_addresses" }
            ]
        });
        if (!item) {
            return res.status(404).send({ message: "Region not found" });
        }
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.updateRegion = async (req, res) => {
    const { error } = validateRegionUpdate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const item = await Region.findByPk(req.params.id);
        if (!item) {
            return res.status(404).send({ message: "Region not found" });
        }
        await item.update(req.body);
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.deleteRegion = async (req, res) => {
    try {
        const item = await Region.findByPk(req.params.id);
        if (!item) {
            return res.status(404).send({ message: "Region not found" });
        }
        await item.destroy();
        res.status(200).send({ message: "Region deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.searchRegions = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).send({ message: "Search query is required" });
        }

        const items = await Region.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.iLike]: `%${query}%` } }
                ]
            },
            include: [
                { model: District, as: "districts" },
                { model: Venue, as: "venues" },
                { model: CustomerAddress, as: "customer_addresses" }
            ]
        });
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
