const slugify = require('slugify')
const Journal = require('../models/journal')
const catchAsync = require('../utils/catchAsync')

const css = 'admin.css'

exports.admin = catchAsync(async (request, response, next) => {
  const journals = await Journal.find({})
  const options = {
    title: 'Admin',
    css: css,
    journals: journals,
    isHomePage: false,
    slugify: slugify,
  }
  response.render('admin/admin', options)
})

exports.addJournal = catchAsync(async (request, response, next) => {
  const options = {
    title: 'Add New Journal',
    css: css,
    isHomePage: false,
  }
  response.render('admin/newJournal', options)
})

exports.postJournal = catchAsync(async (request, response, next) => {
  const { author, title, editordata, slug, volume } = request.body
  const newJournal = {
    author: author,
    title: title,
    content: editordata,
    slug: slug,
    volume: volume,
  }
  const journal = new Journal(newJournal)
  await journal.save()
  response.redirect('/admin')
})

exports.editJournal = catchAsync(async (request, response, next) => {
  const { id } = request.params
  const journal = await Journal.findById(id)
  const options = {
    title: 'Edit Journal',
    css: css,
    isHomePage: false,
    journal: journal,
  }
  response.render('admin/editJournal', options)
})

exports.putJournal = catchAsync(async (request, response, next) => {
  const { id } = request.params
  const { author, title, editordata, slug, volume } = request.body
  const updatedJournal = {
    author: author,
    title: title,
    content: editordata,
    slug: slug,
    volume: volume,
  }
  await Journal.findByIdAndUpdate(id, updatedJournal)
  response.redirect('/admin')
})

exports.deleteJournal = catchAsync(async (request, response, next) => {
  const { id } = request.params
  await Journal.findByIdAndDelete(id)
  response.redirect('/admin')
})

