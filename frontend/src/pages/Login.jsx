import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const Login = () => {
  const { login, user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  // Dynamic system settings logo
  const [logoUrl, setLogoUrl] = useState('/fadeout-logo.png');
  const [companyName, setCompanyName] = useState('FadeOut');

  // Load remembered email if present
  const [formData, setFormData] = useState({
    email: localStorage.getItem('rememberedEmail') || '',
    password: '',
  });
  const [rememberMe, setRememberMe] = useState(!!localStorage.getItem('rememberedEmail'));
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch company settings on mount
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await api.get('/api/system-setting');
        if (response.data && response.data.success) {
          const s = response.data.data;
          if (s.logoPath) {
            const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
            const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
            const cleanPath = s.logoPath.startsWith('/') ? s.logoPath : `/${s.logoPath}`;
            setLogoUrl(`${cleanBaseUrl}${cleanPath}`);
          }
          if (s.companyName) {
            setCompanyName(s.companyName);
          }
        }
      } catch (error) {
        console.error('Error fetching settings for logo:', error);
      }
    };
    fetchSettings();
  }, []);

  // Redirect to dashboard if user is already authenticated
  useEffect(() => {
    if (!authLoading && user) {
      navigate('/dashboard');
    }
  }, [user, authLoading, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      
      // Save or remove remembered email
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', formData.email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }

      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-neutral-950">
        <svg className="w-10 h-10 animate-spin" viewBox="0 0 32 32">
          <defs>
            <linearGradient id="spinner-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#5E60E7" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
          <circle cx="16" cy="16" r="14" fill="none" stroke="url(#spinner-grad)" strokeWidth="3" strokeDasharray="60 30" />
        </svg>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[440px]">
        
        {/* Header Block */}
        <div className="text-center mb-10 mt-[-20px]">
          <div className="inline-flex items-center justify-center mb-6">
            <img 
              alt={companyName} 
              className="w-14 h-14 object-contain" 
              src={logoUrl} 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://api-fadeout-dev.projectspreview.net/uploads/system-settings/logo/Fadeout_logo-1773734229899-n2ox9tdm-1781509051916-4qhdcury.png';
              }}
            />
          </div>
          <h1 className="text-[32px] font-bold text-[#111827] dark:text-white mb-2 leading-tight">{companyName}</h1>
          <p className="text-base text-[#6B7280] dark:text-neutral-400">Sign in to your account to continue</p>
        </div>

        {/* Card Block */}
        <div className="bg-white dark:bg-neutral-900 border border-[#F3F4F6] dark:border-neutral-800 rounded-[12px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none p-10">
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 p-3 rounded-lg text-xs font-medium border border-red-100 dark:border-red-900/50">
                {error}
              </div>
            )}

            {/* Email Address */}
            <div>
              <label htmlFor="email" className="block text-[14px] font-medium text-[#374151] dark:text-white mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail w-5 h-5" aria-hidden="true">
                    <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                  </svg>
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-white dark:bg-neutral-800 border border-[#E5E7EB] dark:border-neutral-700 rounded-[8px] text-[#111827] dark:text-white placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#5E60E7] focus:border-[#5E60E7] transition-all text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-[14px] font-medium text-[#374151] dark:text-white mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock w-5 h-5" aria-hidden="true">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-12 py-3 bg-white dark:bg-neutral-800 border border-[#E5E7EB] dark:border-neutral-700 rounded-[8px] text-[#111827] dark:text-white placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#5E60E7] focus:border-[#5E60E7] transition-all text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#4B5563] transition-colors cursor-pointer"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye w-5 h-5" aria-hidden="true">
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye-off w-5 h-5" aria-hidden="true">
                      <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
                      <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
                      <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
                      <path d="m2 2 20 20" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Remember me & Forgot Password */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 border-[#D1D5DB] rounded text-[#5E60E7] focus:ring-[#5E60E7] cursor-pointer"
                />
                <span className="text-[14px] text-[#4B5563] select-none">Remember me</span>
              </label>
              <Link 
                className="text-[14px] font-medium text-[#5E60E7] hover:text-[#4F46E5] transition-colors" 
                to="/forgot-password"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#5E60E7] hover:bg-[#4F46E5] text-white font-semibold rounded-[8px] transition-all flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed shadow-md shadow-indigo-100 dark:shadow-none cursor-pointer"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>

          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-10 space-y-1">
          <p className="text-[13px] text-[#6B7280] dark:text-neutral-400">© 2026 All rights reserved.</p>
          <p className="text-[13px] text-[#6B7280] dark:text-neutral-400">
            Designed and Developed by{' '}
            <a 
              href="https://www.hiddenbrains.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-bold text-[#111827] dark:text-white hover:underline"
            >
              Hidden Brains
            </a>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;
