/**
 *
 * @param {获取数据} key
 * @returns
 */
export const getItem = (key) => {
  const res = window.localStorage.getItem(key)
  try {
    JSON.parse(res)
  } catch (err) {
    return res
  }
}
/**
 *设置
 * @param {*} key
 * @param {*} value
 */
export const setItem = (key, value) => {
  if (typeof value === 'object') {
    window.localStorage.setItem(key, JSON.stringify(value))
  } else {
    window.localStorage.setItem(key, value)
  }
}
/**
 *删除指定的
 * @param {*} key
 */
export const removeItem = (key) => {
  window.localStorage.removeItem(key)
}
/**
 * 清空所有的
 */
export const clearItem = () => {
  window.localStorage.clearItem()
}
