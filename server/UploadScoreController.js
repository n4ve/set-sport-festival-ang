
module.exports = function(app,db,csv, upload) {
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
            res.send()
        })
        // if any errors occur
        .on("error", function(error) {
            console.log('error!!');
            console.log(error.message);
        });
    });
};