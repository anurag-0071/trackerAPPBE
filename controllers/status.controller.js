const Mongoose = require('mongoose');

const _COLLECTION_NAME = "status";

const fetchStatus = async (req, res) => {
  const deviceId = req.param("deviceId");
  const query = req.query;

  const page = query.page ? parseInt(query.page) : 0;
  const count = 10;

  try {
    const collection = await Mongoose.connection.db.collection(_COLLECTION_NAME);
    const statusList = await collection.find().skip(page * count).limit(count).toArray();
    res.send(statusList);
  } catch (error) {
    res.status(400).send({
      message: "Technical Error",
      error: error.toString()
    });

  }
}

module.exports = {
  fetchStatus,
}