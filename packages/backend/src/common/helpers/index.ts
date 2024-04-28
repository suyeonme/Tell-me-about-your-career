import { HttpStatus } from '@nestjs/common';
import { StatusMessage } from '@common/interfaces';

export const getStatusMessage = (statusCode: number): StatusMessage => {
    return isSuccessStatusCode(statusCode)
        ? StatusMessage.SUCCESS
        : StatusMessage.FAIL;
};

const isSuccessStatusCode = (statusCode: number): boolean => {
    return statusCode >= HttpStatus.OK && statusCode < HttpStatus.AMBIGUOUS;
};
