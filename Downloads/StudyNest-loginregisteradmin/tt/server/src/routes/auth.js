const { Router } = require('express')
const {
  getUsers,
  register,
  login,
  protected,
  logout,
  getRole,
} = require('../controllers/auth')
const {
  getMentors, getMentees, createGroup, getGroups
} = require('../controllers/functions')
const {
  validationMiddleware,
} = require('../middlewares/validations-middleware')
const { registerValidation, loginValidation } = require('../validators/auth')
const { userAuth } = require('../middlewares/auth-middleware')
const router = Router()

router.get('/get-users', getUsers)
router.get('/protected', userAuth, protected)
router.post('/register', registerValidation, validationMiddleware, register)
router.post('/login', loginValidation, validationMiddleware, login)
router.get('/logout', logout)
router.get('/mentors', getMentors)
router.get('/mentees', getMentees)
router.post('/creategroup', createGroup)
router.get('/getgroups', getGroups)
router.get('/getrole',userAuth, getRole)
Router.post('/v1/assignmentDropbox/:menteeId/:taskId', async (req, res)=>{
    try {
        const currentDate = new Date();
        const currDate = currentDate.toISOString().split('T')[0];
        const currTime = currentDate.toTimeString().split(' ')[0];
        console.log(req.params)
        console.log(req.body)
        const fileContent = req.body.submissionfile;
        const menteeId = req.params.menteeId;
        const taskId = req.params.taskId;
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

Router.get('/v1/assignmentReview/:mentorId/:taskId', async(req, res)=>{
    try{
        console.log(req.params)
        const mentorId = req.params.mentorId;
        const taskId = req.params.taskId;
        const results = await db.query(' SELECT menteeid, taskid, submissionfile, submissiondate, submissiontime, isVerified from assignmentsubmission where taskId in (select taskId from mentorgivestask where taskid=$1 and mentorid=$2)', [taskId, mentorId]);
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
    
})

Router.get('/v1/getAssignments/:menteeId', async(req, res)=>{
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

Router.get('/v1/tasksAssigned/:mentorId', async(req, res)=>{
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

Router.post('/v1/assignTask/:mentorId', async(req, res)=>{
    try{
         const title = req.body.title;
         const fileContent = req.body.descriptionFile;
         const deadlineDate = req.body.deadlineDate;
         const deadlineTime = req.body.deadlineTime;
        const mentorId = req.params.mentorId;
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

module.exports = router
