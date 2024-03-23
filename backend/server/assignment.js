require('dotenv').config()
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const moment = require('moment');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 5001;

const db = require('./db/index.js');



// const authenticateUser = (req, res, next) => {
//     const isAuthenticated = false; 
  
//     if (isAuthenticated) {
//       next(); 
//     } else {
//       res.status(401).json({ message: 'Unauthorized' });
//     }
// };

app.post('/v1/assignmentDropbox/:menteeId/:taskId', async (req, res)=>{
    try {
        const currentDate = new Date();
        const currDate = currentDate.toISOString().split('T')[0];
        const currTime = currentDate.toTimeString().split(' ')[0];
        console.log(req.params)
        console.log(req.body)
        const fileContent = req.body.submissionfile;
        const menteeId = req.params.menteeId;
        const taskId = req.params.taskId;

        // const fs = require('fs');

        // // Specify the file path (replace 'path_to_file' with the actual file path)
        // const filePath = './db/index.js';
        // var data;
        // // Read the content of the file synchronously
        // try {
        //      data = fs.readFileSync(filePath, 'utf-8');
        //     console.log('File content:', data);
        // } catch (err) {
        //     console.error('Error reading file:', err);
        // }

        // const fileContent = data; 
        console.log(fileContent);
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
        console.log(err.message);
        return res.status(500).json({
            success: false,
            error: 'Internal Server Error',
        });
    }
})

app.get('/v1/assignmentReview/:mentorId/:taskId', async(req, res)=>{
    try{
        console.log(req.params)
        const mentorId = req.params.mentorId;
        const taskId = req.params.taskId;
        const results = await db.query(' SELECT menteeid, firstname, lastname, taskid, submissionfile, submissiondate, submissiontime, isVerified from assignmentsubmission a  join client c on c.Id=a.menteeId  where taskId in (select taskId from mentorgivestask where taskid=$1 and mentorid=$2)', [taskId, mentorId]);
        res.status(200).json({
            status: 'success',
            results: results.rows.length,
            data: {
                assignmentReview: results.rows,
            },
        });
    }catch(err){
        console.log(err.message);
        return res.status(500).json({
            success: false,
            error: 'Internal Server Error',
        });
    }

app.get('/v1/getAssignments/:menteeId', async(req, res)=>{
    try{
        
        const menteeId = req.params.menteeId;
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
        console.log(err.message);
        return res.status(500).json({
            success: false,
            error: 'Internal Server Error',
        });
    }
}
);

app.get('/v1/tasksAssigned/:mentorId', async(req, res)=>{
    try{
        const mentorId = req.params.mentorId;
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
        console.log(err.message);
        return res.status(500).json({
            success: false,
            error: 'Internal Server Error',
        });
    }
}
);

app.post('/v1/assignTask/:mentorId', async(req, res)=>{
    try{
         const title = req.body.title;
         const fileContent = req.body.descriptionFile;
         const deadlineDate = req.body.deadlineDate;
         const deadlineTime = req.body.deadlineTime;
        const mentorId = req.params.mentorId;
        // const title = 'Mokky';
        // const currentDate = new Date();
        // const deadlineDate = currentDate.toISOString().split('T')[0];
        // const deadlineTime = currentDate.toTimeString().split(' ')[0];
        // const fs = require('fs');

        // // Specify the file path (replace 'path_to_file' with the actual file path)
        // const filePath = './db/index.js';
        // var data;
        // // Read the content of the file synchronously
        // try {
        //      data = fs.readFileSync(filePath, 'utf-8');
        //     console.log('File content:', data);
        // } catch (err) {
        //     console.error('Error reading file:', err);
        // }

        // const fileContent = data; 
        const byteaString = '\\x' + Buffer.from(fileContent, 'utf-8').toString('hex');
        console.log(byteaString);
        const query1 = 'INSERT INTO task(title, descriptionfile, deadlineDate, deadlineTime) values($1, $2, $3, $4) returning *';
        const results1 = await db.query(query1, [title, byteaString, deadlineDate, deadlineTime]);
        console.log(results1.rows)
        const query = 'INSERT INTO mentorgivestask(mentorId, taskId) values($1, $2) returning *;';
        const results = await db.query(query, [mentorId, results1.rows[0].id]);
        res.status(200).json({
            status: 'success',
            results: results.rows.length,
            data: {
                assignments: results.rows,
            },
        });
    }catch(err){
        console.log(err.message);
        return res.status(500).json({
            success: false,
            error: 'Internal Server Error',
        });
    }
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
