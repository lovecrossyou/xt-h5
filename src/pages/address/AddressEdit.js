import React from 'react';
import {connect} from 'dva';
import {List,Button,InputItem,Picker,Toast} from 'antd-mobile';
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

      if(params.recievName==undefined){
        Toast.info('请输入收件人');
        return ;
      }

      if(params.phoneNum==undefined){
        Toast.info('请输入电话号码');
        return ;
      }

      if(params.detailAddress==undefined){
        Toast.info('请输入详细地址信息');
        return ;
      }

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

  onUpdate = ()=>{
    this.props.form.validateFields((error, params) => {

      if(params.recievName==undefined){
        Toast.info('请输入收件人');
        return ;
      }

      if(params.phoneNum==undefined){
        Toast.info('请输入电话号码');
        return ;
      }

      if(params.detailAddress==undefined){
        Toast.info('请输入详细地址信息');
        return ;
      }


      const editAddress = this.props.store.activeAddress ;
      params.districtAddress = params.districtAddress.toString();
      params.isDefault = 1 ;
      params.id = editAddress.id ;
      params.fullAddress = params.districtAddress + params.detailAddress ;
      this.props.dispatch({
        type:'address/edit',
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
    this.setState({
      commonCityData:array
    })

    const store = this.props.store ;
    if(store.activeAddress&&store.edit){
      const editAddress = store.activeAddress ;
      this.props.form.setFieldsValue({
        recievName:editAddress.recievName,
        phoneNum:editAddress.phoneNum,
        detailAddress:editAddress.detailAddress,
      })
    }
  }

  isEdit = ()=>{
    const store = this.props.store ;
    return store.activeAddress&&store.edit ;
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
                initialValue: ['请选择地区', '', ''],
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
        {
          this.isEdit()?(<Button  type="warning"  onClick={this.onUpdate}>更新</Button>):(<Button  type="warning"  onClick={this.onCreate}>确认添加</Button>)
        }

      </div>
    </div>
  }
}

const EditAddressWrapper = createForm()(AddressEdit);


export default connect(({address})=>({
  store:address,
}))(EditAddressWrapper);
