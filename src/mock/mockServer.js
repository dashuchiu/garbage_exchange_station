import Mock from 'mockjs'

import data from './data.json'
import product from './product.json'

Mock.mock('/mock/data', {
  code: 200,
  data
})

Mock.mock('/mock/product', {
  code: 200,
  data: product
})
