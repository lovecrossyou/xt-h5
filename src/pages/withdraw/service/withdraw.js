/**
 * Created by zhulizhe on 2018/10/17.
 */

import request from '../../../utils/request';

export async function queryWithdrawCash (params) {
  return request('/api/mp/service/user/withdrawCash',{
    method:'post',
    body:params
  })
}

export async function queryWithdrawCashList (params) {
  return request('/api/mp/service/user/withdrawCashList',{
    method:'post',
    body:params
  })
}

