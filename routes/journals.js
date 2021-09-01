const express = require('express')
const router = express.Router()
const journalController = require('./../controllers/journalsController')

router.get('/', journalController.journals)
router.get('/home/:limit', journalController.journalsByLimit)
router.get('/tags/:tag', journalController.journalsByTag)
router.get('/tags', journalController.tags)
router.get('/all/:volume/:full', journalController.journalsByVolume)
router.get('/limit/:volume/:limit', journalController.getLimitedJournalsByVolume)
router.get('/archive', journalController.archive)

router
  .route('/:id')
  .get(journalController.getJournal)

router
  .route('/:slug/:id')
  .get(journalController.getJournal)



module.exports = router