import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image, Button } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import * as QL from 'graphql-sync-multi-platform/graphql_cache.core';
import MySwiper from '../../components/MySwiper';
import GoodsList from '../../components/GoodsList';
import './index.scss';

@connect(({ home, cart, loading }) => ({
  ...home,
  ...cart,
  ...loading,
}))
class Index extends Component {
  config = {
    navigationBarTitleText: '首页',
  };

  componentDidMount = () => {
    this.props.dispatch({
      type: 'home/load',
    });
    this.props.dispatch({
      type: 'home/product',
    });

    // 设置衣袋小红点
    if (this.props.items.length > 0) {
      Taro.setTabBarBadge({
        index: 1,
        text: String(this.props.items.length),
      });
    } else {
      Taro.removeTabBarBadge({
        index: 1,
      });
    }
  };

  //分享
  onShareAppMessage() {
    return {
      title: '基于Taro框架开发的时装衣橱',
      path: '/pages/home/index',
    };
  }

  // 小程序上拉加载
  onReachBottom() {
    this.props.dispatch({
      type: 'home/save',
      payload: {
        page: this.props.page + 1,
      },
    });
    this.props.dispatch({
      type: 'home/product',
    });
  }

  // onclickMany(){
  //   //var y = QL.find_many("brand","",["title","subtitle","image_src","name","desc"])
  //   //var y = QL.find_many("banner","",["title","subtitle","image_src"])
  //   let y = QL.find_one("product",{id: "37302"},["name","id","image","product_master_id","mode_id","enabled","sale_price","sale_stock","market_price","type_id","brand_name","limit_tag"])
  //   //let y = QL.find_many("product","",["id","cover_image","limit_tag","brand_name","name","market_price","type_id","mode_id","enabled"])
  //  // console.log("return y:", y);
  //   //<Button onClick={this.onclickMany} size='mini' >Find-Many</Button>
  //   y.then(function(data){
  //     console.log("y-ret:", data);
  //     return data;
  //   })
  // }

  render() {
    // var cont = QL.hello('taro');
    // console.log('test log ',cont);
    const { banner, brands, products_list, effects } = this.props;
    //console.log('banner:', banner);
    //console.log('brands:', brands);
    //console.log("product:", products_list);
    return (
      <View className="home-page">
        <MySwiper banner={banner} home />
        <View className="nav-list">
          {brands.map((item, index) => (
            <View className="nav-item" key={index}>
              <Image mode="widthFix" src={item.image_src} />
            </View>
          ))}
        </View>
        {/* graphql test */}
        <Text className="recommend">为你推荐</Text>
        <GoodsList list={products_list} loading={effects['home/product']} />
      </View>
    );
  }
}

export default Index;
