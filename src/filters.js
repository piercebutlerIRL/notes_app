const filters = {
  searchText: '',
  sort: 'byEdited',
};

const getFilters = () => filters;

const setFilters = (updates) => {
  if (typeof updates.searchText === 'string') {
    filters.searchText = updates.searchText;
  }
  if (typeof updates.sort === 'string') {
    filters.sort = updates.sort;
  }
};

export { getFilters, setFilters };
