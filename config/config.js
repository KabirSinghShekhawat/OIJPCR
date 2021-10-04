const path = require('path')
console.log(path.join(__dirname, '/config/.env'));
const envPath = {
  path: path.join(__dirname, '/config/.env')
}

const configObj = require('dotenv').config(envPath)


if (configObj.error) throw configObj.error

const aws = require('aws-sdk')

aws.config.update({
  accessKey: configObj.parsed.AWS_SECRET_ACCESS_KEY,
  accessKeyId: configObj.parsed.AWS_ACCESS_KEY_ID,
  region: configObj.parsed.AWS_REGION
})

const s3 = new aws.S3();

module.exports={
  aws,
  s3,
  s3bucket: configObj.parsed.S3_BUCKET
}