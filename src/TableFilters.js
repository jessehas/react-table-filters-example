const TableFilters = ({ data, filters, addFilter, removeFilter }) => {
  // Get distinct credit card, shirt sizes and countries
  var shirtSizes = [];
  var creditCards = [];
  var countries = [];
  data.forEach(item => {
    const { shirt_size, credit_card, country } = item;
    if (!shirtSizes.includes(shirt_size)) shirtSizes.push(shirt_size);
    if (!creditCards.includes(credit_card)) creditCards.push(credit_card);
    if (!countries.includes(country)) countries.push(country);
  })
  shirtSizes.sort();
  creditCards.sort();
  countries.sort();

  return(
    <>
    <div className="btn-group mr-3">
      <div className="dropdown">
        <button className="btn btn-primary dropdown-toggle" type="button" id="shirtDropdownBtn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Shirt Size
        </button>
        <div className="dropdown-menu" aria-labelledby="shirtDropdownBtn">
          {
            shirtSizes.map((shirtSize, index) => (
              <a key={index} onClick={() => addFilter('shirtSize', shirtSize)} href="#" className="dropdown-item">{shirtSize}</a>
            ))
          }
        </div>
      </div>
    </div>
    <div className="btn-group mr-3">
      <div className="dropdown">
        <button className="btn btn-success dropdown-toggle" type="button" id="creditDropdownBtn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Credit Card
        </button>
        <div className="dropdown-menu" aria-labelledby="creditDropdownBtn">
          {
            creditCards.map((creditCard, index) => (
              <a key={index} onClick={() => addFilter('creditCard', creditCard)} href="#" className="dropdown-item">{creditCard}</a>
            ))
          }
        </div>
      </div>
    </div>
    <div className="btn-group">
      <div className="dropdown">
        <button className="btn btn-info dropdown-toggle" type="button" id="countryDropdownBtn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Country
        </button>
        <div className="dropdown-menu" aria-labelledby="countryDropdownBtn">
          {
            countries.map((country, index) => (
              <a key={index} onClick={() => addFilter('country', country)} href="#" className="dropdown-item">{country}</a>
            ))
          }
        </div>
      </div>
    </div>
    {
      // filters ?
      // <p className="my-1">
      //   Showing:&nbsp;
      //   {
      //     filters.map((filterType) => {
      //       return 'test';
      //     })
      //   }
      //   {
      //     filters.map((filter, index) => {
      //       const { type, value } = filter
      //       var color = 'secondary';
      //       if (type === 'shirtSize') color = 'primary';
      //       if (type === 'creditCard') color = 'success';
      //       if (type === 'country') color = 'info';
      //       return (
      //         <button
      //           key={index}
      //           onClick={() => removeFilter(type, value)}
      //           className={`btn btn-sm btn-${color} mr-2`}  
      //         >{value}</button>
      //       )
      //     })
      //   }
      // </p> : null
    }
    </>
  )
}

export default TableFilters;