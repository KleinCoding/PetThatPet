// http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Rekognition.html
/*
detectFaces
detectLabels
detectModerationLabels
recognizeCelebrities
*/
var aws = require("aws-sdk");





function doProcess(img) {
const path = require("path");
var fs = require('fs');
  require("dotenv").config();

  var aws = require("aws-sdk");
  var creds = new aws.Credentials(
    process.env.ACCESS_KEY_ID,
    process.env.SECRET_ACCESS_KEY
  );

  var myConfig = new aws.Config({
    region: "us-east-2",
    credentials: creds,
  });

  let recog = new aws.Rekognition(myConfig);
  let params = {
    Image: {
      S3Object: {
        Bucket: "pet-that-pet",
        Name: img
      }
    },
    MaxLabels: 25,
    MinConfidence: 80
  };

  let labels = new Promise((resolve, reject) => {
    recog.detectLabels(params, function(err, data) {
      if (err) reject(err);
      resolve(data);
    });
  });
  let modlabels = new Promise((resolve, reject) => {
    recog.detectModerationLabels(params, function(err, data) {
      if (err) reject(err);
      resolve(data);
    });
  });

  return new Promise((resolve, reject) => {
    console.log("Attempting Amazon recog");
    Promise.all([labels, modlabels]).then(values => {
        console.log(values)
      let labels = values[0];
      let modlabels = values[1];
      let result = {
        labels: labels,
        modlabels: modlabels
      };
      console.log("resolving from amazon");
      resolve({ amazon: result });
    });
  });
}

module.exports = { doProcess };

////////////////REKOGNITION NOTES
//detectLabels(params = {}, callback) ⇒ AWS.Request

/* This operation detects labels in the supplied image */

//  var params = {
//     Image: {
//      S3Object: {
//       Bucket: "pet-that-pet",
//       Name: "userPhotos/"
//      }
//     },
//     MaxLabels: 10,
//     MinConfidence: 80
//    };
//    rekognition.detectLabels(params, function(err, data) {
//      if (err) console.log(err, err.stack); // an error occurred
//      else     console.log(data);           // successful response

/*
     data = {
      Labels: [
         {
        Confidence: 99.25072479248047, 
        Name: "People"
       }, 
         {
        Confidence: 99.25074005126953, 
        Name: "Person"
       }
      ]
     }
     */
//    });

//    var params = {
//     Image: { /* required */
//       Bytes: Buffer.from('...') || 'STRING_VALUE' /* Strings will be Base-64 encoded on your behalf */,
//       S3Object: {
//         Bucket: 'STRING_VALUE',
//         Name: 'STRING_VALUE',
//         Version: 'STRING_VALUE'
//       }
//     },
//     MaxLabels: 'NUMBER_VALUE',
//     MinConfidence: 'NUMBER_VALUE'
//   };
//   rekognition.detectLabels(params, function(err, data) {
//     if (err) console.log(err, err.stack); // an error occurred
//     else     console.log(data);           // successful response
//   });

/////https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Rekognition.html   -- detectLabels
/////https://docs.aws.amazon.com/rekognition/latest/dg/API_DetectLabels.html

//Can also check out detectModerationLabels
