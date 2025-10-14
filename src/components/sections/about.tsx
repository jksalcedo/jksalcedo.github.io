import SectionTitle from "@/components/section-title";

export default function AboutSection() {
    return (
        <section id="about">
            <SectionTitle>About Me</SectionTitle>
            <div className="max-w-3xl mx-auto text-center space-y-6 text-muted-foreground leading-relaxed">
                <p>
                    I am a Computer Science student with a strong passion for software development, particularly in the
                    field of mobile applications and systems programming. I am driven by the challenge of writing clean,
                    efficient, and scalable code.
                </p>
                <p>
                    I am deepening my skills in <strong>Kotlin, Java, C++, and Python</strong>, and am proficient with
                    tools like Git, Android Studio, and Linux. I also leverage <strong>AI and LLMs</strong> as
                    productivity-enhancing tools to accelerate my workflow from research to debugging.
                </p>
            </div>
        </section>
    );
}