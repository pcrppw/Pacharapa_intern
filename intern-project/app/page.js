"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import JobModal from './modal/JobModal';
import './modal/Modal.css';

const Page = () => {
  const [jobs, setJobs] = useState([]);
  const [slogan, setSlogan] = useState("เราคือ Superdev!"); // ค่า fallback
  const [invitation, setInvitation] = useState("มาร่วมงานกับเรา"); 
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/job-positions?populate=Image`);
        setJobs(response.data.data);
      } catch (error) {
        console.log("error fetching jobs:", error);
      }
    };

    const fetchSlogan = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/slogan`);
        setSlogan(response.data.data.slogan);
      } catch (error) {
        console.log("error fetching slogan:", error);
      }
    };

    const fetchInvitation = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/invitation`);
        setInvitation(response.data.data.jobInvitation);
      } catch (error) {
        console.log("error fetching invitation:", error);
      }
    };

    fetchJobs();
    fetchSlogan();
    fetchInvitation();
  }, []);

  const openModal = (job) => {
    setSelectedJob(job);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedJob(null);
    setModalOpen(false);
  };

  return (
  <div className="flex flex-col min-h-screen">  
    <div className="container mx-auto text-center flex-grow">
     
      <div className="slogan py-10 bg-[rgb(34,197,94)]">
        <h1 className="text-2xl my-4">{slogan}</h1>
        <h2>{invitation}</h2>
      </div>

  
      <div className="content py-8">
        <div className="grid grid-cols-3 gap-4">
          {jobs.slice(0, 9).map((job, index) => (
            <div key={index} onClick={() => openModal(job)} className="job-card">
              <img
                src={`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${job.Image.formats.thumbnail.url}`}
                className="w-24 h-24 mx-auto rounded-full"
              />
              <h2 className="my-4">{job.Job_title}</h2>
            </div>
          ))}
        </div>
  
        <JobModal isOpen={isModalOpen} onClose={closeModal} job={selectedJob} />
      </div>
      
      <div className="apply-link">
        <Link href="https://forms.gle/QLdYYmnZ7K4e7Ucb6" target="_blank">
          Apply Now
        </Link>
      </div>
    </div>
    
  </div> 
  );  
};

export default Page;

