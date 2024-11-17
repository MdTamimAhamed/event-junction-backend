import React from 'react';
import { BsFacebook, BsLinkedin } from 'react-icons/bs';
import { AiFillInstagram } from 'react-icons/ai';
import { FaYoutube } from 'react-icons/fa';

function Footer() {
    return (
        <>
            <div className="h-auto bg-primary pb-10">
                <div className="container mx-auto flex items-center justify-between">
                    <div className="container ml-32 flex flex-wrap items-center justify-between pt-40 font-poppins text-lg font-medium text-white">
                        <div>
                            Get in touch!
                            <h1 className="cursor-pointer py-1 font-poppins text-sm font-light text-white text-white/60 hover:underline">
                                Contact
                            </h1>
                            <h1 className="cursor-pointer py-1 font-poppins text-sm font-light text-white text-white/60 hover:underline">
                                Meet with us
                            </h1>
                            <h1 className="cursor-pointer py-1 font-poppins text-sm font-light text-white text-white/60 hover:underline">
                                Help & Support
                            </h1>
                            <h1 className="cursor-pointer py-1 font-poppins text-sm font-light text-white text-white/60 hover:underline">
                                Gallery
                            </h1>
                        </div>
                        <div>
                            About Us
                            <h1 className="cursor-pointer py-1 font-poppins text-sm font-light text-white text-white/60 hover:underline">
                                About
                            </h1>
                            <h1 className="cursor-pointer py-1 font-poppins text-sm font-light text-white text-white/60 hover:underline">
                                Privacy & Policy
                            </h1>
                            <h1 className="cursor-pointer py-1 font-poppins text-sm font-light text-white text-white/60 hover:underline">
                                Terms of Service
                            </h1>
                            <h1 className="cursor-pointer py-1 font-poppins text-sm font-light text-white text-white/60 hover:underline">
                                Daffodil International University
                            </h1>
                        </div>
                        <div>
                            Support
                            <h1 className="cursor-pointer py-1 font-poppins text-sm font-light text-white text-white/60 hover:underline">
                                Help & Support
                            </h1>
                            <h1 className="cursor-pointer py-1 font-poppins text-sm font-light text-white text-white/60 hover:underline">
                                DIU Clubs
                            </h1>
                            <h1 className="cursor-pointer py-1 font-poppins text-sm font-light text-white text-white/60 hover:underline">
                                DIU News
                            </h1>
                            <h1 className="cursor-pointer py-1 font-poppins text-sm font-light text-white text-white/60 hover:underline">
                                FAQ
                            </h1>
                        </div>
                    </div>
                    <div className="mx-32 w-[500px] pt-40 text-right">
                        <p className="pl-[50px] font-poppins text-xl font-bold text-white">
                            Join with us
                        </p>
                        <div className="ml-[90px] flex w-[200px] flex-wrap items-center justify-between pt-[6px]">
                            <BsFacebook className="text-3xl text-secondary" />
                            <AiFillInstagram className="text-3xl text-secondary" />
                            <BsLinkedin className="text-3xl text-secondary" />
                            <FaYoutube className="text-3xl text-secondary" />
                        </div>
                        <p className="container pt-3 font-poppins text-2xl font-bold text-white">
                            DIU <span className="text-secondary">EMS</span>{' '}
                        </p>
                    </div>
                </div>
                <div>
                    <p className="mt-40"></p>
                    <p className="mt-2 text-center font-poppins text-[.7em] font-light tracking-[0.09rem] text-[#dcdde1]">
                        DIU Event Junction | Tamim Ahamed &copy; 2024
                    </p>
                </div>
            </div>
        </>
    );
}

export default Footer;
