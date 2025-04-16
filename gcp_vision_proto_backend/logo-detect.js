const vision =  require('@google-cloud/vision');
const fs = require('fs');
// 
const express = require('express')
const app =express()
// 

const CREDENTIALS =JSON.parse(JSON.stringify({
    "type": "service_account",
    "project_id": "acsproject-386318",
    "private_key_id": "03fdf1e4a766649265183ee6062c91512c58c35a",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC7Cgjar6ZTrPpU\nskUJncAqDE+KlNk/bpnjeRSKCXm5NnloCvgi/5uUP5XtL3CTfGiL4p8hZqLG//5k\nzY/1WB8P6S/qx3U8/9HR1b/3SKT81lW0Q3foD7+uUgD1o9Yjw+nOobD3VQggJdF0\nBW2te19UYt4PL6JAgrPgNCQdfZOvtgCvsKUgfXoBeUmKEQ6Op8ZjV65fZ+MuxJc7\nELSmV9FJ9iwah+nd58z/BF8CDgeulUbLEzAta3226ch8ZfAo7kCXp+SVxyrSkWed\nhRmTgrDkSmcVsacjnUrm9oD0tMD7lOdeD5WJSPBtX7cC2mzWVMkBaLszqfb6vQtm\nH3Bw63dVAgMBAAECggEAVt07rHh7+gtxPQmH54XkW4LZJAap+HwgqxSt9cedyOck\nLi49/F8SfaCkPAHWuiBCm4i1l7kHav0zw9P2Ah8ZWfXVw6c7awdyBg5Lt4f829Gc\n/vmAg/1ga5B5Epuy1Wxktwq/2bYbbnax1jy5KaMM7G94KrxYEbbB3CPLDAkooCbN\nxtFGUNvOnh2il6Nd7kzk6Y+5YAoGD51uRI4aMzC4euvZ+taGZb8MQFpGtjDNPelV\n4OITXTMbC4UvWokXO0I00NItN2vwiwGYc2Drza+I31YXEfWez51fXi1NWCVow/ar\ns78kDvkfUeWwssOBySCRCKtEsCOL6OFUC+C0JgsgxwKBgQDyrgPvUEefAjVPLsL2\nT8bAwTj98961y7qaSZFsZTUrrAxpem4CBYKVIKvewtzpjzemNgjn19SaTGCgWWYi\nfazwnZWkS1t5Kg+1vZpn5uLzHhn6ks+evNtPArs1HIf5zjrE0qSQpOc5ucsgTbuz\nPQ+cOzDSJsHAUa6P7HrwjwUBnwKBgQDFTjFgBCnu4Zs8U1+1+7Xo7VRY7EMb5043\n/QVznm0VG2ft+mJjpvovRfw5Tg/0LwfNvR954HIzsHIYUoAk1k+y32M6LvubDvan\nWTzJocvW5haIEtOPOzERTAeflqoARZOAHf4rnpCnGmvLdh209GmdL0kWM4HW1K6j\n3wnqFeCqiwKBgQClSr1HXSjLNxfUTQdh+UhotbL51gcVUCRTPlScvfqPOmph1Y/k\nNJiStmQaICOTuYav4RIDx8/5IJiX3wxf5bXLVao8807koi99HB11M5/U8+XB9AkS\nF5RQpo2YSUyca0lAEjEgjBEqElA2OnvkQ2zEftRr7xX8xiXdxbae7ur8BQKBgB9o\n2EFhyE8oCS9sUmNFI+tlxLS3P+O0SeZt2C1UvibLCxt+baVRkqht6r4wqCeGSSa+\ngcFEMsn5v+ARWicDGwLtvv0nN5SyqB9x/FRY9ntKe7HD1XwKvz/yq5ADSyLp8JZH\nsAu/nWWMtjZYolgJRLrqKSdoobXSe87Ilep2+yILAoGAIW1pSSIA5XrEmK+mvryb\n8WmTCSVKUzqNcj7tngDhoVjvrUQba1wkiGhKa9wNI52NorpW8SI9r1FHlraoD5/2\nPLuZCU7YAdppW4QLoJpBUb5IQ9SIVrKX/N0R0d1fPqF9SNPB8lyZMv6CCv4TFPT6\nc63ieQEz1FM5LN+Gj7JazsQ=\n-----END PRIVATE KEY-----\n",
    "client_email": "visionapi@acsproject-386318.iam.gserviceaccount.com",
    "client_id": "106661148854014404114",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/visionapi%40acsproject-386318.iam.gserviceaccount.com"
  }));


  const CONFIG = {
         credentials:{  
            private_key:CREDENTIALS.private_key,
            client_email: CREDENTIALS.client_email
         }
  }
  const client = new vision.ImageAnnotatorClient(CONFIG)

//   app.get("/vision", async (req, res, filepath) => {
  const detectLogo = async(filepath) =>{  
    let [result] =await client.logoDetection(filepath);
    console.log(filepath);
    for (var i = 0; i < result.logoAnnotations.length; i++){
        console.log(result.logoAnnotations[i].description);
    }
    res.json({users:{"frame-1.jpg":["United Parcel Service", "Royal Dutch", "ferrari"], 
    "frame-2.jpg":["United Parcel Service", "Royal Dutch", "ferrari"]}})
}

var files = fs.readdirSync('.').filter(fn => fn.endsWith('.jpg'));
for (var i = 0; i < files.length; i++){
    detectLogo(files[i]);
}
// app.listen(5000, () => { console.log("server started on 5000") })