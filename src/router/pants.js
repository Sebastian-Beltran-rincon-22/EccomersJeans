import { Router } from "express";
import { createPants, getPantsById, getPants, updatePantsById, updateCounterForId, deletePantsById } from "../controller/pants.js";

const router = Router();

router.get("/", getPants);
router.get("/:id", getPantsById)
router.post("/", createPants)
router.patch("/Counter/:id", updateCounterForId)
router.patch("/:id", updatePantsById)
router.delete("/:id", deletePantsById)

export default router

