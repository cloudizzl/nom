import Login from "../components/Login";
import React from "react";
import Registration from "../components/Registration";

const LoginPage = () => {
    return (
        <div>
            <div style={{
                marginTop: '30px',
            }}>
                <div className="text-tmp" style={{
                    marginBottom: '10px',
                    color: '#333',
                    fontSize: '16px'
                }}>
                    test user
                </div>
                <div className="text-tmp" style={{
                    marginBottom: '5px',
                    color: '#666',
                    fontSize: '14px'
                }}>
                    username: cloud
                </div>
                <div className="text-tmp" style={{
                    marginBottom: '20px',
                    color: '#666',
                    fontSize: '14px'
                }}>
                    password: 12345678
                </div>
            </div>
            <Login />
            <Registration />

        </div>

    )
}

export default LoginPage;