import request from '@/utils/request'
// type是a或c评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
// source是源id，文章id或评论id
// offset获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
// limit否获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
export const getCommentsApi = ({ type, source, offset, limit }) => {
  return request({
    url: 'comments',
    params: { type, source, offset, limit }
  })
}

export const addLikeApi = (target) => {
  return request({
    url: 'comment/likings',
    method: 'POST',
    data: {
      target
    }
  })
}
export const delLikeApi = (target) => {
  return request({
    url: `comment/likings/${target}`,
    method: 'DELETE'
  })
}

export const addCommentApi = (data) => {
  return request({
    url: 'comments',
    method: 'POST',
    data
  })
}
