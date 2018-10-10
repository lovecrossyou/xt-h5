import { queryAddAddress, queryAddress, queryDelAddress, queryEditAddress } from '../services/address';

export default {
  namespace: 'address',
  state: {
    activeAddress: null,
    list: [],
    edit:false
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/address/AddressEdit') {
          if(query.edit!=undefined){
            // 编辑模式
            dispatch({
              type:'setEdit',
              payload:query.edit
            })
          }
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
      yield call(queryDelAddress, {
        addressId: payload.id
      });
      const list = yield call(queryAddress, {
        size: 10,
        pageNo: 0,
      });
      yield put({
        type: 'save', payload: list.data.content,
      });
    },

    //
    * add({ payload, callback }, { call, put }) {
      yield call(queryAddAddress, payload);
      callback();
    },

    * edit({ payload, callback }, { call, put }) {
      yield call(queryEditAddress, payload);
      callback();
    },



  },
  reducers: {
    save(state, action) {
      return { ...state, list: action.payload };
    },
    saveActive(state, action) {
      return { ...state, activeAddress: action.payload };
    },

    setEdit(state,action){
      return {
        ...state,
        edit:action.payload
      }
    }
  },
};
