import React from 'react';
import {connect} from 'dva';
import {List,Button,InputItem,Picker} from 'antd-mobile';
import { createForm } from 'rc-form';
import { routerRedux } from 'dva/router';

import commonCityData from '../../utils/city'
class AddressEdit extends React.Component{


  constructor(props){
    super(props);

    this.state = {
      commonCityData:[]
    }
  }

  onCreate = ()=>{
    this.props.form.validateFields((error, params) => {
      params.districtAddress = params.districtAddress.toString();
      params.isDefault = 1 ;
      params.id = '' ;
      params.fullAddress = params.districtAddress + params.detailAddress ;
      this.props.dispatch({
        type:'address/add',
        payload:params,
        callback:()=>{
          this.props.dispatch(routerRedux.goBack())
        }
      });
    });
  }


  convertCity = data=>{
    const obj = {} ;
    obj.label = data.name ;
    obj.value = data.name ;

    if(data.cityList&&data.cityList.length!=0){
      obj.children = this.convertCityData(data.cityList) ;
    }
    if(data.districtList&&data.districtList.length!=0){
      obj.children = this.convertCityData(data.districtList) ;
    }
    return obj ;
  }


  convertCityData = oldData=>{
    const array = [] ;
    for(let d of oldData){
      array.push(this.convertCity(d));
    }
    return array;
  }


  componentDidMount(){
    const cityData = commonCityData.cityData ;
    const array = this.convertCityData(cityData) ;
    console.log('array ',JSON.stringify(array));
    this.setState({
      commonCityData:array
    })

    const store = this.props.store ;
    if(store.active!=null){
      const editAddress = store.active ;
      this.props.form.setFieldsValue({
        userName:editAddress.userName,
        phoneNum:editAddress.phoneNum,
      })
    }

    console.log('componentDidMount ',store);
  }

  render(){

    const { getFieldProps } = this.props.form;
    return <div>
      <InputItem
        {...getFieldProps('recievName')}
        clear
        placeholder="收件人"
        ref={el => this.autoFocusInst = el}
      >收件人</InputItem>
      <InputItem
        {...getFieldProps('phoneNum')}
        clear
        type='phone'
        placeholder="电话号码"
        ref={el => this.autoFocusInst = el}
      >电话号码</InputItem>


      <Picker extra="省市区县"
              data={this.state.commonCityData}
              title="请选择"
              {...getFieldProps('districtAddress', {
                initialValue: ['340000', '341500', '341502'],
              })}
              onOk={e => console.log('ok', e)}
              onDismiss={e => console.log('dismiss', e)}
      >
        <List.Item arrow="horizontal">省市区县</List.Item>
      </Picker>
      <InputItem
        {...getFieldProps('detailAddress')}
        clear
        placeholder="详细地址"
        ref={el => this.autoFocusInst = el}
      >详细地址</InputItem>
      <div style={{margin:'auto',marginTop:'40px',width:'95%'}}>
        <Button  type="warning"  onClick={this.onCreate}>确认添加</Button>
      </div>
    </div>
  }
}

const EditAddressWrapper = createForm()(AddressEdit);


export default connect(({address})=>({
  store:address,
}))(EditAddressWrapper);
