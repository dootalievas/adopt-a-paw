import React from 'react'
import { useGlobalState } from '../context/GlobalStateProvider';


const LoginPage = () => {
    const { name, setName, email, setEmail, handleLogin, handleKeyDown } = useGlobalState();
    return (
        <div className="flex flex-col justify-center gap-12 items-center h-screen min-w-full "
        >
            <img src="/images/adopt-a-paw.png" alt="" className="items-start" />
            <div className="w-full max-w-sm p-4 bg-white shadow-lg rounded-sm border-2">
                <h1 className="text-center text-xl">Enter your name</h1>
                <label htmlFor="name">Name</label>
                <input
                    id='name'
                    className="w-full p-2 my-2 border border-gray-300 rounded-sm"
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="email">Email</label>
                <input
                    id='email'
                    className="w-full p-2 my-2 border border-gray-300 rounded-sm"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button onClick={() => handleLogin(name, email)}
                    className="w-full py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-500 transition duration-200">Continue</button>
            </div>

        </div >


    )
}

export default LoginPage