import request from '../../../utils/request';

export async function queryProductList(param) {
  return request('/api/mp/service/merchant/integralProductList',{
    method: 'POST',
    body:param
  });
}

export async function queryProductInfo(productId) {
  return request('/api/mp/service/merchant/integralProductInfo?productId='+productId);
}

export async function doExchange(param) {
  return request('/api/mp/client/shopOrder/exchangeIntegral',{
    method: 'POST',
    body:param
  });
}


