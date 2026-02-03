import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert, Mail, Lock, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';

const Signup = () => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSendCode = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await api.post('/auth/send-code', { email });
            setStep(2);
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to send code');
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await api.post('/auth/register', { email, code, password });
            login({ ...res.data.user });
            navigate('/chat');
        } catch (err: any) {
            setError(err.response?.data?.error || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass p-8 rounded-xl w-full max-w-md relative z-10 border border-[#333]"
            >
                <div className="text-center mb-8">
                    <ShieldAlert className="w-12 h-12 mx-auto text-[var(--primary-color)] mb-2" />
                    <h1 className="text-3xl font-bold tracking-tighter text-white">NOOR<span className="text-[var(--primary-color)]">HACK</span></h1>
                    <p className="text-gray-400 text-sm">Secure Neural Uplink Registration</p>
                </div>

                {error && (
                    <div className="bg-red-500/20 border border-red-500 text-red-200 p-3 rounded mb-4 text-sm">
                        {error}
                    </div>
                )}

                {step === 1 ? (
                    <form onSubmit={handleSendCode} className="space-y-4">
                        <div>
                            <label className="block text-xs font-mono text-gray-500 mb-1">IDENTIFIER (EMAIL)</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 bg-gray-900 border border-gray-700 rounded p-2.5 focus:border-[var(--primary-color)] focus:ring-1 focus:ring-[var(--primary-color)] text-white placeholder-gray-500 outline-none transition-all"
                                    placeholder="agent@example.com"
                                    required
                                />
                            </div>
                        </div>
                        <button
                            disabled={loading}
                            className="w-full btn-primary glitch"
                        >
                            {loading ? 'INITIATING...' : 'SEND ACCESS CODE'}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleRegister} className="space-y-4">
                        <div className="bg-[var(--primary-color)]/10 p-3 rounded border border-[var(--primary-color)]/20 mb-4">
                            <p className="text-xs text-[var(--primary-color)] text-center">
                                Code sent to local console (Simulated)
                            </p>
                        </div>

                        <div>
                            <label className="block text-xs font-mono text-gray-500 mb-1">VERIFICATION CODE</label>
                            <div className="relative">
                                <Smartphone className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                                <input
                                    type="text"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    className="w-full pl-10 bg-gray-900 border border-gray-700 rounded p-2.5 focus:border-[var(--primary-color)] focus:ring-1 focus:ring-[var(--primary-color)] text-white placeholder-gray-500 outline-none transition-all"
                                    placeholder="123456"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-mono text-gray-500 mb-1">SET PASSWORD</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 bg-gray-900 border border-gray-700 rounded p-2.5 focus:border-[var(--primary-color)] focus:ring-1 focus:ring-[var(--primary-color)] text-white placeholder-gray-500 outline-none transition-all"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            disabled={loading}
                            className="w-full btn-primary"
                        >
                            {loading ? 'ESTABLISHING LINK...' : 'COMPLETE UPLINK'}
                        </button>
                    </form>
                )}

                <div className="mt-6 text-center text-xs text-gray-500">
                    ALREADY AGENT? <Link to="/login" className="text-[var(--primary-color)] hover:underline">LOGIN HERE</Link>
                </div>
            </motion.div>
        </div>
    );
};

export default Signup;
