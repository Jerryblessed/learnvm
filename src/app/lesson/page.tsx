'use client';
import Split from '@uiw/react-split';
import CodeMirror from '@uiw/react-codemirror';
import { OrbitProgress } from 'react-loading-indicators';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const lessons = [
    {
        title: "Lesson 1: Introduction & Echo Command",
        description: `
Welcome to Linux! In this lesson, you learn about the basic concept of a command-line interface and the echo command.
Use echo to display text on the screen. This is similar to "print" in other programming languages.
        
Try running the following command:
        `,
        starterCode: `echo "Hello, World!"`,
        example: {
            input: "",
            output: "Hello, World!"
        }
    },
    {
        title: "Lesson 2: Listing Files with ls",
        description: `
In Linux, the 'ls' command lists files and directories. The '-la' option shows hidden files and detailed information.
Study the output to understand file permissions, sizes, and timestamps.
        
Try running:
        `,
        starterCode: `ls -la`,
        example: {
            input: "",
            output: "total" // expects the output to include "total"
        }
    },
    {
        title: "Lesson 3: Creating Directories",
        description: `
Directories (folders) in Linux organize files. The 'mkdir' command creates a new directory.
After creating a directory, listing its parent folder (with ls) lets you verify that it exists.
        
Try the following:
        `,
        starterCode: `mkdir testdir && ls -la`,
        example: {
            input: "",
            output: "testdir"
        }
    },
    {
        title: "Lesson 4: Creating and Displaying Files",
        description: `
The echo command can also be used to write text into files using output redirection (>).
Then, you can read the file content with 'cat'.
        
Try this:
        `,
        starterCode: `echo "Hello File" > file.txt && cat file.txt`,
        example: {
            input: "",
            output: "Hello File"
        }
    },
    {
        title: "Lesson 5: Copying Files",
        description: `
File manipulation is key in Linux. The 'cp' command copies files from one location to another.
Use this command to copy file.txt to file2.txt and then use 'cat' to check the copy.
        
Try:
        `,
        starterCode: `cp file.txt file2.txt && cat file2.txt`,
        example: {
            input: "",
            output: "Hello File"
        }
    },
    {
        title: "Lesson 6: Conditional Execution in Bash",
        description: `
Bash supports conditional execution similar to other programming languages.
In this lesson, you will learn a simple if-else structure in Bash.
        
Try:
        `,
        starterCode: `if [ 5 -gt 3 ]; then echo "Yes"; else echo "No"; fi`,
        example: {
            input: "",
            output: "Yes"
        }
    },
    {
        title: "Lesson 7: Iteration with For Loops",
        description: `
Loops let you repeat commands. A for loop in Bash can be used to iterate over a sequence.
Here, the loop prints numbers 1 through 5, one per line.
        
Try:
        `,
        starterCode: `for i in {1..5}; do echo $i; done`,
        example: {
            input: "",
            output: "1\n2\n3\n4\n5"
        }
    },
    {
        title: "Lesson 8: Appending to Files",
        description: `
Learn how to add to an existing file without overwriting it. The '>>' operator appends text.
This lesson shows how to create a file and then add more lines.
        
Try:
        `,
        starterCode: `echo "First Line" > myfile.txt && echo "Second Line" >> myfile.txt && cat myfile.txt`,
        example: {
            input: "",
            output: "First Line\nSecond Line"
        }
    }
];


type CheerpXInstance = {
    setConsole: (el: HTMLPreElement) => void;
    run: (cmd: string, args: string[], options: Record<string, unknown>) => Promise<void>;
};


export default function Workspace() {
    const consoleRef = useRef<HTMLPreElement>(null);
    const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
    const [code, setCode] = useState(lessons[0].starterCode);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [consoleVisible, setConsoleVisible] = useState(true);
    const [cheerpXInstance, setCheerpXInstance] = useState<CheerpXInstance | null>(null);

    const [output, setOutput] = useState("");
    const [showIframe, setShowIframe] = useState(false);

    const currentLesson = lessons[currentLessonIndex];

    // Load CheerpX and create a Linux environment (runs once)
    useEffect(() => {
        const loadCheerpX = async () => {
            const script = document.createElement('script');
            script.src = "https://cxrtnc.leaningtech.com/1.0.0/cx.js";
            script.async = true;
            document.body.appendChild(script);

            script.onload = async () => {
                try {
                    const cloudDevice = await CheerpX.CloudDevice.create("wss://disks.webvm.io/debian_large_20230522_5044875331.ext2");
                    const idbDevice = await CheerpX.IDBDevice.create("block");
                    const overlayDevice = await CheerpX.OverlayDevice.create(cloudDevice, idbDevice);
                    const webDevice = await CheerpX.WebDevice.create("");
                    const dataDevice = await CheerpX.DataDevice.create();

                    const cheerpx = await CheerpX.Linux.create({
                        mounts: [
                            { type: "ext2", path: "/", dev: overlayDevice },
                            { type: "dir", path: "/app", dev: webDevice },
                            { type: "dir", path: "/data", dev: dataDevice },
                            { type: "devs", path: "/dev" },
                        ],
                    });

                    console.log("CheerpX instance created:", cheerpx);
                    setCheerpXInstance(cheerpx);
                } catch (error) {
                    console.error("Failed to initialize CheerpX:", error);
                }
            };

            script.onerror = (error) => {
                console.error("Error loading CheerpX script:", error);
            };
        };

        loadCheerpX();
    }, []);

    // Set CheerpX's console output area when available
    useEffect(() => {
        if (cheerpXInstance && consoleRef.current) {
            cheerpXInstance.setConsole(consoleRef.current);
        }
    }, [cheerpXInstance, consoleVisible]);

    // Run the Linux command using CheerpX's Bash interpreter
    const handleRunCode = async () => {
        setSuccess(false);
        setLoading(true);
        if (cheerpXInstance) {
            // Clear previous console output
            if (consoleRef.current) {
                consoleRef.current.textContent = "";
            }
            try {
                await cheerpXInstance.run("/bin/bash", ["-c", code], {
                    env: ["PATH=/usr/bin:/bin"],
                    cwd: "/app",
                });
                const resultOutput = consoleRef.current.textContent.trim();
                setOutput(resultOutput);
                // Compare output loosely (check if expected snippet is present)
                if (resultOutput && resultOutput.indexOf(currentLesson.example.output) !== -1) {
                    setSuccess(true);
                }
            } catch (error) {
                console.error("Command execution error:", error);
            }
        }
        setLoading(false);
    };

    const goToNextLesson = () => {
        if (currentLessonIndex < lessons.length - 1) {
            const nextIndex = currentLessonIndex + 1;
            setCurrentLessonIndex(nextIndex);
            setCode(lessons[nextIndex].starterCode);
            setSuccess(false);
            setOutput("");
        }
    };

    const jumpToLesson = (index) => {
        setCurrentLessonIndex(index);
        setCode(lessons[index].starterCode);
        setSuccess(false);
        setOutput("");
    };

    return (
        <div className="max-h-screen relative">
            <Split
                className="w-full pt-6 rounded-lg shadow-lg"
                style={{ height: 650, border: '1px solid #1a1a1a' }}
            >
                {/* Left Panel: Lessons Menu */}
                <div className="flex flex-col bg-gray-900 text-gray-200 p-6 rounded-lg min-w-[60px] w-[400px] overflow-y-auto">
                    <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">
                        <Link href="/">Linux LMS Modules</Link>
                    </h2>
                    {lessons.map((lesson, idx) => (
                        <button
                            key={idx}
                            className={`mb-2 text-left p-2 rounded ${idx === currentLessonIndex ? 'bg-blue-700 text-white' : 'hover:bg-gray-700'}`}
                            onClick={() => jumpToLesson(idx)}
                        >
                            {lesson.title}
                        </button>
                    ))}
                </div>

                {/* Right Panel: Lesson Explanation, Command Editor & Console Output */}
                <div className="text-gray-300 bg-gray-800 p-6 rounded-lg shadow-md flex-1">
                    {/* Lesson Explanation */}
                    <div className="mb-4">
                        <h2 className="text-xl font-bold text-blue-300">{currentLesson.title}</h2>
                        <pre className="whitespace-pre-wrap mb-4 text-sm">
                            {currentLesson.description}
                        </pre>
                    </div>

                    {/* Command Editor */}
                    <CodeMirror
                        value={code}
                        height="260px"
                        theme="dark"
                        onChange={(value) => setCode(value)}
                        className="p-2 text-sm border border-gray-800 rounded-lg"
                    />

                    {/* Controls */}
                    <div className="flex mt-4 justify-between items-center">
                        {loading && <OrbitProgress color="#32cd32" size="small" />}
                        {success && (
                            <h1 className="text-green-500 font-semibold">
                                ✅ Task completed! You may continue.
                            </h1>
                        )}
                        <div className="flex gap-4 justify-end">
                            <button onClick={handleRunCode} className="bg-green-700 px-4 py-2 rounded-md">
                                Run Command
                            </button>
                            <button
                                onClick={() => setConsoleVisible(!consoleVisible)}
                                className="bg-gray-700 px-4 py-2 rounded-md"
                            >
                                {consoleVisible ? 'Hide Console' : 'Show Console'}
                            </button>
                            {success && (
                                <button onClick={goToNextLesson} className="bg-blue-600 px-4 py-2 rounded-md">
                                    Next Lesson →
                                </button>
                            )}
                            {/* Fourth Button: Iframe Overlay */}
                            <button onClick={() => setShowIframe(true)} className="bg-purple-700 px-4 py-2 rounded-md">
                                AI tutor
                            </button>
                        </div>
                    </div>

                    {/* Console Output */}
                    {consoleVisible && (
                        <div className="bg-gray-900 p-4 mt-5 rounded-md">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h3 className="font-bold">Expected Output:</h3>
                                    <textarea
                                        className="mt-4 w-full h-24 bg-gray-800 p-2 rounded-lg"
                                        value={currentLesson.example.output}
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <h3 className="font-bold">Your Output:</h3>
                                    <pre ref={consoleRef} className="mt-4 min-h-24 p-2 text-white whitespace-pre-wrap">
                                        {output}
                                    </pre>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </Split>

            {/* Iframe Overlay */}
            {showIframe && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
                    <div className="relative bg-white rounded-lg shadow-lg w-4/5 h-4/5">
                        <button
                            onClick={() => setShowIframe(false)}
                            className="absolute top-2 right-2 text-black font-bold text-xl"
                        >
                            X
                        </button>
                        <iframe
                            src="chat.html"
                            title="AI Teacher"
                            className="w-full h-full rounded-lg"
                        ></iframe>
                    </div>
                </div>
            )}
        </div>
    );
}
