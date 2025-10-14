export type Project = {
    title: string;
    description: string;
    techStack: string[];
    image: string;
    githubUrl: string;
    liveDemoUrl?: string; // Optional live demo link
    liveDemoText?: string;
};

export const projects: Project[] = [
    {
        title: "PassVault",
        description: "A secure, offline-first password manager for Android built with Kotlin. It uses AES encryption and the Android Keystore to keep user credentials safe on the device.",
        techStack: ["Kotlin", "Android XML", "Room DB", "MVVM", "Android Keystore"],
        image: "/images/passvault/main.png",
        githubUrl: "https://github.com/jksalcedo/passvault",
    },
    {
        title: "PermissionManager️",
        description: "An open-source Android library that simplifies runtime permissions using Kotlin Coroutines, making asynchronous code clean and sequential.",
        techStack: ["Kotlin", "Coroutines", "AndroidX Activity", "JitPack"],
        image: "/images/permission-manager.png",
        githubUrl: "https://github.com/jksalcedo/android-permission-manager",
        liveDemoUrl: "https://jitpack.io/#jksalcedo/android-permission-manager", // Link to JitPack!
        liveDemoText: "View on JitPack"
    },
    // Add your 1-2 other best projects here
];