import server from '@/api/mock/server'

export const dataApi = {
  getData: async () => {
    const { data } = await server.get('/data')
    return data
  }
}

export const productApi = {
  getProduct: async () => {
    const { data } = await server.get('/product')
    return data
  }
}
export const commentApi = {
  getComment: async () => {
    const { data } = await server.get('/comment')
    return data
  }
}
