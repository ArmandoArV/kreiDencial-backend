const connection = require("../config/mysql-config");
const { use } = require("../middleware/jwt-middleware");

const getEventos = async (req, res) => {
  const result = await connection.query("SELECT * FROM Evento");
  res.json(result);
};

const validateEvento = async (req, res) => {
  const eventName = req.body.eventName;
  const result = await connection.query(
    "SELECT * FROM Evento WHERE eventName = ?",
    [eventName]
  );
  if (result.length > 0) {
    res.json({ message: "Event exists" });
  } else {
    res.json({ message: "Event does not exist" });
  }
};

const createEvento = async (req, res) => {
  const { eventName, eventCode, isActive } = req.body;

  const sql =
    "INSERT INTO Evento (eventName, eventCode, isActive) VALUES (?, ?, ?)";

  connection.query(
    sql,
    [eventName, eventCode, isActive],
    async (err, result) => {
      if (err) {
        res.json({ message: "Error" });
      } else {
        res.json({ message: "Event created" });
      }
    }
  );
};

const updateEvento = async (req, res) => {
  const idEvento = req.params.idEvento;
  const { eventName, eventCode, isActive } = req.body;

  const sql =
    "UPDATE Evento SET eventName = ?, eventCode = ?, isActive = ? WHERE idEvento = ?";

  connection.query(
    sql,
    [eventName, eventCode, isActive, idEvento],
    async (err, result) => {
      if (err) {
        res.json({ message: "Error" });
      } else {
        res.json({ message: "Event updated" });
      }
    }
  );
};

const deleteEvento = async (req, res) => {
  const idEvento = req.params.idEvento;

  const sql = "DELETE FROM Evento WHERE idEvento = ?";

  connection.query(sql, [idEvento], async (err, result) => {
    if (err) {
      res.json({ message: "Error" });
    } else {
      res.json({ message: "Event deleted" });
    }
  });
};

const checkIfEventIsActive = async (req, res) => {
  const eventCode = req.body.eventCode;
  const sql = "SELECT isActive FROM Evento WHERE eventCode = ?";

  connection.query(sql, [eventCode], async (err, result) => {
    if (err) {
      res.json({ message: "Error" });
    } else {
      res.json(result);
    }
  });
};

module.exports = {
  getEventos: use(getEventos),
  validateEvento: use(validateEvento),
  createEvento: use(createEvento),
  updateEvento: use(updateEvento),
  deleteEvento: use(deleteEvento),
  checkIfEventIsActive: use(checkIfEventIsActive),
};
