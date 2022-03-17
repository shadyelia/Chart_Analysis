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

export interface IChartData {
    id: number;
    school: string;
    lessons: number[];
    totalLessons: number;
    checked: boolean;
    color: string;
}

export interface IChartDataSet {
    label?: string;
    data?: number[];
    borderColor?: string;
}