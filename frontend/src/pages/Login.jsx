import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';

const LoginPage = () => {
  const navigate = useNavigate();

  // Form input state using custom hook
  const [username, setUsername] = useInput('');
  const [password, setPassword] = useInput('');

  // Component state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Make API request to login endpoint
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      // Handle error response
      if (!response.ok) {
        throw new Error(data.error || 'Login failed. Please check your credentials.');
      }

      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify({
        username: data.username,
        token: data.token,
        userId: data.userId
      }));

      // Redirect to dashboard or home page
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="create">
      <h2>Login to Your Account</h2>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={setUsername}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={setPassword}
            required
          />
        </div>

        <button
          type="submit"
          className="login-button"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <div className="auth-links">
        <p>
          Don&apos;t have an account? <a href="/signup">Sign up here</a>
        </p>
        <p>
          <a href="/forgot-password">Forgot your password?</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;