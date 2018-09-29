import request from '../../../utils/request';

export function queryShoppingCart() {
  return request({
    url:'/api/shoppingcarts',
    method: 'post',
  });
}

export function queryAddressList() {
  return request({
    url:'/api/addresslist',
    method: 'post',
  });
}
