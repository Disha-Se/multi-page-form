import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Page2 = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const isStudying = watch('isStudying', false);

  // Load saved data from localStorage when component mounts
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('formData')) || {};
    if (savedData.isStudying !== undefined) {
      setValue('isStudying', savedData.isStudying);
    }
    if (savedData.institution) {
      setValue('institution', savedData.institution);
    }
  }, [setValue]);

  const onSubmit = (data) => {
    // Save current form data to localStorage
    const savedData = JSON.parse(localStorage.getItem('formData')) || {};
    const newData = { ...savedData, ...data };
    localStorage.setItem('formData', JSON.stringify(newData));

    navigate('/page3');
  };

  const onBack = () => {
    // Save current form data before going back
    const savedData = JSON.parse(localStorage.getItem('formData')) || {};
    const currentData = {
      ...savedData,
      isStudying: watch('isStudying'),
      institution: watch('institution'),
    };
    localStorage.setItem('formData', JSON.stringify(currentData));

    navigate('/'); // Assuming Page1 is at "/"
  };

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.heading}>Education Details</h2>

      <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
        <label style={styles.checkboxLabel}>
          <input type="checkbox" {...register('isStudying')} style={styles.checkbox} />
          Are you still studying?
        </label>

        {isStudying && (
          <>
            <input
              {...register('institution', {
                required: 'Institution name is required',
                minLength: { value: 2, message: 'Minimum 2 characters required' },
              })}
              placeholder="Where are you studying?"
              style={styles.input}
              autoFocus
            />
            {errors.institution && (
              <span style={{ color: 'red', fontSize: '0.875rem' }}>{errors.institution.message}</span>
            )}
          </>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
          <button type="button" onClick={onBack} style={{ ...styles.button, backgroundColor: '#777' }}>
            Back
          </button>
          <button type="submit" style={styles.button}>
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '2rem',
  },
  heading: {
    marginBottom: '1rem',
    fontSize: '1.5rem',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    width: '100%',
    maxWidth: '400px',
    padding: '2rem',
    border: '1px solid #ccc',
    borderRadius: '10px',
    backgroundColor: '#fafafa',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '1rem',
    cursor: 'pointer',
    gap: '0.5rem',
  },
  checkbox: {
    width: '18px',
    height: '18px',
  },
  input: {
    padding: '10px 12px',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    outline: 'none',
    transition: 'border 0.3s ease',
  },
  button: {
    padding: '12px 24px',
    backgroundColor: '#4CAF50',
    color: 'white',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default Page2;
