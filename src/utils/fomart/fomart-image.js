import utils from '@/utils'
/**
 * 验证图片
 * @param {*} url
 */
export const isImage = url => /^(https?:)?\/\/|data:image/.test(url)
// 图片转换
export const imageFilter = value => {
  return process.env.VUE_APP_ONLINE_IMAGE + value + '.png'
}
// 远程图片链接
export function imageFetch(imageName) {
  return process.env.VUE_APP_ONLINE_IMAGE + imageName
}
// 默认图片
export const defaultImg = (value, type) => {
  let obj = {
    user_avatar: require('images/common/default_avatar_tourist@2x.png')
  }
  if (utils.isNull(value)) {
    return obj[type]
  } else {
    return value
  }
}
