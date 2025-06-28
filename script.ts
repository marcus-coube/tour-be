import {PrismaClient, partners, partner_address} from "@prisma/client";

const prisma = new PrismaClient()

async function main() {
    // const user = await prisma.user.findMany();
    // console.log(user)


    const partnerAddress = await prisma.partner_address.create({
        data: {
            street: "Av. Vicente Ferreira",
            number: "45",
            neighborhood: "Jardim Maria Izabel",
            city: "Marília",
            state: "SP",
            zipCode: "17509-180",
            longitude: -22.220058009980953,
            latitude: -49.940245774540806
        }
    });

    const partner = await prisma.partners.create({
        data: {
            name: "El Juanito",
            logoUrl: "https://example.com/logo.png",
            address_id: partnerAddress.id
        }
    });
    console.log(partner);
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
//    "prisma-generate": "npx prisma generate"
//     run "npx tsx index.ts"