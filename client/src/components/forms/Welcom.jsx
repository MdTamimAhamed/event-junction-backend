import React from 'react';
import WelcomeSvg from '../../images/welcome_svg.svg';

function Welcom({ bgHeight }) {
    return (
        <>
            <div
                className={`bg-foreground h-auto w-[400px] rounded-br-lg rounded-tr-lg shadow-[0px_5px_25px_rgba(0,0,0,0.1)]`}
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
