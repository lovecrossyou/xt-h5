import { doExchange, queryProductInfo, queryProductList } from '../services/productlist';
import { Toast } from 'antd-mobile';

export default {
  namespace: 'productlist',
  state: {
    guestLikeResult: [],
    hotResult: [],
    prefectResult: [],
    activeItem: null,
    productList:[]
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        // category
        if (pathname == '/productlist/page') {
          const category = query.category;
          dispatch({
            type: 'loadMoreData',
            payload: category,
          });
        }

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
    // 查看更多
    * loadMoreData({payload}, {call, put}) {
      const res = yield call(queryProductList,{
        "page": 1,
        "pageSize": 20,
        "category": payload
      })
      yield put({
        type:'saveProducts',
        payload:res.data.content
      })
    },

    // 兑换商品
    * doExchange({ payload ,callback}, { call, put }) {
      console.log('doExchange');
      const params = Object.assign(payload,{orderCategory: 'integral_exchange'})
      const res = yield call(doExchange, params);
      if(res.status=='ok'){
        callback();
      }
      else {
        Toast.info(res.message,1);
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
    saveProducts(state,action){
      return {
        ...state,
        productList: action.payload,
      };
    },

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
