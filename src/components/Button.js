import React from 'react';
import propTypes from 'prop-types';

function Button({ name, text, testId, onClick, disabled }) {
  return (
    <button
      name={ name }
      type="button"
      data-testid={ testId }
      onClick={ onClick }
      disabled={ disabled }
    >
      {text}
    </button>
  );
}

Button.propTypes = {
  name: propTypes.string.isRequired,
  text: propTypes.string.isRequired,
  onClick: propTypes.func.isRequired,
  testId: propTypes.string,
  disabled: propTypes.bool,
};

Button.defaultProps = {
  testId: '',
  disabled: false,
};

export default Button;
