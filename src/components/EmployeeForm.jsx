import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { createEmployee } from '../features/employees/employeesThunks';

Modal.setAppElement('#root');

export default function EmployeeForm({ isOpen, onRequestClose, managers }) {
  const dispatch = useDispatch();
  const [file, setFile] = useState();
  const [form, setForm] = useState({
    name: '', designation: '', dob: '', experience: '', managerId: ''
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!file) errs.file = 'Image required';
    if (!form.name) errs.name = 'Required';
    if (!form.designation) errs.designation = 'Required';
    if (!form.dob) errs.dob = 'Required';
    if (!form.experience || isNaN(form.experience)) errs.experience = 'Valid number';
    return errs;
  };

  const onSubmit = e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    const data = new FormData();
    data.append('image', file);
    Object.entries(form).forEach(([k, v]) => data.append(k, v));

    dispatch(createEmployee(data)).then(() => {
      onRequestClose();
    });
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2>Add Employee</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>Photo</label>
          <input type="file" accept="image/*"
            onChange={e => setFile(e.target.files[0])} />
          {errors.file && <small>{errors.file}</small>}
        </div>
        {['name','designation','dob','experience'].map(field => (
          <div key={field}>
            <label>{field}</label>
            <input
              type={field==='experience'?'number': field==='dob'?'date':'text'}
              value={form[field]}
              onChange={e => setForm({...form, [field]: e.target.value})}
            />
            {errors[field] && <small>{errors[field]}</small>}
          </div>
        ))}
        <div>
          <label>Reporting Manager</label>
          <select
            value={form.managerId}
            onChange={e => setForm({...form, managerId: e.target.value})}
          >
            <option value="">— none —</option>
            {managers.map(m => (
              <option key={m._id} value={m._id}>
                {m.name} ({m.designation})
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Save</button>
      </form>
    </Modal>
  );
}
