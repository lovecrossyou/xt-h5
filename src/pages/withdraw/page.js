/**
 * Created by zhulizhe on 2018/10/16.
 */
import React from 'react';

import { connect } from 'dva';
import { List, InputItem, Button, WhiteSpace } from 'antd-mobile';
import { createForm } from 'rc-form';
import { routerRedux } from 'dva/router';
import DocumentTitle from 'react-document-title';

import styles from './page.css';

import bg_icon from '../../assets/intergral-banner.png'

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
          cb:()=>{
            this.goRecord();
          }
        });
      }
    });
  };

  goRecord = ()=>{
    this.props.dispatch(routerRedux.push('/withdraw/withdrawrecord'))
  }

  render() {
    const { getFieldProps } = this.props.form;
    const { type } = this.state;
    return (
      <DocumentTitle title='积分提现'>
        <div>
          <div className={styles.top_bg}/>
          <List>
            <InputItem
              {...getFieldProps('amount', {
                rules: [{ required: true }],
              })}
              type={type}
              placeholder="填写提现数额"
              clear
              moneyKeyboardAlign="left"
            ><h4>提现金额</h4></InputItem>
          </List>
          <WhiteSpace/>
          <Button onClick={this.withdraw} type="primary">提现</Button>

          <div
            onClick={this.goRecord.bind(this)}
            className={styles.record}
          >提现记录</div>

          <div className={styles.tixian_info}>
            <img width='100%' src="https://api.tuexing.com/h5/tixian_info.jpeg" alt=""/>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

export default connect(state => {
  return {
    store: state.withdraw,
  };
})(WithDraw);
