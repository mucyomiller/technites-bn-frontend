import React from 'react';
import PropTypes from 'prop-types';

const Select = ({
  mode, label, name, value, options, handler, error,
}) => {
  if (mode) {
    const contents = options.map((item) => (
      <option value={item} key={item}>{item}</option>
    ));
    return (
      <div>
        <label htmlFor={name} className="m-t-5 label">
          {`${label}:`}
          <select className={error ? 'input error select' : 'input select'} value={value} name={name} onChange={handler}>
            {contents}
          </select>
        </label>
        {error ? <span style={{ color: 'red' }}>{error}</span> : null}
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

Select.defaultProps = {
  error: '',
  value: '',
};

Select.propTypes = {
  mode: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.node,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  handler: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default Select;
