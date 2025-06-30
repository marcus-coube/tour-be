import express, {Router} from "express";
import {PartnerController} from "../../controller/partner/partner.controller";


const partnerRoutes: Router = express.Router();
const partnerController = new PartnerController();

// partnerRoutes.post('/', [partnerController.getPartnerById]);
partnerRoutes.get('/', partnerController.getAllPartners);


export default partnerRoutes;