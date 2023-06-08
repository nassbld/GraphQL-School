import { buildSchema } from 'graphql';

export const schema = buildSchema(`

type User {
  id: ID!
  email: String!
  password: String!
  first_name: String!
  last_name: String!
  date_of_birth: String!
  student: Boolean!
  teacher: Boolean!
}

type Student {
  user_id: ID!
  grades_id: [ID]
  absences_courses_id: [ID]
}

type Teacher {
  user_id: ID!
  courses_id: [ID]
}

type Module {
  id: ID!
  name: String!
  teacher_id: ID!
  students_id: [ID]!
}

type Course {
  id: ID!
  module_id: ID!
  date: String!
  room: String!
}

type Grade {
  id: ID!
  grade: Float!
  module_id: ID!
  student_id: ID!
}

input UserInput {
  email: String!
  password: String!
  first_name: String!
  last_name: String!
  date_of_birth: String!
  teacher: Boolean!
  student: Boolean!
}

input StudentInput {
  user_id: ID!
}

input TeacherInput {
  user_id: ID!
}

input ModuleInput {
  name: String!
  teacher_id: ID!
  students_id: [ID]
}

input CourseInput {
  module_id: ID!
  date: String!
  room: String!
}

input GradeInput {
  note: Float!
  module_id: ID!
  student_id: ID!
}

type Query {
  getUsers : [User]
  getUserById(id: ID): User

  getStudents: [Student]
  getStudentById(id: ID): Student
  
  getModules: [Module]
  getModuleById(id: ID): Module

  getCourses: [Course]
  getCourseById(id: ID): Course

  getTeachers: [Teacher]
  getTeacherById(id: ID): Teacher

  getGrade: [Grade]
  getGradesById(id: ID): Grade
}

type Mutation {
  createUser(value: UserInput ) : User
  updateUser(id: ID, value: UserInput) : User
  deleteUser(id: ID) : User

  createStudent(value: StudentInput ) : Student
  updateStudent(id: ID, value: StudentInput) : Student
  deleteStudent(id: ID) : Student
  
  createTeacher(value: TeacherInput ) : Teacher
  updateTeacher(id: ID, value: TeacherInput) : Teacher
  deleteTeacher(id: ID) : Teacher
  
  createModule(value: ModuleInput ) : Module
  updateModule(id: ID, value: ModuleInput) : Module
  deleteModule(id: ID) : Module

  createCourse(value: CourseInput ) : Course
  updateCourse(id: ID, value: CourseInput) : Course
  deleteCourse(id: ID) : Course

  createGrade(value: GradeInput ) : Grade
  updateGrade(id: ID, value: GradeInput) : Grade
  deleteGrade(id: ID) : Grade
}`)