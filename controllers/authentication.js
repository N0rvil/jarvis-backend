const bcrypt = require('bcrypt');
const nodemailer =  require('nodemailer');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Session = require('../models/session');


const saltRounds = 10;


// REGISTER
exports.register = async (req, res, next) => {
    const username = req.body.username
    const email = req.body.email //IF i want data from post request i need put here req.body !!!
    const password = await bcrypt.hash(req.body.password, saltRounds)

    const userUsername = await User.findOne({ where: { username: username } });
    const userEmail = await User.findOne({ where: { email: email } });

    const randomNum = Math.random().toString();
    const randomHash = await bcrypt.hash(randomNum, saltRounds)

    if (userUsername === null && userEmail === null) {
      await User.create({
        username: username,
        email: email,
        password: password,
        registerHash: randomHash,
      })

      
      // SENDING EMAIL
      const createdUser = await User.findOne({ where: { email: email } });


      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'jarvis1332021@gmail.com',
          pass: 'system0fV3rificAtiOn54&#9D#@'
        }
      });


      const sendEmail = (emailToken) => {
        const url = `https://jarvis-frontend.herokuapp.com/login?${emailToken}`; // http://localhost:3000/login?${emailToken} // https://jarvis-frontend.herokuapp.com/login?${emailToken}

          transporter.sendMail({
            to: email,
            subject: 'Confirm Email',
            html: `Please click this link to confirm your email: <a href="${url}">${url}</a>`,
          });
      }

      const token = jwt.sign({createdUser}, randomHash, {
        expiresIn: 60*60*24 // expires in 24 hours
    });

      jwt.sign({ user: createdUser.id, },token,{ expiresIn: '24h', },sendEmail(randomHash));

      res.json({ note: 'created' })
    } else {
      if (userUsername !== null || userEmail !== null) {
        if (userUsername !== null && userEmail !== null){
          res.json({ username: 'exist', email: 'exist' })
        } else if (username !== null && userEmail === null) {
          res.json({ username: 'exist', email: 'does not exist' })
        }  else {
          res.json({ username: 'does not exist', email: 'exist' })
        }
      }
    }
  };

  // LOGIN
  exports.login = (req, res, next) =>{
    const loginEmail = req.body.email
    const loginPassword = req.body.password
    User.findAll()
    .then(users => {
      
      const isUserValid = async () => {
        const user = await User.findOne({ where: { email: loginEmail } });

          if (user === null) {
            res.json({ note: 'failed' })
          } else if (user.isValid === false) {
            res.json({ note: 'no email verification' })
          } else {
            
            bcrypt.compare(loginPassword, user.password, async function(err, response) {
              if (response === true) {

                const time = new Date().getTime(); // time
                const date = new Date(time); // time to date

                SESSION_TIME = date.toString();
                const hash = String(user.id + SESSION_TIME)
                const HASH = await bcrypt.hash(hash, saltRounds)

                // Creating Session in database
                await Session.create({
                  userId: user.id,
                  time: SESSION_TIME,
                  hash: HASH
                })

                const session = await Session.findOne({ where: { userId: user.id } });

                res.json({ note: 'success', username: user.username, id: user.id, hash: session.hash, time: session.time })
              } else {
                res.json({ note: 'failed' })
              }
            });
          }
      } 

      isUserValid();
    })
    .catch(err => console.log(err))
  }

  exports.checkLogin = async (req, res, next) => {
        if (req.body.hasOwnProperty('loged')) {
          const cookie = JSON.parse(req.body.loged) 
          const session = await Session.findOne({ where: { userId: cookie.id, hash: cookie.hash, time: cookie.time } });
    
        if (session === null) {
         
          res.json({ note: 'err' })
        } else {
        res.json({ note: 'verified' })
      }    
        } else {
          res.json({ note: 'err' })
        }
}

  exports.verifyEmail = async (req, res, next) => { 
    if(req.body.url === 'https://jarvis-frontend.herokuapp.com/login' || req.body.url === 'https://jarvis-frontend.herokuapp.com/' || req.body.url === 'http://localhost:3000/login' || req.body.url === 'http://localhost:3000/') {
      return
    } else {
      const getHash = (str) => {
        return str.split('?')[1];
    }
   const hash = getHash(req.body.url)
 
    const user = await User.findOne({ where: { registerHash: hash } });
    if (user === null) {    
     res.json({ note: 'err' })
   } else {
     await User.update({ isValid: true }, { where: { id: user.id } })
     res.json({ note: 'your email was verified' })
   }
    }
   
}
      
  


