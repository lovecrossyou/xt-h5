/**
 * Created by zhulizhe on 2018/9/27.
 */
import React from 'react';
import { connect } from 'dva';
import styles from './page.css';
import { routerRedux } from 'dva/router';
import { ActivityIndicator } from '../points/components/ActivityIndicator';


const Footer = ({ item, onClick }) => {
  return <div className={styles.footer}>
    <div className={styles.footerL}>
      <div style={{ padding: '10px 6px' }}>
        <div className={styles.market}>单价：</div>
        <div className={styles.price}>{item.price}</div>
        <div className={styles.label}>积分</div>
      </div>
    </div>
    <div onClick={onClick} className={styles.footerR}>马上兑换</div>
  </div>;
};

class ProductDetail extends React.Component {
  exchange = () => {
    const activeItem = this.props.store.activeItem;
    this.props.dispatch(routerRedux.push('/order/orderConfirm?productId=' + activeItem.id));
  };


  render() {
    const activeItem = this.props.store.activeItem;
    if (activeItem == null) return null;
    const price = activeItem.price * 1.2;
    const salePrice = price.toFixed(2);
    return <div style={{ paddingBottom: '50px' }}>
     <div className={styles.bigImgWrapper}>
       <img src={activeItem.headImage} alt="" style={{
         height: '273px',
         backgroundColor: '#fff',
       }}/>
     </div>
      <div className={styles.pWrapper}>
        <div className={styles.pName}>{activeItem.simpleName}</div>
        <div>
          <div className={styles.price}>{activeItem.price}</div>
          <div className={styles.label}>积分</div>
          <div className={styles.market}>市场参考价：{salePrice}元</div>
        </div>
      </div>
      <div className={styles.descWrapper}>商品描述</div>
      <div className={styles.brandWrapper}>
        <div className={styles.desc}>品名：{activeItem.headName}</div>
        <div className={styles.desc}>品牌：{activeItem.brand}</div>
      </div>
      {
        activeItem.detailImages.map((item,index)=>{
          return (
              <img key={"#"+index} src={item} alt="" style={{
                margin: '0',
                padding:'0',
                width: '100%',
                height: '100%',
                backgroundColor: '#e2e2e2',
              }}/>
          )
        }
      )}
      <Footer item={activeItem} onClick={this.exchange}/>
      <ActivityIndicator animating={this.props.loading}/>
    </div>;
  }
}

// products
export default connect(state => ({
  store: state.productlist,
  loading:state.loading.global
}))(ProductDetail);

