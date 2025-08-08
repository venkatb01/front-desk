const User = require('./adminModel');
const Guest = require('./guestModel');
const RoomType = require('./roomTypeModel');
const Room = require('./roomModel');
const Rate = require('./rateModel');
const Service = require('./servicesModel');
const Reservation = require('./reservationModel');
const Payment = require('./paymentModel');
const Folio = require('./folioModel');
const Housekeeping = require('./houseKeepingModel');
const Maintenance = require('./maintenanceModel');



module.exports = {
  User,
  Guest,
  RoomType,
  Room,
  Rate,
  Service,
  Reservation,
  Payment,
  Folio,
  Housekeeping,
  Maintenance
};