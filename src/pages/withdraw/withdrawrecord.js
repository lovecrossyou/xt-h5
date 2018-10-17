/**
 * Created by zhulizhe on 2018/10/16.
 */

import React from 'react';

import { connect } from 'dva';
import { List, InputItem, Button, WhiteSpace } from 'antd-mobile';


class WithDrawList extends React.Component {
  render() {
    const { withdrawList } = this.props.store;
    return (
      <div>
        {
          withdrawList.map((data,index)=>{
            return <div>
              <div>{data.createTime}</div>
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
