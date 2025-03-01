import React, { useEffect } from 'react';
import Navbar from './components/Navbar'; // Import the Navbar component
import Editor from './components/Editor';
import Footer from './components/Footer';
import './App.css';

function App() {
  useEffect(() => {
    // Check if theme preference is stored in localStorage
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      // Apply the stored theme
      document.documentElement.classList.add(storedTheme);
    } else {
      // Apply default theme
      document.documentElement.classList.add('theme-light');
    }
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Editor />
      {/* <EditorContainer /> */}
      <Footer />
    </div>
  );
}

export default App;
