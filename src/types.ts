export interface RepoInfo {
    validUntil: string;
    readme: string,
    description: string;
    topics: Array<string>;
    created: string;
    languages: Array<string>;
    homepage: string;
};

export interface RepoState {
    status: 'idle' | 'loading' | 'ready' | 'failed';
    error: string | null;
    info: RepoInfo | null;
}
