import { HttpStatusCode, type StatusMessage } from 'src/types';

export const isSuccessStatusCode = (statusCode: number): boolean => {
    return (
        statusCode >= HttpStatusCode.OK &&
        statusCode < HttpStatusCode.MULTIPLE_CHOICES
    );
};

export const getStatusMessage = (statusCode: number): StatusMessage => {
    return isSuccessStatusCode(statusCode) ? 'success' : 'fail';
};
