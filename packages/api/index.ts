import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();
const main = async () => {
    await prisma.user.create({data: {
        fullname: 'Ars Wysocki',
        login: 'awysocki',
    }});
    console.log(await prisma.user.findMany());
}
main();