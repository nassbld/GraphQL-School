import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default {
    getGrade: async () => {
        await prisma.grade.findMany({
            include: { Course: true, Student: true }
        })
    },
    getGradeById: async (id) => {
        await prisma.grade.findUnique({
            where: { id: id }
        })
    },
    createGrade: async (value) => {
        const { grade, course_id, student_id } = value;

        await prisma.grade.create({
            data: {
                grade: grade,
                course_id: course_id,
                student_id: student_id
            },
            include: { Course: true, Student: true }
        });
    },
    updateGrade: async ({id, value}) => {
        const { note, course_id, student_id } = value;
        const data = {}

        if(note) data.note = note
        if(course_id) data.course_id = course_id
        if(student_id) data.student_id = student_id

        await prisma.grade.update({
            where: {
                id: id
            },
            data: data,
            include: { Course: true, Student: true }
        });

    },
    deleteGrade: async (id) => {
        await prisma.grade.delete({
            where: {
                id: id
            }
        })
    }
}