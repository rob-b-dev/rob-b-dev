import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import HowItWorks from './HowItWorks';
import CommunityPage from './CommunityPage';

function Homepage() {
  return (
    <>
      {/* Introduction */}
      <div className='section flex justify-center'>
        <div className="grid grid--columns-2">
          <div className='space-y-8'>
            <h2 className="header-2xl text-blue">Improve your coding skills <br />by building realistic <br />projects</h2>
            <p className='text-lg text-grey'>
              Our professionally designed challenges help you gain hands-on <br /> experience writing HTML, CSS, and JavaScript.
              We create the  <br />designs so you can focus on the code and see your skills <br /> skyrocket!
            </p>
            <button className="button button__secondary">
              <span className='text-sm'>Log in with Github</span>
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
      <div className="section">
        <div className='flex justify-center container__grey container__grey--gradient'>
          <div className="grid grid--columns-2">
            <div className='text-center space-y-8 card content-center' style={{ height: '457px', width: '585px' }}>
              <FontAwesomeIcon icon={['fas', 'quote-left']} size="4x" color='#d3d3d3' />
              <p className='text-lg'>I highly recommend Frontend Mentor. Skip the search <br />for project ideas and dive into ready-made challenges <br />that help you level up as a developer.</p>
              <div className='flex flex-col space-y-8 items-center'>
                <img style={{ width: '80px', height: '80px', borderRadius: '50%' }} src="src/assets/static/feedback-left-img.png" alt="Image" />
                <div className="space-y-2">
                  <p className='text-md strong'>Kevin Powell</p>
                  <p className='text-grey'>Web Developer & YouTuber</p>
                </div>
              </div>
            </div>
            <div className='text-center space-y-8 card content-center' style={{ height: '457px', width: '585px' }}>
              <FontAwesomeIcon icon={['fas', 'quote-left']} size="4x" color='#d3d3d3' />
              <p className='text-lg'>Frontend Mentor is a win-win. You can sharpen your <br />skills building websites and add finished projects to <br />your portfolio to help land a job!</p>
              <div className='flex flex-col space-y-8 items-center'>
                <img style={{ width: '80px', height: '80px', borderRadius: '50%' }} src="src/assets/static/feedback-right-img.jpg" alt="Image" />
                <div className="space-y-2">
                  <p className='text-md strong'>Jessica Chan</p>
                  <p className='text-grey'>Web Developer & YouTuber</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



      {/* As Featured on intro */}
      <div className='section flex justify-center'>
        <div className='space-y-8'>

          <h2 className="upper header-sm bold--full text-center">as featured on. . .</h2>
          <div className='grid grid--columns-3'>

            <div className='flex justify-center items-center card' style={{ height: '112px', width: '390px', minwidth: '100%' }}>
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

        <div className='flex justify-center'>
          <div className='grid grid--columns-2 items-center override-gap-80'>
            <div>
              <img height='568px' width='560px' src="src/assets/static/asfeatured-5.webp" alt="Image" className="homepage__image" />
            </div>
            <div className='space-y-8'>
              <div className='emoji'>🤝</div>
              <h3 className='header-xl'>Create job opportunities</h3>
              <p className='text-md text-grey'>We have a <span className='underline'>Hiring Platform</span> that runs alongside this platform. Just by<br /> building projects and engaging with the community, you could open<br /> up job opportunities!</p>
            </div>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className='section'>{<HowItWorks />}</div>


      <div className='section'>

        <div className='flex justify-center text-center'>
          <div className='space-y-8'>
            <h2 className='header-xl'>Take your skills to the next level<br /> with our <span className='container__blue container__blue--pro bold--full'>PRO</span> subscription</h2>
            <p className='text-lg text-grey'>Step into the shoes of a professional developer and build projects in<br /> the most realistic way possible.
              Our Pro subscription will help you<br /> prepare for life as a professional developer.</p>
          </div>
        </div>

        <div className='section'>
          <div className='flex justify-center'>
            <div className='grid grid--columns-2'>
              <div className='card space-y-8 text-center content-center' style={{ height: '398px', width: '598px' }}>
                <FontAwesomeIcon icon={['fab', 'fa-figma']} size="4x" color='#3E53A3' />
                <h3 className='header-md'>Access each challenge's design file</h3>
                <p className='text-lg text-grey'>Professional teams use tools like Figma. By using these<br /> tools when building projects,
                  you'll save time, create<br /> more accurate solutions, and gain hands-on experience<br /> working like a pro.</p>
              </div>
              <div className='card space-y-8 text-center content-center' style={{ height: '398px', width: '598px' }}>
                <FontAwesomeIcon icon={['far', 'fa-star']} size="4x" color='#3E53A3' />
                <h3 className='header-md'>Tackle our premium challenges</h3>
                <p className='text-lg text-grey'>Our premium challenges are the most realistic,<br /> comprehensive practice projects you'll find.
                  They also<br /> make incredible portfolio pieces to help you “wow!”<br />recruiters and get hired.</p>
              </div>
            </div>
          </div>

        </div>
        <div className='flex justify-center'><button className='button button__secondary'><span className='text-md'>Learn about pro</span></button></div>
      </div>

      <div className='section'><CommunityPage /></div>





    </>
  );
}

export default Homepage;
