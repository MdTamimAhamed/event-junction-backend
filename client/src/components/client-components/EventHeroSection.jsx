import React from 'react';

function EventHeroSection({ pageName }) {
    return (
        <>
            <div className="h-[50vh] bg-gradient-to-tr from-violet-950 via-blue-950 to-secondary">
                <div className="flex h-full w-full justify-center backdrop-blur-[120px]">
                    <div className="relative mt-[170px]">
                        <h1 className="text-center text-2xl font-medium text-white">
                            {pageName || 'Page Name'}
                        </h1>
                        <div className="absolute left-[50%] top-[40px] h-1 w-14 translate-x-[-50%] bg-secondary"></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EventHeroSection;
