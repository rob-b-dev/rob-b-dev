import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="py-6 w-full absolute bottom-0 left-0 border-t-2 border-gray-300 shadow-md z-50">
            <div className="wrapper">
                <ul className="flex justify-between items-center mb-3">
                    <li className="text-center flex flex-col gap-2">
                        Branding and Marketing by <br /> <span>COMPANY NAME</span>
                    </li>
                    <li className="text-center cursor-pointer">Terms and Conditions</li>
                    <li className="text-center cursor-pointer">Contact Us</li>
                    <li className="text-center cursor-pointer">Report an Issue</li>
                </ul>
                <div className="flex flex-col items-center">
                    <FontAwesomeIcon icon={["far", "copyright"]} className="text-sm mb-1 font-thin" />
                    <p className="text-sm font-thin text-center">{year} My Company - All rights reserved</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
