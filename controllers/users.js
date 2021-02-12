const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const {SECRET_TOKEN} = process.env

const register = async (req, res, next) => {
  try {
    const {
      username,
      password,
    } = req.body;
    const user = await User.findOne({
      where: {
        username,
      }
    });

    if(user) {
      throw new Error('User with this username already exist. Please use other username');
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    
    await User.create({
      username,
      password: hashedPassword
    })
    return res.status(201).send({
      status: 'success',
      code: 201,
      message: 'Success register user',
      data: user
    });
  } catch (err) {
    return next(err);
  }
}

const login = async (req, res, next) => {
  try {
    const {username,password} = req.body;
    const user = await User.findOne({
      where: {
        username,
      }
    });

    if (!user) {
      throw new Error('User not found')
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match) {
      throw new Error('Password not valid')
    }

    const token = jwt.sign(
      {
        userId: user.id
      },
      SECRET_TOKEN,
      {
        expiresIn: '1h'
      }
    )

    return res.status(201).send({
      id: user.id,
      status: 'success',
      code: 201,
      message: 'Success Login',
      data: {
        token: token
      }
    });

  } catch(err) {
    return next(err)
  }

  
}

module.exports = {
  register,
  login,
}