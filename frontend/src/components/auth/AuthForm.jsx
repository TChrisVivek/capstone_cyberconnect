import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, User, Mail, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/input';

function AuthForm({ type, onSubmit }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onSubmit({ name, email, password, confirmPassword });
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex justify-center mb-6">
        <div className="w-12 h-12 rounded-full bg-[#1e90ff]/10 flex items-center justify-center">
          <Shield className="w-6 h-6 text-[#1e90ff]" />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-center mb-2">
        {type === 'login' && 'Welcome back'}
        {type === 'register' && 'Create your account'}
        {type === 'forgot-password' && 'Reset your password'}
      </h2>

      <p className="text-[#717d8a] text-center mb-8">
        {type === 'login' && 'Enter your credentials to access your account'}
        {type === 'register' && 'Join our community of cybersecurity professionals'}
        {type === 'forgot-password' && "We'll send you a link to reset your password"}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        
        {type === 'register' && (
          <div className="space-y-1">
            <label htmlFor="name" className="text-sm font-medium">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#717d8a]" />
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                className="pl-10"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>
        )}

        <div className="space-y-1">
          <label htmlFor="email" className="text-sm font-medium">Email address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#717d8a]" />
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              className="pl-10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        {type !== 'forgot-password' && (
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-medium">Password</label>
              {type === 'login' && (
                <Link to="/forgot-password" className="text-xs text-[#1e90ff] hover:underline">
                  Forgot password?
                </Link>
              )}
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#717d8a]" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="pl-10 "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-5 h-5 text-[#717d8a]" /> : <Eye className="w-5 h-5 text-[#717d8a]" />}
              </button>
            </div>
          </div>
        )}

        {type === 'register' && (
          <div className="space-y-1">
            <label htmlFor="confirm-password" className="text-sm font-medium">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#717d8a]" />
              <Input
                id="confirm-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="pl-10"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>
        )}

        <Button
          type="submit"
          className="w-full h-11 gap-2"
          disabled={loading}
          style={{ backgroundColor: '#1e90ff', color: '#f4f8fb' }}
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              {type === 'login' && 'Sign in'}
              {type === 'register' && 'Create account'}
              {type === 'forgot-password' && 'Send reset link'}
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </Button>
      </form>
      
      <div className="mt-8 text-center text-sm">
        {type === 'login' && (
          <p className="text-muted-foreground">
            Don't have an account?{' '}
            <Link to="/register" className="text-[#1e90ff] hover:underline font-medium">Sign up</Link>
          </p>
        )}
        {type === 'register' && (
          <p className="text-muted-foreground">
            Already have an account?{' '}
            <Link to="/login" className="text-[#1e90ff] hover:underline font-medium">Sign in</Link>
          </p>
        )}
        {type === 'forgot-password' && (
          <p className="text-muted-foreground">
            Remember your password?{' '}
            <Link to="/login" className="text-[#1e90ff] hover:underline font-medium">Sign in</Link>
          </p>
        )}
      </div>
    </div>
  );
}

export { AuthForm };