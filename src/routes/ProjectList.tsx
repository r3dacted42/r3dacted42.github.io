import { Link } from 'react-router-dom';
import projectsData from '../assets/projects.json';
import './styles/ProjectList.css';
import { useEffect, useState } from 'react';

function ProjectList() {
    const [projectsDesc, setDesc] = useState<Array<string>>([]);

    useEffect(() => {
        const apiUrl = (r: string) => `https://api.github.com/repos/r3dacted42/${r}/languages`;
        Promise.all(projectsData.map((d) => fetch(apiUrl(d.repo))))
            .then((r) => Promise.all(r.map((res) => res.json())))
            .then((data) => data.map((d) => Object.keys(d)[0] as string))
            .then((l) => {
                console.log(l);
                setDesc(l);
            });
    }, []);

    return (
        <div className='list'>
            {projectsData.map((d, idx) => (
                <Link key={idx} className='list-item' to={`/projects/${d.repo}`}>
                    {d.name} {projectsDesc.length > 0 ? <i title={projectsDesc[idx]}
                        className={`devicon-${projectsDesc[idx].toLowerCase()}-plain`}></i> : "..."}
                </Link>
            ))}
        </div>
    );
}

export default ProjectList;