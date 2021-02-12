const express = require('express');
const cors = require('cors');
const app = express();
const port = 8001;
const { sequelize } = require('./models');

const authRouter = require('./routes/auth')
const todoRouter = require('./routes/todos')

// express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/auth', authRouter);
app.use('/todo', todoRouter);
// handling error
app.use((error, req, res, next) => {
  return res.status(400).send({
    status: 'error',
    code: 400,
    message: 'Bad Request',
    error: error.message
  });
});



// run express
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

sequelize.authenticate().then(() => {
    console.log('Success connecting database');
});