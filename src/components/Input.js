import React from 'react';
import propTypes from 'prop-types';

function Input({ name, type, placeholder, testId, label, onChange }) {
  return (
    <label htmlFor={ name }>
      { label }
      <input
        name={ name }
        type={ type }
        placeholder={ placeholder }
        data-testid={ testId }
        onChange={ onChange }
      />
    </label>
  );
}

Input.propTypes = {
  type: propTypes.string,
  placeholder: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  testId: propTypes.string,
  label: propTypes.string,
  onChange: propTypes.func,
};

Input.defaultProps = {
  type: 'text',
  testId: '',
  label: '',
  onChange: () => {},
};

export default Input;
