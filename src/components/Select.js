import React from 'react';
import propTypes from 'prop-types';

function Select({ name, label, options, testid }) {
  return (
    <label htmlFor={ name }>
      { label }
      <select
        name={ name }
        data-testid={ testid }
      >
        {options.map(({ text, value = text }, index) => (
          <option key={ index } value={ value }>{text}</option>
        ))}
      </select>
    </label>
  );
}

Select.propTypes = {
  name: propTypes.string.isRequired,
  testid: propTypes.string,
  label: propTypes.string,
  options: propTypes.arrayOf(propTypes.object).isRequired,
};

Select.defaultProps = {
  testid: '',
  label: '',
};

export default Select;
