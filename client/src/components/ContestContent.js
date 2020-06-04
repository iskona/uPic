import React from 'react'

function ContestContent({contest, contestDetails, buttonLabel}) {
    console.log(contest);
    let srcValue;

    switch (contest.category) {
        case 'portrait':
            srcValue="/Images/portrait.png";
            break;
        case 'still Life':
            srcValue="/Images/stillLife.png";
            break;
        case 'food':
            srcValue="/Images/food.png";
            break;
        case 'wildlife':
            srcValue="/Images/wildlife.png";
            break;
        case 'macro':
            srcValue="/Images/macro.png";
            break;
        case 'event':
            srcValue="/Images/Event.png";
            break;
        case 'fashion':
            srcValue="/Images/fasion.png";
            break;
        case 'newborn':
            srcValue="/Images/newborn.png";
            break;
        case 'street':
            srcValue="/Images/street.png";
            break;
        case 'sports':
            srcValue="/Images/sports.png";
            break;
        case 'documentary':
            srcValue="/Images/documentary.png";
            break;
        case 'weather':
            srcValue="/Images/weather.png";
            break;
        case 'architectural':
            srcValue="/Images/architecture.png";
            break;
        case 'landscape':
            srcValue="/Images/landscape.png";
            break;
    
        }
    return (
        <div className="card h-100 border-secondary">
            <div className="card-body p-0">
            <img className="card-img-top" src={srcValue} alt="Card image cap" />
                <h5 className="card-title mt-1">{contest.title}</h5>
            </div>
            <div className="card-footer">
                <a href="/about"
                    className="btn btn-secondary"
                    onClick={(e) => {
                        e.preventDefault();
                        contestDetails(contest);
                    }}>
                    {buttonLabel}
            </a>
            </div>
        </div>
    )
}

export default ContestContent
