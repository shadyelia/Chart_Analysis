export interface ISchoolData {
    schools: ISchoolDetails[];
    totallessons: number;
}

export interface ISchoolDetails {
    id: string;
    month: string;
    camp: string;
    country: string;
    school: string;
    lessons: number;
}