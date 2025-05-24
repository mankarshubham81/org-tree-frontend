import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from '../features/employeeSlice';

const store = configureStore({
  reducer: {
    employees: employeeReducer
  }
});

export default store;