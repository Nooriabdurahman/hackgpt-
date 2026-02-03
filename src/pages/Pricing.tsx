import { useState } from 'react';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import { Check, X, CreditCard, Bitcoin, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const Pricing = ({ onClose }: { onClose?: () => void }) => {
    const { user, updateUser } = useAuth();
    const [loading, setLoading] = useState<number | null>(null);
    const [selectedTier, setSelectedTier] = useState<number | null>(null);

    const tiers = [
        {
            name: 'V3 STANDRAD',
            price: 20,
            duration: 'Monthly',
            version: 'V3',
            features: [
                'Privacy Focused Encryption',
                'No Limits on Messages',
                'Standard AI Reasoning',
                '24/7 Priority Support',
                'Works On All Devices',
                'Monthly Access Key'
            ],
            color: 'var(--accent-color)',
            id: 20
        },
        {
            name: 'V3 ADVANCED',
            price: 60,
            duration: 'Yearly',
            version: 'V3',
            isPopular: true,
            features: [
                'All Standard Features',
                '1 Year Reserved Access',
                'Faster Response Time',
                'Advanced Neural Models',
                'Multi-Device Sync',
                'Identity Protection'
            ],
            color: 'var(--accent-color)',
            id: 60
        },
        {
            name: 'V4 ULTIMATE',
            price: 100,
            duration: 'Lifetime',
            version: 'V4',
            features: [
                'Unlimited Lifetime Access',
                'DeepThink Reasoning (V4)',
                'Better Coding Performance',
                'File & Image Analysis',
                'Global Proxy Routing',
                'Hidden API Access',
                'Zero Log Retention'
            ],
            color: 'var(--accent-color)',
            id: 100
        }
    ];

    const handleSubscribe = async (tierId: number) => {
        setSelectedTier(tierId);
    };

    const processPayment = async (method: string) => {
        if (!selectedTier || !user) return;
        setLoading(selectedTier);
        try {
            // Simulate API call
            await api.post('/subscribe', { email: user.email, tier: selectedTier, method });

            // 20 = 1 month, 60 = 1 year, 100 = lifetime
            const expiry = selectedTier === 20 ? 30 : selectedTier === 60 ? 365 : 36500;
            updateUser({
                message_count: 0,
                subscription_expiry: new Date(Date.now() + expiry * 24 * 60 * 60 * 1000).toISOString()
            });
            if (onClose) onClose();
        } catch (error) {
            console.error(error);
            alert('Transaction Failed');
        } finally {
            setLoading(null);
            setSelectedTier(null);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl pb-10 overflow-y-auto">
            <style>{`
                .pricing-card-red {
                    border: 1px solid rgba(211, 47, 47, 0.3);
                    transition: all 0.3s ease;
                }
                .pricing-card-red:hover {
                    border-color: var(--accent-color);
                    box-shadow: 0 0 20px rgba(211, 47, 47, 0.4);
                }
                .neon-text-red {
                    text-shadow: 0 0 10px rgba(211, 47, 47, 0.8);
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: var(--accent-color);
                    border-radius: 10px;
                }
            `}</style>

            <div className="container mx-auto px-4 py-12 relative max-h-screen custom-scrollbar">
                <button
                    onClick={onClose}
                    className="fixed top-6 right-6 text-gray-400 hover:text-white transition-colors z-[60] bg-black/50 p-2 rounded-full"
                >
                    <X size={28} />
                </button>

                {!selectedTier ? (
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <motion.h2
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter"
                            >
                                SYSTEM <span className="text-[var(--accent-color)] neon-text-red">UPGRADE</span>
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="text-gray-400 font-mono text-lg"
                            >
                                [ AUTHENTICATION REQUIRED ] SELECT YOUR CLEARANCE LEVEL
                            </motion.p>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-8 px-4">
                            {tiers.map((tier, idx) => (
                                <motion.div
                                    key={tier.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    whileHover={{ y: -10 }}
                                    className={`relative flex flex-col items-center bg-[#0a0a0a] rounded-2xl p-8 border-2 ${tier.isPopular ? 'border-[var(--accent-color)]' : 'border-gray-800'} overflow-hidden group pricing-card-red`}
                                >
                                    {tier.isPopular && (
                                        <div className="absolute top-0 right-0 bg-[var(--accent-color)] text-white text-[10px] font-bold px-4 py-1 rounded-bl-lg tracking-widest uppercase">
                                            Most Popular
                                        </div>
                                    )}

                                    <div className="text-4xl font-black text-white mb-2 tracking-widest">{tier.version}</div>
                                    <div className="text-4xl font-bold text-white mb-1">${tier.price}</div>
                                    <div className="text-gray-500 font-mono uppercase text-sm mb-8">{tier.duration} Access</div>

                                    <div className="w-full space-y-4 mb-10 mt-4 h-full">
                                        {tier.features.map((feature, fIdx) => (
                                            <div key={fIdx} className="flex items-start gap-3">
                                                <div className="mt-1 p-0.5 rounded-full border border-[var(--accent-color)]/30">
                                                    <Check size={14} className="text-[var(--accent-color)]" />
                                                </div>
                                                <span className="text-gray-300 text-sm font-medium">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => handleSubscribe(tier.id)}
                                        className="w-full bg-white text-black font-bold py-4 rounded-full hover:bg-[var(--accent-color)] hover:text-white transition-all duration-300 uppercase tracking-widest text-sm"
                                    >
                                        Buy Clearance
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-xl mx-auto bg-[#0a0a0a] border border-gray-800 p-10 rounded-3xl shadow-2xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-[var(--accent-color)]"></div>

                        <div className="flex items-center gap-4 mb-10">
                            <button
                                onClick={() => setSelectedTier(null)}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                            >
                                <X size={20} className="text-gray-400 rotate-90" />
                            </button>
                            <div>
                                <h3 className="text-2xl font-bold text-white uppercase tracking-tight">Deployment Method</h3>
                                <p className="text-gray-500 text-sm font-mono">Select secure processor for ${selectedTier} tier</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {[
                                { id: 'crypto', name: 'Crypto Network', icon: Bitcoin, color: '#F3BA2F', desc: 'BTC, ETH, USDT (Fastest)' },
                                { id: 'paypal', name: 'PayPal Account', icon: Globe, color: '#0070BA', desc: 'Standard Checkout' },
                                { id: 'card', name: 'Secure Card', icon: CreditCard, color: 'white', desc: 'Visa, Mastercard, Amex' }
                            ].map((method) => (
                                <button
                                    key={method.id}
                                    onClick={() => processPayment(method.id)}
                                    disabled={!!loading}
                                    className="w-full flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[var(--accent-color)] hover:bg-white/10 transition-all group"
                                >
                                    <div className="flex items-center gap-5">
                                        <div className="p-3 rounded-xl bg-black/40 group-hover:scale-110 transition-transform">
                                            <method.icon size={24} style={{ color: method.color }} />
                                        </div>
                                        <div className="text-left">
                                            <div className="font-bold text-white tracking-wide">{method.name}</div>
                                            <div className="text-xs text-gray-500 font-mono italic">{method.desc}</div>
                                        </div>
                                    </div>
                                    <div className="w-6 h-6 rounded-full border-2 border-white/20 group-hover:border-[var(--accent-color)] group-hover:bg-[var(--accent-color)]/20 transition-all flex items-center justify-center">
                                        <div className="w-2 h-2 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    </div>
                                </button>
                            ))}
                        </div>

                        {loading && (
                            <div className="mt-8 flex flex-col items-center gap-3">
                                <div className="w-10 h-10 border-4 border-[var(--accent-color)] border-t-transparent rounded-full animate-spin"></div>
                                <div className="text-[var(--accent-color)] font-mono text-xs tracking-tighter uppercase animate-pulse">
                                    Establishing Secure Tunnel...
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Pricing;
