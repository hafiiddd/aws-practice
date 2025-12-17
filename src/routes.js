const { meta } = require('@eslint/js');
const { addNote, getNote, getNoteByid, editNote, deleteNotes } = require('./handlers');

const routes = [
  {
    method: 'POST',
    path: '/notes',
    handler: addNote,
  },
  {
    method: 'GET',
    path: '/notes',
    handler: getNote,
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: getNoteByid,
  },
    {
    method: 'PUT',
    path: '/notes/{id}',
    handler: editNote,
  },
  {
    method:'DELETE',
    path: '/notes/{id}',
    handler:deleteNotes,
  }
];

module.exports = routes;
