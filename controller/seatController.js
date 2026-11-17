const { Seat, Venue, Sector, SeatType, Ticket } = require("../models");
const { validateSeat, validateSeatUpdate } = require("../validations/seatValidation");
const { Op } = require("sequelize");

exports.createSeat = async (req, res) => {
    const { error } = validateSeat(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const item = await Seat.create(req.body);
        res.status(201).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getSeats = async (req, res) => {
    try {
        const items = await Seat.findAll({
            include: [
                { model: Venue, as: "venue" },
                { model: Sector, as: "sector" },
                { model: SeatType, as: "seat_type" },
                { model: Ticket, as: "tickets" }
            ]
        });
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getSeatById = async (req, res) => {
    try {
        const item = await Seat.findByPk(req.params.id, {
            include: [
                { model: Venue, as: "venue" },
                { model: Sector, as: "sector" },
                { model: SeatType, as: "seat_type" },
                { model: Ticket, as: "tickets" }
            ]
        });
        if (!item) {
            return res.status(404).send({ message: "Seat not found" });
        }
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.updateSeat = async (req, res) => {
    const { error } = validateSeatUpdate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const item = await Seat.findByPk(req.params.id);
        if (!item) {
            return res.status(404).send({ message: "Seat not found" });
        }
        await item.update(req.body);
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.deleteSeat = async (req, res) => {
    try {
        const item = await Seat.findByPk(req.params.id);
        if (!item) {
            return res.status(404).send({ message: "Seat not found" });
        }
        await item.destroy();
        res.status(200).send({ message: "Seat deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.searchSeats = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).send({ message: "Search query is required" });
        }

        const whereClause = !isNaN(query) ? { id: query } : {};
        const items = await Seat.findAll({
            where: whereClause,
            include: [
                { model: Venue, as: "venue" },
                { model: Sector, as: "sector" },
                { model: SeatType, as: "seat_type" },
                { model: Ticket, as: "tickets" }
            ]
        });
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
