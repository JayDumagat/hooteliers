const {insertCard, findAllCards, findCardById, updateCard, deleteCard} = require('../services/iotCardService');

const createCard = async (req, res) => {
    const { roomId, nickname, cardSerial, status } = req.body;

    try {
        const card = await insertCard(roomId, nickname, cardSerial, status);
        res.status(201).json({
            message: "Card created successfully",
            card,
        });
    } catch (error) {
        res.status(500).json({
            message: "Unexpected error creating card",
            error: error.message,
        });
    }
}

const getAllCards = async (req, res) => {
    try {
        const cards = await findAllCards();
        res.status(200).json(cards);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching cards",
            error: error.message,
        });
    }
};

const getCardById = async (req, res) => {
    const { id } = req.params;
    try {
        const card = await findCardById(id);
        if (!card) {
            return res.status(404).json({ message: "Card not found" });
        }
        res.status(200).json(card);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching card",
            error: error.message,
        });
    }
};

const updateCardById = async (req, res) => {
    const { id } = req.params;
    const { roomId, nickname, cardSerial, status } = req.body;

    try {
        const card = await updateCard(id, roomId, nickname, cardSerial, status);
        res.status(200).json({
            message: "Card updated successfully",
            card,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating card",
            error: error.message,
        });
    }
};

const deleteCardById = async (req, res) => {
    const { id } = req.params;

    try {
        const card = await deleteCard(id);
        res.status(200).json({
            message: "Card deleted successfully",
            card,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting card",
            error: error.message,
        });
    }
};

module.exports = {
    createCard,
    getAllCards,
    getCardById,
    updateCardById,
    deleteCardById,
};