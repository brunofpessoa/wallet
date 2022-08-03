import React from 'react';
import propTypes from 'prop-types';

function Input({ name, type, placeholder, testId, label, onChange, value }) {
  return (
    <label htmlFor={ name }>
      { label }
      <input
        id={ name }
        name={ name }
        type={ type }
        placeholder={ placeholder }
        data-testid={ testId }
        onChange={ onChange }
        value={ value }
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
  value: propTypes.oneOfType([propTypes.string, propTypes.number]).isRequired,
};

Input.defaultProps = {
  type: 'text',
  testId: '',
  label: '',
  onChange: () => {},
};

export default Input;
