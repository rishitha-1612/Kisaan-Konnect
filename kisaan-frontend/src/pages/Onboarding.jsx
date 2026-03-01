import { useState } from 'react';
import { useStore } from '../store/useStore';
import { Leaf } from 'lucide-react';

export default function Onboarding() {
    const setUser = useStore((state) => state.setUser);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        phone: '',
        name: '',
        language: 'hi',
        crop: '',
        location: '',
    });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleStart = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, soil_type: 'Unknown' })
            });

            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData.error || 'Registration failed');
            }
            const data = await res.json();

            // Give the new user_id to the store! 
            setUser({ ...formData, user_id: data.id, points: 10 });
        } catch (err) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12 bg-kisaan-50 dark:bg-gray-900">
            <Leaf className="w-16 h-16 text-kisaan-600 mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">KisaanKonnect</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8 text-center">Your Smart Farming Companion</p>

            <form onSubmit={handleStart} className="w-full max-w-sm space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
                    <input required type="tel" name="phone" pattern="[0-9]{10}" onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-kisaan-500 focus:ring-kisaan-500 p-3 bg-white dark:bg-gray-800" placeholder="9876543210" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                    <input required type="text" name="name" onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-kisaan-500 focus:ring-kisaan-500 p-3 bg-white dark:bg-gray-800" placeholder="Ramesh" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Language</label>
                    <select name="language" onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-kisaan-500 focus:ring-kisaan-500 p-3 bg-white dark:bg-gray-800">
                        <option value="hi">Hindi / हिंदी</option>
                        <option value="en">English</option>
                        <option value="mr">Marathi / मराठी</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Main Crop</label>
                    <input required type="text" name="crop" onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-kisaan-500 focus:ring-kisaan-500 p-3 bg-white dark:bg-gray-800" placeholder="Cotton, Wheat, etc." />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Location</label>
                    <input required type="text" name="location" onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-kisaan-500 focus:ring-kisaan-500 p-3 bg-white dark:bg-gray-800" placeholder="District, State" />
                </div>

                <button disabled={loading} type="submit" className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-kisaan-600 hover:bg-kisaan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-kisaan-500 mt-6 text-lg disabled:opacity-50 transition-colors">
                    {loading ? 'Registering...' : 'Start Farming Smartly'}
                </button>
            </form>
        </div>
    );
}
