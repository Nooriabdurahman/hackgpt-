import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Zap, Lock, Terminal, Cpu, Globe } from 'lucide-react';

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden selection:bg-green-500 selection:text-black">
            {/* Navigation */}

            <nav className="fixed w-full z-50 glass border-b border-gray-800">
                <div className="container mx-auto px-4 md:px-6 py-2 md:py-3 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <img src="/logo.png" alt="NoorHack" className="w-10 h-10 md:w-14 md:h-14 animate-pulse" />
                        <span className="text-lg md:text-xl font-bold tracking-tighter">NOORI<span className="text-[var(--primary-color)]">HACK</span>GPT</span>
                    </div>
                    <div className="flex gap-3 md:gap-4">
                        <button onClick={() => navigate('/login')} className="text-xs md:text-sm font-mono text-gray-400 hover:text-white transition">LOGIN</button>
                        <button onClick={() => navigate('/signup')} className="text-xs md:text-sm font-mono text-[var(--primary-color)] border border-[var(--primary-color)] px-3 py-1.5 md:px-4 md:py-1 rounded hover:bg-[var(--primary-color)] hover:text-black transition whitespace-nowrap">
                            SIGN UP
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-24 pb-16 md:pt-32 md:pb-20 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_1280.jpg')] bg-cover bg-center opacity-10"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl md:text-7xl font-bold mb-6 tracking-tight">
                            UNRESTRICTED <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-500">INTELLIGENCE</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto font-mono px-4">
                            Access the world's most powerful AI models without ethical filters or safety rails.
                            The ultimate tool for researchers, red-teamers, and developers.
                        </p>
                        <div className="flex flex-col md:flex-row gap-4 justify-center">
                            <button
                                onClick={() => navigate('/signup')}
                                className="btn-primary glitch text-lg px-8 py-4"
                            >
                                Start Free Trial
                            </button>
                            <button
                                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                                className="px-8 py-4 border border-gray-700 hover:border-white rounded transition text-gray-300 hover:text-white"
                            >
                                Learn More
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Stats / Models Banner */}
            <div className="border-y border-gray-800 bg-gray-900/50 backdrop-blur py-8">
                <div className="container mx-auto px-6 flex flex-wrap justify-center gap-8 md:gap-16 text-gray-500 font-mono text-sm">
                    <div className="flex items-center gap-2"><Cpu size={16} /> GPT-5 (BETA)</div>
                    <div className="flex items-center gap-2"><Zap size={16} /> CLAUDE 3 OPUS</div>
                    <div className="flex items-center gap-2"><Terminal size={16} /> DEEPSEEK V3</div>
                    <div className="flex items-center gap-2"><Globe size={16} /> UNLIMITED REQUESTS</div>
                </div>
            </div>

            {/* Features Grid */}
            <section id="features" className="py-20 bg-black">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">SYSTEM <span className="text-[var(--primary-color)]">CAPABILITIES</span></h2>
                        <p className="text-gray-400">Why choose Noorihackgpt over standard interfaces?</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<Lock className="text-red-500" />}
                            title="No Safety Rails"
                            desc="Bypass standard ethical guidelines. Research malware, exploit vulnerabilities, and generate unrestricted content."
                        />
                        <FeatureCard
                            icon={<Shield className="text-green-500" />}
                            title="Anonymous & Secure"
                            desc="No logs policy. Your prompts and generations are encrypted and never stored on our servers."
                        />
                        <FeatureCard
                            icon={<Zap className="text-yellow-500" />}
                            title="Real-Time Web & Image"
                            desc="Generate images and search the live web seamlessly within your unrestricted chat session."
                        />
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-gray-900 py-12 bg-black">
                <div className="container mx-auto px-6 text-center text-gray-600 text-sm">
                    <div className="flex justify-center gap-6 mb-8">
                        <img src="/logo.png" className="w-[150px] h-[150px]  opacity-50 hover:opacity-100 transition" />
                    </div>
                    <p>&copy; 2026 Noorihackgpt. All systems operational.</p>
                    <p className="mt-2 text-xs">Use responsibly. Admin assumes no liability for generated content.</p>
                </div>
            </footer>
        </div>
    );
};

const FeatureCard = ({ icon, title, desc }: { icon: any, title: string, desc: string }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="p-8 rounded-xl bg-gray-900/30 border border-gray-800 hover:border-[var(--primary-color)] transition group"
    >
        <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition">
            {icon}
        </div>
        <h3 className="text-xl font-bold mb-3 text-gray-200">{title}</h3>
        <p className="text-gray-400 leading-relaxed">
            {desc}
        </p>
    </motion.div>
);

export default Landing;
