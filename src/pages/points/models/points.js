import {setAccessToken} from "../../../utils/authority";
import {queryUserInfo} from "../services/points";
import {queryProductList} from "../../productlist/services/productlist";

const mockToken = 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxIiwiaWF0IjoxNTM4MDU2NDQ2LCJzdWIiOiJEWjAwMDAxMTMwIn0.cZ6iiE42AMTrQNuYXWejm8XaTo3sxR87-pBmgj04CmY'



export default {
  namespace: 'points',
  state: {
    userInfo: {},
    guestLikeResult:[],
    hotResult:[],
    prefectResult:[],
  },

  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        if (pathname === '/points/page') {
          const accessToken = query.accessToken;
          setAccessToken(mockToken)
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
          })
        }
      });
    },
  },

  effects: {
    * fetch({payload}, {call, put}) {
      const response = yield call(queryUserInfo, payload);
      yield put({type: 'save', payload: response.data});
    },

    * loadData({payload}, {call, put}) {
      const [guestLikeResult, hotResult, prefectResult] = yield [
        call(queryProductList, {
          "page": 1,
          "pageSize": 20,
          "category": "guess_like"
        }),
        call(queryProductList, {
          "page": 1,
          "pageSize": 20,
          "category": "hot_product"
        }),
        call(queryProductList, {
          "page": 1,
          "pageSize": 20,
          "category": "prefect_product"
        })
      ];

      console.log('saveData ',guestLikeResult);

      yield put({
        type: 'saveData', payload: {
          guestLikeResult:guestLikeResult.data.content,
          hotResult:hotResult.data.content,
          prefectResult:prefectResult.data.content,
        }
      });
    }
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
        guestLikeResult: action.payload.guestLikeResult,
        hotResult: action.payload.hotResult,
        prefectResult: action.payload.prefectResult,
      }
    }
  }
}
