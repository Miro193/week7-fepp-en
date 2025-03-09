
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const JobPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();  // This should be the job ID from the URL
  console.log("Job ID:", id); // This should log the job ID, not "undefined"

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const deleteJob = async (id) => {
    try {
      const res = await fetch(`/api/jobs/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete job");
      }
      navigate("/");  // Redirect to the homepage after deleting the job
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`/api/jobs/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch job");
        }
        const data = await res.json();
        setJob(data);  // Set the fetched job data into state
      } catch (err) {
        setError(err.message);  // If there's an error, set the error message
      } finally {
        setLoading(false);  // Stop loading once the job is fetched
      }
    };

    fetchJob();
  }, [id]);  // Dependency on id, so it refetches when the id changes

  const onDeleteClick = (jobId) => {
    const confirm = window.confirm("Are you sure you want to delete this listing?");
    if (!confirm) return;

    deleteJob(jobId);  // Delete the job if confirmed
  };


  return (
    <div className="job-preview">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <h2>{job.title}</h2>
          <p>Type: {job.type}</p>
          <p>Description: {job.description}</p>
          <p>Company: {job.company.name}</p>
          <p>Email: {job.company.contactEmail}</p>
          <p>Phone: {job.company.contactPhone}</p>
          <p>Company website: {job.company.companyWebsite}</p>
          <p>Company size: {job.company.companySize}</p>
          <p>Location: {job.location}</p>
          <p>Salary: {job.salary}</p>
          <p>Experience: {job.experienceLevel}</p>
          <p>Status: {job.status}</p>
          <p>Application deadline: {job.applicationDeadline}</p>
          <p>Reguirements: {job.requirements}</p>
          <button onClick={() => onDeleteClick(job._id)}>Delete</button>
          <button onClick={() => navigate(`/edit-job/${job._id}`)}>Edit</button>
        </>
      )}
    </div>
  );
};

export default JobPage;