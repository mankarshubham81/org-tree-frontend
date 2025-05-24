// src/App.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees } from './features/employeeSlice';
import TreeView from './components/TreeView';
import AddEmployeeModal from './components/AddEmployeeModal';

const App = () => {
  const dispatch = useDispatch();
  const { tree, loading, error } = useSelector((state) => state.employees);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Organization Tree</h1>
        <AddEmployeeModal />
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {tree && <TreeView data={tree} />}
    </div>
  );
};

export default App;
