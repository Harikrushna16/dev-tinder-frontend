import React, { useState } from 'react'
import axios from 'axios'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_API_URL}/auth/login`,
                {
                    email,
                    password
                },
                { withCredentials: true }
            );
            console.log(response.data);
        } catch (error) {
            console.log(error.response.data.message);
        }
    }
    return (
        <div className='flex items-center justify-center min-h-[calc(100vh-132px)]'>
            <fieldset className="fieldset bg-base-300 border-base-300 rounded-box w-xs border p-4">
                <h1 className="text-2xl font-bold mb-5">Login</h1>

                <label className="label">Email</label>
                <input type="email" className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

                <label className="label">Password</label>
                <input type="password" className="input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <button className="btn btn-neutral mt-5" onClick={handleLogin}>Login</button>
            </fieldset>
        </div>
    )
}

export default Login