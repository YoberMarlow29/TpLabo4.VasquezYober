import { Timestamp } from "firebase/firestore";

export interface Usuario {
    uid?: string;
    email?: string;
    mensaje?: string;
    fechaHorario?: Timestamp;
}
