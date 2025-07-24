const flights = require('../repository/flightList');

module.exports = {
  // [GET] /flight
  findAll: (req, res) => {
    const { departure, destination, departure_times, arrival_times } = req.query;

    let result = flights;

    if (departure) result = result.filter(f => f.departure === departure);
    if (destination) result = result.filter(f => f.destination === destination);
    if (departure_times) result = result.filter(f => f.departure_times === departure_times);
    if (arrival_times) result = result.filter(f => f.arrival_times === arrival_times);

    return res.status(200).json(result);
  },

  // [GET] /flight/:id
  findById: (req, res) => {
    const { id } = req.arams;p
    const flight = flights.find(f => f.uuid === id);

    if (!flight) {
      return res.status(404).json({ message: '항공편을 찾을 수 없습니다.' });
    }

    return res.status(200).json([flight]); 
  },

  // [PUT] /flight/:id
  update: (req, res) => {
    const { id } = req.params;
    const { departure, destination, departure_times, arrival_times } = req.body;

    const index = flights.findIndex(f => f.uuid === id);

    if (index === -1) {
      return res.status(404).json({ message: '수정할 항공편이 없습니다.' });
    }

    flights[index] = {
      uuid: id,
      departure,
      destination,
      departure_times,
      arrival_times,
    };

    return res.status(200).json(flights[index]);
  },
};
