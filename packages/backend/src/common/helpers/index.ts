import { HttpStatus } from '@nestjs/common';
import { StatusMessage } from '@common/interfaces';

const isSuccessStatusCode = (statusCode: number): boolean => {
    return statusCode >= HttpStatus.OK && statusCode < HttpStatus.AMBIGUOUS;
};

export const getStatusMessage = (statusCode: number): StatusMessage => {
    return isSuccessStatusCode(statusCode) ? StatusMessage.SUCCESS : StatusMessage.FAIL;
};
