function createFileName (originalName, mimeType) {
  let fileExtension = mimeType.split('/')[1]
  let splitString = fileExtension
  // ** mime-type for both .jpg and .jpeg is jpeg
  // ** but splitter must be different based on fileName.
  if (fileExtension === 'jpeg') splitString = '.jpg'
  else splitString = '.' + splitString

  const uniqueSuffix = Date.now().toString() + '_' + Math.round(Math.random() * 1E6)
  let prefix = originalName.split(splitString)[0]
  // prefix = prefix.replaceAll(" ", "_")

  return (`${prefix}_${uniqueSuffix}.${fileExtension}`)
}

module.exports = createFileName