import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../util/config";

const initialState = {
  arrProduct: [],
  productDetail: {},
  arrProductSearch: [],
  cartProduct: [],
};
const productReducer = createSlice({
  name: "productReducer",
  initialState,
  reducers: {
    setProductAction: (state, action) => {
      state.arrProduct = action.payload;
    },
    setProductDetailAction: (state, action) => {
      state.productDetail = action.payload;
    },
    setProductSearchAction: (state, action) => {
      state.arrProductSearch = action.payload;
    },
    setProductCartsAction: (state, action) => {
      const index = state.cartProduct.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.cartProduct[index].quantity += action.payload.quantity;
      } else {
        state.cartProduct = [...state.cartProduct, action.payload];
      }
    },
    clearCart: (state, action) => {
      const cartClear = [];
      state.cartProduct = [...cartClear];
    },
  },
});

export const {
  setProductAction,
  setProductDetailAction,
  setProductSearchAction,
  setProductCartsAction,
  clearCart,
} = productReducer.actions;

export default productReducer.reducer;

export const getProductDetailApiActionAsync = (id) => {
  return async (dispatch) => {
    const result = await http.get(`/api/Product/getbyid?id=${id}`);

    const action = setProductDetailAction(result.data.content);
    dispatch(action);
  };
};

export const getProductByKeyword = (keyword) => {
  return async (dispatch) => {
    const result = await http.get(`/api/Product?keyword=${keyword}`);
    const action = setProductSearchAction(result.data.content);
    dispatch(action);
  };
};
export const clearCartAction = () => {
  return async (dispatch) => {
    const action = clearCart();
    dispatch(action);
  };
};
