import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { medicineService } from '../../services/medicine.service';

export const fetchMedicines = createAsyncThunk(
  'medicines/fetchMedicines',
  async (params, { rejectWithValue }) => {
    try {
      return await medicineService.getMedicines(params);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch medicines');
    }
  }
);

export const fetchMedicineById = createAsyncThunk(
  'medicines/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      return await medicineService.getMedicineById(id);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch medicine');
    }
  }
);

const medicineSlice = createSlice({
  name: 'medicines',
  initialState: {
    medicines: [],
    currentMedicine: null,
    pagination: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentMedicine: (state) => {
      state.currentMedicine = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMedicines.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMedicines.fulfilled, (state, action) => {
        state.loading = false;
        state.medicines = action.payload.medicines;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchMedicines.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMedicineById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMedicineById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentMedicine = action.payload.medicine;
      })
      .addCase(fetchMedicineById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearCurrentMedicine } = medicineSlice.actions;
export default medicineSlice.reducer;