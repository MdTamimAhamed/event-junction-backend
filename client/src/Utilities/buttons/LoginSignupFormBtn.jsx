import React from 'react';
import Loading from '../../components/reuseables/Loading';

function LoginSignupFormBtn({
    type,
    btnName,
    btnColor,
    hoverColor,
    isLoading,
}) {
    return (
        <>
            <button
                className={`mt-5 flex w-full justify-center gap-3 py-3 ${btnColor == 'secondary' ? 'bg-secondary hover:bg-secondaryHover' : 'bg-black hover:bg-blackHover'} text-white hover:bg-${hoverColor} rounded-md`}
                type={type || 'submit'}
            >
                {btnName}
                {isLoading && <Loading type="spin" size="xs" />}
            </button>
        </>
    );
}

export default LoginSignupFormBtn;
