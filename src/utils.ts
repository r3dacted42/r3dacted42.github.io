type Post = {
  file: string;
  url: string;
  frontmatter: {
    slug: string;
    title: string;
    description: string;
    updated: string;
  };
  getHeadings: () => {
    depth: number;
    slug: string;
    text: string;
  }[];
  Content: any;
};

export function getBlogs() {
  const matches = import.meta.glob("./content/blog/*.mdx", { eager: true });
  return Object.values(matches) as Post[];
}

export function getProjects() {
  const matches = import.meta.glob("./content/projects/*.mdx", { eager: true });
  return Object.values(matches) as Post[];
}
