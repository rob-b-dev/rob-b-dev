import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../hooks/useAuth';
import { showToast } from "../helpers/toast";

const Homepage = () => {
  const { isAuthenticated } = useAuth();

  const navigate = useNavigate()

  const handleNavigation = (path) => {
    if (!isAuthenticated) {
      showToast('Login needed to access', 'error');
      navigate('/login')
    }
    navigate(path)
  }

  return (
    <>
      <div className="mt-70 mb-40">
        <div className="w-3/7 mx-auto py-8 px-10 border bg-[#efefef] rounded-xl shadow-2xl flex justify-center items-center space-x-3">
          <button
            className="cursor-pointer flex items-center space-x-2"
            onClick={() => handleNavigation('/booksessions')}
          >
            <h1 className="font-semibold text-xl text-black">Book a tutoring session</h1>
            <FontAwesomeIcon icon={["fas", "book"]} className="text-2xl" />
          </button>

        </div>

        {/* Grid of 3 */}
        <div className="grid grid-cols-3 m-50 mx-auto gap-20 w-4/6">

          {/* Card 1 */}
          <div className="w-5/6 h-full p-7 border bg-[#ffffff] rounded-3xl shadow-2xl flex flex-col gap-3 justify-center text-center">
            <FontAwesomeIcon icon={["fas", "bolt-lightning"]} className="text-2xl" />
            <p className="text-xl font-semibold">Learn with <br />efficiency</p>
          </div>


          {/* Card 2 */}
          <div className="w-5/6 h-full border bg-[#ffffff] rounded-3xl shadow-2xl flex flex-col gap-3 justify-center text-center">
            <FontAwesomeIcon icon={["fas", "book-open"]} className="text-2xl" />
            <p className="text-xl font-semibold">
              Master any <span className="line-through"><br />topic</span> <br /> subject!
            </p>
          </div>


          {/* Card 3 */}

          <div className="w-5/6 h-full border bg-[#ffffff] rounded-3xl shadow-2xl flex flex-col gap-3 justify-center text-center">
            <FontAwesomeIcon icon={["fas", "graduation-cap"]} className="text-3xl" />
            <p className="text-xl font-semibold">Achieve your <br />goals</p>
          </div>
        </div>
      </div >
    </>
  );
};


export default Homepage