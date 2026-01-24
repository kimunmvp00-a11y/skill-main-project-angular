import { ProfetionalExp } from "./profetionalExp";
import { Skill } from "./skill";
import { Studie } from "./studie";
import { InterestToGrow } from "./interestToGrow";

export interface Perfil {
    usuario_uid: string;
    fechaCreacion: Date;
    ultimaActualizacion: Date;
    onboardingCompletado: boolean;
    onboardingStep: number;
    skills: Skill[];
    profetionalExps: ProfetionalExp[];
    studies: Studie[];
    interests: InterestToGrow[];
}