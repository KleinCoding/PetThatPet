const aws = require("aws-sdk");
const { S3_BUCKET, AWS_REGION } = process.env;
aws.config.region = AWS_REGION;

const getSigned = (req, res) => {
  const s3 = new aws.S3();
  const { fileName, fileType } = req.query;
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: `userPhotos/${fileName}`,
    Expires: 60,
    ContentType: fileType,
    ACL: "public-read"
  };
  s3.getSignedUrl("putObject", s3Params, (err, data) => {
    if (err) {
      console.log("S3 Signed Request Error:", err);
      res.status(500).json({ message: "Error uploading photo" });
    } else {
      const returnData = {
        signedRequest: data,
        url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
      };
      res.status(200).json(returnData);
    }
  });
};

const doTheThing = (req, res) => {
  const rekognition = new aws.Rekognition();
  const { fileName } = req.query;
  const rekogParams = {
    Image: {
      S3Object: {
        Bucket: S3_BUCKET,
        Name: `userPhotos/${fileName}`
      }
    },
    MaxLabels: 25,
    MinConfidence: 80
  };
  rekognition.detectLabels(rekogParams, (err, data) => {
    if (err) {
      console.log(err, err.stack);
    } else {
      const returnData = data;
      console.log("Labels returned")
      res.status(200).json(returnData)
    }
  });
};
module.exports = {
  getSigned,
  doTheThing
};
