import React, { Component } from 'react';
import axios from 'axios';
import ErrorsAlert from './ErrorsAlert';
import { giaimadulieu, private_key_chatroom } from '../page/security'
import { Link } from 'react-router-dom';

export default class ImportUsersForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            files: {},
            errors: []
        }
        this.onChangeForm = this.onChangeForm.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
    }

    onChangeForm(event) {
        this.setState({
            files: event.target.files
        })
    }

    onSubmitForm(event) {
        event.preventDefault();
        let file = this.state.files;
        console.log(file);
        let file_extension = file[0].name.split(".")[1];
        if (file_extension !== "xlsx") {
            this.setState({
                errors: "Bạn chỉ được nhập file Excel."
            })
        }
        else {
            let formData = new FormData();
            formData.append('file', file[0]);
            console.log(formData)
            axios.post("/api/user_import", formData).then(response => {
                // response.data.map(item => console.log(item.errorInfo[2]));
                // console.log(response.data.errors);
                const errors = response.data.errors;
                if(errors.length !== 0)
                {
                    this.setState( {
                        errors: errors,
                    })
                }
                console.log(response.data.usersImported);
                const users = response.data.usersImported;
                if (users.length !== 0) {
                    users.map(item => {
                        const username = item.username;
                        const password = giaimadulieu(item.password)

                        var config = {
                            method: 'post',
                            url: 'https://api.chatengine.io/users/',
                            headers: {
                                'PRIVATE-KEY': private_key_chatroom
                            },
                            data: {
                                username: username,
                                secret: password,
                                first_name: username,
                            },
                        };
                        axios(config).then(res => {
                            if (res.status) {
                                axios.post("/api/update-user-chat-id-using-email", {
                                    email: username,
                                    'user_chat_id': res.data.id,
                                }).then(res => alert("Thêm người dùng thành công")).catch(error => console.log(error))
                            }
                        }).catch(err => console.log(err));

                    })
                }
                // this.setState({
                //     files: {},
                //     errors: response.data
                // })
            }).catch(error => console.log(error))
        }
    }

    

    render() {
        console.log(this.state.errors)
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to='/admin/users'>Quay lại danh sách</Link>
                            </li>
                        </ul>
                    </div>
                </nav>

                <form onSubmit={(event) => this.onSubmitForm(event)}>
                    
                    <input type="file" onChange={(event) => this.onChangeForm(event)} />
                    <button className="btn btn-primary">Submit</button>
                    <ErrorsAlert errors={this.state.errors} />
                </form>
            </div>
        )
    }
}
