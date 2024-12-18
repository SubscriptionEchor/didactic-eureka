import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, AlertCircle, ArrowRight, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUser } from '@/lib/context/user/user-context';
import { useNavigate } from 'react-router-dom';
import { authApi } from '@/services/api/auth';
import toast from 'react-hot-toast';
export default function TelegramPage() {
  const { userDetails, signup, setUserDetails } = useUser();
  const [currentStep, setCurrentStep] = useState<'telegram' | 'verify'>(
    'telegram'
  );
  const [formData, setFormData] = useState({
    username: '',
    confirmUsername: '',
  });
  const [errors, setErrors] = useState({
    username: '',
    confirmUsername: '',
    match: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    if ((!userDetails?.email || !userDetails?.password) && !userDetails?.access_token) {
      navigate(-1);
      return;
    }
  }, [userDetails]);

  const validateForm = () => {
    const newErrors = {
      username: '',
      confirmUsername: '',
      match: '',
    };
    // Username validation
    if (!formData.username) {
      newErrors.username = 'Telegram handle is required';
    } else if (formData.username.includes(' ')) {
      newErrors.username = 'Handle cannot contain spaces';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Handle must be at least 3 characters';
    }

    // Confirm username validation
    if (!formData.confirmUsername) {
      newErrors.confirmUsername = 'Please confirm your telegram handle';
    }

    // Match validation
    if (
      formData.username &&
      formData.confirmUsername &&
      formData.username !== formData.confirmUsername
    ) {
      newErrors.match = 'Telegram username does not match';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = async (e) => {
    e?.preventDefault()
    console.log(e, "w")
    if (validateForm()) {
      try {
        setUserDetails((prev) => ({ ...prev, isLoading: true }));
        let res
        if (userDetails?.access_token) {
          res = await signup(
            null,
            null,
            formData?.username,
            userDetails?.access_token
          );
        }
        else {
          res = await signup(
            userDetails?.email,
            userDetails.password,
            formData?.username
          );
        }
        setUserDetails((prev) => ({ ...prev, isLoading: false }));
        if (!res || !res?.status) {
          return
        }

        localStorage.setItem('auth_token', res?.data?.access_token);
        if (!userDetails?.access_token) {
          setCurrentStep('verify');
          setUserDetails((prev: any) => ({
            ...prev,
            ...res?.data,
          }));
          return
        }
        res = await authApi.getuser()
        setUserDetails((prev: any) => ({
          ...prev,
          ...res?.data,
        }));
        navigate('/dashboard')

      } catch {
        setUserDetails((prev: any) => ({ ...prev, isLoading: false }));
      }
    }
  };

  const handleResendEmail = async () => {
    interface Payload {
      email: string | undefined;
    }
    let payload: Payload = {
      email: userDetails?.email,
    };
    let result = await authApi.resendemail(payload);

    if (result?.status) {
      toast(result?.message);
    }
  };

  const handleVerifyEmail = async () => {
    try {
      interface Payload {
        authorizarion: string | undefined;
      }
      let payload: Payload = {
        authorizarion: userDetails?.access_token,
      };
      //  return
      setUserDetails((prev) => ({ ...prev, isLoading: true }));
      let result = await authApi.getuser(payload);
      setUserDetails((prev) => ({ ...prev, isLoading: false }));
      if (result?.status) {
        if (!result?.data?.isEmailVerified) {
          toast('Email not verified');
          return;
        }
        setUserDetails(result?.data);
        navigate('/dashboard');
      }
    } catch (error) {
      setUserDetails((prev) => ({ ...prev, isLoading: false }));
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* Header */}
      <header className="flex items-center justify-between p-6">
        <img
          src="/assets/images/nav-logo.png"
          alt="Pistol Signals"
          className="h-8"
        />
        <a
          href="/"
          className="text-gray-400 hover:text-white transition-colors"
        >
          Back to home
        </a>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8">
          {currentStep === 'telegram' ? (
            <>
              {/* Telegram Handle Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <h1 className="text-3xl font-bold">Enter telegram handle</h1>
                <p className="text-gray-400">
                  Share your Telegram handle with us! This is your key to
                  receiving all trading signals, and remember, you can't change
                  it once it's submitted.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <div className="relative">
                    {/* <MessageCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" /> */}
                    <input
                      type="text"
                      placeholder="Enter telegram username"
                      value={formData.username}
                      onChange={(e) =>
                        setFormData({ ...formData, username: e.target.value })
                      }
                      className={`w-full pl-5 pr-2 py-3 bg-white/5 border ${errors.username ? 'border-red-500' : 'border-gray-800'
                        } rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors`}
                    />
                    {errors.username && (
                      <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors.username}</span>
                      </div>
                    )}
                  </div>

                  <div className="relative">
                    {/* <MessageCircle className="absolute left-4 top-1/2s -translate-y-1/2 text-gray-400" /> */}
                    <input
                      type="text"
                      placeholder="Confirm telegram username"
                      value={formData.confirmUsername}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          confirmUsername: e.target.value,
                        })
                      }
                      className={`w-full pl-5 pr-4 py-3 bg-white/5 border ${errors.confirmUsername || errors.match
                        ? 'border-red-500'
                        : 'border-gray-800'
                        } rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors`}
                    />
                    {(errors.confirmUsername || errors.match) && (
                      <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors.confirmUsername || errors.match}</span>
                      </div>
                    )}
                  </div>
                </div>

                <Button
                  disabled={userDetails?.isLoading}
                  variant="gradient"
                  className="w-full bg-gradient-to-r from-[#3366FF] to-[#8B5CF6] hover:opacity-90 transition-opacity"
                  onClick={handleSubmit}
                >
                  {userDetails?.isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    </div>
                  ) : (
                    "I've confirmed my details!"
                  )}
                </Button>
              </motion.div>
            </>
          ) : (
            <>
              {/* Email Verification Step */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4 text-center"
              >
                <h1 className="text-3xl font-bold">
                  Next up, verify your email
                </h1>
                <p className="text-gray-400">
                  To continue subscribing a plan, head over to your inbox and
                  click the verification link we just sent you.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="space-y-6"
              >
                <button
                  onClick={handleResendEmail}
                  className="text-[#22C55E] hover:text-[#16A34A] transition-colors text-sm w-full text-center"
                >
                  Resend email
                </button>

                <Button
                  variant="gradient"
                  className="w-full bg-gradient-to-r from-[#3366FF] to-[#8B5CF6] hover:opacity-90 transition-opacity group"
                  onClick={handleVerifyEmail}
                >
                  {userDetails?.isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    </div>
                  ) : (
                    <>
                      <span>I've verified my email</span>
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </motion.div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
