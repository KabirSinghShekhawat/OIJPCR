const express = require('express')
const router = express.Router()
const volumeController = require('./../controllers/admin/volumeController')

router
  .route('/')
  .get(volumeController.volumes)

router
  .route('/:volume')
  .get(volumeController.getVolume)


module.exports = router