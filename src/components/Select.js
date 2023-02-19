import React from 'react';
import PropTypes from 'prop-types';

function Select({ name, label, options, testid, onChange, value }) {
  return (
    <label htmlFor={ name } className="flex-column">
      <span>
        { label }
        <span className="red">*</span>
      </span>
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
  name: PropTypes.string.isRequired,
  testid: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

Select.defaultProps = {
  testid: '',
  label: '',
};

export default Select;
