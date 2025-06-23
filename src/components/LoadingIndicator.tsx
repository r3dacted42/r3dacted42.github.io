import { useEffect, useState } from "react";

function LoadingIndicator() {
    const [sym, setSym] = useState('/');

    useEffect(() => {
        const animInterval = setInterval(() => {
            setSym(prevSym => {
                switch (prevSym) {
                    case '/': return '-';
                    case '-': return '\\';
                    case '\\': return '|';
                    default: return '/';
                }
            });
        }, 300);

        return (() => {
            clearInterval(animInterval);
        });
    }, []);

    return (
        <span>loading...{sym}</span>
    );
}

export default LoadingIndicator;