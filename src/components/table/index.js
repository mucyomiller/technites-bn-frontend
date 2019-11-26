/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
/* eslint-disable react/require-default-props */
/* eslint-disable camelcase */
import React from "react";
import PropTypes from "prop-types";
import "./Table.scss";

export const Table = ({
  columns,
  elements,
  postsPerPage,
  totalPosts,
  paginate,
  currentPageNumber,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i += 1) {
    pageNumbers.push(i);
  }
  return (
    <>
      <div className="wrapper">
        <div className="table-container">
          <table className="table">
            <thead className="table-head">
              <tr className="table-row">
                {columns.map((column) => (
                  <td className="table-element" key={column}>
                    {column}
                  </td>
                ))}
              </tr>
            </thead>
            <tbody className="table-body">{elements}</tbody>
          </table>
          <div className="pagination-container flex-parent">
            <span className="pagination-box">{"<"}</span>
            {pageNumbers.map((number) => (
              <span
                key={number}
                className={
                  currentPageNumber === number
                    ? "pagination-box pagination-selected"
                    : "pagination-box"
                }
                onClick={() => paginate(number)}
              >
                {number}
              </span>
            ))}
            <span className="pagination-box">{">"}</span>
          </div>
        </div>
      </div>
    </>
  );
};
Table.propTypes = {
  columns: PropTypes.array.isRequired,
  elements: PropTypes.array.isRequired,
  postsPerPage: PropTypes.string.isRequired,
  totalPosts: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired,
  currentPageNumber: PropTypes.number.isRequired,
};
export default Table;
