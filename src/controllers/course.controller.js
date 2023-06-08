import courseModel from '../models/course.model.js';

const validateCourse = (input) => {
    if (!input.module || input.module === '') {
        throw new Error('module required');
    }

    if (!input.date || input.date === '') {
        throw new Error('date required');
    }

    if (!input.room || input.room === '') {
        throw new Error('room required');
    }
}

export default {
    getCourses: () => courseModel.getCourses(),
    getCourseById: ({ id }) => courseModel.getCourseById(id),
    createCourse: ({ value }) => {
        validateCourse(value)
        courseModel.createCourse(value)
    },
    updateCourse: async ({ id, value }) => {
        const course = await courseModel.getCourseById(id)
        if (!course) { throw new Error(`This course doesn't exist`) }

        const updatedCourse = { ...course, ...value }
        validateCourse(updatedCourse)
        await courseModel.updateCourse(id, value)
    },
    deleteCourse: async ({ id }) => {
        const course = await courseModel.getCourseById(id)
        if (!course) { throw new Error(`This course doesn't exist`) }
        await courseModel.deleteCourse(id)
    }
}