import request from '@/utils/request'
export const getArticleApi = (article_id) => {
  return request({
    url: `/articles/${article_id}`
  })
}
export const addUserApi = (target) => {
  return request({
    url: 'user/followings',
    method: 'POST',
    data: {
      target
    }
  })
}
export const delUserApi = (target) => {
  return request({
    url: `user/followings/${target}`,
    method: 'DELETE'
  })
}

export const addCollectApi = (target) => {
  return request({
    url: 'article/collections',
    method: 'POST',
    data: {
      target
    }
  })
}
export const delCollectApi = (target) => {
  return request({
    url: `article/collections/${target}`,
    method: 'DELETE'
  })
}
