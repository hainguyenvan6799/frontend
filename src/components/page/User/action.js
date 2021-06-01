import {api} from '../role_api';

export const getdata = async (route, data) => {

    // route like '/abc';
    const response = await api.post(`${route}`, data);
    return response;
}

export const add_data = async (route, data) => {
    const response = await api.post(`${route}`, data);
    return response;
}

