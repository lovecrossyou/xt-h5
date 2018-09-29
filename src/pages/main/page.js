import {connect} from 'dva';
import styles from './page.less';
import Link from 'umi/link';

function App(props) {
  return (
    <div className={styles.normal}>
      <br/>
      <Link to="/login/page">登录页</Link>
      <br/>
      <Link to="/shoppingcart/page">购物车</Link>
      <br/>
      <Link to="/order/page">订单列表</Link>
      <br/>
      <Link to="/points/page">积分商城</Link>
      <br/>
      <Link to="/productlist/page">商品列表</Link>
      <br/>
      <Link to="/address/page">地址列表</Link>
    </div>
  );
}

export default connect(state => {
  return {
    pageData: state.main
  };
})(App);
