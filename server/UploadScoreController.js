
module.exports = function(app,db,csv, upload, moment) {
    // accepts the POST form submit of the CSV file
    
    console.log("Registering endpoint: /api/upload");
    app.post("/api/upload", upload.single('csvdata'),function(req, res) {
        // the name under "files" must correspond to the name of the
        // file input field in the submitted form (here: "csvdata")

        
        if (!req.file) return res.send('Please upload a file')

        console.log("START");

        csv.fromPath(req.file.path, {
            delimiter: ",",
            escape: '"'
        })
        // when a record is found in the CSV file (a row)
        .on("data", function(row) {
            var accountId,fullname,team,date,score;

            // // skip the header row
            // if (index === 0) {
            //     return;
            // }

            // read in the data from the row
            accountId = row[0].trim();
            fullname = row[1].trim();
            team = row[2].trim();
            date = row[3].trim();
            score = row[4].trim();

            console.log([accountId,fullname,team,date,score])

            // perform some operation with the data
            // ...
            var insert = 'INSERT OR REPLACE INTO score (account_id, fullname, team, date, score) VALUES (?,?,?,?,?)'
            db.run(insert,[accountId,fullname,team,date,score])
        })
        // when the end of the CSV document is reached
        .on("end", function() {
            // redirect back to the root
            console.log('Finished')
            console.log('Start Update Time')
            const now = moment().utcOffset('+0700').format('DD/MM/YYYY HH:mm');
            console.log([1, now])
            let sqlUpdate = 'INSERT OR REPLACE INTO lastupdated (i,last_updated) VALUES (?,?)'
            db.run(sqlUpdate,[1,now])
            console.log('Update Finished')
            res.send()
        })
        // if any errors occur
        .on("error", function(error) {
            console.log('Error' + error.message);
        });
    });

    console.log("Registering endpoint: /api/last-updated");
    app.get('/api/last-updated', function(req, res){ 
        let sql = `SELECT last_updated AS lastUpdated FROM lastupdated WHERE i= 1`;
        console.log(sql);
        db.get(sql , function(err, row) {
            console.log(row);
            res.json(row); 
        });                        
    });
};