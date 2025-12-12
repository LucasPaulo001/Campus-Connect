import { Response } from "express";
import { CustomRequest } from "../../middlewares/AuthGuard.js";
import BecomeTeacherService from "./teacher.service.js";

export async function BecomeTeacherController(
  req: CustomRequest,
  res: Response
) {
  try {

    const userId = req.user._id;
    const { avatarUrl, area, expertise, socialLinks } = req.body;

    const result = await BecomeTeacherService({ userId, avatarUrl, area, expertise, socialLinks });

    res.status(201).json(result);

  } catch (err: any) {
    res.status(500).json(err);
  }
}
