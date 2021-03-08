const TextFilter = ({ column: { filterValue, setFilter, Header } }) => (
  <>
  <label>{Header}</label>
  <input
    type="text"
    className="form-control"
    value={filterValue || ''}
    onChange={e => setFilter(e.target.value || undefined)}
    placeholder={`Search ${Header}...`}
  />
  </>
)

export default TextFilter;