const {Card, Room, sequelize} = require('../models');

const insertCard = async (roomId, nickname, cardSerial, status) => {
    const transaction = await sequelize.transaction();
    
    try {
        const card = await Card.create(
            {
                roomId,
                nickname,
                cardSerial,
                status
            },
            { transaction }
        );

        await transaction.commit();
        return card;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}

const findAllCards = async () => {
    try {
        const cards = await Card.findAll(
            {
                include: [
                    {
                        model: Room,
                        as: 'room',
                        attributes: ['id', 'roomNumber'],
                    }
                ],
                order: [['createdAt', 'DESC']],
            }
        );
        return cards;
    } catch (error) {
        console.error("Error fetching cards:", error);
        throw error;
    }
}

const findCardById = async (id) => {
    try {
        const card = await Card.findByPk(id, {
            include: [
                {
                    model: Room,
                    as: 'room',
                    attributes: ['id', 'roomNumber'],
                }
            ]
        });
        return card;
    } catch (error) {
        console.error("Error fetching card:", error);
        throw error;
    }
}

const findCardBySerial = async (cardSerial) => {
   //check if cardSerial is registered and has active status
    try {
        const card = await Card.findOne({
            where: { cardSerial, status: 'active' },
        });
        return card;
    } catch (error) {
        console.error("Error fetching card by serial:", error);
        throw error;
    }
};


const updateCard = async (id, roomId, nickname, cardSerial, status) => {
    const transaction = await sequelize.transaction();

    try {
        const card = await Card.findOne({
            where: { id },
        });

        if (!card) {
            throw new Error('Card not found');
        }

        card.roomId = roomId;
        card.nickname = nickname;
        card.cardSerial = cardSerial;
        card.status = status;

        await card.save({ transaction });
        await transaction.commit();
        return card;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

const deleteCard = async (id) => {
    const transaction = await sequelize.transaction();

    try {
        const card = await Card.findOne({
            where: { id },
        });

        if (!card) {
            throw new Error('Card not found');
        }

        await card.destroy({ transaction });
        await transaction.commit();
        return card;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}

module.exports = {
    insertCard,
    findAllCards,
    findCardBySerial,
    findCardById,
    updateCard,
    deleteCard  
};