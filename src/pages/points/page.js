import React from 'react';
import { connect } from 'dva';
import styles from './page.less';
import { routerRedux } from 'dva/router';
import { Toast } from 'antd-mobile';

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


const Category = ({ onClick }) => {

  const Item = ({ title, className }) => {
    return <div
      onClick={onClick}
      style={{ backgroundColor: '#fff', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <div className={className}/>
      <div style={{ textAlign: 'center', height: '24px', lineHeight: '24px' }}>{title}</div>
    </div>;
  };

  return <div style={{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: '17px',
    marginBottom: '12px',
    backgroundColor: '#fff',
    padding: '15px',
  }}>
    <Item title='吃行乐' className={styles.eat}/>
    <Item title='车生活' className={styles.car}/>
    <Item title='小日常' className={styles.normal}/>
    <Item title='其他' className={styles.other}/>

  </div>;
};


const CenterView = ({leftClick,rightClick}) => {
  return <div
    style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#f5f5f5', marginBottom: '15px' }}>
    <div onClick={leftClick} className={styles.left}></div>
    <div onClick={rightClick} className={styles.right}></div>
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

// 猜你喜欢   热门兑换   精品推荐
const GuessYouLike = ({ products, onClick, showMore }) => {
  return <div style={{ backgroundColor: '#fff', marginBottom: '15px' }}>
    <div className={styles.flexR} style={{ height: '10px', padding: '15px', backgroundColor: '#fff' }}>
      <div>猜你喜欢</div>
      <div onClick={() => {
        showMore('guess_like');
      }}>更多
      </div>
    </div>
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: '17px',
      backgroundColor: '#fff',
      // padding: '15px',
      width:'100%'
    }}>
      {
        products.map((p, index) => <Item key={'#' + index} item={p} onClick={onClick}/>)
      }
    </div>
  </div>;
};

// Hot
const Hot = ({ products, onClick, showMore }) => {
  return <div style={{ backgroundColor: '#fff', marginBottom: '15px' }}>
    <div className={styles.flexR} style={{ height: '10px', padding: '15px', backgroundColor: '#fff' }}>
      <div>热门兑换</div>
      <div onClick={()=>{
        showMore('hot_product');
      }}>更多</div>
    </div>
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: '17px',
      backgroundColor: '#fff',
      padding: '15px',
    }}>
      {
        products.map((p, index) => <Item key={'#' + index} item={p} onClick={onClick}/>)
      }
    </div>
  </div>;
};

// Local
const Local = ({ onClick }) => {
  return <div style={{ height: '255px', backgroundColor: '#fff', marginBottom: '12px' }}>
    <div onClick={onClick} className={styles.flexR}
         style={{ height: '10px', padding: '15px', backgroundColor: '#fff' }}>
      <div>精品推荐</div>
    </div>
    <div className={styles.flexR}>
      <div className={styles.localLeft}></div>
      <div className={styles.flexC}>
        <div className={styles.rightTop}></div>
        <div className={styles.rightBot}></div>
      </div>
    </div>
  </div>;
};

class Points extends React.Component {

  goProductList = () => {
    this.props.dispatch(routerRedux.push('/productlist'));
  };

  onClick = item => {
    this.props.dispatch(
      routerRedux.push('/productlist/ProductDetail?productId=' + item.id),
    );
  };

  showMore = category => {
    this.props.dispatch(
      routerRedux.push('/productlist/page?category=' + category),
    );
  };

  rightClick = ()=>{
    this.props.dispatch(
      routerRedux.push('/404')
    );
    // Toast.info('即将开放');
  }

  leftClick = ()=>{
    this.props.dispatch(
      routerRedux.push('/404')
    );
  }


  render() {
    const { guestLikeResult, hotResult, prefectResult, userInfo } = this.props.store;
    return <div style={{ backgroundColor: '#f5f5f5' }}>
      <UserInfo userInfo={userInfo}/>
      <Banner/>
      <Category onClick={this.goProductList}/>
      <CenterView leftClick={this.leftClick} rightClick={this.rightClick}/>
      <GuessYouLike
        showMore={this.showMore}
        products={guestLikeResult}
        onClick={this.onClick}/>
      <Hot
        products={hotResult}
        showMore={this.showMore}
        onClick={this.onClick}/>
      <Local products={prefectResult} onClick={this.onClick}/>
    </div>;
  }
}

export default connect(state => ({
  store: state.points,
}))(Points);
