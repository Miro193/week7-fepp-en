import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditJobPage = () => {
  const { id } = useParams(); // Get job ID from the URL
  const [title, setTitle] = useState(""); // Default to empty for new job
  const [type, setType] = useState("Full-Time"); // Default job type
  const [description, setDescription] = useState(""); // Default to empty
  const [companyName, setCompanyName] = useState(""); // Default to empty
  const [contactEmail, setContactEmail] = useState(""); // Default to empty
  const [contactPhone, setContactPhone] = useState(""); // Default to empty
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [companySize, setCompanySize] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('Entry');
  const [status, setStatus] = useState('open');
  const [applicationDeadline, setApplicationDeadline] = useState('');
  const [requirements, setRequirements] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false); // For loading state
  const [error, setError] = useState(null); // For error handling

  const navigate = useNavigate();

  // Fetch job data when editing
  useEffect(() => {
    if (id) {
      const fetchJob = async () => {
        try {
          const res = await fetch(`/api/jobs/${id}`);
          if (!res.ok) {
            throw new Error("Failed to fetch job details");
          }
          const job = await res.json();
          setTitle(job.title);
          setType(job.type);
          setDescription(job.description);
          setCompanyName(job.company.name);
          setContactEmail(job.company.contactEmail);
          setContactPhone(job.company.contactPhone);
          setCompanyWebsite(job.company.companyWebsite);
          setCompanySize(job.company.companySize);
          setLocation(job.location);
          setSalary(job.salary);
          setExperienceLevel(job.experienceLevel);
          setStatus(job.status);
          setApplicationDeadline(job.applicationDeadline);
          setRequirements(job.requirements);
          setIsSubmitting(job.isSubmitting);
          setLoading(job.loading);
        } catch (err) {
          setError(err.message);
        }
      };

      fetchJob();
    }
  }, [id]);

  // Function to handle the form submission
  const submitForm = async (e) => {
    e.preventDefault();


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
      salary,
      experienceLevel,
      postedDate: new Date().toISOString(),
      status,
      // applicationDeadline: applicationDeadline || null,
      requirements,
    };
    console.log(newJob.postedDate)
    setLoading(true);
    setError(null);

    try {
      let res;
      if (id) {
        // Editing an existing job, make PUT request
        res = await fetch(`/api/jobs/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newJob),
        });
      } else {
        // Adding a new job, make POST request
        res = await fetch("/api/jobs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newJob),
        });
      }

      if (!res.ok) {
        throw new Error("Failed to save job");
      }

      navigate("/"); // Redirect to the homepage after success
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create">
      <h2>Edit Job</h2>

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
          step="0.01"
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
          {loading ? "Saving..." : id ? "Save Changes" : "Add Job"}
        </button>
      </form>
    </div>
  );
};

export default EditJobPage;
