import { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { authApi } from '@/services/api/auth';
import { useUser } from '@/lib/context/user/user-context';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import { GOOGLE_AUTH_API_KEY, PRIVACY_POLICY, TERMS_OF_CONDITION } from '@/lib/config';
import { OpenUrl } from '@/lib/utils';
import toast from 'react-hot-toast';

function SignUpPageComponet() {
  const { setUserDetails, signup } = useUser();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    showPassword: false,
    isPrivacyChecked: false
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const passwordRequirements: PasswordRequirement[] = [
    {
      regex: /[A-Z]/,
      label: 'One uppercase letter',
      met: /[A-Z]/.test(formData.password)
    },
    {
      regex: /[a-z]/,
      label: 'One lowercase letter',
      met: /[a-z]/.test(formData.password)
    },
    {
      regex: /[0-9]/,
      label: 'One number',
      met: /[0-9]/.test(formData.password)
    },
    {
      regex: /[!@#$%^&*(),.?":{}|<>]/,
      label: 'One special character',
      met: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password)
    },
    {
      regex: /.{8,}/,
      label: 'Minimum 8 characters',
      met: formData.password.length >= 8
    }
  ];
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return passwordRequirements.every(req => req.met);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      email: !validateEmail(formData.email) ? 'Please enter a valid email' : '',
      password: !validatePassword(formData.password)
        ? 'Password validation failed'
        : '',
      passwordValidation: !formData?.isPrivacyChecked ? 'please select terms and conditions ' : ''
    };

    setErrors(newErrors);
    if (newErrors?.passwordValidation) {
      toast(newErrors?.passwordValidation)
      return
    }
    if (!newErrors.email && !newErrors.password) {
      setUserDetails((prev: any) => ({
        ...prev,
        email: formData?.email,
        password: formData?.password,
      }));
      navigate('/telegram');
    }
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      setUserDetails((prev: any) => ({
        ...prev,
        access_token: tokenResponse?.access_token
      }))
      navigate('/telegram');
    },
    onError: (error) => console.log(error),
  });

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md space-y-8"
        >
          <div className="text-center">
            <h1 className="text-3xl font-bold">Create your account</h1>
            <p className="mt-2 text-gray-400">
              Get started with your trading journey
            </p>
          </div>

          {/* Google Sign In */}
          <button onClick={loginWithGoogle} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 transition-colors rounded-lg border border-white/10">
            <img src="/assets/icons/google.svg" alt="" className="w-5 h-5" />
            Continue with Google
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-800"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-black text-gray-500">
                or continue with email
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="email"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className={`w-full px-4 py-3 bg-white/5 border ${errors.email ? 'border-red-500' : 'border-gray-800'
                  } rounded-lg focus:outline-none focus:border-primary transition-colors`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div className="relative">
              <input
                type={formData.showPassword ? 'text' : 'password'}
                placeholder="Create a password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className={`w-full px-4 py-3 bg-white/5 border ${errors.password ? 'border-red-500' : 'border-gray-800'
                  } rounded-lg focus:outline-none focus:border-primary transition-colors pr-12`}
              />
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    showPassword: !formData.showPassword,
                  })
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {formData.showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            {formData?.password && <div className="space-y-2">
              <p className="text-sm text-gray-400">Password must contain</p>
              {/* <div className="flex items-center gap-2">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center ${formData.password.length >= 8
                    ? 'bg-green-500'
                    : 'bg-gray-800'
                    }`}
                >
                  <motion.svg
                    initial={false}
                    animate={{ scale: formData.password.length >= 8 ? 1 : 0 }}
                    className="w-3 h-3 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </motion.svg>
                </div>
                <span
                  className={
                    formData.password.length >= 8
                      ? 'text-white'
                      : 'text-gray-500'
                  }
                >
                  8 characters
                </span>
              </div> */}
              <div className="grid grid-cols-1 gap-2">
                {passwordRequirements.map((requirement, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className={`${requirement?.met ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gray-400'} rounded-full p-0.5`}>
                      <svg
                        className={`w-3 h-3 text-white transition-opacity duration-200 ${requirement?.met ? 'opacity-100' : 'opacity-0'
                          }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className={`text-sm ${requirement.met ? 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent' : 'text-gray-400'
                      }`}>
                      {requirement.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>}

            <Button
              className={`w-full mt-6 py-3 px-4 rounded-lg text-white font-medium transition-colors duration-200 bg-gradient-to-r from-blue-600 to-purple-600 `}
            >
              Continue
            </Button>
            <div className='flex'>
              <input checked={formData?.isPrivacyChecked} onChange={(e) => setFormData(prev => ({ ...prev, isPrivacyChecked: e?.target.checked }))} type='checkbox' />
              <p className='tracking-wide text-xs ms-1 font-regular text-white/50'>By continuing, i agree to the <span onClick={() => OpenUrl(TERMS_OF_CONDITION)} className='cursor-pointer underline text-white/70'> Terms of Service</span> and <span onClick={() => OpenUrl(PRIVACY_POLICY)} className='underline cursor-pointer text-white/70'>Privacy Policy</span></p>
            </div>
          </form>

          <p className="text-center text-sm text-gray-400">
            Already have an account?{' '}
            <button

              onClick={() => navigate('/signin')}
              className="text-primary underline hover:text-primary-light transition-colors font-medium"
            >
              Sign in
            </button>
          </p>
        </motion.div>
      </main>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <GoogleOAuthProvider
      clientId={GOOGLE_AUTH_API_KEY}
    >
      <SignUpPageComponet />
    </GoogleOAuthProvider>
  )
}
