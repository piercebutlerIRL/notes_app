import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
let notes = [];

// Get saved notes from ls
const loadNotes = () => {
  const ls = localStorage.getItem('note');
  try {
    return JSON.parse(ls) || [];
  } catch (e) {
    [];
  }
};

// Save to ls
const saveNote = () => {
  localStorage.setItem('note', JSON.stringify(notes));
};

// Expose notes from module
const getNotes = () => notes;

// Crate a Note
const createNote = () => {
  const id = uuidv4();
  const timestamp = moment().valueOf();
  notes.push({
    id: id,
    createdAt: timestamp,
    updatedAt: timestamp,
    title: '',
    body: '',
  });
  saveNote();
  return id;
};

// Remove Note
const removeNote = (id) => {
  const findNote = notes.findIndex((note) => {
    return note.id === id;
  });
  if (findNote > -1) {
    notes.splice(findNote, 1);
    saveNote();
  }
};

// Sort Notes
const sortNotes = (sortBy) => {
  if (sortBy === 'createdAt') {
    return notes.sort((a, b) => b.createdAt - a.createdAt);
  }
  if (sortBy === 'updatedAt') {
    return notes.sort((a, b) => b.updatedAt - a.updatedAt);
  }
  if (sortBy === 'title') {
    return notes.sort((a, b) => a.title.localeCompare(b.title));
  }
  return notes;
};

const updateNote = (id, updates) => {
  const note = notes.find((note) => noteid === id);
  if (!note) {
    return;
  }
  if (typeof updateNote.title === 'string') {
    note.title = updates.title;
    note.updatedAt = moment().valueOf;
  }
  if (typeof updates.body === 'string') {
    note.body = updates.body;
    note.updateAt = moment().valueOf;
  }
  saveNote();
};

notes = loadNotes();

export { getNotes, createNote, removeNote, sortNotes, updateNote, saveNote };
