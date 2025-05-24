import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchEmployees = createAsyncThunk('employees/fetch', async () => {
  const res = await axios.get('http://localhost:4000/api/employees');
  return res.data;
});

export const addEmployee = createAsyncThunk('employees/add', async (formData) => {
  await axios.post('http://localhost:4000/api/employees', formData);
  const res = await axios.get('http://localhost:4000/api/employees');
  return res.data;
});

const buildTree = (flat) => {
  const map = {};
  const roots = [];

  flat.forEach((node) => (map[node._id] = { ...node, children: [] }));

  flat.forEach((node) => {
    if (node.reportingManager && map[node.reportingManager]) {
      map[node.reportingManager].children.push(map[node._id]);
    } else {
      roots.push(map[node._id]);
    }
  });

  return roots;
};

const employeeSlice = createSlice({
  name: 'employees',
  initialState: {
    flat: [],
    tree: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.flat = action.payload;
        state.tree = buildTree(action.payload);
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.flat = action.payload;
        state.tree = buildTree(action.payload);
      });
  }
});

export default employeeSlice.reducer;