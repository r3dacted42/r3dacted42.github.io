import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './styles/Project.css';
import Markdown from "markdown-to-jsx";

function Project() {
    const { repo } = useParams();
    const [loaded, setLoaded] = useState(false);
    const [readme, setReadme] = useState("");

    async function loadData() {
        setLoaded(false);
        const apiBaseUrl = `https://api.github.com/repos/r3dacted42/${repo}`;
        const content = atob((await (await fetch(`${apiBaseUrl}/readme`)).json()).content);
        setReadme(content);
        setLoaded(true);
    }

    useEffect(() => {
        loadData();
    }, [repo]);

    return (
        <div id="content">
            {loaded
                ? <Markdown>{readme}</Markdown>
                : "loading..."
            }
        </div>
    );
}

export default Project;