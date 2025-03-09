import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import useSignup from '../hooks/useSignup';

const SignupPage = () => {
  const navigate = useNavigate();

  // Form fields using custom input hook
  const [name, setName] = useInput('');
  const [username, setUsername] = useInput('');
  const [password, setPassword] = useInput('');
  const [phoneNumber, setPhoneNumber] = useInput('');
  const [gender, setGender] = useInput('');
  const [dateOfBirth, setDateOfBirth] = useInput('');
  const [membershipStatus, setMembershipStatus] = useInput('');

  // Regular state for fields
  const [confirmPassword, setConfirmPassword] = useState('');
  const [bio, setBio] = useState('');
  const [address, setAddress] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

  // Custom signup hook
  const { signup, isLoading, error, success } = useSignup('/api/users/signup');
  const [customError, setCustomError] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setCustomError(null);

    // Check passwords match
    if (password !== confirmPassword) {
      setCustomError('Passwords do not match');
      return;
    }

    // Convert date to ISO format for the API
    const formattedDate = new Date(dateOfBirth).toISOString();

    // Create user object with proper field names matching the backend
    const userData = {
      name,
      username,
      password,
      phone_number: phoneNumber,
      gender,
      date_of_birth: formattedDate,
      membership_status: membershipStatus,
      bio: bio || '',
      address,
      profile_picture: profilePicture || '',
    };

    const result = await signup(userData);

    if (result) {
      alert("Signup successful!")
      // Redirect on success
      navigate('/');
    }
  };

  return (
    <div className="create">
      <h2>Create an Account</h2>

      {/* Show success message */}
      {success && (
        <div className="success-message">
          Account created successfully!
        </div>
      )}

      {/* Show error message - either from API or custom validation */}
      {(error || customError) && (
        <div className="error-message">
          {customError || error}
        </div>
      )}

      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name*</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={setName}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="username">Username*</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={setUsername}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password*</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={setPassword}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password*</label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number*</label>
          <input
            id="phoneNumber"
            type="tel"
            value={phoneNumber}
            onChange={setPhoneNumber}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="gender">Gender*</label>
          <select
            id="gender"
            value={gender}
            onChange={setGender}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="dateOfBirth">Date of Birth*</label>
          <input
            id="dateOfBirth"
            type="date"
            value={dateOfBirth}
            onChange={setDateOfBirth}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="membershipStatus">Membership Status*</label>
          <select
            id="membershipStatus"
            value={membershipStatus}
            onChange={setMembershipStatus}
            required
          >
            <option value="">Select Status</option>
            <option value="basic">Basic</option>
            <option value="premium">Premium</option>
            <option value="vip">VIP</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows="3"
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address*</label>
          <textarea
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            rows="2"
          />
        </div>

        <div className="form-group">
          <label htmlFor="profilePicture">Profile Picture URL</label>
          <input
            id="profilePicture"
            type="text"
            value={profilePicture}
            onChange={(e) => setProfilePicture(e.target.value)}
            placeholder="Enter image URL"
          />
        </div>

        <button
          type="submit"
          className="signup-button"
          disabled={isLoading}
        >
          {isLoading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>

      <p className="login-link">
        Already have an account? <a href="/login">Log in here</a>
      </p>
    </div>
  );
};

export default SignupPage;