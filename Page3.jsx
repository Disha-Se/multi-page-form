import React, { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Page3 = () => {
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      projects: [{ name: '', description: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'projects',
  });

  // Load saved form data from localStorage on mount
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('formData')) || {};
    if (savedData.projects && savedData.projects.length > 0) {
      setValue('projects', savedData.projects);
    }
  }, [setValue]);

  const onSubmit = async (data) => {
    try {
      // Merge current page3 data with all previously saved formData
      const savedData = JSON.parse(localStorage.getItem('formData')) || {};
      const fullData = { ...savedData, ...data };

      // Save merged data back to localStorage
      localStorage.setItem('formData', JSON.stringify(fullData));

      // Submit fullData to backend
      const res = await fetch('http://localhost:5000/api/form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fullData),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Server error: ${text}`);
      }

      const result = await res.json();
      alert('Form submitted successfully!');
      console.log('Server response:', result);

      // Optionally clear localStorage or navigate somewhere
      // localStorage.removeItem('formData');
      // navigate('/thank-you');

    } catch (error) {
      console.error('Submit failed:', error);
      alert(`Submit failed: ${error.message}`);
    }
  };

  const onBack = () => {
    // Save current form data before going back
    const currentProjects = getValues('projects');
    const savedData = JSON.parse(localStorage.getItem('formData')) || {};
    const newData = { ...savedData, projects: currentProjects };
    localStorage.setItem('formData', JSON.stringify(newData));

    navigate('/page2');
  };

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.heading}>Projects</h2>

      <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
        {fields.map((item, index) => (
          <div key={item.id} style={styles.projectContainer}>
            <input
              {...register(`projects.${index}.name`, {
                required: 'Project Name is required',
                minLength: { value: 2, message: 'Minimum 2 characters required' },
              })}
              placeholder="Project Name"
              style={styles.input}
            />
            {errors.projects?.[index]?.name && (
              <span style={styles.error}>{errors.projects[index].name.message}</span>
            )}

            <textarea
              {...register(`projects.${index}.description`, {
                required: 'Project Description is required',
                minLength: { value: 5, message: 'Minimum 5 characters required' },
              })}
              placeholder="Project Description"
              style={styles.textarea}
            />
            {errors.projects?.[index]?.description && (
              <span style={styles.error}>{errors.projects[index].description.message}</span>
            )}

            <button
              type="button"
              onClick={() => remove(index)}
              style={styles.removeButton}
            >
              Remove
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => append({ name: '', description: '' })}
          style={styles.addButton}
        >
          Add Project
        </button>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
          <button type="button" onClick={onBack} style={{ ...styles.submitButton, backgroundColor: '#777' }}>
            Back
          </button>
          <button type="submit" style={styles.submitButton}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  wrapper: {
    maxWidth: '500px',
    margin: '2rem auto',
    padding: '1rem',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    fontSize: '1.5rem',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '1.5rem',
    backgroundColor: '#fafafa',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  },
  projectContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem',
    padding: '1rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
  },
  input: {
    padding: '10px 12px',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    outline: 'none',
  },
  textarea: {
    padding: '10px 12px',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    outline: 'none',
    resize: 'vertical',
    minHeight: '80px',
  },
  removeButton: {
    alignSelf: 'flex-end',
    padding: '6px 12px',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  addButton: {
    padding: '10px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  submitButton: {
    padding: '12px 24px',
    backgroundColor: '#2ecc71',
    color: 'white',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  error: {
    color: 'red',
    fontSize: '0.85rem',
  },
};

export default Page3;
