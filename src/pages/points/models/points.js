import {setAccessToken} from "../../../utils/authority";
import { queryAdList, queryProductList, queryUserInfo } from '../services/points';
import config from '../../../utils/config';

const mockToken = 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxIiwiaWF0IjoxNTM4MDU2NDQ2LCJzdWIiOiJEWjAwMDAxMTMwIn0.cZ6iiE42AMTrQNuYXWejm8XaTo3sxR87-pBmgj04CmY'



export default {
  namespace: 'points',
  state: {
    userInfo: {},
    guestLikeResult:[],
    hotResult:[],
    prefectResult:[],
    adList:[]
  },

  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        if (pathname === '/points/page') {
          const accessToken = query.accessToken;
          if(config.isMock){
            setAccessToken(mockToken)
          }
          else {
            setAccessToken(accessToken)
          }
          dispatch({
            type: 'fetch',
            payload:{}
          });
          dispatch({
            type: 'loadData',
            payload:{}
          });
          dispatch({
            type: 'global/setTitle', payload: {
              text: "积分商城"
            }
          });
        }
      });
    },
  },

  effects: {
    * fetch({payload}, {call, put}) {
      const response = yield call(queryUserInfo, payload);
      yield put({type: 'save', payload: response.data});
      const response_ad = yield call(queryAdList, payload);
      yield put({type: 'saveList', payload: response_ad.data});
    },


    * loadData({payload}, {call, put}) {
      const guestLikeResult = yield call(queryProductList, {
          "page": 1,
          "pageSize": 20,
          "category": "guess_like"
        });

      yield put({
        type: 'saveData', payload: {
          guestLikeResult:guestLikeResult.data.content,
        }
      });
    },

    // banner轮播
    * adList({payload}, {call, put}) {
      const response = yield call(queryAdList, payload);
      yield put({type: 'saveList', payload: response.data});
    },
  },


  reducers: {
    save(state, action) {
      return {
        ...state,
        userInfo: action.payload
      }
    },

    saveData(state,action){
      return {
        ...state,
        guestLikeResult: action.payload.guestLikeResult
      }
    },
    saveList(state,action){
      return {
        ...state,
        adList:action.payload
      }
    }
  }
}
