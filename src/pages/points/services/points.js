import request from '../../../utils/request';
import {getAccessToken} from "../../../utils/authority";

export async function queryUserInfo() {
  const accessToken = getAccessToken();
  return request('/mp/service/user/info?accesstoken='+accessToken,{
    method:'get',
  });
}


// simple/client/adList
export async function queryAdList() {
  return request('/mp/simple/client/adList',{
    method:'get',
  });
}

export async function queryProductList(param) {
  return request('/mp/service/merchant/integralProductList',{
    method: 'post',
    body:param
  });
}
