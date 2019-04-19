import Taro from '@tarojs/taro';
import * as QL from "graphql-sync-multi-platform/graphql_cache.core";
import {findMany} from '../../utils/crud';
import * as login from './service';


export default {
  namespace: 'login',
  state: {
    mobile: '',
    code: '',
    user_id: '',
    invitation_code: '',
    invitation_code_from: '',
    access_token: '',
    nickname: '',
    new_user: '',
    is_has_buy_card: '', // 用户是否买过卡
    smsText: '发送验证码',
    sending: 0,
    smsTime: 30,
    erroMessage: '',
    type: 4, // 1微信 2QQ 3新浪 4.微信公众号 5.支付宝生活号 6.京东 7.返利
  },

  effects: {
    *login(_, { call, put, select }) {
      const { code, mobile } = yield select(state => state.login);
      let res = yield call(findMany, {collection:"user", condition: {mobile: mobile}, fields:["id", "nickname","mobile","is_has_buy_card","new_user"]});

      // create user directly ,just for demo
      if(res == null){
        QL.insert("user", {id:mobile,mobile: mobile, nickname: mobile, new_user:1, is_has_buy_card: 0});
        res = yield call(findMany, {collection:"user", condition: {mobile: mobile}, fields:["id", "nickname","mobile","is_has_buy_card","new_user"]});
      }

      if(res != null) {
        console.log("user:", res[0]);
        const userInfo = {
          access_token: code,//res.data.access_token,
          invitation_code: '',//res.data.invitation_code,
          user_id: res[0].id,
          mobile: res[0].mobile,
          nickname: res[0].nickname,
          new_user: res[0].new_user,
          is_has_buy_card: res[0].is_has_buy_card,
          erroMessage: '',
        };
        yield put({
          type: 'common/save',
          payload: {
            access_token: code,
            invitation_code:'',
            user_id: res[0].id,
            mobile: res[0].mobile,
            nickname: res[0].nickname,
            new_user: res[0].new_user,
            is_has_buy_card: res[0].is_has_buy_card,
            erroMessage: '',
            code: '',
          },
        });

        yield put({
          type: 'save',
          payload: {
            access_token: code,
            invitation_code: '',
            user_id: res[0].id,
            mobile: res[0].mobile,
            nickname: res[0].nickname,
            new_user: res[0].new_user,
            is_has_buy_card: res[0].is_has_buy_card,
            erroMessage: '',
            code: '',
          },
        });
        Taro.setStorageSync('user_info', userInfo);
        Taro.setStorageSync('access_token', '');//res.data.access_token

        Taro.showToast({
          title: '登录成功，欢迎回来～～～',
          icon: 'none',
        });

        setTimeout(() => {
          Taro.navigateBack();
        }, 1000);
      }
      // const res = yield call(login.login, { code, mobile });
      // if (res.status == 'ok') {
      //   const userInfo = {
      //     access_token: res.data.access_token,
      //     invitation_code: res.data.invitation_code,
      //     mobile: res.data.mobile,
      //     nickname: res.data.nickname,
      //     new_user: res.data.new_user,
      //     is_has_buy_card: res.data.is_has_buy_card,
      //     erroMessage: '',
      //   };

        // Taro.setStorageSync('user_info', userInfo);
        // Taro.setStorageSync('access_token', res.data.access_token);

        // yield put({
        //   type: 'common/save',
        //   payload: {
        //     access_token: res.data.access_token,
        //     invitation_code: res.data.invitation_code,
        //     mobile: res.data.mobile,
        //     nickname: res.data.nickname,
        //     new_user: res.data.new_user,
        //     is_has_buy_card: res.data.is_has_buy_card,
        //     erroMessage: '',
        //     code: '',
        //   },
        // });
        //
        // yield put({
        //   type: 'save',
        //   payload: {
        //     access_token: res.data.access_token,
        //     invitation_code: res.data.invitation_code,
        //     mobile: res.data.mobile,
        //     nickname: res.data.nickname,
        //     new_user: res.data.new_user,
        //     is_has_buy_card: res.data.is_has_buy_card,
        //     erroMessage: '',
        //     code: '',
        //   },
        // });
      // Taro.showToast({
      //   title: '登录成功，欢迎回来～～～',
      //   icon: 'none',
      // });
      //
      // setTimeout(() => {
      //   Taro.navigateBack();
      // }, 1000);
      // }
    },

    *sendSms(_, { call, put, select }) {
      const { mobile } = yield select(state => state.login);
      const res = yield call(login.getSms, { mobile });
      if (res.status == 'ok') {
        yield put({ type: 'save', payload: { sending: 1, erroMessage: '' } });
      } else {
        yield put({
          type: 'save',
          payload: { sending: 2, erroMessage: res.error && res.error.message },
        });
      }
    },

    *sendSmsVoice(_, { call, put, select }) {
      const { mobile } = yield select(state => state.login);
      const res = yield call(login.getSmsVoice, { mobile });
      if (res.status == 'ok') {
        yield put({ type: 'save', payload: { sending: 1, erroMessage: '' } });
      } else {
        yield put({
          type: 'save',
          payload: { sending: 2, erroMessage: res.error && res.error.message },
        });
      }
    },
  },

  reducers: {
    save(state, { payload: data }) {
      return { ...state, ...data };
    },
  },
};
