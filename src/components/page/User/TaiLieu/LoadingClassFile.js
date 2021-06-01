import React from 'react'

import { check_is_create_resource, check_access_rights } from '../check';

function LoadingClassFile(props) {
    const { malop, mauser } = props.userlogin;
    const { setIsCreateResource, setAccessRights } = props;
    const resource_id = `tl_${malop}`;

    const get_is_create_resource = async () => {
        const response = await check_is_create_resource(resource_id);

        if(response.data.status)
        {
            setIsCreateResource(response.data.result);
        }
    }

    const get_access_rights = async () => {
        
        const response = await check_access_rights(resource_id, mauser);
        
        if(response.data.status)
        {
            setAccessRights(response.data.data);
        }
    }
    
    React.useEffect(() => {
        get_is_create_resource();
        get_access_rights()
        return () => {
            setIsCreateResource(false)
            setAccessRights({})
        }
    }, [])

    return (
        <div>
            
        </div>
    )
}

export default LoadingClassFile
