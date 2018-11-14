import request from '../../../utils/request';

export async function queryProductList(param) {
  return request('/mp/service/merchant/integralProductList',{
    method: 'POST',
    body:param
  });
}

export async function queryProductInfo(productId) {
  return request('/mp/service/merchant/integralProductInfo?productId='+productId,{
    method:'get'
  });
}

export async function doExchange(param) {
  return request('/mp/client/shopOrder/exchangeIntegral',{
    method: 'POST',
    body:param
  });
}


