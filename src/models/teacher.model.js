import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default {
    getTeachers: async () => {
        await prisma.teacher.findMany();
    },
    getTeacherById: async (id) => {
        await prisma.teacher.findUnique({
            where: {
                id
            }
        });
    },
    updateTeacher: async (id, value) => {
        const { courses_id } = value;
        const data = {}

        if(courses_id) data.courses_id = courses_id

        await prisma.teacher.update({
            where: {
                id
            },
            data: {
                courses_id: courses_id
            }
        }); 
    },
    deleteTeacher: async (id) => {
        await prisma.teacher.delete({
            where: {
                id: id
            }
        });
    }
}