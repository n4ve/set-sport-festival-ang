module.exports = function(app, db, jsonParser){
    
    // account_id Text NOT_NULL,
    // fullname Text NOT_NULL,
    // team TEXT NOT_NULL,
    // date TEXT NOT_NULL,
    // score TEXT
    
  
    console.log("Registering endpoint: /api/score");
    app.get('/api/score', function(req, res){ 
        let startDate = "\'" + req.query.startDate + "\'";
        let endDate = "\'" + req.query.endDate + "\'";
        let team = "\'" + req.query.team + "\'";

        let startDateCondition = startDate != "\'\'" ? (" AND date >= " + startDate) : ""
        let endDateCondition = endDate != "\'\'" ? (" AND date <= " + endDate) : ""
        var sql = ""
        if (team != "\'ALL\'") {
            sql = "SELECT * FROM score WHERE team == " + team  + startDateCondition + endDateCondition
        } else {
            startDateCondition = startDate != "\'\'" ? ("date >= " + startDate) : ""
            endDateCondition = endDate != "\'\'" ? ( (startDate != null ? " AND " : "") + "date <= " + endDate) : ""
            if( startDateCondition != "" || endDateCondition != "") condition = " WHERE " + startDateCondition + endDateCondition
            sql = "SELECT * FROM score"  + condition;
        }
        
        console.log(sql);
        db.all(sql, function(err, rows) {
            res.json(rows); 
        });                       
    });

   
    console.log("Registering endpoint: /api/around-the-world");
    app.get('/api/around-the-world', function(req, res){ 
        let team = "\'" + req.query.team + "\'";
        let sql = `SELECT SUM(score) AS total FROM score WHERE team == ${team} AND date >= \"2019-06-01\" AND date <= \"2019-08-01\"`;
        console.log(sql);
        db.all(sql , function(err, rows) {
            console.log(rows);
            res.json(rows[0]); 
        });                        
    });

}