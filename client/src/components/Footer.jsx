import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Footer() {
    const year = new Date().getFullYear();
    return (
        <div className="flex flex-col h-[250px]"> {/* Ensures the <div> is at least 400px tall, but it can grow if needed. */}
            {/* flex-grow makes <main> expand to push the footer to the bottom when there's little content. */}
            < main className="flex-grow" >
            </main >

            <footer className="py-4 w-full border-t-2 border-gray-300 shadow-md">
                <div className="wrapper mx-auto">
                    <ul className="flex justify-between mb-3 w-full max-w-sm mx-auto">
                        <li className="text-center cursor-pointer">Contact us</li>
                        <li className="text-center cursor-pointer">Terms & Conditions</li>
                        <li className="text-center cursor-pointer">Report an Issue</li>
                    </ul>
                    <div className="flex justify-center items-center space-x-2">
                        <FontAwesomeIcon icon={["far", "copyright"]} className="text-sm font-thin" />
                        <p className="text-sm font-thin text-center">{year} My Company - All rights reserved</p>
                    </div>
                </div>
            </footer>
        </div >
    );
}

export default Footer;
