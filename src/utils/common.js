import dayjs from 'dayjs'
import { productsList } from './localStorage'

//倒數天數
export const countDown = (id) => {
  const products = productsList()
  const product = products.find((product) => product.id === id)
  let diffDays = null
  const targetDate = dayjs(product.date)
  const today = dayjs()
  diffDays = targetDate.diff(today, 'day')
  return diffDays
}
