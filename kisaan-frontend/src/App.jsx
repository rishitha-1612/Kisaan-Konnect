import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Market from './pages/Market';
import Rewards from './pages/Rewards';
import Onboarding from './pages/Onboarding';
import { useStore } from './store/useStore';

function App() {
  const user = useStore(state => state.user);

  return (
    <Router>
      <div className="flex flex-col md:flex-row h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 overflow-hidden">
        {user && <BottomNav />}
        <main className={`flex-1 w-full bg-gray-50 dark:bg-gray-900 flex flex-col overflow-hidden ${user ? 'pb-16 md:pb-0 md:p-6' : ''}`}>
          <div className={`mx-auto w-full h-full bg-white dark:bg-gray-800 overflow-y-auto flex flex-col relative ${user ? 'max-w-4xl md:rounded-2xl shadow-sm md:shadow-xl border border-transparent md:border-gray-200 dark:md:border-gray-700' : ''}`}>
            {!user ? (
              <Routes>
                <Route path="*" element={<Onboarding />} />
              </Routes>
            ) : (
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/market" element={<Market />} />
                <Route path="/rewards" element={<Rewards />} />
              </Routes>
            )}
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
