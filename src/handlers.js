const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNote = (request, h) => {
  const { title, tags, body } = request.payload;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    id,
    title,
    tags,
    body,
    createdAt,
    updatedAt,
  };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'berhasil menambahkan catatan',
      data: {
        notesId: notes.id,
      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'gagal menambahkan catatan',
  });
  response.code(500);
  return response;
};

const getNote = () => ({
  status: 'success',
  data: {
    notes,
  },
});

const getNoteByid = (request, h) => {
  const { id } = request.params;

  const note = notes.filter((note) => note.id === id)[0];
  if (note !== undefined) {
    const response = h.response({
      status: 'success',
      data: {
        note
      }
    });

    response.code(201);
    return response
  }
  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });

  response.code(404);
  return response
}


const editNote = (request, h) => {
  const { id } = request.params;
  const { title, tags, body } = request.payload;
  const updatedAt = new Date().toISOString();

  const idx = notes.findIndex((note) => note.id === id);

  if (idx !== -1) {
    notes[idx] = {
      ...notes[idx],
      title,
      tags,
      body,
      updatedAt
    }

    const response = h.response({
      status: 'success',
      message: 'berhasil edit',
    });
    response.code(201);
    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });
  response.code(404);

  return response
}

const deleteNotes = (request, h) => {
  const { id } = request.params;


  const idx = notes.findIndex((note) => note.id === id);

  if (idx !== -1) {
    notes.splice(idx, 1);
    const response = h.response({
      status: 'success',
      message: 'berhasil hapus',
    });
    response.code(201);
    return response
  }
  const response = h.response({
    status: 'fail',
    message: 'gagal hapus',
  });
  response.code(404);
  return response
}

module.exports = { addNote, getNote, getNoteByid, editNote, deleteNotes };
