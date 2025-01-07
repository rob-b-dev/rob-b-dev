import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Specificity when importing
// Reset to allow overrides to resets in below imports
import './Reset.css'

// Global
import './App.css'
import './Typography.css'
import './Grid.css'

// Components
import './Header.css'
import './Buttons.css'

// Pages
import './Homepage.css'

// Utils
import './Utils.css'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Homepage from './components/Homepage'

// Fontawesome library
import { library } from '@fortawesome/fontawesome-svg-core'
// Brands
import { fab } from '@fortawesome/free-brands-svg-icons'
// Solid icons
import { fas } from '@fortawesome/free-solid-svg-icons'
// Add modules exported from library
library.add(fab, fas)


createRoot(document.getElementById('root')).render(
  <>
    <Header />
    <Homepage />
  </>
)
