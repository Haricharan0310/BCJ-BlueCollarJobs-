import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db, auth } from "../firebase-config";

function Applicants() {
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    const getApplicants = async () => {
      try {
        // Get all jobs where the current user applied
        const querySnapshot = await getDocs(collection(db, "applicants"));
        const jobs = querySnapshot.docs.map((doc) => doc.data());
        const appliedJobs = jobs.filter((job) => job.userId === auth.currentUser.uid);
        setAppliedJobs(appliedJobs);
      } catch (error) {
        console.error("Error fetching applicants:", error);
      }
    };

    getApplicants();
  }, []);

  return (
    <div className="applicants">
      <h2>Applied Jobs</h2>
      {appliedJobs.length > 0 ? (
        appliedJobs.map((job) => (
          <div className="job-applicants" key={job.postId}>
            <h3>Job ID: {job.postId}</h3>
            <p>Name: {job.name}</p>
            <p>Email: {job.email}</p>
          </div>
        ))
      ) : (
        <p>No jobs applied yet.</p>
      )}
    </div>
  );
}

export default Applicants;
