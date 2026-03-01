import { useState } from 'react';
import { TrendingUp, TrendingDown, MapPin, Search } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Market() {
    const user = useStore(state => state.user);
    const [searchQuery, setSearchQuery] = useState('');

    const mockPrices = [
        { id: 1, crop: 'Cotton', mandi: 'Khamgaon AMPC', price: '₹7,150/q', trend: 'up', change: '+₹120' },
        { id: 2, crop: 'Cotton', mandi: 'Akola AMPC', price: '₹7,080/q', trend: 'down', change: '-₹40' },
        { id: 3, crop: 'Soybean', mandi: 'Washim AMPC', price: '₹4,400/q', trend: 'up', change: '+₹50' },
        { id: 4, crop: 'Wheat', mandi: 'Nagpur AMPC', price: '₹2,250/q', trend: 'up', change: '+₹20' },
        { id: 5, crop: 'Rice', mandi: 'Bhandara AMPC', price: '₹3,100/q', trend: 'up', change: '+₹80' },
        { id: 6, crop: 'Sugarcane', mandi: 'Pune AMPC', price: '₹3,200/t', trend: 'down', change: '-₹10' },
        { id: 7, crop: 'Onion', mandi: 'Lasalgaon AMPC', price: '₹1,500/q', trend: 'down', change: '-₹200' },
    ];

    const filteredPrices = mockPrices.filter(item =>
        item.crop.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-4 bg-gray-50 dark:bg-gray-900 min-h-screen">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Market Insights</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 flex items-center">
                <MapPin size={16} className="mr-1" /> Near {user?.location || 'Your area'}
            </p>

            <div className="relative mb-6">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={18} className="text-gray-400" />
                </div>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for a crop..."
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-sm focus:ring-kisaan-500 focus:border-kisaan-500 shadow-sm"
                />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                    <h2 className="font-semibold text-gray-800 dark:text-gray-200">Today's Mandi Rates</h2>
                </div>
                <ul className="divide-y divide-gray-100 dark:divide-gray-700">
                    {filteredPrices.length > 0 ? (
                        filteredPrices.map((item) => (
                            <li key={item.id} className="p-4 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white">{item.crop}</h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.mandi}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-lg text-gray-900 dark:text-white">{item.price}</p>
                                    <div className={`flex items-center justify-end text-xs font-medium ${item.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                        {item.trend === 'up' ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
                                        {item.change}
                                    </div>
                                </div>
                            </li>
                        ))
                    ) : (
                        <li className="p-8 text-center text-gray-500 dark:text-gray-400">
                            No matching crops found.
                        </li>
                    )}
                </ul>
            </div>

            <div className="mt-6 bg-kisaan-50 dark:bg-kisaan-900/40 p-4 rounded-xl border border-kisaan-100 dark:border-kisaan-800">
                <h3 className="text-sm font-semibold text-kisaan-800 dark:text-kisaan-300">💡 Smart Selling Tip</h3>
                <p className="text-xs text-kisaan-700 dark:text-kisaan-400 mt-2">Prices in Khamgaon are expected to rise further by weekend. Hold selling if possible.</p>
            </div>
        </div>
    );
}
