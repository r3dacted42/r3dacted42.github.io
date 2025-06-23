import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RepoInfo, RepoState } from '../types';
import { isExpired } from '../utils';

interface ReposState {
    [repoName: string]: RepoState;
}

const initialState: ReposState = {};

export const fetchRepoInfo = createAsyncThunk(
    'repos/fetchRepoInfo',
    async (repo: string, { rejectWithValue }) => {
        const storedItem = localStorage.getItem(repo);
        if (storedItem) {
            try {
                const storedInfo: RepoInfo = JSON.parse(storedItem);

                if (!isExpired(storedInfo.validUntil)) {
                    console.log(`[Redux] Cache hit for ${repo}. Returning cached data.`);
                    return { repo, info: storedInfo };
                } else {
                    console.log(`[Redux] Cache for ${repo} expired. Fetching from API.`);
                }
            } catch (e) {
                console.error(`[Redux] Error parsing localStorage for ${repo}:`, e);
            }
        }

        try {
            const apiRepoUri = `https://api.github.com/repos/r3dacted42/${repo}`;
            const [repoResponse, languagesResponse, readmeResponse] = await Promise.all([
                fetch(apiRepoUri),
                fetch(`${apiRepoUri}/languages`),
                fetch(`${apiRepoUri}/readme`),
            ]);
            if (!repoResponse.ok || !languagesResponse.ok || !readmeResponse.ok) {
                const errorData = await repoResponse.json();
                throw new Error(errorData.message || `GitHub API error: ${repoResponse.status}`);
            }

            const repoData = await repoResponse.json();
            const languages = Object.keys(await languagesResponse.json());
            const readmeContent = (await readmeResponse.json()).content;
            const readme = readmeContent ? atob(readmeContent) : '';
            const validUntil = new Date();
            validUntil.setDate(validUntil.getDate() + 3);

            const fetchedInfo: RepoInfo = {
                validUntil: validUntil.toISOString(),
                readme: readme,
                description: repoData.description,
                topics: repoData.topics,
                created: repoData.created_at,
                languages: languages,
                homepage: repoData.homepage,
            };

            localStorage.setItem(repo, JSON.stringify(fetchedInfo));
            console.log(`[Redux] Fetched and cached new data for ${repo}.`);
            return { repo, info: fetchedInfo };
        } catch (error: any) {
            console.error(`[Redux] Failed to fetch info for ${repo}:`, error);
            return rejectWithValue(error.message || 'Failed to fetch repo info');
        }
    }
);

const reposSlice = createSlice({
    name: 'repos',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRepoInfo.pending, (state, action) => {
                const repoName = action.meta.arg;
                if (!state[repoName]) {
                    state[repoName] = { status: 'loading', error: null, info: null };
                } else {
                    state[repoName].status = 'loading';
                    state[repoName].error = null;
                }
            })
            .addCase(fetchRepoInfo.fulfilled, (state, action: PayloadAction<{ repo: string; info: RepoInfo }>) => {
                const { repo, info } = action.payload;
                state[repo].status = 'ready';
                state[repo].info = info;
                state[repo].error = null;
            })
            .addCase(fetchRepoInfo.rejected, (state, action) => {
                const repoName = action.meta.arg;
                state[repoName].status = 'failed';
                state[repoName].error = action.error.message || 'Unknown error';
                state[repoName].info = null;
            });
    },
});

export default reposSlice.reducer;