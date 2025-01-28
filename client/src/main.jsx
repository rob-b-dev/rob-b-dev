import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Global styles
import './App.css';
import './Typography.css';
import './Grid.css';

// Style components
import './Buttons.css';
import './Header.css';
import './Form.css';

// Utils
import './Utils.css';

// Pages
import './Homepage.css';

// Import your components from their respective files
import Homepage from './components/Homepage';
import Login from './components/Login';
import Register from './components/Register';
import Favourites from './components/Favourites';

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
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/favourites" element={<Favourites />} />
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
