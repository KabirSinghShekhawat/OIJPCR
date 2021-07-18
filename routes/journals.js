const express = require('express')
const router = express.Router()
const journalsController = require('./../controllers/journalsController')

router.get('/', journalsController.journals)
router.get('/:volume', journalsController.journalByVolume)

router
  .route('/:id')
  .get(journalsController.getJournal)

router
  .route('/:slug/:id')
  .get(journalsController.getJournal)
  .post(journalsController.postComment)



module.exports = router