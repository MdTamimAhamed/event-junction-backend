import React from 'react';
import { GoStarFill } from 'react-icons/go';
import { MdBookmarkAdded } from 'react-icons/md';
import { BsEyeFill } from 'react-icons/bs';
import { AiFillHeart } from 'react-icons/ai';
import { HiUsers } from 'react-icons/hi';
import { HiShare } from 'react-icons/hi';

function Analytics() {
    return (
        <div>
            <h1 className="text-md mb-4 text-white">Event Analytics</h1>
            <div className="max-w-7xl">
                <div className="grid grid-cols-4 gap-5">
                    <div className="flex basis-[210px] items-center justify-start space-x-10 rounded border-none bg-secondary/20 px-8 py-5 shadow-sm">
                        <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-secondary/20">
                            <GoStarFill className="text-xl text-secondary/80" />
                        </div>
                        <div className="">
                            <p className="text-xl font-bold text-secondary/80">
                                00
                            </p>
                            <p className="text-center font-light text-white/60">
                                Interested
                            </p>
                        </div>
                    </div>

                    <div className="flex basis-[210px] items-center justify-start space-x-10 rounded border-none bg-yellow-400/20 px-8 py-5 shadow-sm">
                        <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-yellow-400/20">
                            <MdBookmarkAdded className="text-xl text-yellow-500/80" />
                        </div>
                        <div className="">
                            <p className="text-xl font-bold text-yellow-500/80">
                                00
                            </p>
                            <p className="text-center font-light text-white/60">
                                Going
                            </p>
                        </div>
                    </div>

                    <div className="flex basis-[210px] items-center justify-start space-x-10 rounded border-none bg-cyan-400/20 px-8 py-5 shadow-sm">
                        <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-cyan-400/20">
                            <BsEyeFill className="text-xl text-cyan-400/80" />
                        </div>
                        <div className="">
                            <p className="text-xl font-bold text-cyan-400/80">
                                00
                            </p>
                            <p className="text-center font-light text-white/60">
                                Views
                            </p>
                        </div>
                    </div>

                    <div className="flex basis-[210px] items-center justify-start space-x-10 rounded border-none bg-violet-400/20 px-8 py-5 shadow-sm">
                        <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-violet-400/20">
                            <AiFillHeart className="text-xl text-violet-400/80" />
                        </div>
                        <div className="">
                            <p className="text-xl font-bold text-violet-400/80">
                                00
                            </p>
                            <p className="text-center font-light text-white/60">
                                Favourite
                            </p>
                        </div>
                    </div>

                    <div className="flex basis-[210px] items-center justify-start space-x-10 rounded border-none bg-blue-400/20 px-8 py-5 shadow-sm">
                        <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-blue-400/20">
                            <HiUsers className="text-xl text-blue-400/80" />
                        </div>
                        <div className="">
                            <p className="text-xl font-bold text-blue-400/80">
                                00
                            </p>
                            <p className="text-center font-light text-white/60">
                                User
                            </p>
                        </div>
                    </div>

                    <div className="flex basis-[210px] items-center justify-start space-x-10 rounded border-none bg-rose-500/20 px-8 py-5 shadow-sm">
                        <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-rose-500/20">
                            <HiShare className="text-xl text-rose-500/80" />
                        </div>
                        <div className="">
                            <p className="text-xl font-bold text-rose-500/80">
                                00
                            </p>
                            <p className="text-center font-light text-white/60">
                                Shares
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Analytics;
