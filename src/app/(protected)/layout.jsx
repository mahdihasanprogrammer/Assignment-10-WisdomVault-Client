import React from 'react';

const ProtectedLayout = ({children}) => {
    return (
        <div>
            {children}
        </div>
    );
};

export default ProtectedLayout;