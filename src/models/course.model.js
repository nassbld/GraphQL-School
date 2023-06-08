import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default {
    getCourses: async () => {
        await prisma.course.findMany({
            include: { grades: true }
        })
    },
    getCourseById: async (id) => {
        await prisma.course.findUnique({
            where: { id: id },
        })
    },
    createCourse: async (value) => {
        console.log(value)
        await prisma.course.create({
            data: value,
            include: { grades: true }
        });
    },
    updateCourse: async (id, value) => {
        await prisma.course.update({
            where: {
                id: id
            },
            data: value,
            include: { grades: true }
        });
    },
    deleteCourse: async (id) => {
        await prisma.course.delete({
            where: {
                id: id
            },
            include: { grades: true }
        })
    }
}