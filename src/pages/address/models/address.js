import { queryAddAddress, queryAddress } from '../services/address';

export default {
  namespace: 'address',
  state: {
    activeAddress: null,
    list: [],
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/address/AddressEdit') {
          dispatch({
            type: 'global/setTitle', payload: {
              text: '地址编辑',
            },
          });
        }
        if (pathname === '/address/page') {
          dispatch({
            type: 'fetch',
            payload: {
              size: 10,
              pageNo: 0,
            },
          });
          dispatch({
            type: 'global/setTitle', payload: {
              text: '地址列表',
            },
          });

        }
      });
    },
  },
  effects: {
    * fetch({ payload }, { call, put }) {
      const list = yield call(queryAddress, payload);
      yield put({
        type: 'save', payload: list.data.content,
      });
    },
    * delete({ payload }, { call, put }) {
      yield put({
        type: 'save', payload: {
          list: [],
        },
      });
    },

    //
    * add({ payload, callback }, { call, put }) {
      yield call(queryAddAddress, payload);
      callback();
    },


    // * saveActive({ payload, callback }, { call, put }) {
    //   console.log('xxxxss');
    // },
  },
  reducers: {
    save(state, action) {
      return { ...state, list: action.payload };
    },
    saveActive(state, action) {
      return { ...state, activeAddress: action.payload };
    },
  },
};
