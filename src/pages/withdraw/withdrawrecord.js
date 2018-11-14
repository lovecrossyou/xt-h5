/**
 * Created by zhulizhe on 2018/10/16.
 */

import React from 'react';

import { connect } from 'dva';
import DocumentTitle from 'react-document-title';

import styles from './page.css'

class WithDrawList extends React.Component {
  render() {
    const { withdrawList } = this.props.store;
    return (
      <div>
        {
          withdrawList.map((data,index)=>{
            return <DocumentTitle title='提现记录'>
              <div>
                <div className={styles.withdraw}>
                    <div className={styles.r_sp}>
                      <div>提现状态</div>
                      <div>{data.statusContent}</div>
                    </div>

                    <div className={styles.r_sp}>
                      <div>提现积分</div>
                      <div className={styles.updateAmount}>-{data.updateAmount}积分</div>
                    </div>

                    <div className={styles.r_sp}>
                      <div>到账</div>
                      <div  className={styles.updateAmount}>+{data.cashAmount/100}元</div>
                    </div>

                    <div className={styles.r_sp}>
                      <div>提现时间</div>
                      <div>{data.createTime}</div>
                    </div>
                  </div>
              </div>
            </DocumentTitle>
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
