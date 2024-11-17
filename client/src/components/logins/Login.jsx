import React, { useState } from 'react';
import LoginForm from '../forms/LoginForm';
import AdminLoginForm from '../forms/AdminLoginForm';
import RoleSelectBtn from '../../Utilities/buttons/RoleSelectBtn';
import LoginHeader from '../headers/LoginHeader';

function Login() {
    const [selectRole, setSelectRole] = useState('');

    return (
        <>
            <LoginHeader />

            <div className="flex h-[85vh] flex-col items-center justify-center">
                <div className="mb-6 flex w-[300px] items-center justify-between gap-2 rounded-md bg-foreground p-2 shadow-[0px_0px_5px_rgba(0,0,0,0.1)]">
                    <RoleSelectBtn
                        type="button"
                        role="user"
                        btnName="User"
                        state={selectRole}
                        setState={setSelectRole}
                    />

                    <RoleSelectBtn
                        type="button"
                        role="admin"
                        btnName="Admin"
                        state={selectRole}
                        setState={setSelectRole}
                    />
                </div>
                {selectRole === 'admin' ? <AdminLoginForm /> : <LoginForm />}
            </div>

            <footer className="flex justify-center text-xs text-white/30">
                <p>DIU Event Junction &copy; 2024 | All right reserved.</p>
            </footer>
        </>
    );
}

export default Login;
