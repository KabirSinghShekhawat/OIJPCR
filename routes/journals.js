const express = require('express')
const router = express.Router()
const journalController = require('./../controllers/journalsController')

router.get('/', journalController.journals)
router.get('/all/:volume', journalController.journalByVolume)

router.get('/archive', journalController.archive)

router
  .route('/:id')
  .get(journalController.getJournal)

router
  .route('/:slug/:id')
  .get(journalController.getJournal)



module.exports = router