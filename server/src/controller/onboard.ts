import { NextFunction, Request, Response } from "express";
import { prisma } from "../utilis/db.js";

const onboardController = async (req: Request, res: Response,next:NextFunction) => {
  const { userId } = req.params;
  const { bio, nativeLanguage, learningLanguage, location, profilePhoto } =
    req.body;
  try {
    const onboardData = await prisma.onboarding.findUnique({
      where: {
        userId: userId,
      },
    });
    if (onboardData) {
      const updatedOnboard = await prisma.onboarding.update({
        where: {
          userId: userId,
        },
        data: {
          bio,
          nativeLanguage,
          laerningLanguage: learningLanguage,
          location,
          profilePhoto,
        },
      });
       res.status(200).json({ onboard: true });
       return;
    }
    const newOnboard = await prisma.onboarding.create({
      data: {
        userId,
        bio,
        isOnboarded:true,
        nativeLanguage,
        laerningLanguage: learningLanguage,
        location,
        profilePhoto,
      },
    });
     res.status(201).json({ onboard: true, newOnboard });
     return;
  } catch (error) {
    next(error);
  }
};
export default onboardController;
