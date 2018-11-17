import React from 'react';
import { connect } from 'dva';
import styles from './page.less';
import { routerRedux } from 'dva/router';
import { Toast } from 'antd-mobile';
import { PriceLabel } from './components/PriceLabel';

// 积分商城
const UserInfo = ({ userInfo }) => {
  return <div style={{
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
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div>{userInfo.accountAllAmount}</div>
      <div style={{ color: '#040404' }}>积分</div>
    </div>
  </div>;
};

const Banner = () => {
  return <div className={styles.banner}>

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
      <div className={styles.title} style={{ textAlign: 'center', color: '#D60B0B', fontSize: '15px' }}>{item.price}M币
      </div>
      <div style={{ textAlign: 'center', height: '24px', lineHeight: '24px', fontSize: '12px' }}>{item.simpleName}</div>
    </div>
  </div>;
};


const Product = ({data,onClick})=>{
  return <div
    className={styles.product}
    onClick={()=>{
      onClick(data);
    }}>
    <img src={data.headImage} alt="" className={styles.p_img}/>
    <div className={styles.p_title}>{data.simpleName}</div>
    <div className={styles.p_footer}>
      <PriceLabel prefix='' price={data.price} suffix='M币'/>
      <div className={styles.p_footer_sale}>已兑换{data.saleAmount}份</div>
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
    const { guestLikeResult, userInfo } = this.props.store;
    return <div style={{ backgroundColor: '#f5f5f5' }}>
      <UserInfo userInfo={userInfo}/>
      <Banner/>
      <div>
        <div className={styles.p_hot}>热门兑换</div>
        <ProductList
          onClick={this.onClick}
          products={guestLikeResult}/>
      </div>
    </div>;
  }
}

export default connect(state => ({
  store: state.points,
}))(Points);
