import {Request, Response} from 'express';
import {PartnerService} from '../../../core/services/partner.service';

export class PartnerController {
    private partnerService: PartnerService;

    constructor() {
        this.partnerService = new PartnerService();

        // Bind manual dos métodos
        this.getAllPartners = this.getAllPartners.bind(this);
        this.getPartnerById = this.getPartnerById.bind(this);
    }

    async getAllPartners(req: Request, res: Response) {
        try {
            const partners = await this.partnerService.getAllPartners();
            res.json(partners);
        } catch (error: unknown) {
            const errorMessage =
                error instanceof Error ? error.message : 'Erro desconhecido';

            res.status(500).json({
                error: 'Erro ao buscar parceiros',
                message: errorMessage
            });
        }
    }

    async getPartnerById(req: Request, res: Response) {
        try {
            const {id} = req.params;
            const partner = await this.partnerService.getPartnerById(id);

            if (!partner) {
                return res.status(404).json({error: 'Parceiro não encontrado'});
            }

            res.json(partner);
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : 'Erro desconhecido';

            res.status(500).json({
                error: 'Erro ao buscar parceiro',
                message: errorMessage
            });
        }
    }
}