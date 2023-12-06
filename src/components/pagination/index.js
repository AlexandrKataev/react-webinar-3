import { memo } from "react";
import PropTypes from "prop-types";
import "./style.css";

function Pagination({ totalPages, currentPage, setPage }) {
  return (
    <div className="Pagination">
      {currentPage > 1 && (
        <button className="Pagination-item" onClick={() => setPage(1)}>
          {1}
        </button>
      )}

      {/* Блок для предыдущих значений */}
      {currentPage - 3 > 0 && (
        <button className="Pagination-item-empty" disabled={true}>
          {"..."}
        </button>
      )}
      {currentPage > 2 && (
        <button
          className="Pagination-item"
          onClick={() => setPage(currentPage - 1)}
        >
          {currentPage - 1}{" "}
        </button>
      )}
      <button className="Pagination-item-active">{currentPage}</button>

      {/* Блок для последующих значений */}
      {totalPages - currentPage > 0 && (
        <button
          className="Pagination-item"
          onClick={() => setPage(currentPage + 1)}
        >
          {currentPage + 1}
        </button>
      )}
      {totalPages - currentPage > 2 && (
        <button className="Pagination-item-empty" disabled={true}>
          {"..."}
        </button>
      )}

      {totalPages - currentPage > 1 && (
        <button className="Pagination-item" onClick={() => setPage(totalPages)}>
          {totalPages}
        </button>
      )}
    </div>
  );
}

Pagination.propTypes = {
  totalPages: PropTypes.number,
  currentPage: PropTypes.number,
  setPage: PropTypes.func,
};

Pagination.defaultProps = {
  totalPages: 1,
  currentPage: 1,
};

export default memo(Pagination);
