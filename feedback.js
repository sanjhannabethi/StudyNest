import express from "express";
import {dirname} from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import pg from "pg";

// const _dirname = dirname(fileURLToPath(import.meta.url));

const app=express();
app.use(express.static('public'));

const port=3000;
app.use(bodyParser.urlencoded({extended: true}));


// const pool = new pg.Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'feedbacks',
//     password: 'manya@1315',
//     port: 5432
// });

// app.get("/",(req,res)=>{
//     res.sendFile(_dirname+"/public/index.html");
// });



app.post("/submit", async (req, res) => {
    try {
        const client = await pool.connect();
        const query = 'INSERT INTO feedback (menteeId,taskId,grades, remark) VALUES ($1, $2,$3,$4)';
       
        const values = [req.body["grades"],req.body["remark"]];

        await client.query(query, values);
        client.release();

        res.sendFile(_dirname+"/public/index2.html");
    } catch (error) {
        console.error('Error processing form submission:', error);
        res.status(500).send('Internal server error');
    }
});


app.get("/feed", async (req, res) => {
    try {
        
        const client = await pool.connect();
        const query = 'SELECT grades, remark FROM feedback';
        const result = await client.query(query);
        const rows = result.rows; 
        client.release();

        // Render the template with the retrieved data
        res.render("index2.ejs", { row: rows });
    } catch (error) {
        console.error('Error retrieving data from the database:', error);
        res.status(500).send('Internal server error');
    }
});

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});
