import React from 'react';

const ToolTip = ({ text }) => {
    return (
        <>
            <div
                className={`relative w-[200px] rounded bg-black p-2 text-[0.7em] text-white shadow-md`}
            >
                <div className="absolute bottom-[-8%] right-5 h-2 w-2 rotate-45 bg-black"></div>
                <p>{text}</p>
                <p>use this '000-202' for testing purpose!</p>
            </div>
        </>
    );
};

export default ToolTip;
