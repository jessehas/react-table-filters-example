import React, { useState } from 'react';

const Table = ({data}) => {
  const [page, setPage] = useState(1);
  const [pageLength, setPageLength] = useState(25);
  const pageLengthOptions = [
    {label: '25', value: 25},
    {label: '50', value: 50},
    {label: 'All', value: data.length},
  ];

  const getTotalPages = () => Math.ceil(data.length/pageLength)
  const prevPage = () => { if(page !== 1) setPage(page-1) };
  const nextPage = () => { if(page !== getTotalPages()) setPage(page+1) };

  return (
    <>
    {/* Pagination */}
    <div className="row">
      <div className="col-auto text-center">
        <nav>
          <ul className="pagination">
            <li
              onClick={prevPage}
              className={`page-item ${page === 1 ? 'disabled' : ''}`}
            ><a href="#" className="page-link">Prev</a></li>
            {
              // Generate page buttons based on pageLength
              [...Array(getTotalPages()).keys()].map(pageNumber => (
                <li
                  key={pageNumber}
                  onClick={() => setPage(pageNumber+1)}
                  className={`page-item ${page === pageNumber+1 ? 'active' : ''}`}
                ><a className="page-link" href="#">{pageNumber+1}</a></li>
              ))
            }
            <li
              onClick={nextPage}
              className={`page-item ${page === getTotalPages() ? 'disabled' : ''}`}
            ><a href="#" className="page-link">Next</a></li>
          </ul>
        </nav>
      </div>
      <div className="col-12 col-md-auto ml-auto py-1">
        <span>Page Length: </span>
        <select value={pageLength} onChange={e => setPageLength(e.target.value)}>
          { pageLengthOptions.map((option, index) => (<option key={index} value={option.value}>{option.label}</option>)) }
        </select>
      </div>
    </div>
    
    {/* Table */}
    <div className="table-responsive">
      <table className="table table-dark table-striped">
        <thead className="">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Shirt Size</th>
            <th>Credit Card</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {
            data ?
            data.slice( (page-1)*pageLength, page*pageLength ).map(item => (
              <tr key={item.id}>
                <td>{item.first_name} {item.last_name}</td>
                <td>{item.email}</td>
                <td>{item.shirt_size}</td>
                <td>{item.credit_card}</td>
                <td>{item.country}</td>
              </tr>
            )) : null
          }
        </tbody>
      </table>
    </div>
    </>
  )
}

export default Table;