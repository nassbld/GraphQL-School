import course_teacherModel from '../models/module.model.js'
import moduleModel from "../models/module.model.js";

const validateModule = (input) => {
    if (!input.name || input.name === '') {
        throw new Error('name required');
    }

    if (!input.teacher_id || input.teacher_id === '') {
        throw new Error('teacher\'s required');
    }
}

export default {
    getModules: () => moduleModel.getModules(),
    getModuleById: ({id}) => moduleModel.getModuleById(),
    createModule: async ({value}) => {
        validateModule(value)
        await moduleModel.createModule(value)
    },
    updateModule: async ({id, value}) => {
        const module = await moduleModel.getModuleById(id)
        if (!module) { throw new Error(`Module with given id doesn't exist.`) }

        const updatedModule = { ...module, ...value }
        validateModule(updatedModule)
        await moduleModel.updateModule(id, value)
    },
    deleteModule: async ({id}) => {
        const module = await moduleModel.getModuleById(id)
        if (!module) { throw new Error(`Module with given id doesn't exist.`) }
        await moduleModel.deleteModule(id)
    }
}