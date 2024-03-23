// Import necessary modules
import express from 'express';
import {dirname} from "path";
import { fileURLToPath } from "url";
import bodyParser from 'body-parser';
import pg from 'pg';

const _dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(bodyParser.json());

const pool = new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'studynest',
    password: 'guddu06052005',
    port: 5432,
});

app.get("/",(req,res)=>{
    res.sendFile(_dirname+"/public/index.html");
});

app.post('/add-timeslot', async (req, res) => {
    const { startTime, date, description, userType } = req.body;

    try {
        const client = await pool.connect();
        const query = 'INSERT INTO timeslot (startTime, date, description) VALUES ($1, $2, $3) RETURNING id';
        const values = [req.body.startTime, req.body.date, req.body.description];

        const result = await client.query(query, values);
        const timeslotId = result.rows[0].id;
        
        client.release();
        console.log(req.bo)
        
        if (userType === 'mentor') {
            await pool.query('INSERT INTO mentortimeslots (mentorId, timeslotId) VALUES ($1, $2)', [req.body.userId, timeslotId]);
        } else if (userType === 'mentee') {
            await pool.query('INSERT INTO menteetimeslots (menteeId, timeslotId) VALUES ($1, $2)', [req.body.userId, timeslotId]);
        }

        res.status(200).json({ message: 'Success' });
        // res.sendFile(_dirname+"/public/index2.html");
    } catch (error) {
        console.error('Error adding time slot:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.get('/timeslots', async (req, res) => {
    try {
        const client = await pool.connect();
        const query = 'SELECT * FROM timeslot';
        const result = await client.query(query);
        const timeslots = result.rows;
        client.release();

        res.json(timeslots);

    } catch (error) {
        console.error('Error fetching time slots:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
