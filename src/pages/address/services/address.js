import request from '../../../utils/request';

export async function queryAddress (params) {
  return request('/mp/client/deliveryAddress/list',{
    method: 'post',
    body: params,
  })
}

export async function queryAddAddress (params) {
  return request('/mp/client/deliveryAddress/create',{
    method: 'post',
    body: params,
  })
}
