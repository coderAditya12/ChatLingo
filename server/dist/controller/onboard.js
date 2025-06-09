var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { prisma } from "../utilis/db.js";
const onboardController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const { bio, nativeLanguage, learningLanguage, location, profilePhoto } = req.body;
    try {
        const onboardData = yield prisma.onboarding.findUnique({
            where: {
                userId: userId,
            },
        });
        if (onboardData) {
            const updatedOnboard = yield prisma.onboarding.update({
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
        const newOnboard = yield prisma.onboarding.create({
            data: {
                userId,
                bio,
                isOnboarded: true,
                nativeLanguage,
                laerningLanguage: learningLanguage,
                location,
                profilePhoto,
            },
        });
        res.status(201).json({ onboard: true, newOnboard });
        return;
    }
    catch (error) {
        next(error);
    }
});
export default onboardController;
