import SectionTitle from "@/components/section-title";
import {DiAndroid, DiGitMerge, DiHtml5, DiJava, DiJsBadge, DiLinux, DiPython} from "react-icons/di";
import {SiCplusplus, SiKotlin, SiTypescript} from "react-icons/si";
import {VscJson} from "react-icons/vsc";
import React from "react";

// The icon map remains the central place for configuring skill appearance.
const languageIcons: { [key: string]: { icon: React.ReactNode; name: string } } = {
    'Kotlin': {icon: <SiKotlin className="h-10 w-10 text-purple-500"/>, name: 'Kotlin'},
    'Android': {icon: <DiAndroid className="h-10 w-10 text-green-400"/>, name: 'Android'},
    'Java': {icon: <DiJava className="h-10 w-10 text-orange-500"/>, name: 'Java'},
    'Python': {icon: <DiPython className="h-10 w-10 text-blue-500"/>, name: 'Python'},
    'C++': {icon: <SiCplusplus className="h-10 w-10 text-blue-600"/>, name: 'C++'},
    'Git': {icon: <DiGitMerge className="h-10 w-10 text-red-500"/>, name: 'Git'},
    'Linux': {icon: <DiLinux className="h-10 w-10"/>, name: 'Linux'},
    // Fallback skills are kept in case you manually add them to the list below.
    'HTML': {icon: <DiHtml5 className="h-10 w-10 text-orange-500"/>, name: 'HTML'},
    'TypeScript': {icon: <SiTypescript className="h-10 w-10 text-blue-500"/>, name: 'TypeScript'},
    'JavaScript': {icon: <DiJsBadge className="h-10 w-10 text-yellow-400"/>, name: 'JavaScript'},
    'Default': {icon: <VscJson className="h-10 w-10"/>, name: 'Code'}
};

export default function SkillsSection() {
    // This array now solely defines which skills are displayed.
    const skills = ['Kotlin', 'Android', 'Java', 'Python', 'C++', 'Git', 'Linux'];

    // Prepares the final array of skill objects for rendering.
    const finalSkills = skills.map(name => {
        // If a skill name isn't found in our icon map, it uses a default icon.
        return languageIcons[name] || { ...languageIcons['Default'], name };
    });

    return (
        <section id="skills">
            <SectionTitle>My Tech Stack</SectionTitle>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
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