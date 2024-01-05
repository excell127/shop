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
  productsFiltered: [],
  isLoading: false,
  error: "",
  isOpenSearch: false,
};

const productReducer = createSlice({
  name: "products",
  initialState,
  reducers: {
    searchProducts(state, action) {
      const query = action.payload.q;

      if (!query) {
        state.productsFiltered = state.products;
        return;
      }

      state.productsFiltered = state.products.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
    },
    openSearch(state) {
      if (state.isLoading) {
        return;
      }
      state.isOpenSearch = !state.isOpenSearch;
    },
  },
  extraReducers: (build) => {
    build.addCase(getProducts.pending, (state) => {
      state.isLoading = true;
    });
    build.addCase(getProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
      state.productsFiltered = action.payload;
    });
    build.addCase(getProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message;
    });
  },
});

export const { openSearch, searchProducts } = productReducer.actions;

export default productReducer.reducer;
