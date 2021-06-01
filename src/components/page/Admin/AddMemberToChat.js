import React from 'react'

function AddMemberToChat(props) {
    const { isUserCanEdit, searchResult, handleKeyUp, addMember } = props;
    if (isUserCanEdit) {
        return (
            <div className="card">
                <div className="card-header">
                    <a className="card-link" data-toggle="collapse" href="#collapseTwo">
                        Add Members
                </a>
                </div>

                <div id="collapseTwo" className="collapse show" data-parent="#accordion">
                    <div className="card-body">

                        <div className="container">
                            <input className="form-control" id="listSearch" type="text"
                                onKeyUp={handleKeyUp} placeholder="You can add members..."
                                autoComplete="off" />
                            <br />
                            <ul className="list-group" id="search_info">
                                {/* result search will be displayed here */}
                                {searchResult.length === 0 ? "" : searchResult.map((item, key) => {
                                    return (
                                        <div key={key}>
                                            <li className="list-group-item">{item}
                                                <button type="button"
                                                    name="test"
                                                    value={item}
                                                    onClick={addMember}
                                                    className="btn btn-primary btn-sm addMember"
                                                    style={{ "float": "right", "marginTop": "-10px" }}>+
                                </button>
                                            </li>

                                        </div>
                                    )
                                })}
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
    else
    {
        return "";
    }

    
}

export default AddMemberToChat
