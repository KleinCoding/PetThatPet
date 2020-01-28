

export function doTheThing() {
var aws = require("aws-sdk");
var creds = new aws.Credentials({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

var myConfig = new aws.Config({
  region: "us-east-2",
  credentials: creds
});

let rekognition = new aws.Rekognition(myConfig);
let params = {
  Image: {
    S3Object: {
      Bucket: "pet-that-pet",
      Name: "userPhotos/user3-post5.jpeg"
    }
  },

  MaxLabels: 25,
  MinConfidence: 80
};

rekognition.detectLabels(params, function(err, data) {
    console.log(myConfig, creds, params, process.env.AWS_ACCESS_KEY_ID, process.env.AWS_SECRET_ACCESS_KEY )
  if (err) console.log(err, err.stack);
  // an error occurred
  else console.log(data); // successful response
})}
