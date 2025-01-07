import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Reset to allow overrides to resets
import './reset.css'

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

// fontawesome library
import { library } from '@fortawesome/fontawesome-svg-core'
// brands
import { fab } from '@fortawesome/free-brands-svg-icons'
// solid icons
import { fas } from '@fortawesome/free-solid-svg-icons'
// add modules exported from library
library.add(fab, fas)


createRoot(document.getElementById('root')).render(
  <>
    <Header />
    <Homepage />
  </>
)
