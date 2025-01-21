import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { React, useState } from 'react';

// Specificity when importing
// Reset to allow overrides to resets in below imports
import './Reset.css'

// Global
import './App.css'
import './Typography.css'
import './Grid.css'

// Style components
import './Buttons.css'
import './Header.css'
import './Form.css'

// Pages
import './Homepage.css'

// Utils
import './Utils.css'

// Content components
import Header from './components/Header';
import Homepage from './components/Homepage';
import Login from './components/Login';
import Register from './components/Register';
import TermsAndConditions from './components/TermsAndConditions';
import { AuthProvider } from './components/AuthContext';
import Favourites from './components/Favourites';

// Fontawesome library
import { library } from '@fortawesome/fontawesome-svg-core'
// Brands
import { fab } from '@fortawesome/free-brands-svg-icons'
// Solid icons
import { fas } from '@fortawesome/free-solid-svg-icons'
// Regular icons
import { far } from '@fortawesome/free-regular-svg-icons'
// Add modules exported from library
library.add(fab, fas, far);

function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/home' element={<Homepage />} />
          <Route path='/login' element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/favourites" element={<Favourites />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

// Rendering the app to the DOM
const root = createRoot(document.getElementById('root'));
root.render(<App />);