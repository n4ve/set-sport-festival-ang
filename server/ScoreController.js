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
        let isSummary = req.query.isSummary;
        console.log('isSum' + isSummary);

        let startDateCondition = startDate != "\'\'" ? (" AND date >= " + startDate) : ""
        let endDateCondition = endDate != "\'\'" ? (" AND date <= " + endDate) : ""
        var sql = ""
        console.log(isSummary == 'true');
        var dataSelect = (isSummary == 'true') ? "team ,fullname , SUM(score) AS score" : "*";
        console.log('data' + dataSelect);
        if (team != "\'ALL\'") {
            sql = `SELECT ${dataSelect} FROM score WHERE team == ` + team  + startDateCondition + endDateCondition
        } else {
            startDateCondition = startDate != "\'\'" ? ("date >= " + startDate) : ""
            endDateCondition = endDate != "\'\'" ? ( (startDate != null ? " AND " : "") + "date <= " + endDate) : "";
            if( startDateCondition != "" || endDateCondition != "") condition = " WHERE " + startDateCondition + endDateCondition
            sql = `SELECT ${dataSelect} FROM score`  + condition;
        }

        if (isSummary == 'true') sql = sql + ' GROUP BY account_id';
        
        console.log(sql);
        db.all(sql, function(err, rows) {
            res.json(rows); 
        });                       
    });

   
    console.log("Registering endpoint: /api/around-the-world");
    app.get('/api/around-the-world', function(req, res){ 
        let team = "\'" + req.query.team + "\'";
        let sql = `SELECT SUM(score) AS total FROM score WHERE team == ${team} AND date >= \"2019-06-01\" AND date <= \"2019-07-24\"`;
        console.log(sql);
        db.all(sql , function(err, rows) {
            console.log(rows);
            res.json(rows[0]); 
        });                        
    });

    console.log("Registering endpoint: /api/month/1");
    app.get('/api/month/1', function(req, res){ 
        let team = "\'" + req.query.team + "\'";
        let sql = `SELECT SUM(score) AS total FROM score WHERE team == ${team} AND date >= \"2019-06-01\" AND date <= \"2019-06-30\"`;
        console.log(sql);
        db.all(sql , function(err, rows) {
            console.log(rows);
            res.json(rows[0]); 
        });                        
    });

    console.log("Registering endpoint: /api/month/2");
    app.get('/api/month/2', function(req, res){ 
        let team = "\'" + req.query.team + "\'";
        let sql = `SELECT SUM(score) AS total FROM score WHERE team == ${team} AND date >= \"2019-07-01\" AND date <= \"2019-07-24\"`;
        console.log(sql);
        db.all(sql , function(err, rows) {
            console.log(rows);
            res.json(rows[0]); 
        });                        
    });
}