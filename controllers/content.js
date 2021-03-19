const User = require('../models/user');


exports.getUser = async (req, res, next) => {
    const request = req.body
        if (Object.keys(request).length > 0) { // check if the request with cookie exist
          const cookie = JSON.parse(req.body.loged)
    
          res.json({ username: cookie.username })
 } else {
    res.json({ username: 'none' })
 }
}

