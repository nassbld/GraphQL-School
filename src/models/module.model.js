import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient()

export default {
    getModules: async () => {
        await prisma.module.findMany({
            include: {Teacher: true, courses: true}
        });
    },
    getModuleById: async (id) => {
        await prisma.module.findUnique({
            where: {
                id: id
            }
        });
    },
    createModule: async (value) => {
        const { name, teacher_id, students_id } = value;

        await prisma.module.create({
            data: {
                name: name,
                teacher_id: teacher_id,
                students_id: students_id
            }
        });
    },
    updateModule: async (id, value) => {
        const { name, students_id, teacher_id } = value;
        const data = {}

        if(name) data.name = name
        if(students_id) data.students_id = students_id
        if(teacher_id) data.teacher_id = teacher_id

        await prisma.module.update({
            where: {
                id
            },
            data: data,
            include: {Teacher: true, courses:true}
        });
    },
    deleteModule: async (id) => {
        await prisma.module.delete({
            where: {
                id
            },
            include: {Teacher: true, courses: true}
        });
    }
}