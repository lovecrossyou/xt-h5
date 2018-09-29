import request from '../../../utils/request';

export async function query (params) {
  return request({
    url: '',
    method: 'get',
    data: params,
  })
}
