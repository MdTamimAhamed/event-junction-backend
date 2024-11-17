import React from 'react';
import ReactLoading from 'react-loading';

const Loading = ({ type, size }) => {
    let loaderSize;

    switch (size) {
        case 'xs':
            loaderSize = 20;
            break;
        case 'sm':
            loaderSize = 40;
            break;
        case 'md':
            loaderSize = 60;
            break;
        case 'lg':
            loaderSize = 80;
            break;
        default:
            loaderSize = 40;
            break;
    }

    return (
        <ReactLoading
            className="flex items-center justify-start"
            type={type}
            height={loaderSize}
            width={loaderSize}
        />
    );
};

export default Loading;
