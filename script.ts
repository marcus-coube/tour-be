import {PrismaClient, partners, partner_address} from "@prisma/client";

const prisma = new PrismaClient({datasources: { db: { url: process.env.DATABASE_URL } }});

async function main() {
    console.log('main f(x)')
    // const user = await prisma.user.findMany();
    // console.log(user)


    /** juanito **/
    const partner = await prisma.partners.create({
        data: {
            name: "El Juanito",
            logoUrl: "https://example.com/logo.png",
            partner_address : {
                create: {
                    street: "Av. Vicente Ferreira",
                    number: "45",
                    neighborhood: "Jardim Maria Izabel",
                    city: "Marília",
                    state: "SP",
                    zipCode: "17509-180",
                    longitude: -22.220058009980953,
                    latitude: -49.940245774540806
                }
            }
        },
        include: {
            partner_address: true
        }
    });

    console.log(partner);


    /** Kieza **/
    const partner2 = await prisma.partners.create({
        data: {
            name: "Churrascaria Kieza",
            logoUrl: "https://example.com/logo.png",
            partner_address: {
                create: {
                    street: "Av. Tiradentes",
                    number: "1480",
                    neighborhood: "Fragata",
                    city: "Marília",
                    state: "SP",
                    zipCode: "17519-000",
                    longitude: -21.123456,
                    latitude: -49.123456
                }
            }
        },
        include: {
            partner_address: true
        }
    });
    console.log(partner2);
}

main()
    .then(async () => {
        console.log('success');
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error('error', e);
        await prisma.$disconnect()
        process.exit(1)
    })


//    update database from prisma/schema.prisma.ts
//    npx prisma migrate dev --name nome_da_alteracao,

//    generate
//    npx prisma generate

//     Run this file:
//     npx tsx index.ts

//  Reset database
//    prisma migrate reset
//  ou
//  # Dropa o schema
//      npx prisma db push --force-reset
//
//   # Aplica o schema novamente
//      npx prisma db push
