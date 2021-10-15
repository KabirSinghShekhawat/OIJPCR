// const path = require('path')
// console.log(path.join(__dirname, '.env'));
// const envPath = {
//   path: path.join(__dirname, '.env')
// }

const configObj = require('dotenv').config()


if (configObj.error) throw configObj.error

const aws = require('aws-sdk')

aws.config.update({
  accessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: process.env.AWS_REGION
})

const s3 = new aws.S3();

module.exports={
  aws,
  s3,
  s3bucket: process.env.S3_BUCKET
}
