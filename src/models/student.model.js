import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default {
    getStudents: async () => {
        await prisma.student.findMany();
    },
    getStudentById: async (id) => {
        await prisma.student.findUnique({
            where: {
                id: id
            }
        });
    },
    updateStudent: async (id, value) => {
        const { absences_courses_id, grades_id, user_id } = value;
        const data = {}

        if(absences_courses_id) data.absences_courses_id = absences_courses_id
        if(grades_id) data.grades_id = grades_id
        if(user_id) data.user_id = user_id
    
        await prisma.student.update({
            where: {
                id: id
            },
            data: data
        });
    },
    deleteStudent: async (id) => {
        await prisma.student.delete({
            where: {
                id: id
            }
        });
    }
}