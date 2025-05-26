import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEmployee, fetchEmployees } from '../features/employeeSlice';
import './AddEmployeeModal.css';

const MAX_IMAGE_SIZE = 1 * 1024 * 1024; // 1 MB

const AddEmployeeModal = () => {
  const [show, setShow] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: '',
    designation: '',
    dob: '',
    experience: '',
    reportingManager: '',
    image: null,
  });
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const { flat } = useSelector((state) => state.employees);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const validateField = (name, value) => {
    let msg = '';
    switch (name) {
      case 'name':
      case 'designation':
        if (!value.trim()) msg = 'This field is required.';
        break;
      case 'dob':
        if (!value) msg = 'Please select date of birth.';
        else if (new Date(value) > new Date()) msg = 'DOB cannot be in the future.';
        break;
      case 'experience':
        if (value === '') msg = 'Please enter experience.';
        else if (parseInt(value, 10) < 0) msg = 'Experience must be non-negative.';
        break;
      case 'image':
        if (!value) msg = 'Please upload an image.';
        else if (value.size > MAX_IMAGE_SIZE)
          msg = 'Image must be 1 MB or smaller.';
        break;
      default:
        break;
    }
    setErrors((e) => ({ ...e, [name]: msg }));
    return msg === '';
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const fieldValue = files ? files[0] : value;
    setForm((prev) => ({ ...prev, [name]: fieldValue }));
    validateField(name, fieldValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // validate all
    const isValid = Object.entries(form).every(([k, v]) =>
      validateField(k, v)
    );
    if (!isValid) return;

    setSubmitting(true);
    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => data.append(k, v));
    try {
      // await dispatch(addEmployee(data)).unwrap();
      await dispatch(addEmployee(data))
      
      setShow(false);
      setForm({
        name: '',
        designation: '',
        dob: '',
        experience: '',
        reportingManager: '',
        image: null,
      });
      setErrors({});
    } catch (err) {
      // handle server error if needed
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShow(true)}
        className="open-modal-button"
      >
        + Add Employee
      </button>

      {show && (
        <div className="modal-overlay">
          <div className="modal-content" role="dialog" aria-modal="true">
            <div className="modal-header">
              <h2>Add New Employee</h2>
              <button
                aria-label="Close"
                className="modal-close"
                onClick={() => setShow(false)}
                disabled={submitting}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  disabled={submitting}
                />
                {errors.name && <div className="error-text">{errors.name}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="designation">Designation *</label>
                <input
                  id="designation"
                  type="text"
                  name="designation"
                  value={form.designation}
                  onChange={handleChange}
                  disabled={submitting}
                />
                {errors.designation && <div className="error-text">{errors.designation}</div>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="dob">Date of Birth *</label>
                  <input
                    id="dob"
                    type="date"
                    name="dob"
                    value={form.dob}
                    onChange={handleChange}
                    disabled={submitting}
                  />
                  {errors.dob && <div className="error-text">{errors.dob}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="experience">Experience (yrs) *</label>
                  <input
                    id="experience"
                    type="number"
                    name="experience"
                    min="0"
                    value={form.experience}
                    onChange={handleChange}
                    disabled={submitting}
                  />
                  {errors.experience && <div className="error-text">{errors.experience}</div>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="reportingManager">Reporting Manager</label>
                <select
                  id="reportingManager"
                  name="reportingManager"
                  value={form.reportingManager}
                  onChange={handleChange}
                  disabled={submitting}
                >
                  <option value="">No Manager</option>
                  {flat.map((emp) => (
                    <option key={emp._id} value={emp._id}>
                      {emp.name} ({emp.designation})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="image">Profile Image *</label>
                <input
                  id="image"
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  disabled={submitting}
                />
                {errors.image && <div className="error-text">{errors.image}</div>}
              </div>

              <div className="modal-buttons">
                <button
                  type="button"
                  onClick={() => setShow(false)}
                  className="cancel-button"
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="submit-button"
                  disabled={submitting}
                >
                  {submitting ? 'Submitting…' : 'Submit'}
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
