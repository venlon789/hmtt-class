import request from '@/utils/request'
export const getSuggestListApi = (q) => {
  return request({
    url: 'suggestion',
    params: {
      q
    }
  })
}
/**
 *获取搜索关键字
 * @param {page} 当前第几页，q
 * 为关键字
 * @returns
 */
// eslint-disable-next-line camelcase
export const getSearchResultApi = ({ page = 1, per_page, q }) => {
  return request({
    url: 'search',
    params: { page, per_page, q }
  })
}
