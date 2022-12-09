import AES from 'crypto-js/aes'
import Hex from 'crypto-js/enc-hex'
import SHA1 from 'crypto-js/sha1'
import ECB from 'crypto-js/mode-ecb'
import Pkcs7 from 'crypto-js/pad-pkcs7'
import Base64 from 'crypto-js/enc-base64'
import Utf8 from 'crypto-js/enc-utf8'
import JSEncrypt from './jsencrypt'
/**
 * aes加密
 * @param {加密字段} word
 * @param {秘钥} keyStr
 */
export const encryptAes = (word, keyStr) => {
  const realKey = getKey(keyStr)
  const encrypt = AES.encrypt(word, Hex.parse(realKey), {
    mode: ECB,
    padding: Pkcs7
  })
  return encrypt.ciphertext.toString(Base64)
}

/**
 * aes秘钥解密
 * @param {加密秘钥} key
 * 内部使用
 */
function getKey(key) {
  let realKey = SHA1(key)
  realKey = SHA1(realKey).toString().substring(0, 32) // 真正的key
  return realKey
}

/**
 * aes解密
 * @param {加密字段} word
 * @param {秘钥} keyStr
 */
export const decryptAes = (word, keyStr) => {
  let realKey = getKey(keyStr)
  const decrypt = AES.decrypt(
    {
      ciphertext: Base64.parse(word)
    },
    Hex.parse(realKey),
    {
      mode: ECB,
      padding: Pkcs7
    }
  )
  return decrypt.toString(Utf8)
}

/**
 * base64 加密
 * @param {加密字段} data
 */
export const encryptBase64 = data => Base64.stringify(Utf8.parse(data))

/**
 * base64 解密
 * @param {加密字段} word
 * @param {秘钥} keyStr
 */
export const decryptBase64 = data => Base64.parse(data).toString(Utf8)

/**
 * 公钥加密
 * @param {值} value
 * @param {公钥} publicKey
 */
export const encryptRsa = (value, publicKey) => {
  const encrypt = new JSEncrypt({
    default_key_size: 512
  })
  encrypt.setPublicKey(publicKey)
  var k = encrypt.getKey()
  let ct = ''
  // RSA每次加密117bytes，需要辅助方法判断字符串截取位置
  // 1.获取字符串截取点
  const bytes = new Array()
  bytes.push(0)
  let byteNo = 0
  const len = value.length
  let c
  let temp = 0
  for (let i = 0; i < len; i++) {
    c = value.charCodeAt(i)
    if (c >= 0x010000 && c <= 0x10ffff) {
      // 特殊字符，如Ř，Ţ
      byteNo += 4
    } else if (c >= 0x000800 && c <= 0x00ffff) {
      // 中文以及标点符号
      byteNo += 3
    } else if (c >= 0x000080 && c <= 0x0007ff) {
      // 特殊字符，如È，Ò
      byteNo += 2
    } else {
      // 英文以及标点符号
      byteNo += 1
    }
    if (byteNo % 117 >= 114 || byteNo % 117 == 0) {
      if (byteNo - temp >= 114) {
        bytes.push(i)
        temp = byteNo
      }
    }
  }

  // 2.截取字符串并分段加密
  if (bytes.length > 1) {
    for (let i = 0; i < bytes.length - 1; i++) {
      let str
      if (i == 0) {
        str = value.substring(0, bytes[i + 1] + 1)
      } else {
        str = value.substring(bytes[i] + 1, bytes[i + 1] + 1)
      }
      ct += addPreZero(k.encrypt(str), 512)
    }
    if (bytes[bytes.length - 1] != value.length - 1) {
      const lastStr = value.substring(bytes[bytes.length - 1] + 1)
      ct += addPreZero(k.encrypt(lastStr), 512)
    }
    return hex2b64(ct)
  }
  return encrypt.encrypt(value)
}

/**
 * 私钥解密
 * @param {值} value
 * @param {私钥} privateKey
 */
function decryptRsa(value, privateKey) {
  const encrypt = new JSEncrypt({
    default_key_size: 512
  })
  encrypt.setPrivateKey(privateKey)
  const k = encrypt.getKey()
  const maxLength = ((k.n.bitLength() + 7) >> 3) * 2
  let result = [],
    offSet = 0
  try {
    value = b64tohex(value)
    for (let i = 0; 0 < value.length - offSet; offSet = i * maxLength) {
      result = [...result, ...k.decrypt(value.substr(offSet, maxLength))]
      ++i
    }
    return pkcs1unpad2(result)
  } catch (ex) {
    return false
  }
}

var b64map = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
var b64pad = '='
function hex2b64(h) {
  var i
  var c
  var ret = ''
  for (i = 0; i + 3 <= h.length; i += 3) {
    c = parseInt(h.substring(i, i + 3), 16)
    ret += b64map.charAt(c >> 6) + b64map.charAt(c & 63)
  }
  if (i + 1 == h.length) {
    c = parseInt(h.substring(i, i + 1), 16)
    ret += b64map.charAt(c << 2)
  } else if (i + 2 == h.length) {
    c = parseInt(h.substring(i, i + 2), 16)
    ret += b64map.charAt(c >> 2) + b64map.charAt((c & 3) << 4)
  }
  while ((ret.length & 3) > 0) {
    ret += b64pad
  }
  return ret
}
// convert a base64 string to hex
function b64tohex(s) {
  var ret = ''
  var i
  var k = 0 // b64 state, 0-3
  var slop = 0
  for (i = 0; i < s.length; ++i) {
    if (s.charAt(i) == b64pad) {
      break
    }
    var v = b64map.indexOf(s.charAt(i))
    if (v < 0) {
      continue
    }
    if (k == 0) {
      ret += int2char(v >> 2)
      slop = v & 3
      k = 1
    } else if (k == 1) {
      ret += int2char((slop << 2) | (v >> 4))
      slop = v & 0xf
      k = 2
    } else if (k == 2) {
      ret += int2char(slop)
      ret += int2char(v >> 2)
      slop = v & 3
      k = 3
    } else {
      ret += int2char((slop << 2) | (v >> 4))
      ret += int2char(v & 0xf)
      k = 0
    }
  }
  if (k == 1) {
    ret += int2char(slop << 2)
  }
  return ret
}
var BI_RM = '0123456789abcdefghijklmnopqrstuvwxyz'
function int2char(n) {
  return BI_RM.charAt(n)
}

/**
 * 转换byte
 * @param {值} byte [191,192,193]
 * @return {字符} 字符
 */
function pkcs1unpad2(b) {
  var ret = ''
  var i = -1
  while (++i < b.length) {
    var c = b[i] & 255
    if (c < 128) {
      // utf-8 decode
      ret += String.fromCharCode(c)
    } else if (c > 191 && c < 224) {
      ret += String.fromCharCode(((c & 31) << 6) | (b[i + 1] & 63))
      ++i
    } else {
      ret += String.fromCharCode(((c & 15) << 12) | ((b[i + 1] & 63) << 6) | (b[i + 2] & 63))
      i += 2
    }
  }
  return ret
}

function addPreZero(num, length) {
  var t = (num + '').length,
    s = ''
  for (var i = 0; i < length - t; i++) {
    s += '0'
  }
  return s + num
}

export default {
  encryptAes,
  decryptAes,
  encryptBase64,
  decryptBase64,
  encryptRsa,
  decryptRsa
}
