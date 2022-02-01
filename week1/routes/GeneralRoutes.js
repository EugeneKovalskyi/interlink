function GeneralRoutes(router, controller) {
  const self = {
    read,
    write,
    crud,
  }

  function read(...middleware) {
    router.get('/', middleware, (req, res) => {
      try {
        const listId = req.query.listId
        const id = req.query.id
        let models = null

        if (listId !== undefined && id !== undefined) {
          models = controller.findTaskById(listId, id)
        } else if (listId !== undefined) {
          models = controller.findListById(listId)
        } else {
          models = controller.find()
        }

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
        const listId = req.query.listId
        let models = null

        if (listId !== undefined) {
          models = controller.createTask(listId, req.body)
        } else {
          models = controller.createList(req.body)
        }

        res.json(models)
      } catch (error) {
        res.status(500).json({ error })
      }
    })

    router.patch('/', middleware, (req, res) => {
      try {
        const listId = req.query.listId
        const id = req.query.id
        const models = controller.updateById(listId, id, req.body)

        res.json(models)
      } catch (error) {
        res.status(500).json({ error })
      }
    })

    router.put('/', middleware, (req, res) => {
      try {
        const listId = req.query.listId
        const id = req.query.id
        const models = controller.replaceById(listId, id, req.body)

        res.json(models)
      } catch (error) {
        res.status(500).json({ error })
      }
    })

    router.delete('/', middleware, (req, res) => {
      try {
        const listId = req.query.listId
        const id = req.query.id
        let models = null

        if (id === undefined) {
          models = controller.removeListById(listId)
        } else {
          models = controller.removeTaskById(listId, id)
        }

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

module.exports = GeneralRoutes
