import React from 'react';
import {connect} from 'dva';
import {Tabs, WhiteSpace, Badge,} from 'antd-mobile';

const tabs = [
  {title: <Badge text={'3'}>全部</Badge>},
  {title: <Badge>待付款</Badge>},
  {title: <Badge dot>待发货</Badge>},
  {title: <Badge>待收货</Badge>},
  {title: <Badge>待评价</Badge>},
];
const logo = 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1536043540&di=372395e9e3a3bb666e0648ee4e82eb77&src=http://img3.99114.com/group1/M00/E4/FC/wKgGS1kdNRWAJtHRAAEkC21g9l8197.png'

const RoundBtn = ({title,onClick,color='#999999'})=>{
  return <div onClick={onClick} style={{color:color,lineHeight:'40px',height:'40px',textAlign:'center',width:'100px',borderRadius:'45px',border:'solid 1px',marginRight:'10px',borderColor:color}}>
    {title}
  </div>
}


const ShopHeader = () => {
  return <div
    style={{display: 'flex', height: '60px', flexDirection: 'row', justifyContent: 'space-between', padding: '20px',backgroundColor:'#fff'}}>
    <div>八掌柜名妆代购</div>
    <div style={{color:"rgb(205,114,77)"}}>卖家已发货</div>
  </div>
}

const ShopContent = () => {
  return <div style={{
    display: 'flex',
    height: '120px',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgb(250,250,250)',
    alignItems: 'center',
    paddingLeft: '20px',
    paddingRight: '20px'
  }}>
    <div style={{flex:1}}>
      <img style={{width: '100px', height: '100px',}} src={logo} alt=""/>
    </div>

    <div style={{display: 'flex', height: '100%', flexDirection: 'column',flex:3,padding:'10px'}}>
      <div style={{display: 'flex', height: '60px', flexDirection: 'row'}}>
        <div style={{lineClamp:2}}>事实上休闲鞋包邮美国箭牌马牌经典控油草本保湿洗发水355 946ml</div>
      </div>
      <div style={{color:'rgb(164,164,164)'}}>经典控油洗发水355ml,其他other</div>
    </div>
    <div style={{display:'flex',flex:1,alignItems:'flex-end',height:'100%',flexDirection:'column',paddingTop:'10px' }}>
      <div>39.0</div>
      <div style={{color:'rgb(164,164,164)'}}>x1</div>
    </div>
  </div>
}


const ShopFooter = () => {
  return <div style={{display:'flex',alignItems:'flex-end',flexDirection:'column',backgroundColor:'#fff' }}>
    <div style={{height:'52px',lineHeight:'52px',marginRight:'10px'}}>共1件商品 合计：39.00</div>
    <div style={{borderBottom:'solid 1px rgb(245,245,245)',width:'100%',height:'1px'}}/>
    <div style={{height:'52px',lineHeight:'52px',padding:'10px',display:'flex',flexDirection:'row',alignItems:'center'}}>
      <RoundBtn title='查看物流'/>
      <RoundBtn title='延长收货'/>
      <RoundBtn title='确认收货' color='rgb(205,114,77)'/>
    </div>
  </div>
}


const ShopOrder = () => {
  return <div style={{marginBottom:'10px'}}>
    <ShopHeader/>
    <ShopContent/>
    <ShopFooter/>
  </div>
}


class OrderList extends React.Component {
  UNSAFE_componentWillMount() {

  }

  render() {
    return <div style={styles.full}>
      <Tabs tabs={tabs}
            swipeable={false}
            initialPage={0}
            onChange={(tab, index) => {
              console.log('onChange', index, tab);
            }}
            onTabClick={(tab, index) => {
              console.log('onTabClick', index, tab);
            }}
      >
        <div>
          <ShopOrder/>
          <ShopOrder/>
        </div>
        <div>
          <ShopOrder/>
        </div>
        <div>
          <ShopOrder/>
        </div>
        <div>
          <ShopOrder/>
        </div>
        <div>
          <ShopOrder/>
        </div>
      </Tabs>
      <WhiteSpace/>
    </div>
  }

}


export default connect(({shoppingcart}) => ({
  store: shoppingcart
}))(OrderList);


const styles = {
  full: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    height: '100%',
    backgroundColor: '#f5f5f5',
  },

  line2:{
    lineClamp:2
  }
}

