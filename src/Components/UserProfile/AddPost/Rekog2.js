const Rekognition = require('node-rekognition')
const AWS = require('aws-sdk')
const S3 = require('./S3')

const AWSParameters = {
    "accessKeyId": process.env.ACCESS_KEY_ID,
    "secretAccessKey": process.env.SECRET_ACCESS_KEY,
    "region": process.env.AWS_REGION,
    "bucket": process.env.S3_BUCKET,
   
}

module.exports = class Rekognition {
    constructor(AWSParameters) {
        this.rekognition = new AWS.Rekognition({
            accessKeyId: AWSParameters.accessKeyId,
            secretAccessKey: AWSParameters.secretAccessKey,
            region: AWSParameters.region
        })

        this.s3 = new S3(AWSParameters)
        this.bucket = AWSParameters.bucket
    }

    /**
     * Upload image or images array to S3 bucket into specified folder
     *
     * @param {Array.<string>|string} imagePaths
     * @param {string} folder a folder name inside your AWS S3 bucket (it will be created if not exists)
     */
    async uploadToS3(imagePaths, folder) {
        if (Array.isArray(imagePaths))
            return await this.s3.uploadMultiple(imagePaths, folder)
        else
            return await this.s3.upload(imagePaths, folder)
    }

    /**
     * Do the request to AWS Rekognition
     *
     * @param {string} endpoint
     * @param {Object} params
     */
    doCall(endpoint, params) {
        return new Promise((resolve, reject) => {
            this.rekognition[endpoint](params, function (err, data) {
                if (err) {
                    reject(err)
                }
                else
                    resolve(data)
            })
        })
    }

    /**
     * Utility to get image params for s3 object or Bytes
     *
     * @param {Object|Buffer} image
     * @return {Object} image params for Rekognition
     */

    getImageParams(image) {
        return image instanceof Buffer
            ? {
                Bytes: image
            }
            : {
                S3Object: {
                    Bucket: this.bucket,
                    Name: image.Key
                }
            };
    }

    /**
     * Detects instances of real-world labels within an image
     *
     * @param {Object|Buffer} image
     * @param {string} threshold
    */
    async detectLabels(image, threshold = 50) {
        const params = {
            Image: this.getImageParams(image),
            MaxLabels: 4096,
            MinConfidence: threshold
        }

        return await this.doCall('detectLabels', params)
    }
 



    /**
     * Detects explicit or suggestive adult content in image
     *
     * @param {Object|Buffer} image
     * @param {number} threshold
     */
    async detectModerationLabels(image, threshold = 50) {
        const params = {
            Image: this.getImageParams(image),
            MinConfidence: threshold
        }

        return await this.doCall('detectModerationLabels', params)
    }

  
    
}