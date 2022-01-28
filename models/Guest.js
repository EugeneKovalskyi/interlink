const dataBase = require('dataBase')

const GuestSchema = new dataBase.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
})

const Guest = dataBase.model('Guest', MeetupSchema, 'guests')

module.exports = Guest
