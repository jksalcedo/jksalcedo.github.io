import SectionTitle from "@/components/section-title";

export default function AboutSection() {
  return (
    <section id="about">
      <SectionTitle>About Me</SectionTitle>
      <div className="max-w-3xl mx-auto text-center space-y-6 text-muted-foreground leading-relaxed">
        <p>
          Hello! I'm a passionate and creative full-stack developer with a love for building beautiful, intuitive, and high-performance web applications. With a strong foundation in modern web technologies, I thrive on turning complex problems into elegant solutions.
        </p>
        <p>
          My journey in software development started with a curiosity for how things work, and it has since evolved into a career where I get to build amazing things every day. I'm proficient in both front-end and back-end development, with expertise in frameworks like React, Next.js, and Node.js.
        </p>
        <p>
          When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or enjoying a good cup of coffee. I'm always eager to learn and grow, and I'm excited about the endless possibilities in the world of tech.
        </p>
      </div>
    </section>
  );
}
