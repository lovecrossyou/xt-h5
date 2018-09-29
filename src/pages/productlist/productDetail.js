/**
 * Created by zhulizhe on 2018/9/27.
 */
import React from 'react';
import { connect } from 'dva';
import styles from './page.css';
import { Toast, Modal } from 'antd-mobile';

const alert = Modal.alert;


const Footer = ({ item, onClick }) => {
  return <div className={styles.footer}>
    <div className={styles.footerL}>
      <div style={{ padding: '6px' }}>
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
    alert('确认兑换', '兑换?', [
      { text: '取消', onPress: () => console.log('cancel') },
      {
        text: '确认', onPress: () => {
          const activeItem = this.props.store.activeItem;
          const params = {
            shopId: activeItem.shopId,
            productId: activeItem.id,
            addressId: 1,
          };

          this.props.dispatch({
            type: 'productlist/doExchange',
            payload: params,
            callback: () => {
              Toast.success('兑换成功!', 1);
            },
          });
        },
      },
    ]);
  };


  render() {

    const activeItem = this.props.store.activeItem;
    if (activeItem == null) return null;

    console.log(activeItem);

    const price = activeItem.price * 1.2;
    const salePrice = price.toFixed(2);
    return <div style={{ paddingBottom: '50px' }}>
      <img src={activeItem.headImage} alt="" style={{
        margin: 'auto',
        width: '100%',
        height: '275px',
        backgroundColor: '#e2e2e2',
      }}/>

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
        <div className={styles.desc}>品名：--</div>
        <div className={styles.desc}>品牌：--</div>
      </div>

      <img src={activeItem.detailImage} alt="" style={{
        margin: 'auto',
        width: '100%',
        height: '100%',
        backgroundColor: '#e2e2e2',
      }}/>

      <Footer item={activeItem} onClick={this.exchange}/>
    </div>;
  }
}

// products
export default connect(state => ({
  store: state.productlist,
}))(ProductDetail);

