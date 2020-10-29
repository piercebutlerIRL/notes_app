import { createNote } from './notes';
import { setFilters } from './filters';
import { render } from './views';

render();

// Form Submit
document.querySelector('.create-note-form').addEventListener('submit', (e) => {
  createNote();
  location.assign(`/edit.html#${id}`);
});

// Filter Notes Text Search
document.querySelector('#search-text').addEventListener('keyup', (e) => {
  setFilters({
    searchText: e.target.value,
  });
  render();
});

// Filter Notes Dropdown
document.querySelector('#filter-by').addEventListener('change', (e) => {
  setFilters({
    sort: e.target.value,
  });
  render();
});

window.addEventListener('storage', (e) => {
  if (e.key === 'note') {
    render();
  }
});
