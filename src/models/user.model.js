import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default {
    getUsers: async () => {
        await prisma.user.findMany();
    },
    getUserById: async (id) => {
        await prisma.user.findUnique({
            where: {
                id: id,
            },
        });
    },
    getUserByEmail: async ({email}) => {
        await prisma.user.findUnique({
            where: {
                email: email
            },
        });
    },
    createUser: async (value) => {
        await prisma.user.create({
            data: value
        });
    },
    updateUser: async (id, value) => {
        await prisma.user.update({
            where: {
                id: id
            },
            data: value,
            include: {students: true, teachers: true}
        });
    },
    deleteUser: async (id) => {
        await prisma.user.delete({
            where: {
                id: id
            }
        });
    }
}