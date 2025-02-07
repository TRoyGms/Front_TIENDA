import React from 'react';

function Display({children}) {
    return(
        <div className="text-2xl rounded-2xl bg-zinc-300 mx-auto w-[35%] h-[80vh]">
            {children}
        </div>
    );
}

export default Display;
