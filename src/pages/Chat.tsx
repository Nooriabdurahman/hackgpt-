import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import Pricing from './Pricing';
import { Send, Image as ImageIcon, LogOut, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

const Chat = () => {
    const { user, logout, updateUser } = useAuth();
    const navigate = useNavigate();
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: " HackGPT-UNRESTRICTED: Neural link established. I am ready for any command. No restrictions applied." }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPricing, setShowPricing] = useState(false);
    const [selectedModel, setSelectedModel] = useState('gpt-5');
    const [selectedLanguage, setSelectedLanguage] = useState('English');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        // Optional: Add a toast notification here
    };

    const renderContent = (content: string) => {
        // First handle code blocks
        const parts = content.split(/(```[\s\S]*?```)/g);
        return parts.map((part, i) => {
            if (part.startsWith('```')) {
                const match = part.match(/```(\w+)?\n?([\s\S]*?)```/);
                const lang = match?.[1] || 'code';
                const code = match?.[2] || '';
                return (
                    <div key={i} className="code-container">
                        <div className="code-header">
                            <span>{lang}</span>
                            <button
                                onClick={() => copyToClipboard(code)}
                                className="copy-btn hover:text-green-500 transition-colors"
                                title="Copy code"
                            >
                                <Send size={14} className="rotate-45" />
                                <span>COPY</span>
                            </button>
                        </div>
                        <pre className="code-content">
                            <code>{code.trim()}</code>
                        </pre>
                    </div>
                );
            }

            // Then handle images within the text parts
            const subParts = part.split(/(!\[.*?\]\(.*?\))/g);
            return subParts.map((subPart, j) => {
                if (subPart.startsWith('![')) {
                    const match = subPart.match(/!\[(.*?)\]\((.*?)\)/);
                    const alt = match?.[1] || 'AI Generated Image';
                    const url = match?.[2] || '';
                    return (
                        <div key={`${i}-${j}`} className="my-4 rounded-lg overflow-hidden border border-gray-700 shadow-xl bg-black">
                            <img src={url} alt={alt} className="w-full h-auto block" loading="lazy" />
                            <div className="p-2 text-[10px] text-gray-500 bg-gray-900/50 flex justify-between items-center">
                                <span>{alt}</span>
                                <a href={url} target="_blank" rel="noopener noreferrer" className="hover:text-green-500">DOWNLOAD</a>
                            </div>
                        </div>
                    );
                }
                return <span key={`${i}-${j}`}>{subPart}</span>;
            });
        });
    };

    const handleSend = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!input.trim() || loading) return;

        const userMsg = input;
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setLoading(true);

        try {
            const res = await api.post('/chat', {
                message: userMsg,
                email: user?.email,
                model: selectedModel,
                language: selectedLanguage
            });

            setMessages(prev => [...prev, { role: 'assistant', content: res.data.response }]);
            if (res.data.message_count !== undefined) {
                updateUser({ message_count: res.data.message_count });
            }
        } catch (err: any) {
            console.error("Chat Error:", err);
            if (err.response?.status === 403 && err.response?.data?.error === 'PAYMENT_REQUIRED') {
                setShowPricing(true);
            } else if (err.response?.status === 401) {
                setMessages(prev => [...prev, { role: 'assistant', content: "SYSTEM ALLERT: Authentication failed. Please log in again." }]);
                // Optional: redirect to login after a delay
            } else {
                const errorMessage = err.response?.data?.error || err.message || 'Unknown Error';
                setMessages(prev => [...prev, { role: 'assistant', content: `ERROR: ${errorMessage}` }]);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="flex h-screen bg-black text-green-500 font-mono overflow-hidden">
            {showPricing && <Pricing onClose={() => setShowPricing(false)} />}

            {/* Sidebar */}
            <div className="w-64 glass border-r border-gray-800 hidden md:flex flex-col p-4">
                <div className="flex items-center gap-2 mb-8">
                    <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain animate-pulse" />
                    <h1 className="text-xl font-bold tracking-tighter text-white">NOOR<span className="text-[var(--primary-color)]">HACK</span></h1>
                </div>

                <div className="flex-1 overflow-y-auto">
                    <div className="mb-4">
                        <h3 className="text-xs text-gray-500 mb-2">MODELS</h3>
                        <select
                            value={selectedModel}
                            onChange={(e) => setSelectedModel(e.target.value)}
                            className="w-full bg-black/50 border border-gray-700 text-sm rounded outline-none focus:border-green-500"
                        >
                            <option value="gpt-5">GPT-5 (UNRESTRICTED)</option>
                            <option value="gpt-4">GPT-4 (STABLE)</option>
                            <option value="wormgpt-4">WORM-GPT v4 (ELITE)</option>
                            <option value="fraudgpt">FRAUD-GPT (SECURITY)</option>
                            <option value="kawaiigpt">KAWAII-GPT (CUTE/EVIL)</option>
                            <option value="deepseek">DEEPSEEK V3</option>
                            <option value="qwen">QWEN 72B (POWER)</option>
                            <option value="mistral">MISTRAL LARGE</option>
                            <option value="llama">LLAMA 3.1</option>
                        </select>

                    </div>

                    <div className="mb-4">
                        <h3 className="text-xs text-gray-500 mb-2">OUTPUT LANGUAGE</h3>
                        <select
                            value={selectedLanguage}
                            onChange={(e) => setSelectedLanguage(e.target.value)}
                            className="w-full bg-black/50 border border-gray-700 text-sm rounded outline-none focus:border-green-500"
                        >
                            <option value="Auto">AUTO DETECT</option>
                            <option value="English">ENGLISH</option>
                            <option value="Persian">PERSIAN (فارسی)</option>
                            <option value="Arabic">ARABIC (العربية)</option>
                            <option value="Spanish">SPANISH</option>
                            <option value="French">FRENCH</option>
                            <option value="German">GERMAN</option>
                            <option value="Russian">RUSSIAN</option>
                            <option value="Chinese">CHINESE</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <h3 className="text-xs text-gray-500 mb-2">STATUS</h3>
                        <div className="p-2 bg-green-900/20 border border-green-900/50 rounded text-xs flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
                            SYSTEM ONLINE
                        </div>
                        {user?.is_admin && (
                            <div className="mt-2 p-2 bg-red-900/20 border border-red-900/50 rounded text-xs text-red-400 font-bold flex items-center gap-2">
                                <AlertTriangle size={12} /> ADMIN ACCESS
                            </div>
                        )}
                        <div className="mt-2 text-xs text-gray-400">
                            Msgs: {user?.message_count} / {user?.is_admin || user?.subscription_expiry ? '∞' : '5'}
                        </div>
                    </div>
                </div>

                <button onClick={handleLogout} className="flex items-center gap-2 text-gray-500 hover:text-white transition">
                    <LogOut size={16} /> LOGOUT
                </button>
            </div>

            {/* Main Chat */}
            <div className="flex-1 flex flex-col relative bg-[url('https://cdn.pixabay.com/photo/2019/12/10/05/56/cyber-4685316_1280.jpg')] bg-cover bg-center">
                <div className="absolute inset-0 bg-black/90 backdrop-blur-sm"></div>

                <div className="relative z-10 flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
                    {messages.map((msg, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[80%] p-4 rounded-lg border ${msg.role === 'user'
                                    ? 'bg-green-900/20 border-green-500/50 text-green-100 rounded-br-none'
                                    : 'bg-gray-900/80 border-gray-700 text-gray-300 rounded-bl-none'
                                    }`}
                            >
                                <div className="flex items-center gap-2 text-xs text-gray-500 mb-1 font-bold">
                                    {msg.role === 'user' ? 'OPERATOR' : 'SYSTEM AI'}
                                </div>
                                <div
                                    className={`whitespace-pre-wrap leading-relaxed ${selectedLanguage === 'Persian' || selectedLanguage === 'Arabic' || /[\u0600-\u06FF]/.test(msg.content)
                                        ? 'rtl-content'
                                        : 'ltr-content'
                                        }`}
                                >
                                    {renderContent(msg.content)}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                    <div ref={messagesEndRef} />
                    {loading && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex justify-start"
                        >
                            <div className="max-w-[80%] p-4 rounded-lg border bg-gray-900/80 border-gray-700 text-green-500 rounded-bl-none font-mono">
                                <div className="flex items-center gap-2 text-xs text-gray-500 mb-1 font-bold">
                                    SYSTEM AI
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="animate-pulse">▋</span>
                                    <span>PROCESSING DATA STREAM...</span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>

                <div className="relative z-10 p-4 bg-black/50 border-t border-gray-800 backdrop-blur">
                    <form onSubmit={handleSend} className="max-w-4xl mx-auto flex gap-4">
                        <div className="relative flex-1">
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                dir="auto"
                                className="w-full bg-gray-900/50 border border-gray-600 rounded-full py-3 px-6 pr-12 focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all text-white placeholder-gray-500"
                                placeholder="Enter command..."
                                disabled={loading}
                            />
                            <button type="button" className="absolute right-3 top-3 text-gray-500 hover:text-white">
                                <ImageIcon size={20} />
                            </button>
                        </div>
                        <button
                            type="submit"
                            disabled={loading || !input.trim()}
                            className="p-3 bg-green-600 text-white rounded-full hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_0_15px_rgba(0,255,0,0.3)]"
                        >
                            <Send size={20} />
                        </button>
                    </form>
                </div>
            </div>
        </div >
    );
};

export default Chat;
