import React from 'react';

function LoginSignupFormBtn({ type, btnName, btnColor, hoverColor }) {
    return (
        <>
            <button
                className={`mt-5 w-full py-3 ${btnColor == 'secondary' ? 'bg-secondary hover:bg-secondaryHover' : 'bg-black hover:bg-blackHover'} text-white hover:bg-${hoverColor} rounded-md`}
                type={type || 'submit'}
            >
                {btnName}
            </button>
        </>
    );
}

export default LoginSignupFormBtn;
