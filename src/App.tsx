import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import MenuItem from './components/MenuItem';
import ThemeButton from './components/ThemeButton';
import ProjectList from './routes/ProjectList';
import About from './routes/About';
import Project from './routes/Project';

function App() {
  const location = useLocation();

  return (
    <main>
      <div className='menu'>
        {
          location.pathname !== '/' &&
          <MenuItem route='/'>/</MenuItem>
        }
        <MenuItem route='projects'>projects</MenuItem>
        <MenuItem route='resume'>resume</MenuItem>
        <MenuItem route='about'>about</MenuItem>
      </div>
      <Routes>
        <Route path='/' element={<></>} />
        <Route path='/projects/:repo' element={<Project />} />
        <Route path='/projects' element={<ProjectList />} />
        <Route path='/about' element={<About />} />
      </Routes>
      <ThemeButton />
    </main>
  )
}

export default App
