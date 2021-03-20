const Note = require('../models/note');

exports.createNote = async (req, res, next) => {
    const request = req.body
    
      if (Object.keys(request).length > 0) { // check if the request with cookie exist
        const cookie = JSON.parse(req.body.cookies.loged)
        const noteContent = request.note
        // const user = await User.findOne({ where: { id: cookie.id } });
        await Note.create({
            userId: cookie.id,
            noteHeader: noteContent.noteHeader,
            note: noteContent.note
        })
        res.json({ note: 'success' })
 } else {
     res.json({ note: 'err' })
 }
}

exports.getNotes = async (req, res, next) => {
    const request = req.body
    
      if (Object.keys(request).length > 0) { // check if the request with cookie exist
        const cookie = JSON.parse(req.body.loged)
        const notes = await Note.findAll({ where: { userId: cookie.id } });
        if (notes === null) {
            res.json({ notes: 'no notes' })
        } else {
            res.json({ notes: notes })
        }
        
        
 } else {
     res.json({ notes: 'err' })
 }
}

exports.deleteNote = async (req, res, next) => {
    const noteId = req.body.id;
    Note.destroy({ where: { id: noteId }});
    res.json({ note: 'deleted' })
}

exports.getNoteContent = async (req, res, next) => {
    const noteId = req.body.id;
    const note = await Note.findOne({ where: { id: noteId } });
    res.json({ noteHeader: note.noteHeader, note: note.note })
}

exports.updateNote = (req, res, next) => {
    const noteId = req.body.noteId;
    console.log(noteId)
    
    Note.update(
        
        { noteHeader: req.body.noteHeader, note: req.body.note },
        { where: { id: noteId } },
      )
    res.json({ note: 'success' })
}