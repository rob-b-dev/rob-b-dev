import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function CommunityPage() {
    return (

        <div className='container container__grey flex flex-col justify-center space-y-8' style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
            <div className='flex justify-center'>
                <div className='w-full' style={{ maxWidth: '1208px' }}>
                    <div className='flex justify-between items-center'>
                        <h2 className="header-xl">A little ❤️ from our community</h2>
                        <div className="flex space-x-4">
                            <button className="button button__arrow button__arrow--grey">
                                <FontAwesomeIcon icon={['fas', 'arrow-left']} size="2x" />
                            </button>
                            <button className="button button__arrow">
                                <FontAwesomeIcon icon={['fas', 'arrow-right']} size="2x" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex justify-center'>
                <div className="grid grid--columns-3">
                    <div className='card flex flex-col justify-between' style={{ height: '419px', width: '376px' }}>
                        <p className='text-md text-grey'>
                            This platform provides everything developers need to improve their skills. The
                            community is great, and the challenges keep me motivated, instill accountability
                            through regular submissions, and allow me to build a professional portfolio by
                            showcasing diverse projects.
                        </p>
                        <div className='flex space-x-4 items-center'>
                            <img src="src/assets/static/communityprofile-1.webp" alt="Image" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                            <div className='flex flex-col'>
                                <span className='text-md text-blue bold'>Francesca</span>
                                <span className='text-md text-grey'>@frrann</span>
                            </div>
                        </div>
                    </div>

                    <div className='card flex flex-col justify-between' style={{ height: '419px', width: '376px' }}>
                        <p className='text-md text-grey'>
                            Frontend Mentor eliminated the hurdle of sourcing designs, letting me focus on development. Their professional projects, especially in the Pro subscription, challenge me to create complex,
                            multi-page websites. With a supportive community and feedback from advanced programmers, my skills have been elevated to new heights.
                        </p>
                        <div className='flex space-x-4 items-center'>
                            <img src="src/assets/static/communityprofile-2.webp" alt="Image" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                            <div className='flex flex-col'>
                                <span className='text-md bold text-blue'>Alfie</span>
                                <span className='text-md text-grey'>@alfiemitchell123</span>
                            </div>
                        </div>
                    </div>

                    <div className='card flex flex-col justify-between' style={{ height: '419px', width: '376px' }}>
                        <p className='text-md text-grey'>
                            Frontend Mentor transformed me from a newbie to a professional developer, enabling me to create flawless, responsive, accessible websites. It's a superb platform for feedback with a supportive community backing your growth.
                            Through it, I evolved from a frontend to a full-stack developer.
                        </p>
                        <div className='flex space-x-4 items-center'>
                            <img src="src/assets/static/communityprofile-3.webp" alt="Image" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                            <div className='flex flex-col'>
                                <span className='text-md bold text-blue'>Francesca</span>
                                <span className='text-md text-grey'>@Hikmahx</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CommunityPage;


