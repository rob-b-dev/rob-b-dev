import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './Header.css'
import './App.css'
import './Homepage.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Homepage from './components/Homepage'


createRoot(document.getElementById('root')).render(
  <>
  <Header/>
  <Homepage/>
  </>
)
