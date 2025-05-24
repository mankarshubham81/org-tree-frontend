import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEmployee, fetchEmployees } from '../features/employeeSlice';
import './AddEmployeeModal.css';

const AddEmployeeModal = () => {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    name: '',
    designation: '',
    dob: '',
    experience: '',
    reportingManager: '',
    image: null,
  });

  const dispatch = useDispatch();
  const { flat } = useSelector((state) => state.employees);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => data.append(k, v));
    await dispatch(addEmployee(data));
    setShow(false);
  };

  return (
    <>
      <button onClick={() => setShow(true)} className="open-modal-button">
        + Add Employee
      </button>
      {show && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add Employee</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                required
                onChange={handleChange}
              />
              <input
                type="text"
                name="designation"
                placeholder="Designation"
                required
                onChange={handleChange}
              />
              <input
                type="date"
                name="dob"
                required
                onChange={handleChange}
              />
              <input
                type="number"
                name="experience"
                placeholder="Years of Experience"
                required
                onChange={handleChange}
              />
              <select name="reportingManager" onChange={handleChange}>
                <option value="">No Manager</option>
                {flat.map((emp) => (
                  <option key={emp._id} value={emp._id}>
                    {emp.name} ({emp.designation})
                  </option>
                ))}
              </select>
              <input
                type="file"
                name="image"
                accept="image/*"
                required
                onChange={handleChange}
              />
              <div className="modal-buttons">
                <button
                  type="button"
                  onClick={() => setShow(false)}
                  className="cancel-button"
                >
                  Cancel
                </button>
                <button type="submit" className="submit-button">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddEmployeeModal;
