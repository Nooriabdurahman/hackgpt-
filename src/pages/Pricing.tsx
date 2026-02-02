import { useState } from 'react';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import { Check, X, Shield, Zap, Infinity, CreditCard, Bitcoin } from 'lucide-react';
import { motion } from 'framer-motion';

const Pricing = ({ onClose }: { onClose?: () => void }) => {
    const { user, updateUser } = useAuth();
    const [loading, setLoading] = useState<number | null>(null);
    const [selectedTier, setSelectedTier] = useState<number | null>(null);

    const handleSubscribe = async (tier: number) => {
        setSelectedTier(tier);
        // Show payment method selection
    };

    const processPayment = async (method: string) => {
        if (!selectedTier || !user) return;
        setLoading(selectedTier);
        try {
            // Simulate API call
            await api.post('/subscribe', { email: user.email, tier: selectedTier, method });

            const expiry = selectedTier === 10 ? 30 : selectedTier === 20 ? 365 : 36500;
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md pb-10 overflow-y-auto">
            <div className="container mx-auto px-4 py-8 relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white">
                    <X size={32} />
                </button>

                {!selectedTier ? (
                    <>
                        <div className="text-center mb-12">
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tighter">UPGRADE <span className="text-[var(--primary-color)]">CLEARANCE</span></h2>
                            <p className="text-gray-400 font-mono">Select your access level to bypass restrictions.</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {/* Tier 1 */}
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="glass p-8 rounded-xl border border-gray-800 hover:border-gray-600 transition relative overflow-hidden group"
                            >
                                <div className="absolute top-0 right-0 bg-gray-800 text-xs px-3 py-1 text-gray-400 font-mono">LEVEL 1</div>
                                <Shield className="w-16 h-16 text-blue-500 mb-6 group-hover:text-blue-400 transition" />
                                <h3 className="text-2xl font-bold text-white mb-2">OPERATOR</h3>
                                <div className="my-4 flex items-end gap-2">
                                    <span className="text-5xl font-bold text-white">$10</span>
                                    <span className="text-gray-500 mb-2 font-mono">/month</span>
                                </div>
                                <ul className="space-y-4 mb-8 text-gray-300 text-sm font-mono">
                                    <li className="flex items-center"><Check className="w-4 h-4 mr-3 text-blue-500" /> Unlimited Messages</li>
                                    <li className="flex items-center"><Check className="w-4 h-4 mr-3 text-blue-500" /> Standard Models</li>
                                    <li className="flex items-center"><X className="w-4 h-4 mr-3 text-gray-700" /> No GPT-5 Access</li>
                                </ul>
                                <button
                                    onClick={() => handleSubscribe(10)}
                                    className="w-full py-4 rounded bg-blue-900/20 border border-blue-500/50 text-blue-400 hover:bg-blue-500 hover:text-white transition uppercase font-bold tracking-widest"
                                >
                                    ACQUIRE ACCESS
                                </button>
                            </motion.div>

                            {/* Tier 2 */}
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="glass p-8 rounded-xl border-2 border-[var(--primary-color)] relative overflow-hidden neon-border"
                            >
                                <div className="absolute top-0 right-0 bg-[var(--primary-color)] text-xs px-3 py-1 text-black font-bold font-mono">RECOMMENDED</div>
                                <Zap className="w-16 h-16 text-[var(--primary-color)] mb-6 animate-pulse" />
                                <h3 className="text-2xl font-bold text-white mb-2">ROOT ACCESS</h3>
                                <div className="my-4 flex items-end gap-2">
                                    <span className="text-5xl font-bold text-white">$20</span>
                                    <span className="text-gray-500 mb-2 font-mono">/year</span>
                                </div>
                                <ul className="space-y-4 mb-8 text-gray-300 text-sm font-mono">
                                    <li className="flex items-center"><Check className="w-4 h-4 mr-3 text-[var(--primary-color)]" /> Unlimited Messages</li>
                                    <li className="flex items-center"><Check className="w-4 h-4 mr-3 text-[var(--primary-color)]" /> <span className="text-white font-bold">GPT-5 Unlocked</span></li>
                                    <li className="flex items-center"><Check className="w-4 h-4 mr-3 text-[var(--primary-color)]" /> Priority Encryption</li>
                                </ul>
                                <button
                                    onClick={() => handleSubscribe(20)}
                                    className="w-full btn-primary py-4 text-xl"
                                >
                                    SECURE DEAL
                                </button>
                            </motion.div>

                            {/* Tier 3 */}
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="glass p-8 rounded-xl border border-purple-500/50 hover:border-purple-500 transition relative overflow-hidden group"
                            >
                                <div className="absolute top-0 right-0 bg-purple-900/50 text-xs px-3 py-1 text-purple-200 font-mono border-l border-b border-purple-500">VIP</div>
                                <Infinity className="w-16 h-16 text-purple-500 mb-6 group-hover:text-purple-400 transition" />
                                <h3 className="text-2xl font-bold text-white mb-2">GOD MODE</h3>
                                <div className="my-4 flex items-end gap-2">
                                    <span className="text-5xl font-bold text-white">$100</span>
                                    <span className="text-gray-500 mb-2 font-mono">/lifetime</span>
                                </div>
                                <ul className="space-y-4 mb-8 text-gray-300 text-sm font-mono">
                                    <li className="flex items-center"><Check className="w-4 h-4 mr-3 text-purple-500" /> Lifetime Access</li>
                                    <li className="flex items-center"><Check className="w-4 h-4 mr-3 text-purple-500" /> Early Access Features</li>
                                    <li className="flex items-center"><Check className="w-4 h-4 mr-3 text-purple-500" /> Zero Log Retention</li>
                                </ul>
                                <button
                                    onClick={() => handleSubscribe(100)}
                                    className="w-full py-4 rounded bg-purple-900/20 border border-purple-500/50 text-purple-400 hover:bg-purple-500 hover:text-white transition uppercase font-bold tracking-widest"
                                >
                                    GET LIFETIME
                                </button>
                            </motion.div>
                        </div>
                    </>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-2xl mx-auto glass border border-gray-700 p-8 rounded-xl"
                    >
                        <div className="flex items-center gap-4 mb-8 border-b border-gray-800 pb-4">
                            <div onClick={() => setSelectedTier(null)} className="cursor-pointer hover:text-white text-gray-500">
                                ← BACK
                            </div>
                            <h2 className="text-xl font-bold text-white">SELECT PAYMENT METHOD</h2>
                        </div>

                        <div className="grid gap-4">
                            <button
                                onClick={() => processPayment('paypal')}
                                disabled={!!loading}
                                className="flex items-center justify-between p-6 rounded bg-[#003087]/20 border border-[#003087]/50 hover:bg-[#003087]/40 transition group"
                            >
                                <div className="flex items-center gap-4">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-8 w-auto filter brightness-200" alt="PayPal" />
                                    <div className="text-left">
                                        <div className="font-bold text-white">PayPal</div>
                                        <div className="text-xs text-gray-400">Safe & Secure</div>
                                    </div>
                                </div>
                                <div className="w-4 h-4 rounded-full border border-gray-500 group-hover:border-white group-hover:bg-white transition"></div>
                            </button>

                            <button
                                onClick={() => processPayment('binance')}
                                disabled={!!loading}
                                className="flex items-center justify-between p-6 rounded bg-[#F3BA2F]/10 border border-[#F3BA2F]/30 hover:bg-[#F3BA2F]/20 transition group"
                            >
                                <div className="flex items-center gap-4">
                                    <Bitcoin className="w-8 h-8 text-[#F3BA2F]" />
                                    <div className="text-left">
                                        <div className="font-bold text-white text-[#F3BA2F]">Binance / Crypto</div>
                                        <div className="text-xs text-gray-400">USDT, BTC, ETH</div>
                                    </div>
                                </div>
                                <div className="w-4 h-4 rounded-full border border-gray-500 group-hover:border-[#F3BA2F] group-hover:bg-[#F3BA2F] transition"></div>
                            </button>

                            <button
                                onClick={() => processPayment('mastercard')}
                                disabled={!!loading}
                                className="flex items-center justify-between p-6 rounded bg-gray-800 border border-gray-700 hover:bg-gray-700 transition group"
                            >
                                <div className="flex items-center gap-4">
                                    <CreditCard className="w-8 h-8 text-white" />
                                    <div className="text-left">
                                        <div className="font-bold text-white">Mastercard / Visa</div>
                                        <div className="text-xs text-gray-400">Credit or Debit</div>
                                    </div>
                                </div>
                                <div className="w-4 h-4 rounded-full border border-gray-500 group-hover:border-white group-hover:bg-white transition"></div>
                            </button>

                            {loading && (
                                <div className="mt-4 text-center text-[var(--primary-color)] animate-pulse">
                                    PROCESSING TRANSACTION...
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Pricing;
