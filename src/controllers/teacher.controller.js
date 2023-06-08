import teacherModel from '../models/teacher.model.js';

const validateTeacher = (input) => {
    if (!input.user_id || input.user_id === '') {
      throw new Error('user\'s id required');
    }
}

export default {
    getTeachers: () => teacherModel.getTeachers(),
    getTeacherById: ({id}) => teacherModel.getTeacherById(id),
    createTeacher: ({value}) => { 
        validateTeacher(value)
        teacherModel.createTeacher(value)
    },
    updateTeacher: async ({id, value}) => {
        const teacher = await teacherModel.getTeacherById(id)
        if (!teacher) { throw new Error(`Teacher doesn't exist`) }

        const updatedTeacher = { ...teacher, ...value }
        validateTeacher(updatedTeacher)
        await teacherModel.updateTeacher(id, value)
    },
    deleteTeacher: async ({id}) => {
        const teacher = await teacherModel.getTeacherById(id)
        if (!teacher) { throw new Error(`Teacher doesn't exist`) }
        await teacherModel.deleteTeacher(id)
    }
}