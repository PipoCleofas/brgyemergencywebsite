import axios from "axios";
import { handleAxiosError } from "../../utils/handleAxiosError";

export const updateStatusRequest = async (status: string, userId: number) => {
    try {
        const response = await axios.put(`https://express-production-ac91.up.railway.app/servicerequest/updateRequest/${status}`, {
            UserID: userId
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log('Status updated successfully:', response.data);
    } catch (error) {
        handleAxiosError(error);
    }
};
