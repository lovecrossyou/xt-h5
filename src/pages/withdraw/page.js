/**
 * Created by zhulizhe on 2018/10/16.
 */
import React from 'react';

import {connect} from 'dva';
import { List, InputItem,Button,WhiteSpace } from 'antd-mobile';
import { createForm } from 'rc-form';


@createForm()
class WithDraw extends React.Component {
  state = {
    type: 'money',
  }

  withdraw = ()=>{
    this.props.form.validateFields((error, value) => {
      console.log(error, value);
    });
  }
  render() {
    const { getFieldProps } = this.props.form;
    const { type } = this.state;
    return (
      <div>
        <List>
          <InputItem
            {...getFieldProps('amount', {
              rules: [{required: true}],
            })}
            type={type}
            defaultValue={100}
            placeholder="填写提现数额"
            clear
            moneyKeyboardAlign="left"
          >提现金额</InputItem>
        </List>
        <WhiteSpace />
        <Button onClick={this.withdraw} type="primary">提现</Button>
      </div>
    );
  }
}

export default connect(state=>{
  return {
    store:state.withdraw
  }
})(WithDraw);
