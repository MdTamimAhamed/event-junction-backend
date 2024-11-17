import React from 'react';

function InputHandlerSm({ state, setState, type, name, placeholder }) {
    return (
        <>
            <input
                className="bg-background my-[6px] w-full rounded-md border-none px-3 py-[4px] outline-none focus:outline-white/10"
                value={state}
                onChange={(e) => setState(e.target.value)}
                type={type || 'text'}
                placeholder={placeholder}
                name={name}
            />
        </>
    );
}

export default InputHandlerSm;
