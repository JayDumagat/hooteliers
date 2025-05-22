const express = require('express');
const router = express.Router();

const {createDevice, getAllDevices, getDeviceById, updateDeviceById, deleteDeviceById, validateIoTDevice} = require('../controllers/iotDeviceController');

router.post('/', createDevice);
router.get('/', getAllDevices);
router.get('/validate', validateIoTDevice);
router.get('/:id', getDeviceById);
router.put('/:id', updateDeviceById);
router.delete('/:id', deleteDeviceById);


module.exports = router;