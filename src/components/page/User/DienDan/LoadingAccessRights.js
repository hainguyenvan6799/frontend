import axios from 'axios';
import React from 'react'

function LoadingAccessRightsForum(props) {

    const get_access_rights = async () => {
        const response = await axios.post('/api/get-access-rights', {
            resource_id: "chude_" + props.userlogin.malop,
            mauser: props.userlogin.mauser, 
        })
        if(response.data.status)
        {
            props.setAccessRightsForum(response.data.data);
            // return response.data.data;
        }
    }

    React.useEffect(() => {

        get_access_rights();
        return () => {
            props.setAccessRightsForum(null)
        }
    }, [])

    return (
        <div>
            
        </div>
    )
}

export default LoadingAccessRightsForum
