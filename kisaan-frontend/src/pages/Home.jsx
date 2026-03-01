import { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { CloudSun, Sprout, TrendingUp, ShieldAlert, LogOut } from 'lucide-react';

export default function Home() {
    const user = useStore(state => state.user);
    const clearUser = useStore(state => state.clearUser);
    const [weather, setWeather] = useState({ temp: '..°C', condition: 'Fetching...' });

    useEffect(() => {
        const fetchWeather = async () => {
            const loc = user?.location || 'New Delhi'; // Default fallback
            try {
                const res = await fetch(`https://wttr.in/${encodeURIComponent(loc)}?format=j1`);
                if (!res.ok) throw new Error('Weather fetch failed');
                const data = await res.json();
                const current = data.current_condition[0];
                setWeather({
                    temp: `${current.temp_C}°C`,
                    condition: `${current.weatherDesc[0].value} • Humidity: ${current.humidity}%`
                });
            } catch (error) {
                console.error("Failed to fetch weather", error);
                setWeather({ temp: '32°C', condition: 'Sunny • Humidity: 45%' }); // Mock Fallback
            }
        };
        fetchWeather();
    }, [user?.location]);

    return (
        <div className="p-4 bg-gray-50 dark:bg-gray-900 min-h-screen">
            <header className="mb-6 flex justify-between items-start">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Namaste, {user?.name || 'Farmer'}!</h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Here's your farm summary today</p>
                </div>
                <button
                    onClick={clearUser}
                    className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
                    title="Logout"
                >
                    <LogOut size={20} />
                </button>
            </header>

            {/* Weather Widget */}
            <section className="bg-gradient-to-r from-blue-400 to-blue-500 rounded-xl p-4 text-white shadow-md mb-4 flex justify-between items-center">
                <div>
                    <h2 className="text-lg font-semibold">{user?.location || 'Your Farm'}</h2>
                    <p className="text-3xl font-bold mt-1">{weather.temp}</p>
                    <p className="text-sm opacity-90">{weather.condition}</p>
                </div>
                <CloudSun size={48} className="opacity-80" />
            </section>

            {/* Grid of quick info */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center text-kisaan-600 mb-2">
                        <Sprout size={20} className="mr-2" />
                        <h3 className="font-semibold text-sm">Crop Advisory</h3>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                        Time to apply Urea for your {user?.crop || 'crop'} as light rain is expected.
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center text-orange-500 mb-2">
                        <TrendingUp size={20} className="mr-2" />
                        <h3 className="font-semibold text-sm">Market Trend</h3>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                        {user?.crop || 'Crop'} prices are up by 5% in nearby Mandi.
                    </p>
                </div>
            </div>

            {/* Alerts */}
            <section>
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-3">Govt Scheme Alerts</h2>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border-l-4 border-kisaan-500 shadow-sm flex items-start">
                    <ShieldAlert className="text-kisaan-500 mr-3 mt-1 flex-shrink-0" size={20} />
                    <div>
                        <h4 className="font-semibold text-sm text-gray-900 dark:text-white">PM-Kisan Installment</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">The 14th installment will be credited next week. Ensure KYC is complete.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
