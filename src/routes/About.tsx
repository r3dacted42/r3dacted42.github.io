import Markdown from "markdown-to-jsx";

function About() {
    return (
        <Markdown style={{ padding: '8px' }}>
            {`# hi, i'm [priyansh agrahari](https://linkedin.com/in/priyansh-agr)  
i'm currently pursuing a Master's degree from IIIT Bangalore, and like building stuff in general. 

oh, also i love cats :)`
            }
        </Markdown>
    );
}

export default About;