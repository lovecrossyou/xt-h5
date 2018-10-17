import { queryWithdrawCash, queryWithdrawCashList } from '../service/withdraw';
import config from '../../../utils/config';
import { Toast } from 'antd-mobile';

import { setAccessToken } from '../../../utils/authority';

const mockToken = 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxIiwiaWF0IjoxNTM4MDU2NDQ2LCJzdWIiOiJEWjAwMDAxMTMwIn0.cZ6iiE42AMTrQNuYXWejm8XaTo3sxR87-pBmgj04CmY'

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
          if(config.isMock){
            setAccessToken(mockToken)
          }
          else {
            setAccessToken(accessToken)
          }
        }
        if (pathname === '/withdraw/withdrawrecord') {
          const accessToken = query.accessToken;
          if(config.isMock){
            setAccessToken(mockToken)
          }
          else {
            setAccessToken(accessToken)
          }

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

    *withdraw({ type, payload}, { put, call }) {
      const res = yield call(queryWithdrawCash,payload);
      if(res.status=='ok'){
        Toast.info('提现申请已发送',1);
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
