import { Timestamp } from "firebase/firestore";

export interface Usuario {
    uid?: string; // asumiendo que el UID sigue el formato proporcionado
    email?: string;
    mensaje?: string;
    fechaHorario?: Timestamp;
}