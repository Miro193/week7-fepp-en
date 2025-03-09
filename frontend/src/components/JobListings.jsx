import { Link } from 'react-router-dom';

const JobListings = ({ jobs }) => {

  return (
    <div className="job-list">
      {jobs.map((job) => (
        <div className="job-preview" key={job._id}>
          <Link to={`/jobs/${job._id}`}>View Job</Link>
          <h2>{job.title}</h2>
          <p>Type: {job.type}</p>
          <p>Description: {job.description}</p>
          <p>Company: {job.company.name}</p>
          <p>Contact email: {job.company.contactEmail}</p>
          <p>Contact phone: {job.company.contactPhone}</p>
          <p>Company Website: {job.company.companyWebsite}</p>
          <p>Company Size: {job.company.companySize}</p>
          <p>Location: {job.location}</p>
          <p>Salary: {job.salary}</p>
          <p>Experience Level: {job.experienceLevel}</p>
          <p>Status: {job.status}</p>
          <p>Application Deadline: {job.ApplicationDeadline}</p>
          <p>Requirements: {job.requirements}</p>
        </div>
      ))}
    </div>
  );
};

export default JobListings;
