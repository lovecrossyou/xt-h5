import React from 'react';
import { SwipeAction, List, Icon } from 'antd-mobile';
import styles from './address.css';


const NamePhone = ({ address }) => {
  if (address != null) {
    return (
      <div className={styles['cell-content']}>
        <div className={styles.right}>
          <div className={styles['flex-r']}>
            <div>{address.recievName}</div>
            <div>{address.phoneNum}</div>
          </div>
          <div className={styles['flex-r']}>
            <div>{address.fullAddress}</div>
          </div>
        </div>
      </div>);
  }
  return <div className={styles['center']}>
    点击新建收货地址 +
  </div>;
};


export const AddressCell = ({ address, del, edit, onClick }) => {
  return <div style={{ margin: '10px 0', backgroundColor: '#fff' }}>
    <List>
      <SwipeAction
        style={{ backgroundColor: '#f5f5f5' }}
        autoClose
        right={[
          {
            text: '删除',
            onPress: () => {
              del(address);
            },
            style: { backgroundColor: '#ddd', color: 'white', width: '70px' },
          },
          {
            text: '编辑',
            onPress: () => {
              edit(address);
            },
            style: { backgroundColor: '#F4333C', color: 'white', width: '70px' },
          },
        ]}
        onOpen={() => console.log('global open')}
        onClose={() => console.log('global close')}
      >
        <List.Item
          onClick={()=>{
            onClick&&onClick(address);
          }}
        >
          {/*<div className={styles["left-icon"]}>*/}
          {/*<Icon type='search'/>*/}
          {/*</div>*/}
          <NamePhone address={address}/>
        </List.Item>
      </SwipeAction>
    </List>
  </div>;
};
