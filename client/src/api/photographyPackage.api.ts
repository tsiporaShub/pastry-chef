import axios, { AxiosResponse } from 'axios';
import { domain } from '../config';
import { PhotographyPackage } from '../interfaces/photographyPackage.interface';
import { isTokenValid } from '../utils/checkToken';

export const getPhotographyPackages = async (): Promise<PhotographyPackage[]> => {
    try {
        const response: AxiosResponse<PhotographyPackage[]> = await axios.get(`${domain}/PhotographyPackage`);
        return response.data;
    } catch (error) {
        console.error('Error in API request for photography packages', error);
        throw error;
    }
};

export const addPhotographyPackage = async (newPackage: PhotographyPackage) => {
    try {
        const token: string | null = isTokenValid();
        if (!isTokenValid()) { return; }

        const response: AxiosResponse<PhotographyPackage> = await axios.post(`${domain}/PhotographyPackage`, newPackage, {
            headers: {
                'token': token,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error in API add photography package', error);
        throw error;
    }
};

export const updatePhotographyPackage = async (id: number, updatedPackage: Partial<PhotographyPackage>) => {
    try {
        const token: string | null = isTokenValid();
        if (!isTokenValid()) { return; }

        const response: AxiosResponse<PhotographyPackage> = await axios.put(`${domain}/PhotographyPackage/${id}`, updatedPackage, {
            headers: {
                'token': token,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error in API update photography package', error);
        throw error;
    }
};

export const deletePhotographyPackage = async (id: number) => {
    try {
        const token: string | null = isTokenValid();
        if (!isTokenValid()) { return; }

        await axios.delete(`${domain}/PhotographyPackage/${id}`, {
            headers: {
                'token': token
            }
        });
    } catch (error) {
        console.error('Error in API delete photography package', error);
        throw error;
    }
};
