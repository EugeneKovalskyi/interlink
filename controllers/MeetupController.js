const Meetup = require('../models/Meetup')

class MeetupController {
  find() {
    return Meetup.find()
  }

  create(meetup) {
    return Meetup.create(meetup)
  }

  findById(id) {
    return Meetup.findById(id)
  }

  removeById(id) {
    return Meetup.removeById(id)
  }

  updateById(id, meetup) {
    return Meetup.removeById(id, meetup, { new: true })
  }
}

module.exports = new MeetupController()