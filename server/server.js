const express = require("express");
const cors = require("cors");
const mysql = require("mysql")

const app = express();
app.use(express.json());

app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"crud"
})

app.get('/', (req, res) => {
   const sql = "SELECT * FROM employee";
   db.query(sql, (err , data) =>{
    if (err) return res.json("Error");
    return res.json(data);
   });
});

app.post('/create', (req, res) => {
    const sql = "INSERT INTO employee (`Id`,`Name`,`Surname`,`Position`,`ProfilePicture`,`Email`,`Phone` ) VALUES (?,?,?,?,?,?,?)";
    const values = [
        req.body.id,
        req.body.name,
        req.body.surname,
        req.body.position,
        req.body.profilepic,
        req.body.email,
        req.body.phone
    ];

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json("Error");
        }
        return res.json(data);
    });
});

app.put('/update/:id', (req, res) => {
    const sql = "update employee set `ID` = ?,`Name` = ?, `Surname` = ?, `Position` = ?, `ProfilePicture` = ?, `Email` = ?, `Phone` = ? where `ID`= ?";
    const id = req.params.id;
    const values = [
        req.body.id,
        req.body.name,
        req.body.surname,
        req.body.position,
        req.body.profilepic,
        req.body.email,
        req.body.phone
    ];

    

    db.query(sql, [...values, id], (err, data) => {
        if (err) return res.json("Error");
        return res.json(data);
    });
});

app.delete('/employee/:id', (req, res) => {
    const sql = "DELETE FROM `employee` WHERE `employee`.`ID` = ? ";
    const values = [
        req.body.id,
        req.body.name,
        req.body.surname,
        req.body.position,
        req.body.profilepic,
        req.body.email,
        req.body.phone
    ];

    const id = req.params.id;

    db.query(sql, [...values, id], (err, data) => {
        if (err) return res.json("Error");
        return res.json(data);
    });
});



app.listen(8081, () => {
    console.log("Listening on port 8081");
})
