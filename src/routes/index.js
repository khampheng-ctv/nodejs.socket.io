const RoutesApi = (app, io) => {
  app.get("/", (req, res) => {
    res.status(200).send({ msg: "Welcome to the API" });
  });

  let arrays = [];
  app.post("/add", (req, res) => {
    const { message } = req?.body;
    arrays.push(message);
    io.sockets.emit("getMessage", arrays);
    res.status(200).send({ msg: "MESSAGE_ADDED" });
  });

  app.get("/get", (req, res) => {
    res.status(200).send(arrays);
  });
};

module.exports = RoutesApi;
