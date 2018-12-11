import React from 'react';
import { connect } from 'dva';
import styles from './page.less';
import { routerRedux } from 'dva/router';
import { PriceLabel } from './components/PriceLabel';
import { ActivityIndicator } from './components/ActivityIndicator';
import { Carousel ,Icon} from 'antd-mobile';

// 积分商城
const UserInfo = ({ userInfo }) => {
  return <div className='user_info_btn' style={{
    height: '82px',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '34px',
  }}>
    <div style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
      <img style={{ width: '52px', height: '52px', border: 'solid 1px #e1e1e1', borderRadius: '50%' }} width='52px'
           height='52px' src={userInfo.userIconUrl} alt=""/>
      <div style={{ paddingLeft: '13px' }}>
        <div style={{ color: '#040404', fontSize: '15px', lineHeight: '34px' }}>{userInfo.nickName}</div>
        <div style={{ color: '#AEAAAA', fontSize: '12px', lineHeight: '34px' }}>普通会员</div>
      </div>
    </div>
    <div style={{ display: 'flex', flexDirection: 'row',alignItems:'center' }}>
      <div>{userInfo.accountAllAmount}</div>
      <div style={{ color: '#040404' }}>积分</div>

      <div style={{paddingLeft:'10px'}}>
        <Icon type='right' color='#040404'/>
      </div>
    </div>

  </div>;
};


const Banner_New = ()=>{
  return (
    <Carousel
      autoplay={true}
      infinite
    >
      <Banner/>
    </Carousel>
  )
}

const Banner = () => {
  return <div className={styles.banner}>
    <img className={styles.banner_img} src='http://static.tuexing.com/ad/WechatIMG863.jpeg' alt=""/>
  </div>;
};


const Item = ({ item, onClick }) => {
  return <div onClick={() => {
    onClick(item);
  }} style={{ width: '62px',backgroundColor: '#fff', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
    <img src={item.headImage} alt="" style={{
      width: '62px',
      height: '62px',
      border: 'solid 1px #e2e2e2',
      backgroundColor: '#e2e2e2',
      borderRadius: '16px',
    }}/>
    <div>
      <div className={styles.title}>{item.price}M币</div>
      <div style={{ textAlign: 'center', height: '24px', lineHeight: '24px', fontSize: '12px' }}>{item.simpleName}</div>
    </div>
  </div>;
};


const Product = ({data})=>{
  return <div
    productid={data.id}
    className='product'
  >
    <img src={data.headImage} alt="" className={styles.p_img}/>
    <div className={styles.p_title}>{data.simpleName}</div>

    <div className={styles.p_footer}>
      <div className={styles.p_footer_left}>
        <div className={styles.hot_sell_price_left_zero}>热门</div>
      <PriceLabel prefix='' price={data.price} suffix='M币'/>
      </div>
      <div className={styles.p_footer_sale}>已售{data.saleAmount}份</div>
    </div>
  </div>
}

const ProductList = ({products,onClick})=>{
  return <div className={styles.product_list_container}>
    {
      products.map((p,index)=>{
        return <Product
          onClick={onClick}
          data={p}
          key={index+'#'}/>
      })
    }
  </div>
}

class Points extends React.Component {

  onClick = item => {
    this.props.dispatch(
      routerRedux.push('/productlist/ProductDetail?productId=' + item.id),
    );
  };


  render() {
    const { guestLikeResult, userInfo ,adList} = this.props.store;
    return <div style={{ backgroundColor: '#f5f5f5' }}>
      <UserInfo
        userInfo={userInfo}/>
      <Banner_New datas={adList}/>
      <div>
        <div className={styles.p_hot}>
          <div className={styles.p_hot_left}/>
          <div>热门兑换</div>
        </div>
        <ProductList
          onClick={this.onClick}
          products={guestLikeResult}/>
      </div>
      <ActivityIndicator animating={this.props.loading}/>
    </div>;
  }
}

export default connect(state => ({
  store: state.points,
  loading:state.loading.global
}))(Points);
