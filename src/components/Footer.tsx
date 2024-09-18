import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-[#313131] text-orange-500 py-4 ">
            <div className="container mx-auto text-center">
                <p className="text-lg">
                    &copy; {new Date().getFullYear()} Adopt a Paw. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
