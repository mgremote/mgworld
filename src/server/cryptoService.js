const crypto = require('crypto')
const config = require('config')

const { app: { key, alg, iv } } = config
const ivBuf = Buffer.from(iv)
const keyBuf = Buffer.from(key)

function encrypt (text) {
  const cipher = crypto.createCipheriv(alg, keyBuf, ivBuf)
  let encryptedText = cipher.update(text, 'utf8', 'hex')
  encryptedText += cipher.final('hex')
  return encryptedText
}

function decrypt (encryptedText) {
  const decipher = crypto.createDecipheriv(alg, keyBuf, ivBuf)
  let decryptedText = decipher.update(encryptedText, 'hex', 'utf8')
  decryptedText += decipher.final('utf8')
  return decryptedText
}

module.exports = {
  encrypt,
  decrypt
}
