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
