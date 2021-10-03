const express = require('express')
const router = express.Router()
const volumeController = require('../../controllers/admin/volumeController')

router
  .route('/')
  .get(volumeController.volumes)
  .post(volumeController.createVolume)
  .patch(volumeController.editVolume)
  .delete(volumeController.deleteVolume)


router
  .route('/:volume')
  .get(volumeController.getVolume)


module.exports = router