import React from 'react';

const Pagination = ({ page, changePage, loading }) => (
  <div className="pagination">
    <button
      onClick={() => changePage(page - 1)}
      disabled={page === 1 || loading}
      aria-label="Previous page"
    >
      &lt;
    </button>
    <span>Page {page}</span>
    <button
      onClick={() => changePage(page + 1)}
      disabled={loading}
      aria-label="Next page"
    >
      &gt;
    </button>
  </div>
);

export default Pagination;
