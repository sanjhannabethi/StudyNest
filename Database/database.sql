set search_path to studynest;

drop table if exists client, admin, mentor, mentee, studyGroup, task, assignmentSubmission, feedback, todoItem, studyGroupMentee, mentorGivesTask, menteeTodoListItem cascade;
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

create table menteeTodoListItem(
    menteeId int not null,
    todoItemId int not null,
    primary key (menteeId, todoItemId),
    foreign key (menteeId) references mentee(id) on delete cascade,
    foreign key (todoItemId) references todoItem(id) on delete cascade
);
