# LearnVM 🚀

**Learn Linux on Your Browser with AI-Powered Guidance**

LearnVM is an interactive browser-based learning platform that teaches Linux through real-time command execution, AI-driven assistance, and gamified progression. It provides users with a Linux terminal experience powered entirely in-browser using **CheerpX**, allowing learners to practice and master Linux skills without installing any software.

This project builds upon the work done during the [WebVM Hackathon](https://github.com/leaningtech/WebVMHackathon/blob/main/results2024.md), where a project won for its innovative use of WebAssembly and client-side virtual environments.

---

# Presentation 💻

**Slide deck**

Presentation slide for [LearnVM.](https://github.com/Jerryblessed/learnvm/blob/main/presentation/LearnVM.pptx).

---


## 📄 Overview

LearnVM offers a modular and interactive Linux Learning Management System (LMS) with these key components:

- **Split Workspace Interface**: One pane displays lessons/tasks, the other runs a fully functional terminal via CheerpX.
- **AI-Powered Tutor**: Learners can ask a virtual avatar questions about Linux topics, and receive smart, human-like answers powered by a generative LLM.
- **Gamified Progression**: Modules are unlocked upon completing prior tasks; users get real-time validation of their commands.
- **Prompt-Based Tutor Triggers**: Each lesson has AI prompts that help the tutor auto-respond or guide learners during errors or curiosity.

---

## 🚀 Key Features

- **Real Linux Execution** in Browser via CheerpX
- **Human Avatar Tutor** powered by Generative AI
- **Task-Based Learning Modules** with Validation
- **Interactive Prompt Engine** tied to LMS context
- **No Installation Required**

---

## 📷 Screenshots

### Landing Page
![Landing Page](https://github.com/Jerryblessed/learnvm/blob/main/images/Landing_page.png)

### AI Tutor Page
![AI Tutor Page](https://github.com/Jerryblessed/learnvm/blob/main/images/AI_tutor_page.png)

### LMS Terminal Split View
![CheerpX LMS View](https://github.com/Jerryblessed/learnvm/blob/main/images/charpx_LMS.png)

### AI Prompt Integration with Tutor
![Prompt Context Example](https://github.com/Jerryblessed/learnvm/blob/main/images/charpx_AItutor_prompt.png)

---

## 📚 How It Works

- **Frontend**: React-based interface with module/task display and embedded terminal view.
- **CheerpX**: Provides an emulated Linux terminal directly in the browser.
- **AI Tutor**: Listens to student questions or errors and responds with guidance, using LLMs.
- **Progression System**: Tracks completion of terminal tasks and moves the user to the next challenge.

---

## 👨‍💼 Ideal For

- Students studying Linux fundamentals
- Bootcamps teaching command line basics
- Universities needing browser-based labs
- Developers preparing for DevOps/Sysadmin roles

---

## 🧱 Future Enhancements

- Lesson Bookmarking & Progress Tracking
- Support for Additional Environments (Docker, Git, etc.)
- Quizzes & Certification
- Community Forum/Support built into the LMS

---

## 📊 Tech Stack

- **React.js**: Frontend framework
- **CheerpX**: Browser-based x86 virtualization
- **LLMs**: AI Tutor backed by generative models (e.g., GPT)
- **TailwindCSS**: For UI styling

---

## 🕹️ Getting Started (Dev Setup)

1. Clone the repository
```bash
git clone https://github.com/Jerryblessed/learnvm.git
cd learnvm
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Visit `http://localhost:3000` in your browser

---

## 🌟 Acknowledgment

This platform builds upon previous winning solution at the [WebVM Hackathon](https://github.com/leaningtech/WebVMHackathon/blob/main/results2024.md), where client-side Linux execution with CheerpX was explored. LearnVM evolves that prototype into a complete educational tool for Linux.

---

## 🙌 Join Us!
Have ideas, feedback, or want to contribute? Open an issue or fork the repo. Let's make learning Linux fun, interactive, and accessible to all.

---

> Made with ❤️ using CheerpX and open-source technologies.
