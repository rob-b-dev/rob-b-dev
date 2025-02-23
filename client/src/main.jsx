import { createRoot } from 'react-dom/client';
import { Navigate, BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
import BookSessions from './components/BookSessions';
import MySessions from './components/MySessions';
import PublishSessions from './components/PublishSessions';
import StudentProfile from './components/StudentProfile';
import TutorProfile from './components/TutorProfile';
import Header from './components/Header';
import NotFound from './components/NotFound';

// Fontawesome library
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { AuthProvider } from './components/AuthProvider';
import ProtectedRoute from './components/ProtectedRoute';

library.add(fab, fas, far);

function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastContainer />
        <Content />
      </AuthProvider>
    </Router>
  );
}

function Content() {
  const location = useLocation();
  const showHeaderOn = ["/home", "/studentprofile", "/login", "/register", "/booksessions", "/mysessions", "/publishsessions", "/tutorprofile"];
  const shouldShowHeader = showHeaderOn.includes(location.pathname);
  const definedPaths = ["/home", "/login", "/register", "/studentprofile", "/booksessions", "/mysessions", "/publishsessions", "/tutorprofile"];
  const isDefinedPath = definedPaths.includes(location.pathname);

  return (
    <>
      {shouldShowHeader && <Header />}
      {isDefinedPath ? (
        <div className="wrapper">
          <Routes>
            <Route path="/home" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/booksessions" element={<BookSessions />} />
              <Route path="/mysessions" element={<MySessions />} />
              <Route path="/publishsessions" element={<PublishSessions />} />
              <Route path="/studentprofile" element={<StudentProfile />} />
              <Route path="/tutorprofile" element={<TutorProfile />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </>
  );
}




export default App;

// Rendering the app to the DOM
const root = createRoot(document.getElementById('root'));
root.render(<App />);
