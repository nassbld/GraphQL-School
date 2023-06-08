DROP TABLE IF EXISTS "User" CASCADE;

CREATE TABLE "User" (
                      id BIGINT PRIMARY KEY,
                      email VARCHAR(255) NOT NULL,
                      password VARCHAR(255) NOT NULL,
                      first_name VARCHAR(255) NOT NULL,
                      last_name VARCHAR(255) NOT NULL,
                      date_of_birth DATE NOT NULL,
                      student BOOLEAN NOT NULL,
                      teacher BOOLEAN NOT NULL
);

DROP TABLE IF EXISTS "Student" CASCADE;

CREATE TABLE "Student" (
                         user_id BIGINT PRIMARY KEY,
                         grades_id INTEGER[],
                         absences_courses_id INTEGER[],
                         FOREIGN KEY (user_id) REFERENCES "User"(id)
);

DROP TABLE IF EXISTS "Teacher" CASCADE;

CREATE TABLE "Teacher" (
                         user_id BIGINT PRIMARY KEY,
                         courses_id INTEGER[],
                         FOREIGN KEY (user_id) REFERENCES "User"(id)
);

DROP TABLE IF EXISTS "Module" CASCADE;

CREATE TABLE "Module" (
                        id BIGINT PRIMARY KEY,
                        name VARCHAR(255) NOT NULL,
                        teacher_id BIGINT NOT NULL,
                        students_id INTEGER[],
                        FOREIGN KEY (teacher_id) REFERENCES "Teacher"(user_id)
);

DROP TABLE IF EXISTS "Course" CASCADE;

CREATE TABLE "Course" (
                        id BIGINT PRIMARY KEY,
                        module_id BIGINT NOT NULL,
                        date DATE NOT NULL,
                        room VARCHAR(255) NOT NULL,
                        FOREIGN KEY (module_id) REFERENCES "Module"(id)
);

DROP TABLE IF EXISTS "Grade" CASCADE;

CREATE TABLE "Grade" (
                       id BIGINT PRIMARY KEY,
                       grade FLOAT NOT NULL,
                       module_id BIGINT NOT NULL,
                       student_id BIGINT NOT NULL,
                       FOREIGN KEY (module_id) REFERENCES "Module"(id),
                       FOREIGN KEY (student_id) REFERENCES "Student"(user_id)
);