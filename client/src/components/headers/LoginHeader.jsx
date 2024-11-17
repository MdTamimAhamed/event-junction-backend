import React from 'react';
import { Link } from 'react-router-dom';

function LoginHeader() {
    return (
        <>
            <nav className="bg-primary p-6">
                <div className="container mx-auto flex items-center justify-between">
                    <div className="text-lg font-bold text-white">
                        DIU
                        <span className="font-bold text-secondary">EMS</span>
                    </div>
                    <div className="flex items-center justify-between space-x-10 text-white">
                        <Link to="/home">
                            <p className="border-secondary hover:border-b-[1px]">
                                Home
                            </p>
                        </Link>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default LoginHeader;
