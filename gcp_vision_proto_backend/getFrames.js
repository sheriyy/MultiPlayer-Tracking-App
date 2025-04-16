const extractFrames = require('ffmpeg-extract-frames')
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);

 async function getFrames(offsetValue) { 

    await extractFrames({
        input: 'f1-logo-vid.mp4',
        // output: '../gcp_vision_proto/src/images/frame-%i.jpg',
        // commented
        output: './images/frame-%i.jpg',
        offsets: offsetValue,
      })
  }
  module.exports = getFrames;
