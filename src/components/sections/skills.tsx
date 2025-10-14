import SectionTitle from "@/components/section-title";
import type {GithubRepo} from "@/lib/types";
// Step 1: Import the necessary icons from react-icons
import {DiAndroid, DiGitMerge, DiHtml5, DiJava, DiJsBadge, DiLinux, DiPython,} from "react-icons/di";
import {SiCplusplus, SiKotlin, SiTypescript} from "react-icons/si";
import {VscJson} from "react-icons/vsc";
import React from "react"; // A good generic code icon

// Maps skill names to their corresponding icon components and display names.
// This provides a single source of truth for skill rendering.
const languageIcons: { [key: string]: { icon: React.ReactNode; name: string } } = {
    'Kotlin': {icon: <SiKotlin className="h-10 w-10 text-purple-500"/>, name: 'Kotlin'},
    'Android': {icon: <DiAndroid className="h-10 w-10 text-green-400"/>, name: 'Android'},
    'Java': {icon: <DiJava className="h-10 w-10 text-orange-500"/>, name: 'Java'},
    'Python': {icon: <DiPython className="h-10 w-10 text-blue-500"/>, name: 'Python'},
    'C++': {icon: <SiCplusplus className="h-10 w-10 text-blue-600"/>, name: 'C++'},
    'Git': {icon: <DiGitMerge className="h-10 w-10 text-red-500"/>, name: 'Git'},
    'Linux': {icon: <DiLinux className="h-10 w-10"/>, name: 'Linux'},
    // Fallback skills for languages that might appear from the GitHub API.
    'HTML': {icon: <DiHtml5 className="h-10 w-10 text-orange-500"/>, name: 'HTML'},
    'TypeScript': {icon: <SiTypescript className="h-10 w-10 text-blue-500"/>, name: 'TypeScript'},
    'JavaScript': {icon: <DiJsBadge className="h-10 w-10 text-yellow-400"/>, name: 'JavaScript'},
    'Default': {icon: <VscJson className="h-10 w-10"/>, name: 'Code'}
};

/**
 * Extracts and sorts languages from GitHub repositories by frequency of use.
 * @param repos - An array of GitHub repository objects from the GitHub API.
 * @returns An array of unique language names, sorted from most to least frequent.
 */
const getTopLanguages = (repos: GithubRepo[]): string[] => {
    if (!repos) return [];

    const languageCount: { [key: string]: number } = {};
    repos.forEach(repo => {
        if (repo.language) {
            languageCount[repo.language] = (languageCount[repo.language] || 0) + 1;
        }
    });

    return Object.keys(languageCount).sort(
        (a, b) => languageCount[b] - languageCount[a]
    );
}

export default function SkillsSection({ repos }: { repos: GithubRepo[] }) {
    // Defines the primary skills to always display, regardless of repository data.
    const coreSkills = ['Kotlin', 'Android', 'Java', 'Python', 'C++', 'Git', 'Linux'];

    // Fetches the most used languages from your GitHub profile.
    const topLanguages = getTopLanguages(repos);

    // Creates a combined list of skills, prioritizing the core skills and then adding
    // unique languages from repos. A Set is used to efficiently handle duplicates.
    const combinedSkillNames = [...new Set([...coreSkills, ...topLanguages])];

    // Constant to control the maximum number of skills displayed in the section.
    const SKILLS_TO_SHOW = 8;

    // Prepares the final array of skill objects for rendering.
    const finalSkills = combinedSkillNames.slice(0, SKILLS_TO_SHOW).map(name => {
        // If a skill name isn't found in our icon map, it uses a default icon.
        return languageIcons[name] || { ...languageIcons['Default'], name };
    });

    return (
        <section id="skills">
            <SectionTitle>My Tech Stack</SectionTitle>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
                {finalSkills.map((skill) => (
                    <div key={skill.name}
                         className="group flex flex-col items-center justify-center gap-4 p-6 bg-card rounded-lg border-2 border-transparent hover:border-primary hover:-translate-y-1 transition-all duration-300">
                        <div className="group-hover:text-primary transition-colors duration-300">
                            {skill.icon}
                        </div>
                        <span className="font-semibold text-center">{skill.name}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}