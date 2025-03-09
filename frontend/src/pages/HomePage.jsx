import { useState, useEffect } from 'react';
import JobListings from "../components/JobListings";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/jobs');
        if (!response.ok) {
          // console.error('Error fetching jobs:', error);
          throw new Error('Failed to fetch jobs');
        }
        const data = await response.json();
        setJobs(data);
        setError(null);
      } catch (error) {
        console.log('Error fetching jobs:', error);
        setError(error.message);
      }
      finally {
        setIsLoading(false);
      }
    };
    fetchJobs();
  }, []);
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/jobs/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setJobs(jobs.filter(job => job._id !== id));
    } catch (error) {
      console.error('Error deleting job:', error);
      setError(error.message);
    }
  };

  const handleUpdate = (updatedJob) => {
    setJobs(jobs.map(job => (job._id === updatedJob._id ? updatedJob : job)));
  };
  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isLoading ? (
        <div className="loading-container">
          <div className="loading"></div>
        </div>
      ) : jobs.length === 0 ? (
        <div className="no-jobs">
          <h2>No jobs found</h2>
          <p>Post your first job by clicking the Add Job button above!</p>
        </div>
      ) : (
        jobs && <JobListings jobs={jobs} onDelete={handleDelete} onUpdate={handleUpdate} />
      )}
    </div>
  )
};

export default Home;

