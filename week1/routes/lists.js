const router = require('express').Router()
const controller = require('../controllers/ListController')
const GeneralRoutes = require('./GeneralRoutes')

GeneralRoutes(router, controller).crud()

router.get('/:listId', (req, res) => {
  try {
    const listId = parseInt(req.params.listId)
    const models = controller.findListById(listId)

    res.json(models)
  } catch (error) {
    res.status(500).json({ error })
  }
})

router.get('/:listId/tasks/:id', (req, res) => {
  try {
    const listId = parseInt(req.params.listId)
    const id = parseInt(req.params.id)
    const models = controller.findTaskById(listId, id)

    res.json(models)
  } catch (error) {
    res.status(500).json({ error })
  }
})

router.post('/:listId', (req, res) => {
  try {
    const listId = parseInt(req.params.listId)
    const models = controller.createTask(listId, req.body)

    res.json(models)
  } catch (error) {
    res.status(500).json({ error })
  }
})

router.patch('/:listId/tasks/:id', (req, res) => {
  try {
    const listId = parseInt(req.params.listId)
    const id = parseInt(req.params.id)
    const models = controller.updateById(listId, id, req.body)

    res.json(models)
  } catch (error) {
    res.status(500).json({ error })
  }
})

router.put('/:listId/tasks/:id', (req, res) => {
  try {
    const listId = parseInt(req.params.listId)
    const id = parseInt(req.params.id)
    const models = controller.replaceById(listId, id, req.body)

    res.json(models)
  } catch (error) {
    res.status(500).json({ error })
  }
})

router.delete('/:listId', (req, res) => {
  try {
    const listId = parseInt(req.params.listId)
    const models = controller.removeListById(listId)

    res.status(204).json('OK')
  } catch (error) {
    res.status(500).json({ error })
  }
})

router.delete('/:listId/tasks/:id', (req, res) => {
  try {
    const listId = parseInt(req.params.listId)
    const id = parseInt(req.params.id)
    const models = controller.removeTaskById(listId, id)

    res.status(204).json('OK')
  } catch (error) {
    res.status(500).json({ error })
  }
})

module.exports = router
