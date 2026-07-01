export type TimeSpanData = {
  begin: string;
  end: string;
  title: string;
  subtitle: string;
  location?: string;
  description?: string | string[];
}

export const exp: TimeSpanData[] = [
  {
    begin: "Jan 2026",
    end: "Jun 2026",
    title: "Rolls-Royce",
    subtitle: "Software Engineering Intern",
    location: "Bengaluru",
    description: [
      "Delivered 2 Power Apps dedicated to employee social and physical well-being, leveraging the full Power Platform stack.",
      "Contributed to full-stack development and maintenance using Angular, performing bug fixes and QA testing."
    ],
  },
  {
    begin: "May 2025",
    end: "Jul 2025",
    title: "Oracle Cerner",
    subtitle: "Project Intern",
    location: "Bengaluru",
    description: [
      "Digitized 20 resources of the RAI spec into dynamic web forms, streamlining clinical data entry for the LTC EHR React app.",
      "Upskilled in Oracle's core tech stack: Oracle Cloud, OJET, Micronaut, and Visual Builder, for future projects."
    ],
  },
  {
    begin: "May 2022",
    end: "May 2023",
    title: "Golive Games Pvt. Ltd.",
    subtitle: "Game Programmer",
    location: "WFH, Hyderabad",
    description: [
      "Developed efficient C# scripts using the Unity API to add features and fix bugs in 2D and 3D early-stage to live projects.",
      "Reduced load times and latency by 70% on an Android mobile game by optimizing load-up sequence and caching."
    ],
  },
];

export const edu: TimeSpanData[] = [
  {
    begin: "Jul 2024",
    end: "Jun 2026",
    title: "International Institute of Information Technology, Bangalore (IIIT-B)",
    subtitle: "M.Tech CompSci & Engg.",
    description: "CGPA: 3.36/4",
  },
  {
    begin: "Dec 2020",
    end: "May 2024",
    title: "Indian Institute of Information Technology, Raichur (IIITR)",
    subtitle: "B.Tech CompSci & Engg.",
    description: "CGPA: 8.79/10",
  },
];
