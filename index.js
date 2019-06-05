const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(":memory");
db.serialize(function()
{
    db.run("CREATE TABLE IF NOT EXISTS Classroom(Building varchar, Room_number number, Capacity number)");

    db.run("INSERT INTO Classroom VALUES('Packard', 101, 500)");
    db.run("INSERT INTO Classroom VALUES('Painter', 514, 10)");
    db.run("INSERT INTO Classroom VALUES('Taylor', 3128, 70)");
    db.run("INSERT INTO Classroom VALUES('Watson', 100, 30)");
    db.run("INSERT INTO Classroom VALUES('Watson', 120, 50)");



    db.run("CREATE TABLE IF NOT EXISTS Department(Dept_name varchar, Building varchar, Budget number)");

    db.run("INSERT INTO Department VALUES('Biology', 'Watson', 90000)");
    db.run("INSERT INTO Department VALUES('Comp. sci.', 'Taylor', 100000)");
    db.run("INSERT INTO Department VALUES('Elec. Eng.', 'Taylor', 85000)");
    db.run("INSERT INTO Department VALUES('Finance', 'Painter', 1200000)");
    db.run("INSERT INTO Department VALUES('History', 'Painter', 50000)");
    db.run("INSERT INTO Department VALUES('Music', 'Packard', 80000)");
    db.run("INSERT INTO Department VALUES('Physics', 'Watson', 70000)");

    db.each("SELECT DISTINCT Room_number, Building FROM Classroom WHERE Capacity>50" , function(err,row){
        console.log(row.Room_number,row.Building);
    });

    db.each("SELECT DISTINCT Dept_name FROM Department WHERE Budget>85000", function(err,row){
        console.log(row.Dept_name);
    });

    let depts = {}
    db.each("SELECT DISTINCT Dept_name, Capacity FROM Department NATURAL JOIN Classroom" , function(err,row){

        if(depts[row.Dept_name] === undefined)
            depts[row.Dept_name]=0;

            depts[row.Dept_name] += row.Capacity;

    },function(err,count){
        let keys = Object.keys(depts);

        for( let i=0; i != keys.length; ++i){
            console.log(keys[i] + ":"+depts[keys[i]]);
        }
    });
});