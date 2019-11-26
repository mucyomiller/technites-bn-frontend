import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  mode, label, type, name, value, handler, error,
}) => {
  if (mode) {
    return (
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor={name} className="m-t-5 label">
          {label}
          {':'}
          <input type={type} id={name} name={name} value={value || null} className={error ? 'input input-error' : 'input'} onChange={handler} />
        </label>
        {error ? <span style={{ color: 'red', fontSize: '9px' }}>{error}</span> : null}
      </div>
    );
  }
  return (
    <div className="flex flex-column">
      <label htmlFor={name} className="m-t-5 label">{`${label}: `}</label>
      <span id={name} style={{ color: 'grey' }}>{value}</span>
    </div>
  );
};

Input.defaultProps = {
  error: '',
  value: '',
};

Input.propTypes = {
  mode: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  value: PropTypes.any,
  handler: PropTypes.func.isRequired,
  error: PropTypes.string,
};
// Input.defaultProps = {
//   handler: PropTypes.func,
// };

export default Input;
