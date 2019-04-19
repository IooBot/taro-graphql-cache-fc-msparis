//import * as homeApi from './service';
import {findMany} from '../../utils/crud';

export default {
  namespace: 'home',
  state: {
    banner: [],
    brands: [],
    products_list: [],
    page: 1,
  },
  effects: {
    *load(_, { call, put }) {
      const banner = yield call(findMany, {collection:'banner', condition:'', fields: ["title","subtitle","image_src"]});
      const brands = yield call(findMany, {collection:'brand', condition:'', fields: ["title","subtitle","image_src","name","desc"]});
      yield put({
        type: 'save',
        payload: {
          banner: banner,
          brands: brands,
        },
      });
      // const { status, data } = yield call(homeApi.homepage, {});
      // if (status === 'ok') {
      //   yield put({
      //     type: 'save',
      //     payload: {
      //       banner: data.banner,
      //       brands: data.brands,
      //     },
      //   });
      // }
    },
    *product(_, { call, put, select }) {
      const { page } = yield select(state => state.home);
      const products_list = yield call(findMany, {collection:'product', condition:'', fields: ["id","cover_image","limit_tag","brand_name","name","market_price","type_id","mode_id","enabled"]});
      yield put({
        type: 'save',
        payload: {
          products_list: products_list,
        },
      });
      // const { page, products_list } = yield select(state => state.home);
      // const { status, data } = yield call(homeApi.product, {
      //   page,
      //   mode: 1,
      //   type: 0,
      //   filter: 'sort:recomm|c:330602',
      // });
      // if (status === 'ok') {
      //   yield put({
      //     type: 'save',
      //     payload: {
      //       products_list:
      //         page > 1 ? [...products_list, ...data.rows] : data.rows,
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
