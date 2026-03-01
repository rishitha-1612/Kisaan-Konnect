import { Link, useLocation } from 'react-router-dom';
import { Home, MessageCircle, TrendingUp, Award } from 'lucide-react';

export default function BottomNav() {
    const location = useLocation();
    const path = location.pathname;

    const navItems = [
        { name: 'Home', path: '/', icon: Home },
        { name: 'Chat AI', path: '/chat', icon: MessageCircle },
        { name: 'Market', path: '/market', icon: TrendingUp },
        { name: 'Rewards', path: '/rewards', icon: Award },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 md:relative md:w-64 md:border-t-0 md:border-r bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-50 transition-all flex flex-col">
            <div className="flex md:flex-col justify-around md:justify-start items-center md:items-stretch h-16 md:h-full w-full max-w-md md:max-w-none mx-auto md:mx-0 md:p-4 md:space-y-2">
                {/* Logo area on desktop */}
                <div className="hidden md:flex items-center mb-8 px-4 mt-4">
                    <span className="text-xl font-bold text-kisaan-600 dark:text-kisaan-400">KisaanKonnect</span>
                </div>
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = path === item.path;
                    return (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`flex md:flex-row flex-col items-center md:justify-start justify-center w-full md:w-auto h-full md:h-auto space-y-1 md:space-y-0 md:space-x-4 md:px-4 md:py-3 md:rounded-xl transition-colors ${isActive ? 'text-kisaan-600 dark:text-kisaan-400 md:bg-kisaan-50 md:dark:bg-kisaan-900/20' : 'text-gray-500 dark:text-gray-400 hover:text-kisaan-500 md:hover:bg-gray-50 md:dark:hover:bg-gray-800/50'
                                }`}
                        >
                            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                            <span className="text-xs md:text-sm font-medium">{item.name}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
