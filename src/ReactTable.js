import { useTable, usePagination, useFilters, useSortBy } from 'react-table';

const generatePageButtons = (currentPage, lastPage) => {
  // We'll allow for 7 page buttons, including first, last and possible elipses
  var range = [];
  var rangeElipses = [];
  for (let i = 1; i <= lastPage; i++) {
    range.push(i);
  }
  // If the total pages is 7 or less, simply return the range
  if (lastPage <= 7) {
    return range
  }
  // Otherwise, insert elpises after first page, before last page as needed
  // e.g. 1, ..., 5, 6, 7, ... 20
  //      1, 2, 3, 4, 5, ..., 20
  //      1, ..., 16, 17, 18, 19, 20
  else {
    if (currentPage <= 4) {
      rangeElipses = [1, 2, 3, 4, 5, '...', lastPage];
    }
    else if (currentPage >= lastPage-3) {
      rangeElipses = [1, '...', lastPage-4, lastPage-3, lastPage-2, lastPage-1, lastPage];
    }
    else {
      rangeElipses = [1, '...', currentPage-1, currentPage, currentPage+1, '...', lastPage];
    }
    return rangeElipses
  }
}

const ReactTable = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    filteredRows,
    state: { pageIndex, pageSize }
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 }
    },
    useFilters,
    useSortBy,
    usePagination
  );

  const pageLengthOptions = [
    {label: '10', value: 10},
    {label: '25', value: 25},
    {label: '50', value: 50},
    {label: 'All', value: data.length},
  ];

  return (
    <div className="py-3">
      {
        // Search/filters
        headerGroups.map((headerGroup, index) => (
          <div key={index} className="row mb-3">
            {
              headerGroup.headers.map((column, index) => (
                <div key={index} className="col-3 py-2">{column.render('Filter')}</div>
              ))
            }
          </div>
        ))
      }
      <div className="row">
        {/* Pagination */}
        <div className="col-auto">
          <nav>
            <ul className="pagination">
              {/* Previous Page */}
              <li
                onClick={previousPage}
                className={`page-item ${!canPreviousPage ? 'disabled' : ''}`}
              ><a href="#" className="page-link">Prev</a></li>
              {
                generatePageButtons(pageIndex+1, pageCount).map((pageButton, index) => (
                  <li
                    key={index}
                    onClick={() => gotoPage(pageButton-1)}
                    className={`page-item ${pageButton === '...' ? 'disabled ' : ''} ${pageIndex === pageButton-1 ? 'active' : ''}`}
                  ><a href="#" className="page-link">{pageButton}</a></li>
                ))
              }
              {/* Next Page */}
              <li
                onClick={nextPage}
                className={`page-item ${!canNextPage ? 'disabled' : ''}`}
              ><a href="#" className="page-link">Next</a></li>
            </ul>
          </nav>
        </div>
        {/* Page length select */}
        <div className="col-12 col-md-auto ml-auto text-right">
          <span>Page Length: </span>
          <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
            { pageLengthOptions.map((option, index) => (<option key={index} value={option.value}>{option.label}</option>)) }
          </select><br/>
          <small>Showing entries {(pageIndex*pageSize)+1} to {(pageIndex*pageSize)+Number(pageSize) < filteredRows.length ? (pageIndex*pageSize)+Number(pageSize) : filteredRows.length} of {filteredRows.length}</small>
        </div>
      </div>
      {/* Table */}
      <table {...getTableProps()} className='table table-dark table-striped my-1'>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  {column.isSorted ? (column.isSortedDesc ? ' ^' : ' v') : ''}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default ReactTable;