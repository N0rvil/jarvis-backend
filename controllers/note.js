const Note = require('../models/note');

exports.createNote = async (req, res, next) => {
    const request = req.body
    
      if (Object.keys(request).length > 0) { // check if the request with cookie exist
        const userData = JSON.parse(req.body.cookies.loged)
        const noteContent = request.note
        // const user = await User.findOne({ where: { id: cookie.id } });
        await Note.create({
            userId: userData.id,
            noteHeader: noteContent.newNoteHeader,
            note: noteContent.newNote
        })

        const notes = await Note.findAll({ where: { userId: userData.id } });
        res.json({ notes: notes })
 } else {
     res.json({ note: 'err' })
 }
}

exports.getNotes = async (req, res, next) => {
    const request = req.body
    
      if (Object.keys(request).length > 0) { // check if the request with cookie exist
        const userData = JSON.parse(req.body.loged)
        const notes = await Note.findAll({ where: { userId: userData.id } });
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
    await Note.destroy({ where: { id: noteId }});

    const userData = JSON.parse(req.body.cookies.loged)
    const notes = await Note.findAll({ where: { userId: userData.id } });

    res.json({ notes: notes })

}

exports.getNoteContent = async (req, res, next) => {
    const noteId = req.body.id;
    const note = await Note.findOne({ where: { id: noteId } });
    res.json({ noteHeader: note.noteHeader, note: note.note })
}



exports.updateNote = async (req, res, next) => {
    const noteId = req.body.note.noteId;
    await Note.update(
        { noteHeader: req.body.note.noteHeader, note: req.body.note.note },
        { where: { id: noteId } },
      )

    const userData = JSON.parse(req.body.cookies.loged)
    const notes = await Note.findAll({ where: { userId: userData.id } });

    res.json({ notes: notes })
}