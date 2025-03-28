import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { showToast } from "../helpers/toast";

const Homepage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    if (!isAuthenticated) {
      showToast("Login needed to access", "error");
      navigate("/login");
    }
    navigate(path);
  };

  return (
    <>
      <div className="mt-50 flex flex-col justify-center">
        <div className="text-center space-y-8">
          <h2 className="font-extrabold text-4xl font-title-secondary">
            Personalized Learning, Exceptional Results
          </h2>
          <div className="flex flex-col items-center space-y-14">
            <p className="text-xl">
              Connect with expert tutors in any subject and transform the way
              you learn. <br />
              Flexible scheduling, personalized sessions, and proven results.
            </p>

            <button
              className="button button__secondary rounded-md w-1/4 flex items-center justify-center gap-4 border-none"
              onClick={() => handleNavigation("/booksessions")}
            >
              Book a tutoring session
              <FontAwesomeIcon icon={["fas", "greater-than"]} className="text-xs" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-30 card-container gap-10">
        <div className="card">
          <div className="p-6 w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <FontAwesomeIcon icon={["fas", "bolt"]} className="text-xl text-yellow-500" />
          </div>
          <h3 className="font-bold text-xl font-title-secondary text-yellow-500">
            Learn with efficiency
          </h3>
          <p>
            Optimize your learning with our data-driven approach. Targeted
            sessions focus on what you need most.
          </p>
        </div>

        <div className="card">
          <div className="p-6 w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <FontAwesomeIcon icon={["fas", "book-open-reader"]} className="text-xl text-[#3e84f7]" />
          </div>
          <h3 className="font-bold text-xl font-title-secondary text-[#3e84f7]">
            Master any subject
          </h3>
          <p>
            From mathematics to languages, sciences to arts—our tutors are
            experts in their fields.
          </p>
        </div>

        <div className="card">
          <div className="p-6 w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <FontAwesomeIcon icon={["fas", "graduation-cap"]} className="text-xl text-black" />
          </div>
          <h3 className="font-bold text-xl font-title-secondary">
            Achieve your goals
          </h3>
          <p>
            Set clear academic targets and work strategically to exceed them
            with personalized guidance.
          </p>
        </div>
      </div>
    </>
  );
};

export default Homepage;
