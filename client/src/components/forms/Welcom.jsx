import React from 'react';

function Welcom({ bgHeight }) {
    return (
        <>
            <div
                className={`h-auto w-[400px] rounded-br-lg rounded-tr-lg bg-foreground shadow-[0px_5px_25px_rgba(0,0,0,0.1)]`}
            >
                <div className="relative flex h-full flex-col items-center justify-center">
                    <h1 className="text-white">Welcome to</h1>
                    <h1 className="text-lg text-white">
                        DIU
                        <span className="font-comforter text-secondary">
                            {' '}
                            Event Management System
                        </span>{' '}
                    </h1>
                </div>
            </div>
        </>
    );
}

export default Welcom;
