import React, { useEffect, useState } from 'react';
import Tree from 'react-d3-tree';
import { useDispatch, useSelector } from 'react-redux';
import { loadTree } from '../features/employees/employeesThunks';
import EmployeeForm from './EmployeeForm';

export default function OrgTree() {
  const dispatch = useDispatch();
  const { tree, flatList, loading } = useSelector(s => s.employees);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    dispatch(loadTree());
  }, [dispatch]);

  console.log("tree", tree)
  console.log("loadTree", loadTree())
  console.log("flatList", flatList)
  console.log("loading", loading)
  if (loading || !tree) return <p>Loading…</p>;

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <button onClick={() => setModalOpen(true)}>Add Employee</button>
      <EmployeeForm
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        managers={flatList}
      />
      <Tree data={tree} orientation="vertical" />
    </div>
  );
}
