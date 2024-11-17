import React from 'react';

function FormInputHandler({ state, setState, type, name, placeholder }) {
    return (
        <>
            <input
                className="bg-background my-[6px] w-full rounded-md px-3 py-3 text-white caret-white outline-1 outline-primary"
                value={state}
                onChange={(e) => setState(e.target.value)}
                type={type || 'text'}
                placeholder={placeholder}
                name={name}
            />
        </>
    );
}

export default FormInputHandler;
