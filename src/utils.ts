type BlogFrontmatter = {
  slug: string;
  title: string;
  description: string;
  imgSrc: string;
  updated: string;
};

type ProjectFrontmatter = {
  slug: string;
  title: string;
  description: string;
  ghUrl: string;
  devIcons: string[];
  updated: string;
};

type Post<T> = {
  file: string;
  url: string;
  frontmatter: T;
  getHeadings: () => {
    depth: number;
    slug: string;
    text: string;
  }[];
  Content: any; // component
};

export function getBlogs() {
  const matches = import.meta.glob("./content/blog/*.mdx", { eager: true });
  return Object.values(matches) as Post<BlogFrontmatter>[];
}

export function getProjects() {
  const matches = import.meta.glob("./content/projects/*.mdx", { eager: true });
  return Object.values(matches) as Post<ProjectFrontmatter>[];
}

export function getDate(timeStr: string) {
  const date = new Date(timeStr);
  return date.toLocaleDateString("ja-JP");
}
