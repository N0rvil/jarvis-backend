const User = require('../models/user');
const Session = require('../models/session');
const Note = require('../models/note');
const Link = require('../models/link');
const Event = require('../models/event');

const shortDate = (d) => {
    const date = new Date(d);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    return `${day}.${month}.${year}`
}

exports.getUsersData = async (req, res, next) => {
    const numberOfusers = await User.findAll();
    const numberOfAdmins = await User.findAll({ where: { admin: true } } );
    const numberOfBannedUsers = await User.findAll({ where: { banned: true } } );
    const numberOfNotes = await Note.findAll();
    const numberOfEvents = await Event.findAll();
    const numberOfLinks = await Link.findAll();
    let todayLogins = 0;
    let monthLogins = 0;

    const sessions = await Session.findAll();
    sessions.map((session, i) => {
        const date = new Date();
        if (shortDate(session.time) === shortDate(date)) {
            todayLogins++
        }
        if (session.time.getMonth() === date.getMonth() && session.time.getFullYear() === date.getFullYear()) {
            monthLogins++
        }
    })

    let totalLogins = sessions.length;

    res.json({
        numberOfusers: numberOfusers.length,
        numberOfAdmins: numberOfAdmins.length,
        numberOfBannedUsers: numberOfBannedUsers.length,
        numberOfNotes: numberOfNotes.length,
        numberOfLinks: numberOfLinks.length,
        numberOfEvents: numberOfEvents.length,
        todayLogins,
        monthLogins,
        totalLogins, 
    })
}

exports.getAllUsers = async (req, res, next) => {
    const users = await User.findAll()

    res.json({ users: users })
}

exports.getUserSessions = async (req, res, next) => {
    const userId = req.body.userId
    const sessions = await Session.findAll();
    
    res.json({ sessions: sessions })
}

exports.banUser = async (req, res, next) => {
    const userId = req.body.userId
 
    await User.update({ banned: true }, { where: { id: userId } })

    const users = await User.findAll()

    res.json({ users: users })
}

exports.unbanUser = async (req, res, next) => {
    const userId = req.body.userId

    await User.update({ banned: false }, { where: { id: userId } })

    const users = await User.findAll()

    res.json({ users: users })
}

exports.promoteUser = async (req, res, next) => {
    const userId = req.body.userId

    await User.update({ admin: true }, { where: { id: userId } })

    const users = await User.findAll()

    res.json({ users: users })
}

exports.unpromoteUser = async (req, res, next) => {
    const userId = req.body.userId

    await User.update({ admin: false }, { where: { id: userId } })

    const users = await User.findAll()

    res.json({ users: users })
}