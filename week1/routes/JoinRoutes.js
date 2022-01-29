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
        const models = controller.find()
        res.json(models)
      } catch (error) {
        res.status(500).json({ error })
      }
    })

    router.get('/:id', middleware, (req, res) => {
      try {
        const models = controller.findById(req.params.id)
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
        const models = controller.create(req.body)
        res.json(models)
      } catch (error) {
        res.status(500).json({ error })
      }
    })

    router.patch('/:id', middleware, (req, res) => {
      try {
        const id = parseInt(req.params.id)
        const models = controller.updateById(id, req.body)
        res.json(models)
      } catch (error) {
        // ???
        res.status(404).json({ error: 'Task not found' })
      }
    })

    router.delete('/:id', middleware, (req, res) => {
      try {
        const id = parseInt(req.params.id)
        const models = controller.removeById(id)
        res.status(204).json('OK')
      } catch (error) {
        // ???
        res.status(404).json({ error: 'Task not found' })
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
