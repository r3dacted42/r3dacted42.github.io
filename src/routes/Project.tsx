import { useParams } from "react-router-dom";

function Project() {
    const { repo } = useParams();

    return (
        <div>
            {repo}
        </div>
    );
}

export default Project;