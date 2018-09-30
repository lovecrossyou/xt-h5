/**
 * Created by zhulizhe on 2018/9/29.
 */

export default {
  namespace: 'order',
  state: {
    list: []
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/order/orderConfirm') {
          dispatch({
            type: 'fetch'
          });
          //请求地址列表
          dispatch({
            type:'address/fetch',
            payload:{
              size: 10,
              pageNo: 0
            }
          })

          dispatch({
            type:'global/setTitle',payload:{
              text:"确认订单"
            }
          })
        }
      });
    }
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      yield put({
        type: 'save', payload: {
          text: 'page init'
        }
      });
    },
    *delete({ payload }, { call, put }) {
      yield put({
        type: 'save', payload: {
          list: []
        }
      });
    },

  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
