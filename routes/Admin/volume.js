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
router
  .route('/:volume/:imageName')
  .delete(volumeController.deleteVolume)


module.exports = router