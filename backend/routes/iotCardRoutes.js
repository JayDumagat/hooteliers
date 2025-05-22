const  express = require('express');
const router = express.Router();

const {createCard, getAllCards, getCardById, updateCardById, deleteCardById} = require('../controllers/iotCardController');


router.post('/', createCard);
router.get('/', getAllCards);
router.get('/:id', getCardById);
router.put('/:id', updateCardById);
router.delete('/:id', deleteCardById);

module.exports = router;