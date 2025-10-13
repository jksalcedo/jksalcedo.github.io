import SectionTitle from "@/components/section-title";
import { Server, Wind, Database } from "lucide-react";

const ReactIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="-11.5 -10.23174 23 20.46348"
    {...props}
  >
    <circle cx="0" cy="0" r="2.05" fill="currentColor" />
    <g stroke="currentColor" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
);

const NextjsIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" {...props}>
        <path fill="currentColor" d="M64 0C28.65 0 0 28.65 0 64s28.65 64 64 64s64-28.65 64-64S99.35 0 64 0zm0 120C32.89 120 8 95.11 8 64S32.89 8 64 8s56 24.89 56 56s-24.89 56-56 56z" />
        <path fill="currentColor" d="M95.63 34.48L68.01 77.58V34.48H60v50.05h6.37l27.62-43.1v43.1h8V34.48h-6.36z" />
    </svg>
);

const TypescriptIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" {...props}>
        <path fill="#007acc" d="M0 0h128v128H0z" />
        <path fill="#fff" d="M26.5 26.5h75v75h-75z" />
        <path fill="#007acc" d="M91.5 36h-46l19.5 20.2c5.9 6.2 11.3 11.8 11.3 19.3c0 6.6-4.9 11.5-12.4 11.5c-6.2 0-10.7-3.3-12.8-6.6l-7.7 5.1c3.5 5.5 10.3 9.5 20.5 9.5c14.2 0 23.5-9.3 23.5-22.1c0-11.3-7.2-18.9-15.9-27.4L55.4 36h36.1v0z" />
    </svg>
);


const skills = [
  { name: 'TypeScript', icon: <TypescriptIcon className="h-10 w-10" /> },
  { name: 'React', icon: <ReactIcon className="h-10 w-10 text-cyan-400" /> },
  { name: 'Next.js', icon: <NextjsIcon className="h-10 w-10" /> },
  { name: 'Node.js', icon: <Server className="h-10 w-10 text-green-500" /> },
  { name: 'Tailwind CSS', icon: <Wind className="h-10 w-10 text-sky-400" /> },
  { name: 'SQL/NoSQL', icon: <Database className="h-10 w-10 text-orange-400" /> },
];

export default function SkillsSection() {
  return (
    <section id="skills">
      <SectionTitle>My Tech Stack</SectionTitle>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {skills.map((skill) => (
          <div key={skill.name} className="group flex flex-col items-center justify-center gap-4 p-6 bg-card rounded-lg border-2 border-transparent hover:border-primary hover:-translate-y-1 transition-all duration-300">
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
