import express from 'express'
import { graphqlHTTP } from 'express-graphql';
import { schema } from './schema.js';
import userController from './controllers/user.controller.js'
import studentController from './controllers/student.controller.js'
import courseController from './controllers/course.controller.js';
import teacherController from './controllers/teacher.controller.js';
import gradesController from './controllers/grade.controller.js';
import authenticationController from './controllers/authentication.controller.js';
import courseModel from "./models/course.model.js";


const root = {
  getUsers: () => userController.getUsers(),
  getUserById: (id) => userController.getUserById(id),
  getUserByEmail: (email) => userController.getUserByEmail(email),
  createUser: (value) => userController.createUser(value),
  updateUser: (id, value) => userController.updateUser({id, value}),
  deleteUser: (id) => userController.deleteUser(id),

  getStudents: () => studentController.getStudents(),
  getStudentById: (id) => studentController.getStudentById(id),
  createStudent: (value) => studentController.createStudent(value),
  updateStudent: (id, value) => studentController.updateStudent({id, value}),
  deleteStudent: (id) => studentController.deleteStudent(id),

  getTeachers: () => teacherController.getTeachers(),
  getTeacherById: (id) => teacherController.getTeacherById(id),
  createTeacher: (value) => teacherController.createTeacher(value),
  updateTeacher: (id, value) => teacherController.updateTeacher({id, value}),
  deleteTeacher: (id) => teacherController.deleteTeacher(id),

  getCourses: () => courseController.getCourses(),
  getCourseById: (id) => courseModel.getCourseById(id),
  createCourse: (value) => courseController.createCourse(value),
  updateCourse: (id, value) => courseController.updateCourse({id, value}),
  deleteCourse: (id) => courseController.deleteCourse(id),

  getGrades: () => gradesController.getGrades(),
  getGradesById: (id) => gradesController.getGradesById(id),
  createGrades: (value) => gradesController.createGrades(value),
  updateGrades: (id, value) => gradesController.updateGrades(id, value),
  deleteGrades: (id) => gradesController.deleteGrades(id),
}

export const launch = ({ protocol, port, host }) => {
  const app = express()
  app.use(express.json());
  app.post('/login', authenticationController.loginUser);
  app.use(
    "/graphql",
    graphqlHTTP({
      schema: schema,
      rootValue: root,
      graphiql: false,
    })
  )

  app.listen(4000, () => {
    console.log(`Server running at ${protocol}://${host}:${port}/login`)
    console.log(`Server running at ${protocol}://${host}:${port}/graphql`)
  })
}


