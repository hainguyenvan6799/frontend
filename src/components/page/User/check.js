import axios from "axios";

export const check_is_create_resource = async (resource_id) => {
    const data = {
        resource_id: resource_id
    }
    const response = await axios.post('/api/check-is-create-specific-resource', data);
    return response;
}

export const check_access_rights = async (resource_id, mauser) => {
    const data = {
        resource_id: resource_id,
        mauser: mauser
    }
    const response = await axios.post('/api/get-access-rights', data);
    return response;
}