import moment from 'moment';
import { getFilters } from './filters';
import { sortNotes } from './notes';

// Create DOM note
const genderateNoteDOM = (note) => {
  const noteEl = document.createElement('div');
  const textEl = document.createElement('a');
  const button = document.createElement('button');
  const dateEl = document.createElement('span');
  dateEl.textContent = lastUpdated(note.updatedAt);
  button.textContent = 'x';
  noteEl.appendChild(button);
  button.addEventListener('click', () => {
    removeNote(note.id);
    saveNotes(notes);
    render(notes, filters);
  });
  note.title.length
    ? (textEl.textContent = note.title)
    : (textEl.textContent = 'Unnamed Note');
  noteEl.appendChild(textEl);
  noteEl.appendChild(dateEl);
  textEl.setAttribute('href', `/edit.html#${note.id}`);
  return noteEl;
};

// Render Notes
const render = () => {
  const filters = getFilters();
  const notes = sortNotes(filters.sort);
  const filterNotes = notes.filter((note) => {
    return note.title.toLowerCase().includes(filters.searchText.toLowerCase());
  });
  document.querySelector('#notes').innerHTML = '';
  filterNotes.forEach((note) => {
    const el = genderateNoteDOM(note);
    document.querySelector('#notes').appendChild(el);
  });
};

// Last edited time
const lastUpdated = (timestamp, textContent = '') => {
  return `${textContent} ${moment(timestamp).fromNow()}`;
};

export { genderateNoteDOM, render, lastUpdated };
