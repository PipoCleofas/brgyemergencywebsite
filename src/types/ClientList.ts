export interface Client {
    UserID: number;
    Username: string;
    FirstName: string;
    MiddleName: string;
    LastName: string;
    Birthday: string;
    Status: string;
    photo1_url?: string;
    photo2_url?: string;
    photo3_url?: string;
}