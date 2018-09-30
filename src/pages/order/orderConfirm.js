/**
 * Created by zhulizhe on 2018/9/29.
 */

import React from 'react';
import { connect } from 'dva';
import { Toast, Modal } from 'antd-mobile';
import { routerRedux } from 'dva/router';
import { List } from 'antd-mobile';
import styles from './page.css';

const Item = List.Item;
const Brief = Item.Brief;
const alert = Modal.alert;


const Footer = ({ item, onClick }) => {
  return <div className={styles.footer}>
    <div className={styles.footerL}>
      <div style={{ marginTop: '5px' }}>
        <div style={{ display: 'inline', fontSize: '12px', color: '#333' }}>(积分)</div>
        <div style={{ display: 'inline', color: '#cc2636', fontSize: '14px' }}>合计</div>
      </div>
      <div style={{ color: '#cc2636', fontSize: '14px' }}>{item.price}积分</div>
    </div>
    <div onClick={onClick} className={styles.footerR}>去兑换</div>
  </div>;
};


const ProductInfo = ({ product }) => {
  return (
    <div style={{ padding: '0 15px', backgroundColor: '#fff' }}>
      <div style={{ display: 'flex', padding: '15px 0' }}>
        <img style={{ height: '64px', marginRight: '15px' }} src={product.headImage} alt=""/>
        <div style={{ lineHeight: 1 }}>
          <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{product.headName}</div>
          <div><span style={{ fontSize: '20px', color: '#cc2636' }}>¥ 0</span>+ {product.price}积分</div>
        </div>
      </div>
    </div>
  );
};

const Delivery = () => {
  return <List>
    <Item arrow="horizontal" extra="">
      配送方式 <Brief>快递 免邮</Brief>
    </Item>
  </List>;
};

const AddressCell = ({ address, onClick }) => {

  if (address == null) return (<div onClick={onClick} className={styles['center']}>
    点击新建收货地址 +
  </div>);

  return <List>
    <Item onClick={onClick} arrow="horizontal" extra={address.phoneNum}>
      {address.recievName} <Brief>{address.fullAddress}</Brief>
    </Item>
  </List>;
};

class OrderConfirm extends React.Component {

  addressClick = () => {
    // 选择收货地址
    this.props.dispatch(routerRedux.push('/address/page?select=true'));
  };

  exchange = () => {
    const address = this.props.addressStore.activeAddress;
    if (address == null) {
      Toast.info('请新建收货地址', 2);
      return;
    }
    const activeItem = this.props.productStore.activeItem;
    alert('确认兑换?', `消耗 ${activeItem.price} 积分`, [
      { text: '取消', onPress: () => console.log('cancel') },
      {
        text: '确认', onPress: () => {
          const params = {
            shopId: activeItem.shopId,
            productId: activeItem.id,
            addressId: address.id,
          };

          this.props.dispatch({
            type: 'productlist/doExchange',
            payload: params,
            callback: () => {
              Toast.success('兑换成功!', 2);
              this.props.dispatch(routerRedux.goBack());
            },
          });
        },
      },
    ]);
  };

  render() {
    const activeItem = this.props.productStore.activeItem;
    return <div>
      <AddressCell
        onClick={this.addressClick}
        address={this.props.addressStore.activeAddress}
      />

      <ProductInfo product={activeItem}/>
      <Delivery/>

      <Footer item={activeItem} onClick={this.exchange}/>

    </div>;
  }
}


export default connect(state => ({
  addressStore: state.address,
  productStore: state.productlist,
}))(OrderConfirm);
