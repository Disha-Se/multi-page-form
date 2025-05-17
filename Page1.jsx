import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Page1 = () => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const navigate = useNavigate();

  // On component mount, load saved data from localStorage and prefill form
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('formData'));
    if (savedData) {
      Object.keys(savedData).forEach(key => {
        setValue(key, savedData[key]);
      });
    }
  }, [setValue]);

  const onSubmit = async (data) => {
    try {
      // Send form data to backend API
      const response = await fetch('http://localhost:5000/api/form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Error ${response.status}: ${text}`);
      }

      const result = await response.json();
      console.log('Server response:', result);

      // Save entire formData locally
      const savedData = JSON.parse(localStorage.getItem('formData')) || {};
      const newData = { ...savedData, ...data };
      localStorage.setItem('formData', JSON.stringify(newData));

      // Save key fields individually for easy access in other pages
      localStorage.setItem('userName', data.name);
      localStorage.setItem('userEmail', data.email);
      localStorage.setItem('userZipcode', data.zipcode);

      // Navigate to next page
      navigate('/page2');
    } catch (error) {
      console.error('Submit failed:', error);
      alert(`Submit failed: ${error.message}`);
    }
  };

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.heading}>Personal Information</h2>

      <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
        <input
          {...register('name', { required: true })}
          placeholder="Name"
          style={styles.input}
        />
        {errors.name && <span style={styles.error}>Name is required</span>}

        <input
          {...register('email', { required: true })}
          placeholder="Email"
          type="email"
          style={styles.input}
        />
        {errors.email && <span style={styles.error}>Email is required</span>}

        <input
          {...register('address1', { required: true })}
          placeholder="Address Line 1"
          style={styles.input}
        />
        {errors.address1 && <span style={styles.error}>Address is required</span>}

        <input
          {...register('address2')}
          placeholder="Address Line 2 (Optional)"
          style={styles.input}
        />

        <input
          {...register('city', { required: true })}
          placeholder="City"
          style={styles.input}
        />
        {errors.city && <span style={styles.error}>City is required</span>}

        <input
          {...register('state', { required: true })}
          placeholder="State"
          style={styles.input}
        />
        {errors.state && <span style={styles.error}>State is required</span>}

        <input
          {...register('zipcode', { required: true })}
          placeholder="Zipcode"
          style={styles.input}
        />
        {errors.zipcode && <span style={styles.error}>Zipcode is required</span>}

        <button type="submit" style={styles.button}>Next</button>
      </form>
    </div>
  );
};

// Styles remain the same
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
  input: {
    padding: '10px 12px',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    outline: 'none',
    transition: 'border 0.3s ease',
  },
  error: {
    color: 'red',
    fontSize: '0.875rem',
    marginTop: '-0.5rem',
  },
  button: {
    padding: '12px',
    backgroundColor: '#4CAF50',
    color: 'white',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  }
};

export default Page1;
