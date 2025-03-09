import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import { toast } from 'react-toastify';

const AddJobPage = () => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [companyWebsite, setCompanyWebsite] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [experienceLevel, setExperienceLevel] = useState(''); // Set default value
  const [status, setStatus] = useState(''); // Set default value
  const [applicationDeadline, setApplicationDeadline] = useState('');
  const [requirements, setRequirements] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // Add loading state
  const [error, setError] = useState(''); // Add error state for feedback

  const navigate = useNavigate();

  const addJob = async (newJob) => {
    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newJob),
      });

      if (!res.ok) {
        // Parse error response if possible
        const errorData = await res.json().catch(() => null);
        console.error("Server response:", errorData);
        throw new Error(errorData?.message || "Failed to add job");
      }

      return true;
    } catch (error) {
      console.error("Error adding job:", error);
      setError(error.message || "Failed to add job");
      return false;
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Process requirements into an array
      const requirementsArray = requirements
        .split(',')
        .map(req => req.trim())
        .filter(req => req !== '');

      // Validate salary
      let parsedSalary = null;
      if (salary) {
        parsedSalary = parseFloat(salary);
        if (isNaN(parsedSalary)) {
          throw new Error("Salary must be a valid number");
        }
      }

      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(contactEmail)) {
        throw new Error("Please enter a valid email address");
      }

      const newJob = {
        title,
        type,
        description,
        company: {
          name: companyName,
          contactEmail,
          contactPhone,
          website: companyWebsite || null,
          size: companySize ? parseInt(companySize, 10) : null,
        },
        location,
        salary: parsedSalary,
        experienceLevel,
        postedDate: new Date().toISOString(),
        status,
        applicationDeadline: applicationDeadline || null,
        requirements: requirementsArray,
      };

      console.log("Submitting job data:", newJob);

      const result = await addJob(newJob);

      if (result) {
        // toast.success('Job Added Successfully');
        console.log("Job added successfully");
        navigate('/');
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setError(error.message || "Failed to add job");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create">
      <h2>Add a New Job</h2>

      {/* Display error message if there is one */}
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={submitForm}>
        <label>Job title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Job type:</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Remote">Remote</option>
          <option value="Internship">Internship</option>
        </select>

        <label>Job Description:</label>
        <textarea
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <label>Company Name:</label>
        <input
          type="text"
          required
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />

        <label>Contact Email:</label>
        <input
          type="email" // Changed to email type for basic validation
          required
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
        />

        <label>Contact Phone:</label>
        <input
          type="tel" // Changed to tel type
          required
          value={contactPhone}
          onChange={(e) => setContactPhone(e.target.value)}
        />

        <label>Company Website (Optional):</label>
        <input
          type="url"
          value={companyWebsite}
          onChange={(e) => setCompanyWebsite(e.target.value)}
        />

        <label>Company Size (Optional):</label>
        <input
          type="number"
          min="1"
          value={companySize}
          onChange={(e) => setCompanySize(e.target.value)}
        />

        <label>Location:</label>
        <input
          type="text"
          required
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <label>Salary:</label>
        <input
          type="number"
          min="0"
          step="1"
          required
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />

        <label>Experience Level:</label>
        <select
          value={experienceLevel}
          onChange={(e) => setExperienceLevel(e.target.value)}
        >
          <option value="Entry">Entry</option>
          <option value="Mid">Mid</option>
          <option value="Senior">Senior</option>
        </select>

        <label>Status:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="open">Open</option>
          <option value="closed">Closed</option>
        </select>

        <label>Application Deadline (Optional):</label>
        <input
          type="date"
          value={applicationDeadline}
          onChange={(e) => setApplicationDeadline(e.target.value)}
        />

        <label>Requirements (comma separated):</label>
        <input
          type="text"
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
          placeholder="e.g. JavaScript, React, 3+ years experience"
        />

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Adding Job...' : 'Add Job'}
        </button>
      </form>
    </div>
  );
};

export default AddJobPage;