import React from "react";

function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-6">
            <div className="container mx-auto px-4 text-center">
                <div className="flex flex-col sm:flex-row justify-center mb-4">
                    <a href="#" className="text-gray-400 hover:text-white mx-2">
                        About Us
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white mx-2">
                        Contact
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white mx-2">
                        Privacy Policy
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white mx-2">
                        Terms of Service
                    </a>
                </div>
                <div className="text-gray-400">
                    &copy; {new Date().getFullYear()} Quiz App. All rights
                    reserved.
                </div>
            </div>
        </footer>
    );
}

export default Footer;
