import React from 'react';
import {connect} from 'dva';
import {Button} from 'antd-mobile';
import styles from './page.css'
import {AddressCell} from "./components/addresscell";
import {routerRedux } from 'dva/router';


const CreateNewAddress = ({onClick}) => {
  return (
    <div className={styles["add-addr-container"]}>
      <Button className={styles["btn-new"]} type='warning' onClick={onClick}>添加新地址</Button>
    </div>
  )
}

class AddressList extends React.Component {
  //点击地址

  onClick = (address)=>{
    this.props.dispatch({
      type:'address/saveActive',
      payload:address
    });
    this.props.dispatch(routerRedux.goBack());

  }

  // 编辑
  addresseEdit = (address)=>{
    this.props.dispatch({
      type:'address/saveActive',
      payload:address
    });
    this.props.dispatch(
      routerRedux.push('/address/AddressEdit?edit=true')
    );
  }

  // 删除
  addressDel = (address)=>{
    this.props.dispatch({
      type:'address/delete',
      payload:address
    });
  };

  // 新建
  createNew = ()=>{
    this.props.dispatch({
      type:'address/saveActive',
      payload:null
    });
    this.props.dispatch(
      routerRedux.push('/address/AddressEdit')
    );
  }


  render() {
    const store = this.props.store;
    return <div style={{paddingBottom:'60px'}}>
      {
        store.list.map((address,index) => {
          return <AddressCell
            onClick={this.onClick}
            edit={this.addresseEdit}
            del={this.addressDel}
            address={address}
            key={'#'+index}/>
        })
      }
      <CreateNewAddress onClick={this.createNew}/>
    </div>
  }
}


export default connect(state=>{
  return {
    store:state.address
  }
})(AddressList);


//
