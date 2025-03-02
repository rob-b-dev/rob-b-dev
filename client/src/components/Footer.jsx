import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer>
            <div className="wrapper mx-auto">
                <ul className="flex justify-between mb-3 w-full max-w-sm mx-auto">
                    <li className="text-center cursor-pointer"><a href="/contactus">Contact us</a></li>
                    <li className="text-center cursor-pointer"><a href='/termsandconditions'>Terms & Conditions</a></li>
                    <li className="text-center cursor-pointer">Report an Issue</li>
                </ul>
                <div className="flex justify-center items-center space-x-2">
                    <FontAwesomeIcon icon={["far", "copyright"]} className="text-sm font-thin" />
                    <p className="text-sm font-thin text-center">{year} My Company - All rights reserved</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
