// components/JobModal.js
import React from 'react';
import Link from 'next/link';

const JobModal = ({ isOpen, onClose, job }) => {
  if (!isOpen || !job) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        
        <div className="Job-description">
          <button onClick={onClose} className="modal-close"> x </button>
  
          <h2 className="text-2xl font-bold my-4">ตำแหน่ง : {job.Job_title}</h2>
          <h3>รายละเอียดงาน :</h3>
          <p>{job.Job_description}</p>
          <h3>คุณสมบัติผู้สมัคร :</h3>
          <p>{job.Qualifications}</p>
          <h3>สวัสดิการ :</h3>
          <p>{job.Benefits}</p>
        </div>
        
        <div className="salary-info">
          <h3>เงินเดือน :</h3>
          <p>{job.Salary}</p>
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

export default JobModal;
