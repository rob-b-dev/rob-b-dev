import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

// Global styles
// import './Reset.css'
import './Index.css';
import './Components.css'

// Utils
import './Utils.css';

// Import your components from their respective files
import Homepage from './components/Homepage';
import Login from './components/Login';
import Register from './components/Register';
import Favourites from './components/Favourites';
import Profile from './components/Profile';

// Fontawesome library
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { AuthProvider } from './components/AuthProvider';
import Header from './components/Header';

library.add(fab, fas, far);

function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastContainer />
        <Header />
        <div className="wrapepr">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/userprofile" element={<Profile />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;

// Rendering the app to the DOM
const root = createRoot(document.getElementById('root'));
root.render(<App />);
