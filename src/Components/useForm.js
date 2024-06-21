import { useState } from 'react';

const useForm = (onSubmit, validate) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      onSubmit(values);
    }
  };

  const setFieldValue = (field, value) => {
    setValues({
      ...values,
      [field]: value,
    });
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    setFieldValue,
  };
};

export default useForm;
