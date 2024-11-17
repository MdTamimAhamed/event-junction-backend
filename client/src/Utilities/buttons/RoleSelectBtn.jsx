import React from 'react';

function RoleSelectBtn({ type, btnName, role, state, setState }) {
    const roleSelectHandler = () => {
        setState(role);
    };

    return (
        <>
            <button
                className={` ${
                    state === 'admin'
                        ? role === 'user'
                            ? 'text-white'
                            : 'bg-background text-white'
                        : role === 'admin'
                          ? 'text-white'
                          : 'bg-background text-white'
                } w-full py-1 text-sm font-medium`}
                type={type || 'button'}
                onClick={roleSelectHandler}
            >
                {btnName}
            </button>
        </>
    );
}

export default RoleSelectBtn;
