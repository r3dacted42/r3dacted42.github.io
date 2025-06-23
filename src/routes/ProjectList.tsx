import { Link } from 'react-router-dom';
import './styles/ProjectList.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchRepoInfo } from '../store/reposSlice';
import projectsData from '../data/projects';
import langIconMap from '../data/lang_icon_map';
import { isExpired } from '../utils';
import LoadingIndicator from '../components/LoadingIndicator';

function ProjectList() {
    const dispatch = useDispatch<AppDispatch>();

    const reposState = useSelector((state: RootState) => state.repos);

    const displayProjects = projectsData.map(p => ({
        name: p.name,
        repo: p.repo,
        reduxState: reposState[p.repo] || { status: 'idle', error: null, info: null }
    }));

    useEffect(() => {
        projectsData.forEach(p => {
            const currentRepoState = reposState[p.repo];
            if (!currentRepoState || currentRepoState.status === 'idle'
                || currentRepoState.status === 'failed'
                || (currentRepoState.status === 'ready'
                    && currentRepoState.info
                    && isExpired(currentRepoState.info.validUntil)
                )
            ) {
                dispatch(fetchRepoInfo(p.repo));
            }
        });
    }, [dispatch, reposState]);

    const getIcon = (lang: string) => {
        lang = lang.toLowerCase();
        if (Object.keys(langIconMap).includes(lang)) {
            lang = langIconMap[lang];
        }
        return `devicon-${lang}-plain`;
    };

    return (
        <div className='list'>
            {displayProjects.map((d, idx) => {
                const { name, repo, reduxState } = d;
                const { status, info, error } = reduxState;

                if (status === 'ready' && info) {
                    return (
                        <Link
                            key={idx}
                            className='list-item'
                            to={`/projects/${repo}`}
                            title={info.description}
                        >
                            {name} {info.languages.map((l, i) => (
                                <span key={i} title={l} className={getIcon(l)} />
                            ))}
                        </Link>
                    );
                } else if (status === 'failed') {
                    return (
                        <div key={idx} className="list-item error">
                            {name} !!Error: {error || 'Failed to load'}
                        </div>
                    );
                } else {
                    return (
                        <div key={idx} className="list-item">
                            <LoadingIndicator />
                        </div>
                    );
                }
            })}
        </div>
    );
}

export default ProjectList;