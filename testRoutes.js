const { Router } = require('express')
const router = new Router()
const testController = require('./testController')

router.post('/worker', testController.createWorker())
router.get('/worker', testController.getAllWorkers())
router.get('/worker/:id', testController.getWorker())
router.patch('/worker', testController.updateWorker())
router.delete('/worker/:id', testController.deleteWorker())

module.exports = router
