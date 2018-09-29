import React from 'react';
import {connect} from 'dva';
import {routerRedux } from 'dva/router';
import Filter from "./components/FilterMenu";

import styles from './page.css'


const ProductItem = ({item})=>{
  return <div style={{ padding: '0 15px',backgroundColor:'#fff' }}>
    <div style={{display: 'flex', padding: '15px 0',alignItems:'center' }}>
      <img style={{ height: '64px', marginRight: '15px' }} src={item.headImage} alt="" />
      <div style={{ lineHeight: 1 }}>
        <div style={{ marginBottom: '8px', fontWeight: 'bold' ,fontSize: '14px', color: '#535558'}}>{item.simpleName}</div>
        <div style={{color:'#AEAAAA'}}><span style={{ fontSize: '18px', color: '#D0021B',paddingRight:'2px' }}>{item.price}</span>M币</div>
      </div>
    </div>
  </div>
}


class Page extends React.Component {
  render() {
    console.log(this.props.store.products);
    return (
      <div>
        {/*<div style={{position:'fixed',top:0,left:0,right:0,zIndex:1}}>*/}
          {/*<Filter/>*/}
        {/*</div>*/}
        <view className={styles.listView}>
          {
            this.props.store.products.map((item,index)=><ProductItem item={item} key={'#'+index}/>)
          }
        </view>

      </div>
    );
  }
}


// products
export default connect(state => ({
  store: state.productlist
}))(Page);



