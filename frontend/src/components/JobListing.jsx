const JobListing = ({ job }) => {
  return (
    <div className="job-preview">
      <h2>{job.title}</h2>
      <p>Type: {job.type}</p>
      <p>Description: {job.description}</p>
      <p>Company: {job.company.name}</p>
      <p>Contact email: {job.company.contactEmail}</p>
      <p>Contact phone: {job.company.contactPhone}</p>
      <p>Website: {job.company.contactPhone}</p>
      <p>Employees: {job.company.contactPhone}</p>
      <p>Location: {job.location}</p>
      <p>salary: {job.salary}</p>
      <p>Experience level: {job.experienceLevel}</p>
      <p>Posted: {job.postedDate}</p>
      <p>Status: {job.status}</p>
      <p>Application deadline: {job.applicationDeadline}</p>
      <p>Requirements: {job.requirements}</p>
    </div>
  );
};

export default JobListing;
