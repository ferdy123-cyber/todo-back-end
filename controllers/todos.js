const { Todo } = require('../models')

const findAll = async (req, res, next) => {
    try {
        const todo = await Todo.findAll()
        const { user } = req

        return res.status(201).json({
            id: user.id,
            status: 'success',
            code: 201,
            message: 'success get todos',
            data: todo
        })
    } catch (err) {
        return next(err)
    }
}

const findById = async (req, res, next) => {
    try {
        const { id } = req.params

        const  todo = await Todo.findByPk(id)

        if (!todo) {
            throw new Error('Todo with this id not found.')
        }

        return res.status(201).json({
            status: 'success',
            code: 201,
            message: 'success get todos',
            data: todo
        })
    } catch (err) {
        return next(err)
    }
}

const add = async (req, res, next) => {
    try {
        const { user } = req
        const { name,description } = req.body

        const todo = await Todo.create({
            name,
            description,
            user_id: user.username
        })
        return res.status(201).json({
            status: 'success',
            code: 201,
            message: 'success create todos',
            data: todo
        })

    } catch (err) {
        return next(err)
    }
}

const update = async( req, res, next ) => {
    try {
        const { user } = req
        const { id, name, description } = req.body

        const todo = await Todo.findByPk(id)

        if(!todo) {
            throw new Error('Todo not found')
        }

        await Todo.update({
            name,
            description,
            user_id: user.id
        },{
            where: {
                id
            }
        })

        const updatedTodo = await Todo.findByPk(id)

        return res.status(201).json({
            status: 'success',
            code: 201,
            message: 'Success update todo',
            data: updatedTodo
        })
    } catch (err) {
        return next(err)
    }
}

const destroy = async (req, res, next) => {
    try {
        const { id } = req.params

        await Todo.destroy({
            where:{
                id
            }
        })

        return res.status(201).json({
            status: 'success',
            code: 201,
            message: 'Success delete todo',
            data: updatedTodo
        })


    } catch (err) {
        return next(err)
    }
}

module.exports = {
    findAll,
    findById,
    add,
    update,
    destroy
}