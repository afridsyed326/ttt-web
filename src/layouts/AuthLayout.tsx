import React from "react";

type Props = {
    children: React.ReactNode;
};

const AuthLayout = ({ children }: Props) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
            <div className="hidden sm:block">
                <img
                    className="w-full h-screen object-cover position-top"
                    src="images/auth-bg.png"
                    alt=""
                />
            </div>

            <div className="flex flex-col justify-center gap-3 items-center ">
                <div className="flex justify-center">
                    <img className="w-32" src="images/ttt-logo.png" alt="" />
                </div>
                {children}
            </div>
        </div>
    );
};

export default AuthLayout;
