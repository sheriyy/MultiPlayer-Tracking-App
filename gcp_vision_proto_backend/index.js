const Video = require("@google-cloud/video-intelligence").v1;
const fs = require("fs");
const express = require("express");
const getFrames = require("./getFrames");
const app = express();

const cors = require("cors");
app.use(cors());

const vision = require("@google-cloud/vision");

const CREDENTIALS = JSON.parse(
  JSON.stringify({
    type: "service_account",
    project_id: "video-intelligence-415114",
    private_key_id: "be95d8f8fcb5da31b06d51533e64d7a738e38df2",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCoNRCGCvn3j0KM\nP7hmRDrZBsQHP5tkzM/9fxFIcLJ2/r1D1618AvGgBZLO+F1UGRNqPPHlFaGnU2DK\nU5SQeBgv4Wk8rP52yTVSYfv/gvJnwuLWy1So/5O9s2L3LD9YYQZB2/t+c+jdbccA\n+3x2cWH51RpZXCpckZMOmZaVp1ZYMwbmY+fkgyXgNvcBZL4XfIA02PAii78DzSYp\ntTxARnkj3EcGdHYZp9St6TpVkKGdd7FnmkoFcj/4akzoSj/FF2M4aGNdDtCSSnnH\nztoFXb+wRXBtFurLdY8Liit8jRWyg+Q06B04g7OTQG+3t85YSOmYAVvBoh59fhdz\ntUrBfhaTAgMBAAECggEAEEdWaoqMZ3t7VsRh7a/DvDYt6X+r48T4ihFulEKn2uFL\nYtHwLbTBOpnfe91IdveYS+tLA78krmNg1iPhmFuvB486lo8tb0SIvwjRkQhUulr/\nhgcWkeZuH2lJdh9XoA9/wgbun23LRwa1QDCWeoX9k+aeTrCfPuctwrd1fdU8g3uA\nhVbISJt2LoeQStHt3D3eERqyRc1tFXJ7+aCzpXHbqYARUMjNLX8T0C24MvTzoQMh\nr0Hj31pYssRkVzEDvZ6ZpwhSIe/xatvyVCnvE42Om8MGJPiRAXim0XKUNRptfrxu\n31F1j3aiMmFkyzK+7KhKaHa98aYG26qMaqRM/mkp8QKBgQDZclhiAuH35Q/sJLI7\nSzOCsH8vTnDWbEfyhdCJqJ+2Af7yZLjX8KplJ9gf8F1Uti5g32FG8vik4OK1bPpv\n62PMDirAo08m3QW8ennHqFNNJ/k/z5WG4CC9yhU4CeDas1g3LWRfCzWDtU2BSuF5\nZ7n1RIvjjhsDh7z1rWLpBsF5sQKBgQDGB8zlOOyQuoWjsyznQPGxk2pY5RHPtqMd\nEq5/7m5Pj0IadHtNLj88Arm5EupCwPOYuaTLkFEeuuTODHEDTq3Jl77j68Zt9Y0u\nzB70t7XHvsglt7E4kXpNd7qCfFq20pz4LKew0e/QC6fuODkS82AHuuwjr7RfKj/y\nrxrBrt0hgwKBgQDUQ5nhe1zop5OGej/+P6e18OMG4/SkbClDprruVkwp2QLtzcLf\nERDVFDMW4oXJFtppOEX2g2KTWPAWGJ7UOB1Aaaf0SrcOgf2CgrB0ZW2DyPy3/MTD\nV/C+NBHIlWQJOb9ohYgQe5muy4IwL0+xOr89nL9N0D+wj4W28Z23Sh/90QKBgFXn\n4Fy32vfV0k93VM1lAPQ1rPavOJDQ++WKyyQ4PKZK0TREv5B1tXzE+ehtai5XIdVp\nAzJDgs0/6i3we74hjYZcS7T3/PaKhRp99hfW8gaanpyuGTUe9t1QSRp986RHrUyD\noqM0D0JDLDBNN4UfCtOPpQy+FhMKcv9GMuc+gjMdAoGAPZgyV9gO6Kki6XdwvtUS\n3rZQxiWIB+O+U9W/9SRsfFY1cKTpIHs1NxOG+71tMkK4nmhjzkVKYgqD7mLyJuV2\nMpudZwrhU9c1TZ+T1CbGSc01wgElTrSIIXNZwgmVFGzBJn5swo22Uu1OK8b4NDNx\nhd3dI81H9TOj/v03/iKtHFE=\n-----END PRIVATE KEY-----\n",
    client_email:
      "video-intelligence-demo@video-intelligence-415114.iam.gserviceaccount.com",
    client_id: "108463604914896330497",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/video-intelligence-demo%40video-intelligence-415114.iam.gserviceaccount.com",
    universe_domain: "googleapis.com",
  })
);

const CONFIG = {
  credentials: {
    private_key: CREDENTIALS.private_key,
    client_email: CREDENTIALS.client_email,
  },
};
const client = new vision.ImageAnnotatorClient(CONFIG);

const video = new Video.VideoIntelligenceServiceClient();

const path = "./f1-logo-vid.mp4";
const file = fs.readFileSync(path);
const inputContent = file.toString("base64");

app.use(express.static("images"));

app.get("/videoIntelligence", async (req, res) => {
  console.log("START", new Date().toLocaleString());
  console.log("request received. Processing...");
  const request = {
    inputContent: inputContent,
    features: ["PERSON_DETECTION"],
    videoContext: {
      personDetectionConfig: {
        includeBoundingBoxes: true,
        includePoseLandmarks: true,
        includeAttributes: true,
      },
    },
  };

  const offsetValue = [];

  const [operation] = await video.annotateVideo(request);
  const results = await operation.promise();
  console.log("Waiting for operation to complete...");

  const personAnnotations =
    results[0].annotationResults[0].personDetectionAnnotations;

  for (const { tracks } of personAnnotations) {
    console.log("Person detected:");

    for (const { segment, timestampedObjects } of tracks) {
      console.log(
        `\tStart: ${segment.startTimeOffset.seconds}` +
          `.${(segment.startTimeOffset.nanos / 1e6).toFixed(0)}s`
      );
      console.log(
        `\tEnd: ${segment.endTimeOffset.seconds}.` +
          `${(segment.endTimeOffset.nanos / 1e6).toFixed(0)}s`
      );
      const [firstTimestampedObject] = timestampedObjects;

      if (firstTimestampedObject.attributes.length > 1) {
        console.log("Real person, take the screenshot now!");
        offsetValue.push(
          parseInt(segment.startTimeOffset.seconds) * 1000 +
            parseInt((segment.startTimeOffset.nanos / 1e6).toFixed(0)) +
            50
        );
        //  console.log("final", (offsetValue));
      } else {
        console.log("Not useful, ignore this");
      }
    }
  }
  await getFrames(offsetValue);
  console.log("final", offsetValue);

  res.json({
    files: [
      "frame-1.jpg",
      "frame-2.jpg",
      "frame-3.jpg",
      "frame-4.jpg",
      "frame-5.jpg",
    ],
  });

  console.log("END", new Date().toLocaleString());
});

const detectLogo = async (filepath) => {
  const [result] = await client.logoDetection(`./images/${filepath}`);
  return result.logoAnnotations.map((logo) => logo.description);
};

app.get("/vision", async (req, res) => {
  const files = fs.readdirSync("./images").filter((fn) => fn.endsWith(".jpg"));
  const logoResults = {};

  for (const file of files) {
    const logos = await detectLogo(file);
    logoResults[file] = logos;
  }

  res.json({ users: logoResults }); //DYNAMICALLY send detected logos
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
