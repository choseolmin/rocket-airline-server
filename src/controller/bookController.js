const flights = require('../repository/flightList');
let booking = [];

module.exports = {
  
  findById: (req, res) => {
    const { flight_uuid, phone } = req.query;

    if (phone) {
      const result = booking.find(b => b.phone === phone);
      if (!result) {
        return res.status(404).json({ message: '예약 정보를 찾을 수 없습니다.' });
      }
      
      const { book_id, ...response } = result;
      return res.status(200).json(response);
    }

    if (flight_uuid) {
      const result = booking
        .filter(b => b.flight_uuid === flight_uuid)
        .map(({ book_id, ...rest }) => rest); 

      return res.status(200).json(result);
    }

  
    const result = booking.map(({ book_id, ...rest }) => rest); 
    return res.status(200).json(result);
  },

  // [POST] /book
  create: (req, res) => {
    const { flight_uuid, name, phone } = req.body;

    const newBooking = {
      book_id: Date.now().toString(),
      flight_uuid,
      name,
      phone,
    };

    booking.push(newBooking);

    res.setHeader('Location', `/book/${newBooking.book_id}`);
    return res.status(201).json({ book_id: newBooking.book_id });
  },

  // [DELETE] /book?phone=...
  deleteById: (req, res) => {
    const { phone } = req.query;

    if (!phone) {
      return res.status(400).json({ message: 'phone 값이 필요합니다.' });
    }

    booking = booking.filter(b => b.phone !== phone);
    const result = booking.map(({ book_id, ...rest }) => rest); 
    return res.status(200).json(result);
  },
};
