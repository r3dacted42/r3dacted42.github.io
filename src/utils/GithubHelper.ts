export type RepoInfo = {
    description: string;
    topics: Array<string>;
    created: Date;
    language: string;
    homepage: string;
};

export class GithubHelper {
    repo: string;
    github_url: string;
    info: RepoInfo | undefined;
    readme: string | undefined;

    constructor(repo: string) {
        this.repo = repo;
        this.github_url = `https://github.com/r3dacted42/${repo}`;
        this.init();
    }

    async init() {
        const apiRepoUri = `https://api.github.com/repos/r3dacted42/${this.repo}`;
        const repoData = (await (await fetch(apiRepoUri)).json());
        this.info = {
            description: repoData.description,
            topics: repoData.topics,
            created: new Date(repoData.created_at),
            language: repoData.language,
            homepage: repoData.homepage,
        };
        const readme = atob((await (await fetch(`${apiRepoUri}/readme`)).json()).content);
        this.readme = readme;
    }
}