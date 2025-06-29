import React, { useState, useEffect, useRef, useCallback } from 'react';

// --- Custom Hook for Window Size ---
function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });
    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return windowSize;
}

// --- SVG Icons ---
const icons = {
    user: ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> ),
    code: ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg> ),
    briefcase: ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg> ),
    mail: ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg> ),
    terminal: ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg> ),
};

// --- Content Components for Windows ---
const AboutContent = () => ( <div className="p-6 text-sm md:text-base flex flex-col md:flex-row items-center"> <img src="https://placehold.co/100x100/7c3aed/ffffff?text=YOU" alt="Your Name" className="flex-shrink-0 mb-4 md:mb-0 md:mr-6 rounded-full w-24 h-24 shadow-lg border-2 border-white/20"/> <div> <h2 className="text-xl font-bold mb-2 text-violet-300 text-center md:text-left">Hello, I'm [Your Name]</h2> <p className="mb-4"> A seasoned Senior Developer with a passion for architecting elegant solutions and bringing complex ideas to life. With over a decade of experience, I've honed my skills in creating applications that are not just functional, but also scalable, robust, and delightful to use. </p> <p className="mb-4"> My philosophy revolves around clean code, thoughtful design, and continuous learning. I thrive in collaborative environments and enjoy mentoring others. </p> <p>This interactive portfolio is a small demonstration of what I love to do: build creative and engaging user experiences.</p> </div> </div> );

const SkillsContent = () => {
    const skillsData = [
        { name: 'React & Next.js', level: 95, type: 'javascript', snippet: `const Greet = ({ name }) => <div>Hello, {name}!</div>;\n\n// To see output, we need to 'render' it.\n// This is a simplified representation.\nconsole.log('Component defined: <Greet name="World" />');` },
        { name: 'Node.js & Express', level: 90, type: 'javascript', snippet: `// This is a browser simulation\n// 'require' is not available here.\n\nfunction handleRequest(url) {\n  if (url === '/api/data') {\n    return { success: true, data: ['item1', 'item2'] };\n  }\n  return { error: 'Not Found' };\n}\n\nconsole.log('Simulating request to /api/data:');\nconsole.log(handleRequest('/api/data'));` },
        { name: 'Rust', level: 65, type: 'rust', snippet: `fn main() {\n    println!("Hello, Rust!");\n}` },
        { name: 'Python', level: 80, type: 'python', snippet: `def greet(name):\n  return f"Hello, {name} from Python!"\n\nprint(greet("World"))` },
        { name: 'SQL', level: 85, type: 'sql', snippet: `SELECT name, price\nFROM products\nWHERE category_id = 2\nORDER BY price DESC;` },
        { name: 'Dart', level: 70, type: 'dart', snippet: `void main() {\n  print('Hello, Dart!');\n}` },
    ];

    const [activeSkill, setActiveSkill] = useState(skillsData[0]);
    const [code, setCode] = useState(skillsData[0].snippet);
    const [output, setOutput] = useState('');

    const handleSkillSelect = (skill) => {
        setActiveSkill(skill);
        setCode(skill.snippet);
        setOutput('');
    };

    const handleCompile = () => {
        setOutput('Compiling...');
        try {
            if (activeSkill.type === 'javascript') {
                let capturedLogs = [];
                const originalConsoleLog = console.log;
                const originalWindowPrint = window.print;
                const captureLog = (...args) => { capturedLogs.push(args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : arg).join(' ')); };
                console.log = captureLog;
                window.print = captureLog;
                eval(code);
                console.log = originalConsoleLog;
                window.print = originalWindowPrint;
                setOutput(capturedLogs.join('\n') || 'Execution finished with no output.');
            } else if (activeSkill.type === 'python') { setOutput(`[Simulated Python Output]\nHello, World from Python!`);
            } else if (activeSkill.type === 'sql') { setOutput(`[Simulated SQL Output]\n- Gaming PC | 2500.00\n- Laptop | 1200.00`);
            } else if (activeSkill.type === 'rust') { setOutput(`[Simulated Rust Output]\nHello, Rust!`);
            } else if (activeSkill.type === 'dart') { setOutput(`[Simulated Dart Output]\nHello, Dart!`); }
        } catch (e) {
            console.log = console.log;
            window.print = window.print;
            setOutput(`Error: ${e.message}`);
        }
    };

    return (
        <div className="flex flex-col h-full bg-[#1e1e1e] font-mono text-sm text-white/90">
            <div className="flex flex-col md:flex-row flex-grow overflow-hidden">
                <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-white/10 p-4 space-y-4 overflow-y-auto">
                    {skillsData.map(skill => (
                        <div key={skill.name} onClick={() => handleSkillSelect(skill)} className="cursor-pointer group rounded-md p-2 -m-2 transition-colors hover:bg-white/5">
                            <p className={`font-medium mb-1 transition-colors ${activeSkill.name === skill.name ? 'text-violet-300' : 'text-white/70 group-hover:text-violet-400'}`}>{skill.name}</p>
                            <div className="w-full bg-black/20 rounded-full h-2.5">
                                <div className="bg-gradient-to-r from-violet-500 to-fuchsia-500 h-2.5 rounded-full" style={{ width: `${skill.level}%` }}></div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="w-full md:w-2/3 flex flex-col">
                    <div className="flex-shrink-0 p-2 border-b border-white/10 text-white/70">
                        Editing: {activeSkill.name}.{activeSkill.type === 'javascript' ? 'js' : activeSkill.type}
                    </div>
                    <textarea value={code} onChange={(e) => setCode(e.target.value)} className="flex-grow p-4 bg-[#1e1e1e] text-white/90 whitespace-pre-wrap w-full h-full resize-none outline-none" />
                    <div className="flex-shrink-0 border-t border-white/10">
                        <button onClick={handleCompile} className="w-full p-2 bg-violet-600 hover:bg-violet-500 transition-colors text-white font-bold"> Compile & Run </button>
                    </div>
                    <div className="flex-shrink-0 h-24 p-2 bg-black/30 overflow-y-auto">
                        <p className="text-xs text-white/50 font-bold uppercase mb-1">Output:</p>
                        <pre className="whitespace-pre-wrap text-green-400 text-xs">{output}</pre>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ProjectsContent = () => { const projects = [ { title: 'Project Alpha', desc: 'A real-time collaborative platform for remote teams.', tech: 'React, WebSockets, Node.js', link: '#' }, { title: 'Project Beta', desc: 'An e-commerce site with a custom recommendation engine.', tech: 'Next.js, PostgreSQL, Python', link: '#' }, { title: 'Project Gamma', desc: 'An open-source data visualization library.', tech: 'TypeScript, D3.js, React', link: '#' }, ]; return ( <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4"> {projects.map(p => ( <div key={p.title} className="bg-black/20 p-4 rounded-lg hover:bg-black/40 transition-colors duration-200"> <h3 className="font-bold text-violet-300">{p.title}</h3> <p className="text-sm my-1">{p.desc}</p> <p className="text-xs text-white/60 mb-2">Tech: {p.tech}</p> <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-sm text-cyan-400 hover:underline">View Project &rarr;</a> </div> ))} </div> ); };
const ContactContent = () => ( <div className="p-4 text-center"> <h2 className="text-xl font-bold mb-4 text-violet-300">Let's Connect</h2> <p className="mb-6">I'm always open to new opportunities and collaborations.</p> <div className="flex justify-center space-x-4"> <a href="mailto:your.email@example.com" className="bg-black/20 p-3 rounded-full hover:bg-violet-500 transition-colors"> {icons.mail} </a> <a href="#" className="bg-black/20 p-3 rounded-full hover:bg-violet-500 transition-colors"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg> </a> <a href="#" className="bg-black/20 p-3 rounded-full hover:bg-violet-500 transition-colors"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg> </a> </div> </div> );
const TerminalContent = ({ openWindow }) => { const [history, setHistory] = useState([ { output: 'Terminal app loaded. Type "help" for a list of commands.' }, ]); const inputRef = useRef(null); const terminalEndRef = useRef(null); const commands = { 'help': () => 'Available commands: about, skills, projects, contact, clear, whoami, date, echo [text]', 'about': () => { openWindow('about'); return 'Opening About Me window...'; }, 'skills': () => { openWindow('skills'); return 'Opening Skills window...'; }, 'projects': () => { openWindow('projects'); return 'Opening Projects window...'; }, 'contact': () => { openWindow('contact'); return 'Opening Contact window...'; }, 'whoami': () => 'guest', 'date': () => new Date().toString(), 'clear': () => { setHistory([]); return ''; }, 'echo': (args) => args.join(' '), }; const handleKeyDown = (e) => { if (e.key === 'Enter') { const fullInput = e.target.value; const [command, ...args] = fullInput.trim().split(' '); e.target.value = ''; let output; if (command in commands) { output = commands[command](args); } else if (command) { output = `Command not found: ${command}`; } const newHistory = [...history, { input: `> ${fullInput}` }]; if(output) newHistory.push({ output }); setHistory(newHistory); } }; useEffect(() => { if(inputRef.current) inputRef.current.focus(); }, []); useEffect(() => { terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [history]); return ( <div className="p-2 bg-black/50 h-full flex flex-col font-mono text-sm text-green-400" onClick={() => inputRef.current.focus()}> <div className="flex-grow overflow-y-auto pr-2"> {history.map((line, i) => ( <div key={i}> {line.input && <p className="text-white/80">{line.input}</p>} {line.output && <p className="whitespace-pre-wrap">{line.output}</p>} </div> ))} <div ref={terminalEndRef} /> </div> <div className="flex"> <span className="text-green-400 mr-2">&gt;</span> <input ref={inputRef} type="text" onKeyDown={handleKeyDown} className="bg-transparent border-none outline-none w-full text-green-400" autoComplete="off" /> </div> </div> ); };

const appConfig = {
    about: { title: 'About Me', ContentComponent: AboutContent, size: { width: 500, height: 350 } },
    skills: { title: 'Skills', ContentComponent: SkillsContent, size: { width: 700, height: 500 } },
    projects: { title: 'Projects', ContentComponent: ProjectsContent, size: { width: 600, height: 400 } },
    contact: { title: 'Contact', ContentComponent: ContactContent, size: { width: 350, height: 250 } },
    terminal: { title: 'Terminal', ContentComponent: TerminalContent, size: { width: 550, height: 350 } },
};

// --- Core UI Components ---
const TopBar = ({ onMinimize, showMinimize }) => { const [time, setTime] = useState(new Date()); useEffect(() => { const timer = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(timer); }, []); return ( <div className="absolute top-0 left-0 right-0 h-8 bg-black/20 backdrop-blur-md text-white flex items-center justify-between px-4 text-sm z-50"> {showMinimize ? (<button onClick={onMinimize} className="text-cyan-400"> &larr; Back </button>) : (<div>Portfolio OS</div>)} <div>{time.toLocaleTimeString()}</div> </div> ); };
const AnimatedBackground = () => ( <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden bg-gray-900"> <div className="absolute w-[500px] h-[500px] bg-violet-800 rounded-full -top-40 -left-40 filter blur-3xl opacity-30 animate-pulse-slow"></div> <div className="absolute w-[400px] h-[400px] bg-cyan-600 rounded-full bottom-0 -right-40 filter blur-3xl opacity-20 animate-pulse-slow animation-delay-2000"></div> </div> );
const Window = ({ app, onClose, onFocus, style, children, isMobile }) => { const [position, setPosition] = useState(style.position); const [size, setSize] = useState(style.size); const [isDragging, setIsDragging] = useState(false); const dragStartPos = useRef({ x: 0, y: 0 }); const windowRef = useRef(null); const handleDragStart = (e) => { if (isMobile || e.target.tagName === 'BUTTON') return; setIsDragging(true); onFocus(); dragStartPos.current = { x: e.clientX - position.x, y: e.clientY - position.y, }; }; const handleDrag = useCallback((e) => { if (isDragging && windowRef.current) { let newX = e.clientX - dragStartPos.current.x; let newY = e.clientY - dragStartPos.current.y; const windowWidth = windowRef.current.offsetWidth; const titleBarHeight = 32; if (newX < -(windowWidth - 50)) newX = -(windowWidth - 50); if (newX > window.innerWidth - 50) newX = window.innerWidth - 50; if (newY < 0) newY = 0; if (newY > window.innerHeight - titleBarHeight) newY = window.innerHeight - titleBarHeight; setPosition({ x: newX, y: newY }); } }, [isDragging]); const handleDragEnd = useCallback(() => { setIsDragging(false); }, []); useEffect(() => { if (isDragging) { window.addEventListener('mousemove', handleDrag); window.addEventListener('mouseup', handleDragEnd); } return () => { window.removeEventListener('mousemove', handleDrag); window.removeEventListener('mouseup', handleDragEnd); }; }, [isDragging, handleDrag, handleDragEnd]); const mobileClasses = "top-8 left-0 w-full h-[calc(100vh-2rem)] rounded-none border-none"; const desktopClasses = "bg-black/30 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl"; return ( <div ref={windowRef} className={`absolute flex-col overflow-hidden ${isMobile ? mobileClasses : desktopClasses}`} style={{ left: isMobile ? 0 : `${position.x}px`, top: isMobile ? '2rem' : `${position.y}px`, width: isMobile ? '100%' : `${size.width}px`, height: isMobile ? 'calc(100% - 2rem)' : `${size.height}px`, zIndex: style.zIndex, display: app.minimized ? 'none' : 'flex' }} onClick={onFocus} > <div className={`h-8 bg-white/5 flex-shrink-0 flex items-center justify-between px-2 ${isMobile ? '' : 'cursor-grab rounded-t-lg'}`} onMouseDown={handleDragStart} > <div className="flex items-center space-x-2"> <button onClick={onClose} className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-400"></button> <div className="w-3 h-3 bg-yellow-500 rounded-full cursor-not-allowed"></div> <div className="w-3 h-3 bg-green-500 rounded-full cursor-not-allowed"></div> </div> <span className="text-xs font-semibold select-none">{app.title}</span> <div className="w-14"></div> </div> <div className="flex-grow overflow-y-auto overflow-x-hidden"> {children} </div> </div> ); };
const Dock = ({ onIconClick, windows }) => { const apps = [ { id: 'about', title: 'About Me', icon: icons.user }, { id: 'skills', title: 'Skills', icon: icons.code }, { id: 'projects', title: 'Projects', icon: icons.briefcase }, { id: 'contact', title: 'Contact', icon: icons.mail }, { id: 'terminal', title: 'Terminal', icon: icons.terminal }, ]; return ( <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50"> <div className="flex items-end h-16 md:h-20 space-x-1 md:space-x-2 bg-black/20 backdrop-blur-xl border border-white/10 p-2 rounded-2xl"> {apps.map(app => ( <div key={app.id} className="relative"> <button onClick={() => onIconClick(app.id)} className="w-12 h-12 md:w-14 md:h-14 bg-white/10 rounded-xl flex items-center justify-center text-white/80 transition-all duration-200 hover:bg-white/20 md:hover:-translate-y-2 hover:text-white" title={app.title} > {app.icon} </button> {windows[app.id] && ( <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-cyan-400 rounded-full"></div> )} </div> ))} </div> </div> ); };

// --- Main App Component ---
export default function App() {
    const [windows, setWindows] = useState({});
    const [focusOrder, setFocusOrder] = useState([]);
    const { width } = useWindowSize();
    const isMobile = width < 768;

    const focusWindow = (appId) => {
        setFocusOrder(currentFocusOrder => {
            if (currentFocusOrder.length > 0 && currentFocusOrder[currentFocusOrder.length - 1] === appId) return currentFocusOrder;
            return [...currentFocusOrder.filter(id => id !== appId), appId];
        });
    };

    const handleIconClick = useCallback((appId) => {
        const windowExists = windows[appId];
        if (windowExists) {
            const isMinimized = windowExists.minimized;
            const isFocused = focusOrder.length > 0 && focusOrder[focusOrder.length - 1] === appId;
            if (isMinimized) {
                setWindows(current => ({ ...current, [appId]: { ...current[appId], minimized: false } }));
                focusWindow(appId);
            } else {
                if (isFocused) {
                    setWindows(current => ({ ...current, [appId]: { ...current[appId], minimized: true } }));
                } else {
                    focusWindow(appId);
                }
            }
        } else {
            const newWindow = {
                id: appId,
                ...appConfig[appId],
                position: { x: (window.innerWidth / 2 - appConfig[appId].size.width / 2) + (Math.random() - 0.5) * 100, y: (window.innerHeight / 2 - appConfig[appId].size.height / 2) + (Math.random() - 0.5) * 100 },
                minimized: false,
            };
            setWindows(current => ({ ...current, [appId]: newWindow }));
            focusWindow(appId);
        }
    }, [windows, focusOrder]);

    const closeWindow = (appId) => {
        setWindows(currentWindows => {
            const newWindows = { ...currentWindows };
            delete newWindows[appId];
            return newWindows;
        });
        setFocusOrder(currentFocusOrder => currentFocusOrder.filter(id => id !== appId));
    };

    const getWindowStyle = (appId) => {
        const zIndex = focusOrder.indexOf(appId) + 10;
        return { ...windows[appId], zIndex };
    };

    useEffect(() => {
        handleIconClick('about');
    }, []);

    const focusedAppId = focusOrder.length > 0 ? focusOrder[focusOrder.length - 1] : null;
    const focusedWindow = focusedAppId ? windows[focusedAppId] : null;
    const showMinimizeButton = isMobile && focusedWindow && !focusedWindow.minimized;

    return (
        <div className="w-screen h-screen overflow-hidden text-white font-sans select-none">
            <AnimatedBackground />
            <TopBar onMinimize={() => handleIconClick(focusedAppId)} showMinimize={showMinimizeButton} />
            <main className="w-full h-full pt-8">
                {Object.values(windows).map(app => {
                    const { ContentComponent } = appConfig[app.id];
                    return (
                        <Window key={app.id} app={app} style={getWindowStyle(app.id)} onClose={() => closeWindow(app.id)} onFocus={() => focusWindow(app.id)} isMobile={isMobile}>
                            <ContentComponent openWindow={handleIconClick} />
                        </Window>
                    )
                })}
            </main>
            {(isMobile && showMinimizeButton) ? null : <Dock onIconClick={handleIconClick} windows={windows} />}
        </div>
    );
}