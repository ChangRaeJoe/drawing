// base64로 전송된 이미지코드 저장, 연습/응용

const fs = require('fs')
var uniqueFilename = require('unique-filename')
const path = require('path')

function validExt(ext) {
  const exts = ['jpg', 'png', 'jpeg', 'gif']
  let tf = false
  exts.forEach(e =>{
    if(e === ext) {
      tf = true
    }
  })
  return tf
}
function base64ToAscii(imgBase64) {
  const regex = /^data:.+\/(.+);base64,(.*)$/;
  var matches = imgBase64.match(regex);
  
  const obj = {
    ext: matches[1],
    data: Buffer.from(matches[2], 'base64')
  }
  return obj
}

function makeRandPath(obj, defaultFilename=undefined) {
  const {ext} = obj
  if(!validExt(ext)) return undefined

  const basePath = '/img/iboard/'
  const pathName = `${__dirname}/../public${basePath}`

  if(defaultFilename === undefined) {
      const uniquePath = uniqueFilename(pathName, 'imging') + `.${ext}`
      const filename = path.basename(uniquePath)
      return {
        basePath,
        uniquePath,
        filename
      }
  } else {
      return {
        basePath,
        uniquePath: pathName + defaultFilename + `.${ext}`,
        defaultFilename
      }
  }
}

function imgFileWrite(path, obj) {
  const allPath = path.uniquePath
  const writeBufferData = obj.data
  fs.writeFileSync(allPath, writeBufferData);
}

function imgTobase64(binBuf) {
  return binBuf.toString('base64')
}

module.exports = {
  base64ToAscii: base64ToAscii,
  imgTobase64: imgTobase64,
  makeRandPath: makeRandPath,
  imgFileWrite:imgFileWrite
}
