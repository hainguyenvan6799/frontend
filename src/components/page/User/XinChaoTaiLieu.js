import axios from 'axios';
import React from 'react'
import { mahoadulieu_postform } from '../security';

function XinChaoTaiLieu() {

    const [email, setEmail ] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const encryptedEmail = mahoadulieu_postform(email);
        const encryptedPassword = mahoadulieu_postform(password);

        const response = await axios({
            url: '/login',
            method: 'post',
            baseURL: 'http://127.0.0.1:8000/api',
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                email: encryptedEmail,
                password: encryptedPassword,
            }
        });

        console.log(response);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div class="form-group">
                    <label for="email">Email address:</label>
                    <input type="email" class="form-control" placeholder="Enter email" id="email" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div class="form-group">
                    <label for="pwd">Password:</label>
                    <input type="password" class="form-control" placeholder="Enter password" id="pwd" onChange={(e) => setPassword(e.target.value)} />
                </div>

                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default XinChaoTaiLieu
