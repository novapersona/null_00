const { SeatType, Seat } = require("../models");
const { validateSeatType, validateSeatTypeUpdate } = require("../validations/seatTypeValidation");
const { Op } = require("sequelize");

exports.createSeatType = async (req, res) => {
    const { error } = validateSeatType(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const item = await SeatType.create(req.body);
        res.status(201).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getSeatTypes = async (req, res) => {
    try {
        const items = await SeatType.findAll({
            include: [
                { model: Seat, as: "seats" }
            ]
        });
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getSeatTypeById = async (req, res) => {
    try {
        const item = await SeatType.findByPk(req.params.id, {
            include: [
                { model: Seat, as: "seats" }
            ]
        });
        if (!item) {
            return res.status(404).send({ message: "SeatType not found" });
        }
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.updateSeatType = async (req, res) => {
    const { error } = validateSeatTypeUpdate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const item = await SeatType.findByPk(req.params.id);
        if (!item) {
            return res.status(404).send({ message: "SeatType not found" });
        }
        await item.update(req.body);
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.deleteSeatType = async (req, res) => {
    try {
        const item = await SeatType.findByPk(req.params.id);
        if (!item) {
            return res.status(404).send({ message: "SeatType not found" });
        }
        await item.destroy();
        res.status(200).send({ message: "SeatType deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.searchSeatTypes = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).send({ message: "Search query is required" });
        }

        const items = await SeatType.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.iLike]: `%${query}%` } }
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
