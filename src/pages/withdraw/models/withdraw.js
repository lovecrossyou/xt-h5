import { queryWithdrawCash, queryWithdrawCashList } from '../service/withdraw';
import config from '../../../utils/config';
import { Toast } from 'antd-mobile';

import { setAccessToken } from '../../../utils/authority';

export default {
  namespace: "withdraw",
  state: {
    withdrawList:[]
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({pathname, query}) => {
        if (pathname === '/withdraw/page') {
          const accessToken = query.accessToken;
          setAccessToken(accessToken)
        }
        if (pathname === '/withdraw/withdrawrecord') {
          const accessToken = query.accessToken;
          setAccessToken(accessToken)
          dispatch({
            type:'withdrawList',
            payload:{
              page:1,
              pageSize:10
            }
          })
        }

      });
    },
  },
  reducers: {
    save(state,action) {
      return {
        ...state,
        withdrawList:action.payload
      }
    },
  },
  effects: {

    *withdraw({ type, payload,cb}, { put, call }) {
      const res = yield call(queryWithdrawCash,payload);
      if(res.status=='ok'){
        Toast.info('提现申请已发送',2);
        cb&&cb();
      }
      else {
        Toast.info(res.message,1);
      }
    },

    *withdrawList({ type, payload }, { put, call }) {
      const res = yield call(queryWithdrawCashList, payload);
      const content = res.data.content;
      yield put({
        type:'save',
        payload: content
      })
    }
  },
}
