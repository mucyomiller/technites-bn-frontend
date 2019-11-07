/* eslint-disable react/require-default-props */
/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import './Table.scss';

export const Table = ({
  columns, elements,
}) => (
  <>
    <div className="wrapper">
      <div className="table-container">
        <table className="table">
          <thead className="table-head">
            <tr className="table-row">
              {columns.map((column) => (
                <td className="table-element" key={column}>{column}</td>
              ))}
            </tr>
          </thead>
          <tbody className="table-body">
            {elements}
          </tbody>
        </table>
        <div className="pagination-container">
          <span className="pagination-box">{'<'}</span>
          <span className="pagination-box pagination-selected">1</span>
          <span className="pagination-box">2</span>
          <span className="pagination-box">3</span>
          <span className="pagination-box">4</span>
          <span className="pagination-box">5</span>
          <span className="pagination-box">{'>'}</span>
        </div>
      </div>
    </div>
  </>
);
Table.propTypes = {
  columns: PropTypes.array,
  elements: PropTypes.array,
};
export default Table;
