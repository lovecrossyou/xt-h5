/**
 * Created by zhulizhe on 2018/10/16.
 */
import React from 'react';

import { connect } from 'dva';
import { List, InputItem, Button, WhiteSpace } from 'antd-mobile';
import { createForm } from 'rc-form';
import { routerRedux } from 'dva/router';

import styles from './page.css';

@createForm()
class WithDraw extends React.Component {
  state = {
    type: 'money',
  };

  withdraw = () => {
    this.props.form.validateFields((error, value) => {
      if (!error) {
        this.props.dispatch({
          type: 'withdraw/withdraw',
          payload: value,
        });
      }
    });
  };

  render() {
    const { getFieldProps } = this.props.form;
    const { type } = this.state;
    return (
      <div>
        <List>
          <InputItem
            {...getFieldProps('amount', {
              rules: [{ required: true }],
            })}
            type={type}
            placeholder="填写提现数额"
            clear
            moneyKeyboardAlign="left"
          ><h3>提现金额</h3></InputItem>
        </List>
        <WhiteSpace/>
        <Button onClick={this.withdraw} type="primary">提现</Button>

        <div
          onClick={() => {
            this.props.dispatch(routerRedux.push('/withdraw/withdrawrecord'))
          }}
          className={styles.record}
        >提现记录</div>
      </div>
    );
  }
}

export default connect(state => {
  return {
    store: state.withdraw,
  };
})(WithDraw);
