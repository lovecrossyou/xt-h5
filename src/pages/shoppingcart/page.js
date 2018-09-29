import React from 'react';
import {connect} from 'dva';
import {NavBar, Icon, Checkbox, Button, Stepper, ActivityIndicator} from 'antd-mobile';
import styles from './page.css'

const CheckboxItem = Checkbox.CheckboxItem;
const logo = 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1536043540&di=372395e9e3a3bb666e0648ee4e82eb77&src=http://img3.99114.com/group1/M00/E4/FC/wKgGS1kdNRWAJtHRAAEkC21g9l8197.png'

// 店铺头部
const ShopHeader = ({shop, toggleShopSelect}) => {
  return <div style={{
    height: '80px',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: '15px',
    borderTopRightRadius: '8px',
    borderTopLeftRadius: '8px'

  }}>
    <div>
      <CheckboxItem checked={shop.selected} onChange={() => {
        toggleShopSelect(shop);
      }}>
        <a>{shop.shopName}</a>
      </CheckboxItem>
    </div>
    <div>领券</div>
  </div>
}
// 单个商品
const PriductItem = ({product, selectProduct, setProductCount}) => {
  return <div
    style={{
      backgroundColor: '#fff',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      paddingRight: '15px'
    }}>
    <div style={{width: '40px'}}>
      <CheckboxItem checked={product.selected} onChange={() => {
        selectProduct(product);
      }}/>
    </div>
    <div style={{flex: 1}}>
      <img style={{width: '90px', height: '90px'}} src={logo} alt=""/>
    </div>
    <div style={{
      display: 'flex',
      flex: 5,
      flexDirection: 'column',
      alignItems: 'flex-start',
      height: '120px',
      justifyContent: 'space-around',
      marginLeft: '15px',
    }}>
      <div style={{lineClamp: 2}}
           className={styles.intwoline}>[{product.productName}]主动式电容笔高精度超细头触控屏幕苹果ipad平板手机安卓手写笔绘画
      </div>
      <div style={{color: '#999999'}}> 顺丰包邮</div>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%'
      }}>
        <div style={{color: 'pink'}}>¥{product.price}</div>
        <Stepper
          onChange={count => {
            setProductCount(product, count);
          }}
          showNumber
          min={1}
          defaultValue={product.count}
        />
      </div>
    </div>
  </div>
}
// 店铺
const ShopItem = ({shop, selectProduct, setProductCount, toggleShopSelect}) => {
  return <div style={{margin: '8px', borderRadius: '8px'}}>
    <ShopHeader toggleShopSelect={toggleShopSelect} shop={shop}/>
    {
      shop.list.map((p, index) => <PriductItem
        key={'#' + index}
        product={p}
        setProductCount={setProductCount}
        selectProduct={selectProduct}/>)
    }
  </div>
}
// 购物车footer
const ShopppingCartFooter = ({shoppingCart, toggle, clearShoppingCart}) => {

  const Footer = ({shoppingCart}) => {
    return (
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <div>合计：</div>
        <div style={{color: 'red', paddingRight: '8px'}}>¥{shoppingCart.totalPrice}</div>
        <Button style={{width: '90px', height: '40px', textAlign: 'center', lineHeight: '40px', fontSize: '14px'}}
                type="primary">结算({shoppingCart.totalCount})</Button>
      </div>);
  }


  const FooterEdit = ({shoppingCart}) => {
    return (
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <Button
          style={{width: '90px', height: '40px', textAlign: 'center', lineHeight: '40px', fontSize: '14px'}}
          onClick={clearShoppingCart}
          type="warning">删除({shoppingCart.totalCount})</Button>
      </div>);
  }


  return <div style={{position: 'fixed', bottom: 0, backgroundColor: '#fff', left: 0, right: 0, zIndex: 10}}>
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: '8px',
      paddingRight: '15px',
      height: '50px',
      boxShadow: '#ccc 1px 1px 10px 0px'
    }}>
      <div onClick={toggle}>
        <CheckboxItem checked={shoppingCart.selected}>全选</CheckboxItem>
      </div>
      {shoppingCart.editing ? <FooterEdit shoppingCart={shoppingCart}/> : <Footer shoppingCart={shoppingCart}/>}
    </div>
  </div>
}

const EmptyShoppingCart = () => {
  return <div style={{
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  }}>
    <div style={{color: '#999999'}}>购物车为空</div>
  </div>
}


class ShoppingCart extends React.Component {


  // 购物车的选中与否
  toggleShoppingSelect = () => {
    this.props.dispatch({
      type: 'shoppingcart/toggleShoppingSelect',
    })
  }

  // 店铺的选中
  toggleShopSelect = (shop) => {
    this.props.dispatch({
      type: 'shoppingcart/toggleShopSelect',
      payload: shop
    })
  }


  // 选中商品
  selectProduct = p => {
    this.props.dispatch({
      type: 'shoppingcart/selectProduct',
      payload: p
    })
  }

  // 设置商品数量
  setProductCount = (p, count) => {
    this.props.dispatch({
      type: 'shoppingcart/setProductCount',
      payload: {
        product: p,
        count: count
      }
    })
  }

  // 设置编辑状态
  toggleEditState = () => {
    this.props.dispatch({
      type: 'shoppingcart/toggleEditState'
    })
  }

  clearShoppingCart = () => {
    this.props.dispatch({
      type: 'shoppingcart/clearShoppingCart'
    })
  }


  render() {
    const shoppingCart = this.props.store;
    const {loading} = this.props;
    return (
      <div style={{paddingBottom: '50px'}}>
        <div style={{zIndex: 0}}>
          {shoppingCart.list.map((shop, index) => <ShopItem
            setProductCount={this.setProductCount}
            selectProduct={this.selectProduct}
            toggleShopSelect={this.toggleShopSelect}
            shop={shop}
            key={'#' + index}/>)}
        </div>


        {
          shoppingCart.list.length === 0 ? (<EmptyShoppingCart/>) : (<ShopppingCartFooter
            clearShoppingCart={this.clearShoppingCart}
            shoppingCart={shoppingCart}
            toggle={this.toggleShoppingSelect}/>)
        }


        <div className={styles.loading}>
          <ActivityIndicator toast text="正在加载" animating={loading}/>
        </div>


      </div>
    );
  }
}

export default connect(state => ({
  store: state.shoppingcart.shoppingCart,
  loading: state.loading.global
}))(ShoppingCart);
