import React, { useState } from 'react';
import useForm from './useForm';
import '../App.css';

const validate = (values) => {
  let errors = {};
  if (!values.name) {
    errors.name = 'Name is required';
  }
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid';
  }
  if (!values.age) {
    errors.age = 'Age is required';
  } else if (isNaN(values.age) || values.age <= 0) {
    errors.age = 'Age must be a number greater than 0';
  }
  if (values.areYouAttendingWithGuest && !values.guestName) {
    errors.guestName = 'Guest name is required';
  }
  return errors;
};

const EventRegistrationForm = () => {
  const [submittedData, setSubmittedData] = useState(null);

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useForm((values) => {
    setSubmittedData(values);
  }, validate);

  const [showGuestField, setShowGuestField] = useState(false);

  const handleAttendingChange = (event) => {
    const value = event.target.value === 'Yes';
    setShowGuestField(value);
    setFieldValue('areYouAttendingWithGuest', value);
    if (!value) {
      setFieldValue('guestName', '');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={values.name || ''}
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={values.email || ''}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={values.age || ''}
            onChange={handleChange}
          />
          {errors.age && <p className="error">{errors.age}</p>}
        </div>
        <div>
          <label>Are you attending with a guest?</label>
          <select
            name="areYouAttendingWithGuest"
            onChange={handleAttendingChange}
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>
        {showGuestField && (
          <div>
            <label>Guest Name:</label>
            <input
              type="text"
              name="guestName"
              value={values.guestName || ''}
              onChange={handleChange}
            />
            {errors.guestName && <p className="error">{errors.guestName}</p>}
          </div>
        )}
        <button type="submit">Submit</button>
      </form>

      {submittedData && (
        <div className="summary">
          <h2>Form Submission Summary</h2>
          <p><strong>Name:</strong> {submittedData.name}</p>
          <p><strong>Email:</strong> {submittedData.email}</p>
          <p><strong>Age:</strong> {submittedData.age}</p>
          <p>
            <strong>Attending with a guest:</strong> {submittedData.areYouAttendingWithGuest ? 'Yes' : 'No'}
          </p>
          {submittedData.areYouAttendingWithGuest && (
            <p><strong>Guest Name:</strong> {submittedData.guestName}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default EventRegistrationForm;
