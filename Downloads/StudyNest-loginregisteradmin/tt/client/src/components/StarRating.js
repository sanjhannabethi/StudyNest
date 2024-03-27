import React, { useEffect } from 'react';
import './index.css'
const StarRating = () => {
  useEffect(() => {
    const fontAwesomeScript = document.createElement("script");
    fontAwesomeScript.src = "https://kit.fontawesome.com/5ea815c1d0.js";
    document.body.appendChild(fontAwesomeScript);

    return () => {
      document.body.removeChild(fontAwesomeScript);
    };
  }, []);

  return (
    <div>
      <div className="star-wrapper">
        {[1, 2, 3, 4, 5].map((index) => (
          <a key={index} href="#" className={`fas fa-star s${index}`}></a>
        ))}
      </div>
      <div className="wrapper">
        <script
          type="text/javascript"
          src="https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js"
          data-name="bmc-button"
          data-slug="gitlabBilal"
          data-color="#FFDD00"
          data-emoji=""
          data-font="Cookie"
          data-text="Buy me a coffee"
          data-outline-color="#000000"
          data-font-color="#000000"
          data-coffee-color="#ffffff"
        ></script>
      </div>
    </div>
  );
};

export default StarRating;
