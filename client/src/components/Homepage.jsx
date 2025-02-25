import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Homepage = () => {
  return (
    <div className="section">
      <div className="w-2/6 mx-auto p-7 border bg-[#efefef] rounded-xl shadow-2xl flex justify-center items-center space-x-3">
        <h1 className="font-semibold text-xl">Book a tutoring session</h1>
        <button className="cursor-pointer flex items-center">
          <FontAwesomeIcon icon={["fas", "book"]} className="text-2xl" />
        </button>
      </div>

      {/* Grid of 3 */}
      <div className="grid grid-cols-3 m-50 gap-40 mx-auto w-5/6">

        {/* Card 1 */}
        <div className="w-full h-full py-10 border bg-[#ffffff] rounded-3xl shadow-2xl flex flex-col gap-3 justify-center text-center">
          <FontAwesomeIcon icon={["fas", "bolt-lightning"]} className="text-3xl" />
          <h2 className="text-2xl font-semibold">Learn with <br />efficiency</h2>
        </div>


        {/* Card 2 */}
        <div className="w-full h-full border bg-[#ffffff] rounded-3xl shadow-2xl flex flex-col gap-3 justify-center text-center">
          <FontAwesomeIcon icon={["fas", "book-open"]} className="text-3xl" />
          <h2 className="text-2xl font-semibold">
            Master any <span className="line-through"><br />topic</span> <br /> subject!
          </h2>
        </div>


        {/* Card 3 */}

        <div className="w-full h-full border bg-[#ffffff] rounded-3xl shadow-2xl flex flex-col gap-3 justify-center text-center">
          <FontAwesomeIcon icon={["fas", "graduation-cap"]} className="text-3xl" />
          <h2 className="text-2xl font-semibold">Achieve your <br />goals</h2>
        </div>
      </div>



    </div >



  );
};


export default Homepage