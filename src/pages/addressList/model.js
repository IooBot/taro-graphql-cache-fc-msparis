import * as addressListApi from './service';
import {findMany}from '../../utils/crud';

export default {
  namespace: 'addressList',
  state: {
    addressList: [],
  },

  effects: {
    *getAddressList(_, { call, put, select }) {
      const { user_id } = yield select(state => {
        return state.common
      });
      const data = yield call(findMany,{collection:"userAddress", condition: {user_id}, fields:["id", "address_detail","contact_mobile","contact_name","area_name","region_name","region_code"]});
      console.log("addressList:",data);

      if(data != null) {
        yield put({
          type: 'save',
          payload: {
            addressList: data,
          },
        });
      }

      // const { status, data } = yield call(addressListApi.getAddressList, {
      //   access_token,
      // });
      // if (status === 'ok') {
      //   yield put({
      //     type: 'save',
      //     payload: {
      //       addressList: data.rows,
      //     },
      //   });
      // }
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
