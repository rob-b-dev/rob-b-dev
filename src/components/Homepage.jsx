import React from 'react';

function Homepage() {
  return (
    <>
      <div className="container">
        {/* Content section on the left */}
        <div className="content">
          <h2>Improve your coding <br />skills by building realistic <br />projects</h2>
          <p>
            Our professionally designed challenges help you gain hands-on <br /> experience writing HTML, CSS, and JavaScript. 
            We create the  <br />designs so you can focus on the code and see your skills <br /> skyrocket!
          </p>
          <button className="cta-button-red">
            Log in with Github
            <div>
              <img src="src/assets/static/github.jpg" alt="Github" />
            </div>
          </button>
          <div className='border-container'>
            <img src="src/assets/static/image-promotion.jpg" alt="Picture" />
            <p>Join <strong className='blue-text'>936,546</strong> developers building projects,<br /> reviewing code, and helping each other <br />improve.</p>
          </div>
        </div>

        <div className="image-container">
          <img src="src/assets/static/project-images.jpg" alt="Picture"/>
        </div>
      
      </div>
    </>
  );
}

export default Homepage;
