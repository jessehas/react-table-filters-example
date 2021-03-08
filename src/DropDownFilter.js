import { useMemo } from 'react';

const DropDownFilter = ({ column: { filterValue, setFilter, preFilteredRows, Header, id } }) => {
  const options = useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach(row => { options.add(row.values[id]) });
    return [...options.values()];
  }, [id, preFilteredRows]);

  return (
    <>
    <label>{Header}</label>
    <select
      className='form-control'
      value={filterValue}
      onChange={e => setFilter(e.target.value || undefined)}
    >
      <option value="">All</option>
      {
        options.sort().map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))
      }
    </select>
    </>
  )
}

export default DropDownFilter;