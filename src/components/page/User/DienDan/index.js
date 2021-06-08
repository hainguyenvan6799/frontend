import axios from 'axios'
import React from 'react'
import { userContext } from '../../../../Store';
import DanhSachDienDan from './DanhSachDienDan';
import { mahoadulieu_postform } from '../../security';
import ClipLoader from "react-spinners/ClipLoader";
import { channel1 } from "../../../../Store";
import { channel2 } from "../../../../Store";

function DienDan(props) {
    const [topics, setTopics] = React.useState([]);
    const [topicsPending, setTopicsPending] = React.useState([]);
    const [loading, setLoading] = React.useState(true)
    
    const [user, setUser] = React.useContext(userContext);
    const [allUsers, setAllUsers] = React.useState([]);
    const [notification, setNotification] = React.useState([]);
    var isMounted = true;

    console.log(props.isCreateTopicResource)
    console.log("accessright", props.accessRightsForum);

    const retrieveTopics = async () => {
        const resource_id = `chude_${user.malop}`;
        const encryptedResourceID = mahoadulieu_postform(resource_id)
        const response = await axios.post('/api/topics', { resource_id: encryptedResourceID });
        if (response.data.status) {
            setAllUsers([...response.data.users]);
            return response.data.data;
        }
    }

    const get_username_of_mauser = (checkMauser) => {
        const user = allUsers.find( ({mauser}) => mauser === checkMauser )
        return user.name;
    }

    const addTopic = async (topic, active) => {

//         const response = 
              await axios.post('/api/add-topic', topic, {
            "Content-Type": "multipart/form-data"
        });
//         console.log(response)
//         if (response.data.status) {
//             if(active)
//             {
//                 setTopics((topics) => [...topics, response.data.data]);
//             }
//             else
//             {
//                 setTopicsPending((topics) => [...topics, response.data.data]);
//             }
//         }

    }

    const deleteTopic = async (id, type) => {
//         const response = 
        await axios.delete(`/api/delete-topic/${id}`);
//         if (response.data.status) {

            
//             if(type === "pending")
//             {
//                 const new_data_topics = topicsPending.filter(item => item._id !== id)
//                 setTopicsPending(new_data_topics)
//             }
//             else
//             {
//                 const new_data_topics = topics.filter(item => item._id !== id)
//                 setTopics(new_data_topics);
//             }
//         }
    }

    const editTopic = async (topicEdited, id, active) => {
//         const response = 
        await axios.put(`api/edit-topic/${id}`, topicEdited);
//         console.log(response)
//         if (response.data.status) {
//             if(active)
//             {
//                 const new_data_topics = topics.map(item => item._id === id ? response.data.data : item);
//                 setTopics(new_data_topics)
                
//             }
//             else
//             {
//                 const newData = topics.filter(item => item._id !== id);
//                 setTopics(newData);
//                 setTopicsPending([...topicsPending, response.data.data]);
//             }
            
//         }
    }

    const handleApprove = async (id) => {
        const data = {
            'id': id
        }
//         const result = 
        await axios.post('/api/chap-nhan-chu-de', data);
//         if (result.data.status) {
//             const item = result.data.data;
//             setTopics((topics) => [...topics, item]);

//             const new_data_pending = topicsPending.filter(item => item._id !== id);
//             setTopicsPending(new_data_pending);
//         }
    }

    const CreateANewTopicResource = (malop, nameOfResource) => {
        props.CreateANewTopicResource(malop, nameOfResource);
    }

    React.useEffect(() => {
        const getTopics = async () => {
            const allTopics = await retrieveTopics();
            
            if(isMounted)
            {
                allTopics.map(item => {
                    if(item.active)
                    {
                        setTopics((topics) => [...topics, item]);
                    }
                    else
                    {
                        setTopicsPending((topics) => [...topics, item]);
                    }
                })
                setLoading(false)
            }
            
        }

        getTopics();

        return () => {
            isMounted = false;
            setLoading(false)
        }
    }, [])
    
    React.useEffect(() => {
    channel1.bind("App\\Events\\Notification", (data) => {
      setNotification((noti) => [...noti, data.data]);
    });
  }, []);
    
    React.useEffect(() => {
    channel2.bind("App\\Events\\Topic", (data) => {
      if (data.data.resource_id === `chude_${user.malop}`) {
        if (data.data.isDelete) {
          if (data.data.active) {
            //   const newData = tailieu.filter((item) => item._id !== data.data._id);
            setTopics((topics) =>
              topics.filter((item) => item._id !== data.data._id)
            );
          } else {
            setTopicsPending((topics) =>
              topics.filter((item) => item._id !== data.data._id)
            );
          }
        }

        if (data.data.isAdd === true) {
          let item = data.data;
          item._id = item._id;
          if (item.active === true) {
            setTopics((topics) => [...topics, item]);
          } else {
            setTopicsPending((topics) => [...topics, item]);
          }
        }

        if (data.data.isUpdate === true) {
          if (data.data.active) {
            setTopics((topics) =>
              topics.map((item) =>
                item._id === data.data._id ? data.data : item
              )
            );
          } else {
            setTopics((topics) =>
              topics.filter((item) => item._id !== data.data._id)
            );
            setTopicsPending((topics) => [...topics, data.data]);
          }
        }

        if (data.data.isApprove === true) {
          setTopics((topics) => [...topics, data.data]);
          setTopicsPending((topics) =>
            topics.filter((item) => item._id !== data.data._id)
          );
        }
      }
    });
  }, []);

    return (

        loading ? <ClipLoader /> : props.accessRightsForum.allowRead === true ?
            props.isCreateTopicResource !== null ? props.isCreateTopicResource === true ?
            <div>
                <DanhSachDienDan
                    notification={notification}
                    topics={topics}
                    topicsPending={topicsPending}
                    userlogin={user}
                    handleCreate={addTopic}
                    handleDelete={deleteTopic}
                    handleEdit={editTopic}
                    handleApprove={handleApprove}
                    accessRights={props.accessRightsForum}
                    getUserNameOfUser={get_username_of_mauser}
                />
            </div> : <button className="btn btn-primary" onClick={() => CreateANewTopicResource(props.user.malop, `Chủ đề của lớp ${props.privateInfo.tenlop}`)}>Nhấn vào đây để tạo mới một resource</button> : "...Loading..."
            : props.accessRightsForum.allowRead === false ? <h5>Bạn không được phép truy cập vào trang này.</h5> : "...Loading..."

    )
}

export default DienDan
