const dataBase = require('dataBase')

const MeetupSchema = new dataBase.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
})

const Meetup = dataBase.model('Meetup', MeetupSchema, 'meetups')

module.exports = Meetup
