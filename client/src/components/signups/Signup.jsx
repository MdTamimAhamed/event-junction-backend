import React from 'react';
import { useState } from 'react';
import RoleSelectBtn from '../../Utilities/buttons/RoleSelectBtn';
import SignupForm from '../forms/SignupForm';
import AdminSignupForm from '../forms/AdminSignupForm';

function Signup() {
    const [selectRole, setSelectRole] = useState('');

    return (
        <>
            <div className="flex h-[90vh] flex-col items-center justify-center">
                <div className="mb-6 flex w-[300px] items-center justify-between gap-2 rounded-md bg-foreground p-[5px] shadow-[0px_0px_5px_rgba(0,0,0,0.1)]">
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
                {selectRole === 'admin' ? <AdminSignupForm /> : <SignupForm />}
            </div>

            <footer className="flex justify-center text-xs text-gray">
                <p>DIU EMS | Tamim Ahamed &copy; 2024 </p>
            </footer>
        </>
    );
}

export default Signup;
