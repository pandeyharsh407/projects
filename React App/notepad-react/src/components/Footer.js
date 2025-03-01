import React from 'react';

function Footer() {
    return (
        <footer className="text-center text-sm text-gray-500 mt-8">
            Designed and Developed with ❤️ by Harsh Pandey in India 🇮🇳
            <div className="media-icons">
                <a href="https://www.linkedin.com/in/pandeyharsh407/" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-linkedin-in text-gray-500 hover:text-blue-600 mx-2"></i>
                </a>            
                <a href="https://instagram.com/pandeyharsh407/" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-instagram text-gray-500 hover:text-red-300 mx-2"></i>
                </a>
                <a href="https://wa.me/+918811943389/" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-whatsapp text-gray-500 hover:text-green-700 mx-2"></i>
                </a>
                <a href="https://github.com/pandeyharsh407/" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github text-gray-500 hover:text-green-100 mx-2"></i>
                </a>
                <a href="mailto:pandeyharsh407@gmail.com">
                    <i className="fab fa-google text-gray-500 hover:text-red-500 mx-2"></i>
                </a>
            </div>              
        </footer>    
    );
}
export default Footer;
