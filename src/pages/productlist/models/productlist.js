import { doExchange, queryProductInfo, queryProductList } from '../services/productlist';

export default {
  namespace: 'productlist',
  state: {
    guestLikeResult: [],
    hotResult: [],
    prefectResult: [],
    activeItem: null,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname == '/productlist/ProductDetail') {
          const productId = query.productId;
          dispatch({
            type: 'fetchProductInfo',
            payload: productId,
          });
        }
        if (pathname === '/productlist') {
          dispatch({
            type: 'fetch',
          });
          dispatch({
            type: 'global/setTitle', payload: {
              text: '商品列表',
            },
          });
        }
      });
    },
  },

  effects: {
    // 兑换商品
    * doExchange({ payload ,callback}, { call, put }) {
      console.log('doExchange');
      const params = Object.assign(payload,{orderCategory: 'integral_exchange'})
      const res = yield call(doExchange, params);
      if(res.status=='ok'){
        callback();
      }
    },

    // 获取商品详情
    * fetchProductInfo({ payload }, { call, put }) {
      const res = yield call(queryProductInfo, payload);

      yield put({
        type: 'saveItem',
        payload: res.data,
      });
      console.log(res);
    },

    // 获取商城首页数据
    * fetch({ payload }, { call, put }) {
      const [guestLikeResult, hotResult, prefectResult] = yield [
        call(queryProductList, {
          'page': 1,
          'pageSize': 20,
          'category': 'guess_like',
        }),
        call(queryProductList, {
          'page': 1,
          'pageSize': 20,
          'category': 'hot_product',
        }),
        call(queryProductList, {
          'page': 1,
          'pageSize': 20,
          'category': 'prefect_product',
        }),
      ];

      yield put({
        type: 'save', payload: {
          guestLikeResult: guestLikeResult.data.content,
          hotResult: hotResult.data.content,
          prefectResult: prefectResult.data.content,
        },
      });
    },
  },


  reducers: {
    save(state, action) {
      return {
        ...state,
        guestLikeResult: action.guestLikeResult,
        hotResult: action.guestLikeResult,
        prefectResult: action.prefectResult,
      };
    },

    saveItem(state, action) {
      return {
        ...state, activeItem: action.payload,
      };
    },
  },
};
