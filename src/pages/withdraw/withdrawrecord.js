/**
 * Created by zhulizhe on 2018/10/16.
 */

import React from 'react';

import { connect } from 'dva';
import styles from './page.css'

class WithDrawList extends React.Component {
  render() {
    const { withdrawList } = this.props.store;
    return (
      <div>
        {
          withdrawList.map((data,index)=>{
            return <div>
              <div className={styles.withdraw}>
                <div className={styles.withdraw_top}>
                  <div className={styles.gray}>{data.statusContent}</div>
                  <div><span  className={styles.updateAmount}>{data.updateAmount}积分</span></div>
                </div>
                <div className={styles.withdraw_bot}>{data.createTime}</div>
              </div>
            </div>
          })
        }
      </div>
    );
  }
}

export default connect(state => {
  return {
    store: state.withdraw,
  };
})(WithDrawList);
