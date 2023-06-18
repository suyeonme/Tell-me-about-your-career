import { HttpStatusCode } from 'src/types';

export const isSuccessStatusCode = (statusCode: number): boolean => {
    return (
        statusCode >= HttpStatusCode.OK &&
        statusCode < HttpStatusCode.MULTIPLE_CHOICES
    );
};
