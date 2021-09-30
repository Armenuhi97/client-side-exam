export interface TableData {
    id?: number;
    cowId: number;
    healthIndex: number;
    endDate: number;
    minValueDateTime: number;
    type: string;
    animalId: number;
    eventId: number;
    deletable: boolean;
    lactationNumber: number;
    daysInLactation: number;
    ageInDays: number;
    startDateTime: number;
    reportingDateTime: number;
}
export interface SucceedServerResponse {
    message: string
}