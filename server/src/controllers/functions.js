const db = require('../db')

exports.getMentors = async (req, res) => {
    try {
        const { searchQuery } = req.query; // Assuming search query is provided in the request query parameters
        // console.log(req.query);
        // Construct SQL query with a WHERE clause to filter based on username or email
        const query = `
        SELECT user_id, username, email 
        FROM users 
        WHERE (username ILIKE $1 OR email ILIKE $1) AND user_type = 'Mentor'
      `;

        const { rows } = await db.query(query, [`%${searchQuery}%`]);
        // console.log(rows);
        return res.status(200).json({
            success: true,
            mentors: rows,
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            success: false,
            error: 'Internal Server Error',
        });
    }
};

exports.getMentees = async (req, res) => {
    try {
        const { searchQuery } = req.query; // Assuming search query is provided in the request query parameters

        // Construct SQL query with a WHERE clause to filter based on username or email
        const query = `
            SELECT user_id, username, email 
            FROM users 
            WHERE (username ILIKE $1 OR email ILIKE $1) AND user_type = 'Mentee'
        `;

        const { rows } = await db.query(query, [`%${searchQuery}%`]);

        return res.status(200).json({
            success: true,
            mentees: rows,
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            success: false,
            error: 'Internal Server Error',
        });
    }
};

exports.createGroup = async (req, res) => {
    try {
        const { mentorId, menteeIds, groupName } = req.body;

        // Check if the group already exists
        const existingGroup = await db.query('SELECT * FROM groups WHERE mentor_id = $1 AND group_name = $2', [mentorId, groupName]);

        if (existingGroup.rows.length > 0) {
            return res.status(200).json({
                success: false,
                error: 'Group with these mentor and mentees already exists',
            });
        }

        // Insert a new row into the groups table with the mentorId and groupName
        const { rows: [{ group_id }] } = await db.query('INSERT INTO groups (mentor_id, group_name) VALUES ($1, $2) RETURNING group_id', [mentorId, groupName]);

        // Insert rows into the group_members table for each mentee
        for (const menteeId of menteeIds) {
            await db.query('INSERT INTO group_members (group_id, mentee_id) VALUES ($1, $2)', [group_id, menteeId]);
        }

        return res.status(200).json({
            success: true,
            message: 'Group created successfully',
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            success: false,
            error: 'Internal Server Error',
        });
    }
};


exports.getGroups = async (req, res) => {
    try {
        // Query to fetch groups along with mentor and mentees information
        const query = `
         SELECT g.group_id, g.group_name, u.username as mentor_name,
           json_agg(json_build_object('id', u2.user_id, 'name', u2.username)) as mentees
         FROM groups g
         JOIN users u ON g.mentor_id = u.user_id
         LEFT JOIN group_members gm ON g.group_id = gm.group_id
         LEFT JOIN users u2 ON gm.mentee_id = u2.user_id
         GROUP BY g.group_id, g.group_name, u.username
        `;

        const { rows } = await db.query(query);

        return res.status(200).json({
            success: true,
            groups: rows,
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            success: false,
            error: 'Internal Server Error',
        });
    }
};

