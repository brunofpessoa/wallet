import React from 'react';
import propTypes from 'prop-types';

function Select({ name, label, options, testid, onChange, value }) {
  return (
    <label htmlFor={ name }>
      { label }
      <select
        id={ name }
        name={ name }
        data-testid={ testid }
        onChange={ onChange }
        value={ value }
      >
        {options.map((option, index) => (
          <option
            key={ index }
            value={ option }
          >
            {option}
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
  options: propTypes.arrayOf(propTypes.string).isRequired,
  onChange: propTypes.func.isRequired,
  value: propTypes.string.isRequired,
};

Select.defaultProps = {
  testid: '',
  label: '',
};

export default Select;
