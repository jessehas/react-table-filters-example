import React, { useMemo } from 'react';

import ReactTable from './ReactTable';
import TextFilter from './TextFilter';
import DropDownFilter from './DropDownFilter';

const App = () => {
  const data = useMemo(() => require('./data.json'), []);
  const columns = useMemo(() => [
    {
      Header: 'First Name',
      accessor: 'first_name',
      Filter: TextFilter
    },
    {
      Header: 'Last Name',
      accessor: 'last_name',
      Filter: TextFilter
    },
    {
      Header: 'Email',
      accessor: 'email',
      Filter: TextFilter
    },
    {
      Header: 'Shirt Size',
      accessor: 'shirt_size',
      Filter: DropDownFilter,
      filter: 'equals'
    },
    {
      Header: 'Credit Card',
      accessor: 'credit_card',
      Filter: DropDownFilter,
      filter: 'equals'
    },
    {
      Header: 'Country',
      accessor: 'country',
      Filter: DropDownFilter,
      filter: 'equals'
     }
  ], []);

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <ReactTable
              columns={columns}
              data={data}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
