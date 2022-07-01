import request from '@/utils/request'

/**
 *获取用户频道
 *
 * @returns Promise
 */
export const getMyChannels = () => {
  return request({
    url: 'user/channels'
  })
}
/**
 *获取文章列表
 * @param {*} param0
 * @returns
 */
// eslint-disable-next-line camelcase
export const getArticlesListApi = ({ channel_id, timestamp }) => {
  return request({
    url: 'articles',
    params: {
      channel_id,
      timestamp
    }
  })
}

/**
 *获取所以的频道列表数据
 * @returns promise
 */
export const getAllArticlesListApi = () => {
  return request({
    url: 'channels'
  })
}
/**
 *
 * @param {传入的查询参数} chennels
 * @returns Promise
 */
export const saveChennelsApi = (channels) => {
  return request({
    url: 'user/channels',
    method: 'PUT',
    data: { channels }

  })
}
