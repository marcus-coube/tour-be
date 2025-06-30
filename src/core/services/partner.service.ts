import {PrismaClient, partners} from '@prisma/client';

export class PartnerService {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient({
            datasources: {
                db: {
                    url: process.env.DATABASE_URL
                }
            }
        });
    }

    async getAllPartners(): Promise<partners[]> {
        try {
            return await this.prisma.partners.findMany({
                include: {
                    partner_address: true
                }
            });
        } catch (error) {
            throw new Error('Erro ao buscar parceiros');
        }
    }

    async getPartnerById(id: string): Promise<partners | null> {
        try {
            return await this.prisma.partners.findUnique({
                where: {id},
                include: {
                    partner_address: true
                }
            });
        } catch (error) {
            throw new Error('Erro ao buscar parceiro');
        }
    }
}