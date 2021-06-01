import React from 'react'

function MembersOfChat(props) {
    const { persons, isUserCanEdit, handleDelete } = props;

    return (
        <div className="card">
            <div className="card-header">
                <a className="card-link" data-toggle="collapse" href="#collapseOne">
                    Members
                </a>
            </div>
            {persons.map((item, key) => {
                return (
                    <div id="collapseOne" className="collapse show" data-parent="#accordion" key={key}>
                        <div className="card-body">

                            <img src={item.person.avatar !== null ? item.person.avatar : "/img/img_avatar_male.png"} alt="Avatar" style={{ 'verticalAlign': 'middle', 'width': '50px', 'height': '50px', 'borderRadius': '50%' }} />

                            {item.person.first_name + " " + item.person.last_name}
                            {isUserCanEdit ? (<button
                                type="button"
                                className="close"
                                aria-label="Close"
                                name="delete_chat_user"
                                value={item.person.username}
                                onClick={handleDelete}>
                                &times;
                            </button>) : null}
                        </div>
                    </div>

                )

            })}

        </div>

    )
}

export default MembersOfChat

