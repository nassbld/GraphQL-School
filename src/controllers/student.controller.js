import studentModel from '../models/student.model.js';

const validateStudent = (input) => {
    if(!input.user_id || input.user_id === '') {
        throw new Error('user\'s id required');
    }
}

export default {
    getStudents: () => studentModel.getStudents(),
    createStudent: ({value}) => {
        validateStudent(value)
        studentModel.createStudent(value)
    },
    getStudentById: ({id}) => studentModel.getStudentById(id),
    updateStudent: async ({id, value}) => {
        const student = await studentModel.getStudentById(id)
        if (!student) { throw new Error(`Student doesn't exist`) }

        const updatedStudent = { ...student, ...value }
        validateStudent(updatedStudent)
        await studentModel.updateStudent(id, value)
    },
    deleteStudent: async ({id}) => {
        const student = await studentModel.getStudentById(id)
        if (!student) { throw new Error(`Student doesn't exist`) }
        await studentModel.deleteStudent(id)
    }
}