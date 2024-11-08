import React from 'react';
import '../assets/styles/CategoryNavigation.css'; 

const categoryIconsData = [
    { imgSrc: "https://preprod-appli-server.vivetic.com/web_si/front-ecatalogue-v2/logo-preprod/Client_logo/logo_gun.png", label: 'PROMO !', alt: 'Promo', link: '/promo' },
    { imgSrc: "https://preprod-appli-server.vivetic.com/web_si/front-ecatalogue-v2/logo-preprod/Client_logo/logo_gun.png", label: 'Food', alt: 'Food', link: '/food' },
    { imgSrc: "https://preprod-appli-server.vivetic.com/web_si/front-ecatalogue-v2/logo-preprod/Client_logo/logo_gun.png", label: 'Mode', alt: 'Mode', link: '/mode' },
    { imgSrc: "https://preprod-appli-server.vivetic.com/web_si/front-ecatalogue-v2/logo-preprod/Client_logo/logo_gun.png", label: 'Deco', alt: 'Deco', link: '/deco' },
    { imgSrc: "https://preprod-appli-server.vivetic.com/web_si/front-ecatalogue-v2/logo-preprod/Client_logo/logo_gun.png", label: 'Beauté', alt: 'Beauté', link: '/beauty' },
    { imgSrc: "https://preprod-appli-server.vivetic.com/web_si/front-ecatalogue-v2/logo-preprod/Client_logo/logo_gun.png", label: 'Tech', alt: 'Tech', link: '/tech' },
];

const CircularIconsRow = () => {
    return (
        <div className="circular-icons-row">
            {categoryIconsData.map((icon, index) => (
                <div className="icon-container" key={index}>
                    <a href={icon.link}>
                        <img src={icon.imgSrc} alt={icon.alt} className="icon" />
                    </a>
                    <p className="icon-label">{icon.label}</p>
                </div>
            ))}
        </div>
    );
};

export default CircularIconsRow;
