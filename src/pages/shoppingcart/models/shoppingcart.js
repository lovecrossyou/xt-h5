import {queryShoppingCart} from "../services/shoppingcart";


class ProductItem {
  constructor(p) {
    this.selected = true;
    this.productName = p.productName;
    this.price = p.price;
    this.count = p.count;
  }

  toggleState = () => {
    this.selected = !this.selected;
  }

  setSelect = seleted => {
    this.selected = seleted;
  }

  setCount = count=>{
    this.count = count ;
  }
}

class ShopItem {
  constructor(shop) {
    this.selected = true;
    this.list = shop.items.map(item => new ProductItem(item));
    this.shopName = shop.shopName;
  }

  toggleState = () => {
    this.selected = !this.selected;
    for (let p of this.list) {
      p.setSelect(this.selected);
    }
  }

  getTotalPrice = () => {
    return this.list.reduce((total, p) => {
      if (p.selected === false) return total;
      return total + p.price * p.count;
    }, 0);
  }

  getTotalCount = () => {
    return this.list.reduce((total, p) => {
      if (p.selected === false) return total;
      return total + p.count;
    }, 0);
  }

  setSelect = seleted => {
    this.selected = seleted;
    this.list.forEach(p=>{
      p.setSelect(seleted);
    })
  }

  getSelectedItem = ()=>{
    const list = [] ;
    this.list.forEach(p=>{
      if(p.selected){
        list.push(p);
      }
    });
    return list ;
  }
}


class ShoppingCart {
  constructor(list = []) {
    this.selected = true;
    this.editing = false;
    this.list = list.map(l => {
      return new ShopItem(l);
    });

    //计算选中的 商品总价 和总数量
    this.totalPrice = list.reduce((totalShop, shop) => {
      const totalPriceOfShop = shop.items.reduce((total, item) => {
        return total + item.price * item.count;
      }, 0)
      return totalShop + totalPriceOfShop;
    }, 0);

    //计算选中的 商品总数量
    this.totalCount = list.reduce((totalShop, shop) => {
      const totalCountOfShop = shop.items.reduce((total, item) => {
        return total + item.count;
      }, 0)
      return totalShop + totalCountOfShop;
    }, 0);
  }

  // 清空购物车
  clear = ()=>{
    this.selected = false;
    this.list = [] ;
  }

  // 设置编辑状态
  toggleEditState = ()=>{
    this.editing = !this.editing ;
  }

  // 设置选中状态
  toggleSelect = ()=>{
    // this.selected = !this.selected ;
    this.list.forEach(shop=>shop.setSelect(this.selected));
  }
}


const reduceNewShoppingCartState = state=>{
  let shoppingCart = state.shoppingCart ;
  shoppingCart = Object.assign({},shoppingCart);
  const shops = state.shoppingCart.list;
  let totalPrice = 0;
  let totalCount = 0;
  shops.forEach(shop => {
    //商品的选中
    totalPrice += shop.getTotalPrice();
    totalCount += shop.getTotalCount();
  })
  shoppingCart.totalPrice = totalPrice.toFixed(2);
  shoppingCart.totalCount = totalCount;
  return {...state, shoppingCart};
}



export default {
  namespace: 'shoppingcart',
  state: {
    shoppingCart: new ShoppingCart()
  },

  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/shoppingcart') {
          dispatch({
            type: 'fetch'
          })
          dispatch({
            type:'global/setTitle',payload:{
              text:"购物车"
            }
          })
        }
      });
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryShoppingCart, payload);

      console.log('response ',response)
      yield put({type: 'save', payload: response.data.shops});
    },
  },


  reducers: {
    save(state, action) {
      const shoppingCart = new ShoppingCart(action.payload);
      return {...state, shoppingCart};
    },

    // 编辑状态
    toggleEdit(state) {
      const editing = !state.shoppingCart.editing;
      let shoppingCart = state.shoppingCart;
      shoppingCart = Object.assign(shoppingCart, {
        editing: editing
      });
      return {...state, shoppingCart};
    },

    // 店铺选中
    toggleShopSelect(state,action){
      const shop = action.payload ;
      shop.toggleState();
      // 重新生成整个购物车
      return reduceNewShoppingCartState(state);
    },

    // 选中商品
    selectProduct(state,action) {
      action.payload.toggleState();
      return reduceNewShoppingCartState(state);
    },

    // 商品数量加减
    setProductCount(state,action){
      action.payload.product.setSelect(true);
      action.payload.product.setCount(action.payload.count) ;
      return reduceNewShoppingCartState(state);
    },

    // 清空购物车
    clearShoppingCart(state){
      const shoppingCart = Object.assign({},state.shoppingCart,{
        list:[],
      }) ;
      return {
        ...state,
        shoppingCart
      }
    },

    // 删除商品
    delProduct(state,action){

    },

    // 设置编辑状态
    toggleEditState(state,action){
      const editing = !state.shoppingCart.editing ;
      const shoppingCart = Object.assign({},state.shoppingCart,{
        editing:editing
      }) ;
      return {
        ...state,
        shoppingCart
      }
    },

    // 整个购物车的选中
    toggleShoppingSelect(state) {
      const selected = !state.shoppingCart.selected ;
      const shoppingCart = Object.assign({},state.shoppingCart,{
        selected:selected
      }) ;
      let totalPrice = 0;
      let totalCount = 0;
      shoppingCart.list.forEach(shop => {
        shop.setSelect(selected)
        //商品的选中
        totalPrice += shop.getTotalPrice();
        totalCount += shop.getTotalCount();
      })
      shoppingCart.totalPrice = totalPrice.toFixed(2);
      shoppingCart.totalCount = totalCount;
      return {
        ...state,
        shoppingCart
      }
    },
  },
};
