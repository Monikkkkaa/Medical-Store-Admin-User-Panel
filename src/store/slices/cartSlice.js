import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { cartService } from '../../services/cart.service';

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      return await cartService.getCart();
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch cart');
    }
  }
);

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ medicineId, quantity }, { rejectWithValue }) => {
    try {
      return await cartService.addToCart(medicineId, quantity);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add to cart');
    }
  }
);

export const updateCartItem = createAsyncThunk(
  'cart/updateItem',
  async ({ medicineId, quantity }, { rejectWithValue }) => {
    try {
      return await cartService.updateCartItem(medicineId, quantity);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update cart');
    }
  }
);

export const removeFromCart = createAsyncThunk(
  'cart/removeItem',
  async (medicineId, { rejectWithValue }) => {
    try {
      return await cartService.removeFromCart(medicineId);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to remove item');
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: { items: [], totalAmount: 0 },
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload.cart;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cart = action.payload.cart;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.cart = action.payload.cart;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cart = action.payload.cart;
      });
  },
});

export const { clearError } = cartSlice.actions;
export default cartSlice.reducer;