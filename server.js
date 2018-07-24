const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Chatkit = require('@pusher/chatkit-server')
const path = require('path');


const app = express()

app.use("/", express.static("./build/"));
const PORT = process.env.PORT || 3001;


//need to figure out how to hide the keys
const chatkit = new Chatkit.default({
  instanceLocator: 'v1:us1:22d5129b-7ba0-4b4c-a2b8-2c6b4ca79368',
  key: '2eaa10af-2a3f-468e-9e5c-8bbee4a8d5ca:CL505MKuhgn+/EW+ABJrzwznvpMBHJdFq40mMmPfE6I='
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.post('/users', (req, res) => {
  const { username } = req.body
  console.log(req.body + "This is the username - I think");

  chatkit
    .createUser({
      name: username,
      id: username,
    })
    .then(() => res.sendStatus(201))
    .catch(error => {
      if (error.error === 'services/chatkit/user_already_exists') {
        res.json(error)
      } else {
        res.status(error.status).json(error)
      }
    })
})

// need to fix this to actully authenticate
app.post('/authenticate', (req, res) => {
  const { grant_type } = req.body
  res.json(chatkit.authenticate({ grant_type, userId: req.query.user_id}))
})





app.listen(PORT, () => {
  console.log(`Express web server listening on port ${PORT}`);
});

if (process.env.NODE_ENV == "production") {
  app.get("/*", function (request, response) {
    response.sendFile(path.join(__dirname, "build", "index.html"));
  });
}

// const PORT = 3001
// app.listen(PORT, err => {
//   if (err) {
//     console.error(err)
//   } else {
//     console.log(`Running on port ${PORT}`)
//   }
// })
