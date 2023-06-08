import gradeModel from "../models/grade.model.js";

const validateGrade = (input) => {
    if (!input.grade || input.grade === '') {
      throw new Error('grade required');
    }

    if(!input.module_id || input.module_id === '') {
        throw new Error('module\'s id required');
    }

    if(!input.student_id || input.student_id === '') {
        throw new Error('student\'s required');
    }
}

export default {
    getGrade: () => gradeModel.getGrade(),
    getGradeById: ({id}) => gradeModel.getGradesById(id),
    createGrade: ({value}) => {
        validateGrade(value)
        gradeModel.createGrade(value)
    },
    updateGrade: async ({id, value}) => {
        const grade = await gradeModel.getGradeById(id)
        if (!grade) { throw new Error(`grade doesn't exist`) }

        const updatedGrade = { ...grade, ...value }
        validateGrade(updatedGrade)
        await gradeModel.updateGrade({id, value})
    },
    deleteGrade: async ({id}) => {
        const grades = await gradeModel.getGradeById(id)
        if (!grades) { throw new Error(`grade doesn't exist`) }
        await gradeModel.deleteGrade(id)
    }
}