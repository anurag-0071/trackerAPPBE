const Mongoose = require('mongoose');

const _COLLECTION_NAME = "devices";

const fetchDevices = async (req, res) => {
  const query = req.query;

  const page = query.page ? parseInt(query.page) : 0;
  const count = query.count ? parseInt(query.count) : 10;

  try {
    const collection = await Mongoose.connection.db.collection(_COLLECTION_NAME);
    const devices = await collection.find().skip(page * count).limit(count).toArray();
    res.send(devices);
  } catch (error) {
    res.status(400).send({
      message: "Technical Error",
      error: error.toString()
    });

  }
}

module.exports = {
  fetchDevices,
}