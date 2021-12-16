const express = require('express');
const { sequelize, syncAndSeed } = require('./db');
const router = require('./routes')
const app = express();
const path = require('path');

app.use(express.json()); //req.body
app.use('/api', router);

app.use('/dist', express.static(path.join(__dirname, '..', './dist')));

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
});

const init = async() => {
  try {
    await sequelize.authenticate();
    await syncAndSeed();
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`listening on port ${port}`))
  } catch(err) {
    console.log(err);
  };
};

init();
