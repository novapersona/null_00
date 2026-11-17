const { District, Region, Venue, CustomerAddress } = require("../models");
const { validateDistrict, validateDistrictUpdate } = require("../validations/districtValidation");
const { Op } = require("sequelize");

exports.createDistrict = async (req, res) => {
    const { error } = validateDistrict(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const item = await District.create(req.body);
        res.status(201).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getDistricts = async (req, res) => {
    try {
        const items = await District.findAll({
            include: [
                { model: Region, as: "region" },
                { model: Venue, as: "venues" },
                { model: CustomerAddress, as: "customer_addresses" }
            ]
        });
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getDistrictById = async (req, res) => {
    try {
        const item = await District.findByPk(req.params.id, {
            include: [
                { model: Region, as: "region" },
                { model: Venue, as: "venues" },
                { model: CustomerAddress, as: "customer_addresses" }
            ]
        });
        if (!item) {
            return res.status(404).send({ message: "District not found" });
        }
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.updateDistrict = async (req, res) => {
    const { error } = validateDistrictUpdate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const item = await District.findByPk(req.params.id);
        if (!item) {
            return res.status(404).send({ message: "District not found" });
        }
        await item.update(req.body);
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.deleteDistrict = async (req, res) => {
    try {
        const item = await District.findByPk(req.params.id);
        if (!item) {
            return res.status(404).send({ message: "District not found" });
        }
        await item.destroy();
        res.status(200).send({ message: "District deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.searchDistricts = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).send({ message: "Search query is required" });
        }

        const items = await District.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.iLike]: `%${query}%` } }
                ]
            },
            include: [
                { model: Region, as: "region" },
                { model: Venue, as: "venues" },
                { model: CustomerAddress, as: "customer_addresses" }
            ]
        });
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
