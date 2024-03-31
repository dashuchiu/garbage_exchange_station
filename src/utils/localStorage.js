export const setLang = (locale) => {
  localStorage.setItem('locale', locale)
}
export const getLang = () => {
  return localStorage.getItem('locale')
}
//記住我
export const setRememberMe = (key, value) => {
  return localStorage.setItem(key, value)
}
export const getRememberMe = (key, value) => {
  return localStorage.getItem(key, value)
}
export const removeRememberMe = (key) => {
  return localStorage.removeItem(key)
}
//getUserInfo
export const getUsrtInfo = () => {
  return JSON.parse(localStorage.getItem('user')) || []
}

//productsList
export const productsList = () => {
  return JSON.parse(localStorage.getItem('products'))?.products || []
}

// 收藏
export const setCollection = (product) => {
  localStorage.setItem('collection', JSON.stringify(product))
}
export const getCollection = (product) => {
  return JSON.parse(localStorage.getItem('collection', product)) || []
}
export const removeCollection = (product) => {
  localStorage.removeItem('collection', product)
}

// 背景
export const setTheme = (theme) => {
  localStorage.setItem('theme', theme)
}
export const getTheme = () => {
  return localStorage.getItem('theme') || 'light'
}
