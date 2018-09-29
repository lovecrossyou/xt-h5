import React from 'react';
import {Menu, ActivityIndicator,Icon} from 'antd-mobile';
import filterStyles from './FilterMenu.css'

const MenuTitle = ({title='条件',onClick})=>{
  return (
    <div className={filterStyles.menuT} onClick={onClick}>
      <div style={{color:'#040404'}}>{title}</div>
      <div style={{display:'flex',flexDirection:'column',height:'24px'}}>
        <Icon type='up' color='#040404' />
        <Icon type='down' color='#040404'/>
      </div>
    </div>
  )
}

const data = [
  {
    value: '1',
    label: 'Food',
  }, {
    value: '2',
    label: 'Supermarket',
  },
  {
    value: '3',
    label: 'Extra',
    isLeaf: true,
  },
];


export default class Filter extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      initData: '',
      show: false,
    };
  }

  onChange = (value) => {
    let label = '';
    data.forEach((dataItem) => {
      if (dataItem.value === value[0]) {
        label = dataItem.label;
        if (dataItem.children && value[1]) {
          dataItem.children.forEach((cItem) => {
            if (cItem.value === value[1]) {
              label += ` ${cItem.label}`;
            }
          });
        }
      }
    });
    console.log(label);
  }
  handleClick = (e) => {
    e.preventDefault(); // Fix event propagation on Android
    this.setState({
      show: !this.state.show,
    });
    // mock for async data loading
    if (!this.state.initData) {
      setTimeout(() => {
        this.setState({
          initData: data,
        });
      }, 500);
    }
  }

  onMaskClick = () => {
    this.setState({
      show: false,
    });
  }

  render() {
    const {initData, show} = this.state;
    const menuEl = (
      <Menu
        className={filterStyles["single-foo-menu"]}
        data={initData}
        value={['1']}
        level={1}
        onChange={this.onChange}
        height={document.documentElement.clientHeight * 0.2}
      />
    );
    const loadingEl = (
      <div style={{
        position: 'absolute',
        width: '100%',
        height: document.documentElement.clientHeight * 0.6,
        display: 'flex',
        justifyContent: 'center'
      }}>
        <ActivityIndicator size="large"/>
      </div>
    );

    return (
      <div className={show ? filterStyles["single-menu-active"] : ''}>
        <div className={filterStyles["single-top-nav-bar"]}>
          <div className={filterStyles.menu}>
            <MenuTitle title='商品' onClick={this.handleClick}/>
            <MenuTitle title='积分筛选'/>
          </div>
        </div>
        {show ? initData ? menuEl : loadingEl : null}
        {show ? <div className={filterStyles["menu-mask"]} onClick={this.onMaskClick}/> : null}
      </div>
    );
  }
}
