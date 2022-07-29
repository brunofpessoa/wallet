import React from 'react';
import propTypes from 'prop-types';

function Select({ name, label, options, testid, onChange }) {
  return (
    <label htmlFor={ name }>
      { label }
      <select
        name={ name }
        data-testid={ testid }
        onChange={ onChange }
      >
        {options.map((value, index) => (
          <option
            key={ index }
            value={ value }
          >
            {value}
          </option>
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
  onChange: propTypes.func.isRequired,
};

Select.defaultProps = {
  testid: '',
  label: '',
};

export default Select;
