import { Router } from "express";
import { createPublication, getPublication, getPublicationById, updatePublicationById, deletePublicationById } from "../controller/publication.js"


const router = Router();

router.get("/", getPublication);
router.get("/:id", getPublicationById);
router.post("/", createPublication);
router.patch("/:id", updatePublicationById);
router.delete("/:id", deletePublicationById);

export default router;
