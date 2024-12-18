import api from '../axios';
import { API_ENDPOINTS } from './endpoints';
import {
    ApiResponse,
} from './types';

export const commonApi = {
    plan: () =>
        api.get<ApiResponse<{ user: User; token: string }>>(
            API_ENDPOINTS.BASIC.PLAN,
        ),
    feedback: (data) =>
        api.post<ApiResponse>(
            API_ENDPOINTS.BASIC.FEEDBACK, data
        ),

};
