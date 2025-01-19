import React, { useState } from 'react';

const HowItWorks = () => {
    // useState hook to manage the state of the expanded card
    // Initial state is set to 1, meaning the first card is expanded by default
    const [expandedCard, setExpandedCard] = useState(1);
    // useState hook to manage the state of the displayed image
    // Initial state is set to 1, meaning the first image is displayed by default
    const [image, setImage] = useState(1);

    // Function to handle click events on cards - takes card number as parameter
    const handleCardClick = (cardNumber) => {
        // Set the state to the clicked card number without allowing unselecting
        // Card can only switch to another, but not be unselected once selected
        setExpandedCard(cardNumber);
        // Update the image state to match the clicked card number
        setImage(cardNumber);
    };

    // Object to store image URLs for each card
    const images = {
        1: "src/assets/static/choosechallenge.png",
        2: "src/assets/static/codethedesign.webp",
        3: "src/assets/static/submitsolution.webp",
        4: "src/assets/static/givefeedback.webp"
    };

    return (
        <div className='container container__grey flex justify-center'>
            <div className='grid grid--columns-2 items-start'>
                <div className='space-y-8'>
                    <div>
                        <h2 className="header-xl" style={{ paddingTop: '3rem' }}>How it works</h2>
                    </div>
                    <div className='space-y-4'>
                        {/* Card 1 */}
                        <div
                            // Inline styles to adjust the card's appearance based on its expanded state
                            style={{
                                width: '100%',
                                backgroundColor: expandedCard === 1 ? '#3E53A3' : 'inherit', // Change background color if expanded
                                color: expandedCard === 1 ? 'white' : 'inherit' // Change text color if expanded
                            }}
                            className="card flex flex-col space-y-4 pointer"
                            // Click event handler to toggle the expanded state
                            onClick={() => handleCardClick(1)}
                        >
                            <div className="flex items-center space-x-4">
                                <p className="number-list" style={{
                                    backgroundColor: expandedCard === 1 ? 'white' : 'rgb(106, 190, 205)',
                                    color: expandedCard === 1 ? 'black' : 'white'
                                }}>1</p>
                                <span className="bold text-lg">Choose your challenge</span>
                            </div>
                            {/* Display additional text if the card is expanded */}
                            {expandedCard === 1 && <p className='text-md'>Browse our collection of professionally designed projects.<br /> Pick one that suits the level you’re currently at.</p>}
                        </div>
                        {/* Card 2 */}
                        <div
                            style={{
                                backgroundColor: expandedCard === 2 ? '#3E53A3' : 'inherit',
                                color: expandedCard === 2 ? 'white' : 'inherit'
                            }}
                            className="card flex flex-col space-y-4 pointer"
                            onClick={() => handleCardClick(2)}
                        >
                            <div className="flex items-center space-x-4">
                                <p className="number-list" style={{
                                    backgroundColor: expandedCard === 2 ? 'white' : 'rgb(106, 190, 205)',
                                    color: expandedCard === 2 ? 'black' : 'white'
                                }}>2</p>
                                <span className="bold text-lg">Code the design</span>
                            </div>
                            {/* Display additional text if the card is expanded */}
                            {expandedCard === 2 && <p className='text-md'>Each project comes with all files included. This means you<br /> can focus on coding the project using the design as a<br /> reference.</p>}
                        </div>
                        {/* Card 3 */}
                        <div
                            style={{
                                backgroundColor: expandedCard === 3 ? '#3E53A3' : 'inherit',
                                color: expandedCard === 3 ? 'white' : 'inherit'
                            }}
                            className="card flex flex-col space-y-4 pointer"
                            onClick={() => handleCardClick(3)}
                        >
                            <div className="flex items-center space-x-4">
                                <p className="number-list" style={{
                                    backgroundColor: expandedCard === 3 ? 'white' : 'rgb(106, 190, 205)',
                                    color: expandedCard === 3 ? 'black' : 'white'
                                }}>3</p>
                                <span className="bold text-lg">Share your results</span>
                            </div>
                            {/* Display additional text if the card is expanded */}
                            {expandedCard === 3 && <p className='text-md'>Get feedback from the community about your code and see<br /> how close you got to the design.</p>}
                        </div>
                        {/* Card 4 */}
                        <div
                            style={{
                                backgroundColor: expandedCard === 4 ? '#3E53A3' : 'inherit',
                                color: expandedCard === 4 ? 'white' : 'inherit'
                            }}
                            className="card flex flex-col space-y-4 pointer"
                            onClick={() => handleCardClick(4)}
                        >
                            <div className="flex items-center space-x-4">
                                <p className="number-list" style={{
                                    backgroundColor: expandedCard === 4 ? 'white' : 'rgb(106, 190, 205)',
                                    color: expandedCard === 4 ? 'black' : 'white'
                                }}>4</p>
                                <span className="bold text-lg">Give others feedback</span>
                            </div>
                            {/* Display additional text if the card is expanded */}
                            {expandedCard === 4 && <p className='text-md'>Reviewing other people’s code is a vital part of being a<br /> developer. Practice giving code reviews and help others<br /> improve.</p>}
                        </div>
                    </div>
                </div>
                {/* Display the currently selected image */}
                <div>
                    <img src={images[image]} alt={`Image ${image}`} />
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;
