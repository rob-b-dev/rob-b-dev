import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Homepage() {
  return (
    <>
      {/* Introduction */}
      <div className='section flex justify-center'>
        <div className="grid grid--columns-2">
          <div className="space-y-8">
            <h2 className="header-2xl text-blue text-secondary">Improve your coding skills <br />by building realistic <br />projects</h2>
            <p className='text-lg text-grey'>
              Our professionally designed challenges help you gain hands-on <br /> experience writing HTML, CSS, and JavaScript.
              We create the  <br />designs so you can focus on the code and see your skills <br /> skyrocket!
            </p>
            <button className="button button__secondary">
              <span className='text-secondary text-sm'>Log in with Github</span>
              <FontAwesomeIcon icon={['fab', 'github']} size="2xl" />
            </button>
            <div className='card space-x-8 inline-flex items-center'>
              <img src="src/assets/static/image-promotion.jpg" width="200px" alt="Image" />
              <p className='text-sm'>Join <strong className='strong'>936,546</strong> developers building projects,<br /> reviewing code, and helping each other <br />improve.</p>
            </div>
          </div>
          <div>
            <img src="src/assets/static/project-images.png" width="700px" alt="Image" />
          </div>
        </div>
      </div>

      {/* Feedback */}
      <div className="section flex justify-center">
        <div className="grid grid--columns-2 grid--justify-center">
          <div className='text-center space-y-8 card' style={{ height: '457px', width: '585px' }}>
            <FontAwesomeIcon icon={['fas', 'quote-left']} size="4x" color='#d3d3d3' />
            <p className='text-lg'>I highly recommend Frontend Mentor. Skip the search <br />for project ideas and dive into ready-made challenges <br />that help you level up as a developer.</p>
            <img style={{ width: '80px', height: '80px', borderRadius: '50%' }} src="src/assets/static/feedback-left-img.png" alt="Image" />
            <div className="space-y-2">
              <p className='text-md strong upper'>Kevin Powell</p>
              <p className='text-grey'>Web Developer & YouTuber</p>
            </div>
          </div>
          <div className='text-center space-y-8 card' style={{ height: '457px', width: '585px' }}>
            <FontAwesomeIcon icon={['fas', 'quote-left']} size="4x" color='#d3d3d3' />
            <p className='text-lg'>Frontend Mentor is a win-win. You can sharpen your <br />skills building websites and add finished projects to <br />your portfolio to help land a job!</p>
            <img style={{ width: '80px', height: '80px', borderRadius: '50%' }} src="src/assets/static/feedback-right-img.jpg" alt="Image" />
            <div className="space-y-2">
              <p className='text-md strong upper'>Jessica Chan</p>
              <p className='text-grey'>Web Developer & YouTuber</p>
            </div>
          </div>
        </div>
      </div>


      {/* As Featured on intro */}
      <div className='section flex justify-center'>
        <div className='space-y-8'>
          <h2 className="upper header-sm bold--full text-center">as featured on. . .</h2>
          <div className='grid grid--columns-3'>
            <div className='flex justify-center items-center card' style={{ height: '112px', width: '390px' }}>
              <img height='30px' width='200px' src="src/assets/static/css-tricks.svg" alt="Image" className="homepage__featured-on__image" /></div>
            <div className='flex justify-center items-center card'><img height='40px' width='200px' src="src/assets/static/stack.svg" alt="Image" className="homepage__featured-on__image" /></div>
            <div className='flex justify-center items-center card'><img height='50px' width='210px' src="src/assets/static/product-hunt.svg" alt="Image" className="homepage__featured-on__image" /></div>
          </div>
        </div>
      </div>

      {/* As Featured on content */}
      <div className='section'>
        <div className='flex justify-center'>
          <div className='grid grid--columns-2 items-center override-gap-80'>
            <div>
              <img height='516px' width='560px' src="src/assets/static/asfeatured-1.webp" alt="Image" className="homepage__image" />
            </div>
            <div className='space-y-8'>
              <div className='emoji'>😈</div>
              <h3 className='header-xl'>Escape tutorial hell</h3>
              <p className='text-md text-grey'>Add projects to your learning journey and put your knowledge to the<br /> test. The real learning happens when you start solving real-world<br /> problems yourself.</p>
            </div>
          </div>
        </div>

        <div className='flex justify-center'>
          <div className='grid grid--columns-2 items-center override-gap-80'>
            <div className='space-y-8'>
              <div className='emoji'>🤩</div>
              <h3 className='header-xl'>Build portfolio-worthy<br /> projects</h3>
              <p className='text-md text-grey'>Design is hard. We take care of the project ideas and design so you<br /> can focus on the coding. You'll end up with an incredible portfolio of<br /> stunning projects!</p>
            </div>
            <div>
              <img height='595px' width='560px' src="src/assets/static/asfeatured-2.webp" alt="Image" className="homepage__image" />
            </div>
          </div>
        </div>

        <div className='flex justify-center'>
          <div className='grid grid--columns-2 items-center override-gap-80'>
            <div>
              <img height='602px' width='560px' src="src/assets/static/asfeatured-3.webp" alt="Image" className="homepage__image" />
            </div>
            <div className='space-y-8'>
              <div className='emoji'>🚀</div>
              <h3 className='header-xl'>Banish impostor syndrome</h3>
              <p className='text-md text-grey'>We've all felt out of our depth before. Getting hands-on experience is<br /> an incredible way to build confidence, refine your workflow, and<br /> supercharge your learning.</p>
            </div>
          </div>
        </div>

        <div className='flex justify-center'>
          <div className='grid grid--columns-2 items-center override-gap-80'>
            <div className='space-y-8'>
              <div className='emoji'>🛠️</div>
              <h3 className='header-xl'>Practice new tools</h3>
              <p className='text-md text-grey'>The front-end landscape changes constantly. Our design-led<br /> challenges let you pick your tools to help you adapt, experiment, and<br /> keep up with the latest trends.</p>
            </div>
            <div>
              <img height='568px' width='560px' src="src/assets/static/asfeatured-4.webp" alt="Image" className="homepage__image" />
            </div>
          </div>
        </div>
      </div>



    </>
  );
}

export default Homepage;
