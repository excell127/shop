import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, thunkAPI) => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const json = await response.json();
      return json;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  products: [],
  productsFilltered: [],
  isLoading: false,
  error: "",
  isEnableSearch: false,
};

const productReducer = createSlice({
  name: "products",
  initialState,
  reducers: {
    searchProducts: (state, action) => {
      const query = action.payload.q;

      // if query doesn't have value, return all previous products
      if (!query) {
        state.productsFilltered = state.products;
        return;
      }

      const products = state.products;
      const queryLowerCase = query.toLowerCase();

      // filter products by name
      state.productsFilltered = products.filter((product) =>
        product.title.toLowerCase().includes(queryLowerCase)
      );
    },
    openSearch: (state) => {
      if (state.isLoading) {
        return;
      }
      state.isEnableSearch = !state.isEnableSearch;
    },
  },
  extraReducers: (build) => {
    build.addCase(getProducts.pending, (state) => {
      state.isLoading = true;
    });
    build.addCase(getProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
      state.productsFilltered = action.payload;
    });
    build.addCase(getProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message;
    });
  },
});

export const { openSearch, searchProducts } = productReducer.actions;

export default productReducer.reducer;
