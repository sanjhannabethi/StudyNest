set search_path to studynest;

drop table if exists client, admin, mentor, mentee, studyGroup, timeslot, mentortimeslots, menteetimeslots, task, assignmentSubmission, feedback, todoItem, studyGroupMentee, mentorGivesTask, menteeTasks, menteeTodoListItem cascade;
drop type if exists role cascade;

create type role as enum ('admin', 'mentor', 'mentee');

create table client(
    id serial primary key,
    username varchar(255) not null unique,
    hash varchar(255) not null,
    salt varchar(255) not null,
    emailId varchar(255) not null unique,
    firstName varchar(255) not null,
    lastName varchar(255) not null,
    userType role not null
);

create table admin(
    id int primary key,
    foreign key (id) references client(id) on delete cascade
);

create table mentor(
    id int primary key,
    foreign key (id) references client(id) on delete cascade
);

create table mentee(
    id int primary key,
    foreign key (id) references client(id) on delete cascade
);

create table timeslot(
    id serial primary key,
    startTime time not null,
    date date not null
);

create table menteetimeslots(
    menteeId int not null,  
    timeslotId int not null,
    primary key (menteeId, timeslotId),
    foreign key (menteeId) references mentee(id) on delete cascade,
    foreign key (timeslotId) references timeslot(id) on delete cascade
);

create table mentortimeslots(
    mentorId int not null,  
    timeslotId int not null,
    primary key (mentorId, timeslotId),
    foreign key (mentorId) references mentor(id) on delete cascade,
    foreign key (timeslotId) references timeslot(id) on delete cascade
);

create table studyGroup(
    id serial primary key,
    maxStudents int not null,
    mentorId int not null ,
    foreign key (mentorId) references mentor(id) on delete cascade  
);

create table task(
    id serial primary key,
    title varchar(255) not null,
    descriptionFile bytea not null,
    deadlineDate date not null,
    deadlineTime time not null
);

create table assignmentSubmission(
    id serial primary key,
    menteeId int not null,
    taskId int not null,
    submissionFile bytea not null,
    submissionDate date not null,
    submissionTime time not null,
    isVerified boolean not null,
    unique (menteeId, taskId),
    foreign key (menteeId) references mentee(id) on delete cascade,
    foreign key (taskId) references task(id) on delete cascade
);

create table feedback(
    id serial primary key,
    menteeId int not null,
    taskId int not null,
    feedbackText varchar(500) not null,
    foreign key (menteeId) references mentee(id) on delete cascade,
    foreign key (taskId) references task(id) on delete cascade
);

create table todoItem(
    id serial primary key,
    menteeId int not null,
    description varchar(255) not null,
    status boolean not null,
    foreign key (menteeId) references mentee(id) on delete cascade
);

create table studyGroupMentee(
    studyGroupId int not null,
    menteeId int not null,
    primary key (studyGroupId, menteeId) ,
    foreign key (studyGroupId) references studyGroup(id) on delete cascade,
    foreign key (menteeId) references mentee(id) on delete cascade
);

create table mentorGivesTask(
    mentorId int not null,
    taskId int not null,
    primary key (mentorId, taskId),
    foreign key (mentorId) references mentor(id) on delete cascade,
    foreign key (taskId) references task(id) on delete cascade
);

create table menteeTasks(
    taskId int not null,
    menteeId int not null,
    status boolean not null,
    primary key (taskId, menteeId),
    foreign key (taskId) references task(id) on delete cascade,
    foreign key (menteeId) references mentee(id) on delete cascade
);

create table menteeTodoListItem(
    menteeId int not null,
    todoItemId int not null,
    primary key (menteeId, todoItemId),
    foreign key (menteeId) references mentee(id) on delete cascade,
    foreign key (todoItemId) references todoItem(id) on delete cascade
);

create or replace function addAdmin()
returns trigger as $$
begin
    if new.userType = 'admin' then
        insert into admin(id) values (new.id); 
    end if;
    return new;
end;
$$ language plpgsql;

create trigger addAdminTrigger
after insert on client
for each row
execute procedure addAdmin();

create or replace function addMentor()
returns trigger as $$
begin
    if new.userType = 'mentor' then
        insert into mentor(id) values (new.id); 
    end if;
    return new;
end;
$$ language plpgsql;

create trigger addMentorTrigger
after insert on client
for each row
execute procedure addMentor();

create or replace function addMentee()
returns trigger as $$
begin
    if new.userType = 'mentee' then
        insert into mentee(id) values (new.id); 
    end if;
    return new;
end;
$$ language plpgsql;

create trigger addMenteeTrigger
after insert on client
for each row
execute procedure addMentee();

create or replace function setTaskStatus()
returns trigger as $$
begin 
    update menteeTasks set status = true where taskId = new.taskId and menteeId = new.menteeId;
    return new;
end;
$$ language plpgsql;

create trigger setTaskStatusTrigger
after insert on assignmentSubmission
for each row
execute procedure setTaskStatus();

create or replace function resetTaskStatus()
returns trigger as $$
begin 
    update menteeTasks set status = false where taskId = old.taskId and menteeId = old.menteeId;
end;
$$ language plpgsql;

create trigger resetTaskStatusTrigger
after delete on assignmentSubmission
for each row
execute procedure resetTaskStatus();

CREATE OR REPLACE FUNCTION addMenteeTasks()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO menteeTasks (taskId, menteeId, status)
    SELECT NEW.taskId, sgme.menteeId, false
    FROM studyGroupMentee sgme
    WHERE sgme.studyGroupId IN (
        SELECT sg.id
        FROM studyGroup sg
        WHERE sg.mentorId = NEW.mentorId
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER addMenteeTasksTrigger
AFTER INSERT ON mentorGivesTask
FOR EACH ROW
EXECUTE PROCEDURE addMenteeTasks();

create or replace function deleteMenteeTasks()
returns trigger as $$
begin
    delete from menteeTasks
    where taskId = old.taskId
    and menteeId in (
        select menteeId
        from studyGroupMentee
        where studyGroupId = (
            select studyGroupId
            from studyGroup
            where mentorId = old.mentorId
        )
    );
    return old;
end;
$$ language plpgsql;

create trigger deleteMenteeTasksTrigger
after delete on mentorGivesTask
for each row
execute procedure deleteMenteeTasks();


-- Insert mock data for client table
insert into client (username, hash, salt, emailId, firstName, lastName, userType) values
('admin1', 'admin1hash', 'admin1salt', 'admin1@example.com', 'Admin', 'One', 'admin'),
('mentor1', 'mentor1hash', 'mentor1salt', 'mentor1@example.com', 'Mentor', 'One', 'mentor'),
('mentee1', 'mentee1hash', 'mentee1salt', 'mentee1@example.com', 'Mentee', 'One', 'mentee'),
('mentee2', 'mentee2hash', 'mentee2salt', 'mentee2@example.com', 'Mentee', 'Two', 'mentee');



-- Insert mock data for timeslot table
insert into timeslot (startTime, date) values
('09:00:00', '2024-03-20'),
('13:00:00', '2024-03-21');

-- Insert mock data for menteetimeslots table
insert into menteetimeslots (menteeId, timeslotId) values
(3, 1),
(3, 2),
(4, 2);

-- Insert mock data for mentortimeslots table
insert into mentortimeslots (mentorId, timeslotId) values
(2, 1),
(2, 2);

-- Insert mock data for studyGroup table
insert into studyGroup (maxStudents, mentorId) values
(5, 2),
(3, 2);

-- Insert mock data for task table
insert into task (title, descriptionFile, deadlineDate, deadlineTime) values
('Task 1', 'description_file_1', '2024-03-25', '18:00:00'),
('Task 2', 'description_file_2', '2024-03-30', '15:00:00');

-- Insert mock data for assignmentSubmission table
insert into assignmentSubmission (menteeId, taskId, submissionFile, submissionDate, submissionTime, isVerified) values
(3, 1, 'submission_file_1', '2024-03-24', '12:00:00', true),
(4, 2, 'submission_file_2', '2024-03-28', '10:00:00', false);

-- Insert mock data for feedback table
insert into feedback (menteeId, taskId, feedbackText) values
(3, 1, 'Good work!'),
(4, 2, 'Needs improvement.');

-- Insert mock data for todoItem table
insert into todoItem (menteeId, description, status) values
(3, 'Complete Task 1', false),
(4, 'Review Task 2', true);

-- Insert mock data for studyGroupMentee table
insert into studyGroupMentee (studyGroupId, menteeId) values
(1, 3),
(2, 4);

-- Insert mock data for mentorGivesTask table
insert into mentorGivesTask (mentorId, taskId) values
(2, 1),
(2, 2);

-- Insert mock data for menteeTodoListItem table
insert into menteeTodoListItem (menteeId, todoItemId) values
(3, 1),
(4, 2);
