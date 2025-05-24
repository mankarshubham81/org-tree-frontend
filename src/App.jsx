import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees } from './features/employeeSlice';
import TreeView from './components/TreeView';
import AddEmployeeModal from './components/AddEmployeeModal';
import './index.css';

const App = () => {
  const dispatch = useDispatch();
  const { tree, loading, error } = useSelector((state) => state.employees);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  return (
    <div className="app">
      <header className="header">
        <h1>Company Organization</h1>
        <AddEmployeeModal />
      </header>

      {loading && <p className="status-text">Loading...</p>}
      {error && <p className="status-text error">{error}</p>}

      {tree && <TreeView data={tree} />}
    </div>
  );
};

export default App;
