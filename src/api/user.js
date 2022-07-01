import request from '@/utils/request'

/**
 *获取短信验证码
 * @param {number} data
 * @returns Promise
 */
export const getSmsCodeApi = (data) => {
  return request({
    url: `/sms/codes/${data}`
  })
}
/**
 *
 * @param {mobile,code} param0
 * @returns Promise
 */
export const loginApi = ({ mobile, code }) => {
  return request({
    url: '/authorizations',
    method: 'POST',
    data: {
      mobile,
      code
    }
  })
}
export const getUserInfoApi = () => {
  return request({
    url: '/user'
  })
}
