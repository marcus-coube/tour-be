import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.findMany();
    console.log(user)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })


//    "prisma-migration": "npx prisma migrate dev --name nome_da_alteracao",
//     "prisma-generate": "npx prisma generate"