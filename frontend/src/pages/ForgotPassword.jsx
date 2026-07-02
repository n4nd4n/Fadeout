import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { AuthCard, AuthInput, AuthLabel, AuthButton } from '../components/common/AuthFields';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { forgotPassword } = useAuth();
  const navigate = useNavigate();

  // Dynamic system settings logo
  const [logoUrl, setLogoUrl] = useState('/assets/images/fadeout-logo.png');
  const [companyName, setCompanyName] = useState('FadeOut');

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

  const handleChange = (e) => {
    setEmail(e.target.value);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await forgotPassword(email);
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="h-screen bg-neutral-50 dark:bg-neutral-950 flex flex-col items-center justify-center p-4 overflow-y-auto py-8">
        <div className="w-full max-w-lg">
          <AuthCard>
            <div className="inline-flex items-center justify-center w-14 h-14 bg-white dark:bg-neutral-800 rounded-2xl shadow-md mb-6 overflow-hidden">
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
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">OTP Sent</h1>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-8">
              If the email exists, you will receive an OTP shortly.
            </p>
            <div className="space-y-4">
              <AuthButton
                onClick={() => navigate('/reset-password', { state: { email } })}
              >
                Proceed to Reset Password
              </AuthButton>
              <AuthButton
                type="button"
                variant="ghost"
                onClick={() => navigate('/login')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left w-4 h-4" aria-hidden="true">
                  <path d="m12 19-7-7 7-7"></path>
                  <path d="M19 12H5"></path>
                </svg>
                Back to Login
              </AuthButton>
            </div>
          </AuthCard>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-neutral-50 dark:bg-neutral-950 flex flex-col items-center justify-center p-4 overflow-y-auto py-8">
      <div className="w-full max-w-lg">
        <AuthCard>
          <div className="inline-flex items-center justify-center w-14 h-14 bg-white dark:bg-neutral-800 rounded-2xl shadow-md mb-6 overflow-hidden">
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
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">Forgot Password</h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-8">
            Enter your registered email to receive a password reset link
          </p>

          <form onSubmit={handleSubmit} className="text-left space-y-5">
            {error && (
              <div className="bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 p-3 rounded-lg text-xs font-medium border border-red-100 dark:border-red-900/50">
                {error}
              </div>
            )}
            <div>
              <AuthLabel htmlFor="email" required>
                Email Address
              </AuthLabel>
              <AuthInput
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email address"
                value={email}
                onChange={handleChange}
                required
              />
            </div>
            <AuthButton type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send Reset Link'}
            </AuthButton>
            <AuthButton
              type="button"
              variant="ghost"
              onClick={() => navigate('/login')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left w-4 h-4" aria-hidden="true">
                <path d="m12 19-7-7 7-7"></path>
                <path d="M19 12H5"></path>
              </svg>
              Back to Login
            </AuthButton>
          </form>
        </AuthCard>
        <p className="text-center text-xs text-neutral-500 dark:text-neutral-500 mt-5 px-4">
          For security reasons, we'll send a reset link only if the email is registered.
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;

