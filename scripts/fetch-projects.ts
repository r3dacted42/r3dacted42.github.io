import { writeFile } from 'fs/promises';
import { resolve } from 'path';
import type { ProjectData } from "../src/types";
import projectList from '../src/assets/projectList';

(async () => {
    const token = process.env.GITHUB_TOKEN;
    const headers: Record<string, string> = {
        'Accept': 'application/vnd.github.v3+json',
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
        console.log("using token for authenticated api requests");
    } else {
        console.log("token not found.");
    }
    const promises = projectList.map(async (listItem): Promise<ProjectData | null> => {
        try {
            console.log(`fetching data for ${listItem.repo}...`);
            const apiRepoUri = `https://api.github.com/repos/r3dacted42/${listItem.repo}`;
            const [repoResponse, readmeResponse, languagesResponse] = await Promise.all([
                fetch(apiRepoUri, { headers }),
                fetch(`${apiRepoUri}/readme`, { headers }),
                fetch(`${apiRepoUri}/languages`, { headers }),
            ]);
            if (!repoResponse.ok) {
                console.error(`failed to fetch repo data for ${listItem.repo}: ${repoResponse.statusText}`);
                return null;
            }
            if (!readmeResponse.ok) {
                console.warn(`no readme found for ${listItem.repo}`);
            }
            if (!languagesResponse.ok) {
                console.warn(`failed to fetch languages for ${listItem.repo}: ${languagesResponse.statusText}`);
            }
            const repoData = await repoResponse.json() as Record<string, any>;
            const readmeData = readmeResponse.ok ? await readmeResponse.json() as { content: string } : null;
            const languagesData = languagesResponse.ok ? await languagesResponse.json() as Record<string, number> : {};
            const projectData: ProjectData = {
                id: listItem.repo,
                title: listItem.title ?? listItem.repo,
                description: repoData.description,
                topics: repoData.topics,
                languages: Object.keys(languagesData),
                homepage: repoData.homepage || undefined,
                readme: readmeData ? atob(readmeData.content) : 'No README content.',
                windowStyle: listItem.windowStyle,
            };
            return projectData;
        } catch (error) {
            console.error(`error occurred for repo ${listItem.repo}:`, error);
            return null;
        }
    });
    const results = (await Promise.all(promises)).filter(p => p !== null) as ProjectData[];
    const outputPath = resolve(process.cwd(), 'src/assets/projectsData.json');
    const jsonData = JSON.stringify(results, null, 2);
    await writeFile(outputPath, jsonData, 'utf-8');

    console.log(`successfully saved ${results.length} projects to ${outputPath}`);
})();
