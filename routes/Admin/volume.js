const express = require('express')
const router = express.Router()
const volumeController = require('../../controllers/admin/volumeController')

router
  .route('/')
  .get(volumeController.volumes)
  .post(volumeController.createVolume)


router
  .route('/:volume')
  .get(volumeController.getVolume)
  .patch(volumeController.editVolume)
  .delete(volumeController.deleteVolume)


module.exports = router