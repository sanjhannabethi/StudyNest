require('dotenv').config()
const express = require('express');

const app = express();
const moment = require('moment');

const port = process.env.PORT || 5001;

const db = require('./db/index.js');

db.query("set search_path to studynest;");

app.post('/v1/assignmentDropbox', async (req, res)=>{
    try {
        const currentDate = new Date();
        const currDate = currentDate.toISOString().split('T')[0];
        const currTime = currentDate.toTimeString().split(' ')[0];
        // const menteeId = req.query.menteeid;
        // const taskId = req.query.taskid;
        // const fileContent = req.query.submissionfile;
        const menteeId = 3;
        const taskId = 2;

        const fs = require('fs');

        // Specify the file path (replace 'path_to_file' with the actual file path)
        const filePath = './db/index.js';
        var data;
        // Read the content of the file synchronously
        try {
             data = fs.readFileSync(filePath, 'utf-8');
            console.log('File content:', data);
        } catch (err) {
            console.error('Error reading file:', err);
        }

        const fileContent = data; 
        const byteaString = '\\x' + Buffer.from(fileContent, 'utf-8').toString('hex');
        console.log(byteaString);
        const results = await db.query('INSERT INTO assignmentsubmission(menteeid, taskid, submissionfile, submissiondate, submissiontime, isverified) values ($1, $2, $3, $4, $5, $6) returning *;', [ menteeId, taskId, byteaString, currDate, currTime,'false' ]);
        res.status(200).json({
            status: 'success',
            results: results.rows.length,
            data: {
                assignmentDropbox: results.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }
})

app.get('/v1/assignmentReview', async(req, res)=>{
    try{
        // const mentorId = req.query.mentorid;
        // const taskId = req.query.taskid;
        const mentorId = 2;
        const taskId = 1;
        const results = await db.query(' SELECT menteeid, taskid, submissionfile, submissiondate, submissiontime, isVerified from assignmentsubmission where exists (select * from mentorgivestask where taskid=$1 and mentorid=$2)', [taskId, mentorId]);
        res.status(200).json({
            status: 'success',
            results: results.rows.length,
            data: {
                assignmentReview: results.rows,
            },
        });
    }catch(err){
        console.log(err);
    }
    
})

app.get('/v1/getAssignments', async(req, res)=>{
    try{
        //const menteeId = req.query.menteeid;
        const menteeId = 3;
        query = 'SELECT * FROM task t inner join menteetasks mt on t.id=mt.taskid where menteeid=$1;'
        const results = await db.query(query, [menteeId]);
        res.status(200).json({
            status: 'success',
            results: results.rows.length,
            data: {
                assignments: results.rows,
            },
        });
    }catch(err){
        console.log(err);
    }
}
);

app.get('/v1/tasksAssigned', async(req, res)=>{
    try{
        //const mentorId = req.query.mentorid;
        const mentorId = 2;
        query = 'SELECT * FROM task t WHERE id IN(SELECT taskid FROM mentorgivestask WHERE mentorid=$1);'
        const results = await db.query(query, [mentorId]);
        res.status(200).json({
            status: 'success',
            results: results.rows.length,
            data: {
                assignments: results.rows,
            },
        });
    }catch(err){
        console.log(err);
    }
}
);

app.post('/v1/assignTask', async(req, res)=>{
    try{
        // const mentorId = req.query.mentorId;
        // const title = req.query.title;
        // const fileContent = req.query.descriptionFile;
        // const deadlineDate = req.query.deadlineDate;
        // const deadlineTime = req.query.deadlineTime;
        const mentorId = 2;
        const title = 'Mokky';
        const currentDate = new Date();
        const deadlineDate = currentDate.toISOString().split('T')[0];
        const deadlineTime = currentDate.toTimeString().split(' ')[0];
        const fs = require('fs');

        // Specify the file path (replace 'path_to_file' with the actual file path)
        const filePath = './db/index.js';
        var data;
        // Read the content of the file synchronously
        try {
             data = fs.readFileSync(filePath, 'utf-8');
            console.log('File content:', data);
        } catch (err) {
            console.error('Error reading file:', err);
        }

        const fileContent = data; 
        const byteaString = '\\x' + Buffer.from(fileContent, 'utf-8').toString('hex');
        console.log(byteaString);
        const query1 = 'INSERT INTO task(title, descriptionfile, deadlineDate, deadlineTime) values($1, $2, $3, $4) returning *';
        const results1 = await db.query(query1, [title, byteaString, deadlineDate, deadlineTime]);
        console.log(results1.rows)
        const query = 'INSERT INTO mentorgivestask(mentorId, taskId) values($1, $2);';
        const results = await db.query(query, [mentorId, results1.rows[0].id]);
        res.status(200).json({
            status: 'success',
            results: results.rows.length,
            data: {
                assignments: results.rows,
            },
        });
    }catch(err){
        console.log(err);
    }
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});