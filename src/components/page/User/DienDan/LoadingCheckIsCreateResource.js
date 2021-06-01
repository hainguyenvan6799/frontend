import axios from 'axios';
import React from 'react'

function LoadingCheckIsCreateResource(props) {

    const check_is_create_resource = async () => {
        const response = await axios.post('/api/check-is-create-specific-resource', {resource_id: `chude_${props.userlogin.malop}`})
        if(response.data.status)
        {
            props.setIsCreateTopicResource(response.data.result);
            // return response.data.result;
        } 
    }

    React.useEffect(() => {

        check_is_create_resource();
        return () => {
            props.setIsCreateTopicResource(null)
        }
    }, [])

    return (
        <div>
            
        </div>
    )
}

export default LoadingCheckIsCreateResource
