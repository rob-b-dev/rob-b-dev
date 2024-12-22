import React from 'react';

function Homepage() {
  return (
    <>
      <div className="intro-container">
        <div className="intro-desc">
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
          <div className='promotion-info'>
            <img src="src/assets/static/image-promotion.jpg" alt="Image" />
            <p>Join <strong className='blue-text'>936,546</strong> developers building projects,<br /> reviewing code, and helping each other <br />improve.</p>
          </div>
        </div>

        <div className="hero-image-container">
          <img src="src/assets/static/project-images.jpg" alt="Image" />
        </div>
      </div>

      <div className='feedback-container'>
        <div className='feedback'>
          <img className='speechmarks' src="src/assets/static/speech-marks.png" alt="Image" />
          <p>I highly recommend Frontend Mentor. Skip the search <br />for project ideas and dive into ready-made challenges <br />that help you level up as a developer.</p>
          <img className='feedback-portofolio-pic' src="src/assets/static/feedback-left-img.png" alt="Image" />
          <div className='feedback-creator'>
            <span className='creator-name'>Kevin Powell</span>
            <span className='creator-title'>Web Developer & YouTuber</span>
          </div>
        </div>
        <div className='feedback'>
          <img className='speechmarks' src="src/assets/static/speech-marks.png" alt="Image" />
          <p>Frontend Mentor is a win-win. You can sharpen your <br />skills building websites and add finished projects to <br />your portfolio to help land a job!</p>
          <img className='feedback-portofolio-pic' src="src/assets/static/feedback-right-img.jpg" alt="Image" />
          <div className='feedback-creator'>
            <span className='creator-name'>Jessica Chan</span>
            <span className='creator-title'>Web Developer & YouTuber</span>
          </div>
        </div>
      </div>

      <div className='featured-on-container'>
        <div className='featured-on'>
          <h2>as featured on. . .</h2>
          <div className='images'>
            <div><img src="src/assets/static/css-tricks.svg" alt="Image" /></div>
            <div><img src="src/assets/static/stack.svg" alt="Image" /></div>
            <div><img src="src/assets/static/product-hunt.svg" alt="Image" /></div>
          </div>
        </div>
      </div>

      <div className='content-overview'>

        <div className='content-container'>
          <div className='image-container'>
            <img src="src/assets/static/content-flow.webp" alt="Image" />
          </div>
          <div className='content-desc'>
            <div className='emoji'>😈</div>
            <h3>Escape tutorial hell</h3>
            <p>Add projects to your learning journey and put your knowledge to the<br /> test.
              The real learning happens when you start solving real-world<br /> problems yourself.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;
