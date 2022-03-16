export interface ISchoolData {
    school: ISchoolDetails[];
}

export interface ISchoolDetails {
    id: string;
    month: string;
    camp: string;
    country: string;
    school: string;
    lesson: number;
}