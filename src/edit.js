import { getNotes, removeNote, saveNote, updateNote } from './notes';
import { lastUpdated } from './views';
import { debounce } from './utilities';
import moment from 'moment';
import medium from 'medium-editor';

const noteTitleInput = document.querySelector('.note-title');
const noteBodyInput = document.querySelector('.note-body');
const noteRemove = document.querySelector('.note-remove');
const status = document.querySelector('.save-status');
const lastEdited = document.querySelector('.last-edit');
const noteId = location.hash.substring(1);

let debounced = debounce(saveEditedNote, 500);

var editor = new MediumEditor('.editable', {
  toolbar: {
    /* These are the default options for the toolbar,
           if nothing is passed this is what is used */
    allowMultiParagraphSelection: true,
    buttons: ['bold', 'italic', 'underline', 'anchor', 'h2', 'h3', 'quote'],
    diffLeft: 0,
    diffTop: -10,
    firstButtonClass: 'medium-editor-button-first',
    lastButtonClass: 'medium-editor-button-last',
    relativeContainer: null,
    standardizeSelectionStart: false,
    static: false,
    /* options which only apply when static is true */
    align: 'center',
    sticky: false,
    updateOnEmptySelection: false,
  },
});
editor.subscribe('editableInput', function (event, editorElement) {
  console.log('hello');
  console.log(event);
  console.log(editor.getContent());
});

let notes = getNotes();

let currentNote = notes.find((note) => {
  return note.id === noteId;
});

if (currentNote === undefined) location.assign('/index.html');

lastEdited.textContent = lastUpdated(currentNote.updatedAt, 'Last edited ');
noteTitleInput.value = currentNote.title;
noteBodyInput.value = currentNote.body;

// Note title event
noteTitleInput.addEventListener('input', (e) => {
  currentNote.title = e.target.value;
  typingStatus();
  debounced();
});

// Note body event
noteBodyInput.addEventListener('input', (e) => {
  currentNote.body = e.target.value;
  typingStatus();
  debounced();
});

// Remove a note
noteRemove.addEventListener('click', () => {
  removeNote(currentNote.id);
  saveNote(notes);
  location.assign('/index.html');
});

// Note save status
function saveEditedNote(e) {
  status.style.color = 'green';
  status.textContent = 'Note saved';
  currentNote.updatedAt = moment().valueOf();
  lastEdited.textContent = lastUpdated(currentNote.updatedAt, 'Last edited ');
  saveNote(notes);
}

// User typing
const typingStatus = () => {
  status.classList.remove('isHidden');
  status.style.color = 'gray';
  status.textContent = 'typing...';
};

window.addEventListener('storage', (e) => {
  if (e.key === 'note') {
    let currentNote = notes.find((note) => {
      return note.id === noteId;
    });
    if (currentNote === undefined) location.assign('/index.html');
    noteTitleInput.value = currentNote.title;
    noteBodyInput.value = currentNote.body;
  }
});
