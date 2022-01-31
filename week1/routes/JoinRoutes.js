const express = require('express')

function JoinRoutes(router, controller) {
  const self = {
    read,
    write,
    crud,
  }

  function read(...middleware) {
    router.get('/', middleware, (req, res) => {
      try {
        const tasksUrl = new URL('http://localhost:3000' + req.url)
        const listId = tasksUrl.searchParams.get('listId')
        const taskId = tasksUrl.searchParams.get('taskId')
        let models = null

        if (listId !== null && taskId !== null) {
          models = controller.findTaskById(listId, taskId)
        } else if (listId !== null) {
          models = controller.findListById(listId)
        } else {
          models = controller.find()
        }

        res.json(models)
      } catch (error) {
        res.status(500).json({ error })
      }
    })

    router.get('/:listId', middleware, (req, res) => {
      try {
        const listId = parseInt(req.params.listId)
        const models = controller.findListById(listId)

        res.json(models)
      } catch (error) {
        res.status(500).json({ error })
      }
    })

    router.get('/:listId/tasks/:taskId', middleware, (req, res) => {
      try {
        const listId = parseInt(req.params.listId)
        const taskId = parseInt(req.params.taskId)
        const models = controller.findTaskById(listId, taskId)

        res.json(models)
      } catch (error) {
        res.status(500).json({ error })
      }
    })

    return self
  }

  function write(...middleware) {
    router.post('/', middleware, (req, res) => {
      try {
        const tasksUrl = new URL('http://localhost:3000' + req.url)
        const listId = tasksUrl.searchParams.get('listId')
        let models = null

        if (listId !== null) {
          models = controller.createTask(listId, req.body)
        } else {
          models = controller.createList(req.body)
        }

        res.json(models)
      } catch (error) {
        res.status(500).json({ error })
      }
    })

    router.post('/:listId', middleware, (req, res) => {
      try {
        const listId = parseInt(req.params.listId)
        const models = controller.createTask(listId, req.body)

        res.json(models)
      } catch (error) {
        res.status(500).json({ error })
      }
    })

    router.patch('/', middleware, (req, res) => {
      try {
        const tasksUrl = new URL('http://localhost:3000' + req.url)
        const listId = tasksUrl.searchParams.get('listId')
        const taskId = tasksUrl.searchParams.get('taskId')
        const models = controller.updateById(listId, taskId, req.body)

        res.json(models)
      } catch (error) {
        res.status(500).json({ error })
      }
    })

    router.patch('/:listId/tasks/:taskId', middleware, (req, res) => {
      try {
        const listId = parseInt(req.params.listId)
        const taskId = parseInt(req.params.taskId)
        const models = controller.updateById(listId, taskId, req.body)

        res.json(models)
      } catch (error) {
        res.status(500).json({ error })
      }
    })

    router.put('/', middleware, (req, res) => {
      try {
        const tasksUrl = new URL('http://localhost:3000' + req.url)
        const listId = tasksUrl.searchParams.get('listId')
        const taskId = tasksUrl.searchParams.get('taskId')
        const models = controller.replaceById(listId, taskId, req.body)

        res.json(models)
      } catch (error) {
        res.status(500).json({ error })
      }
    })

    router.put('/:listId/tasks/:taskId', middleware, (req, res) => {
      try {
        const listId = parseInt(req.params.listId)
        const taskId = parseInt(req.params.taskId)
        const models = controller.replaceById(listId, taskId, req.body)

        res.json(models)
      } catch (error) {
        res.status(500).json({ error })
      }
    })

    router.delete('/', middleware, (req, res) => {
      try {
        const tasksUrl = new URL('http://localhost:3000' + req.url)
        const listId = tasksUrl.searchParams.get('listId')
        const taskId = tasksUrl.searchParams.get('taskId')
        let models = null

        if (taskId === null) {
          models = controller.removeListById(listId)
        } else {
          models = controller.removeTaskById(listId, taskId)
        }

        res.status(204).json('OK')
      } catch (error) {
        res.status(500).json({ error })
      }
    })

    router.delete('/:id', middleware, (req, res) => {
      try {
        const id = parseInt(req.params.id)
        const models = controller.removeListById(id)

        res.status(204).json('OK')
      } catch (error) {
        res.status(500).json({ error })
      }
    })

    router.delete('/:listId/tasks/:id', middleware, (req, res) => {
      try {
        const listId = parseInt(req.params.listId)
        const id = parseInt(req.params.id)
        const models = controller.removeTaskById(listId, id)

        res.status(204).json('OK')
      } catch (error) {
        res.status(500).json({ error })
      }
    })

    return self
  }

  function crud(...middleware) {
    return self.read(...middleware).write(...middleware)
  }

  return self
}

module.exports = JoinRoutes
