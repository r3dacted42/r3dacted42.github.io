import { Link } from 'react-router-dom';
import projectsData from '../assets/projects.json';
import './styles/ProjectList.css';

function ProjectList() {
    return (
        <div className='list'>
            {projectsData.map((d) => (
                <Link className='list-item' to={`/projects/${d.repo}`}>
                    {d.name}
                </Link>
            ))}
        </div>
    );
}

export default ProjectList;