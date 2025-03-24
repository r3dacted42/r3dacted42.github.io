import { Route, Routes } from 'react-router-dom';
import './App.css';
import MenuItem from './components/MenuItem';
import ProjectList from './routes/ProjectList';
import About from './routes/About';
import Project from './routes/Project';
import useLocalStorage from 'use-local-storage';

function App() {
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');

  return (
    <div className='app' data-theme={theme}>
      <div className='menu'>
        <MenuItem route='/'>..</MenuItem>
        <span>
          <MenuItem route='projects'></MenuItem>
          <MenuItem url='https://r3dacted42.github.io/resume/'>resume</MenuItem>
          <MenuItem route='about'></MenuItem>
        </span>
        <a className="menu-item theme-btn" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
          {theme === 'light' ? 'light_mode' : 'dark_mode'}
        </a>
      </div>
      <Routes>
        <Route path='/' element={<></>} />
        <Route path='/projects/:repo' element={<Project />} />
        <Route path='/projects' element={<ProjectList />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </div>
  )
}

export default App
