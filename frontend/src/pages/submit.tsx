import React from 'react';
import Link from 'next/link'; // Import Link for navigation
import Navbar from '@/components/navbar';

const Submit = () => {

    const submitData = () => {
        // Submits data to database from form below
        document.getElementById('submitForm') as HTMLFormElement;

        const formData = {
            title: (document.querySelector('input[name="title"]') as HTMLInputElement)?.value,
            author: (document.querySelector('input[name="author"]') as HTMLInputElement)?.value,
            year: (document.querySelector('input[name="year"]') as HTMLInputElement)?.value,
            journal: (document.querySelector('input[name="journal"]') as HTMLInputElement)?.value,
            practice: (document.querySelector('input[name="practice"]') as HTMLInputElement)?.value,
            claim: (document.querySelector('input[name="claim"]') as HTMLInputElement)?.value,
            researchType: (document.querySelector('input[name="researchType"]') as HTMLInputElement)?.value,
            details: (document.querySelector('textarea[name="details"]') as HTMLTextAreaElement)?.value,
        };

        console.log("Submitted data: ", formData);
    };

    return (
        <div id="submitModal" className="">
            <Navbar />
            <div className="modal-content">
                <form id="submitForm">
                    <input type="text" placeholder="Title" name="title" required />
                    <input type="text" placeholder="Authors" name="author" required />
                    <input type="number" placeholder="Year of Publication" name="year" required />
                    <input type="text" placeholder="Journal/Conference Name" name="journal" required />
                    <input type="text" placeholder="SE Practice" name="practice" required />
                    <input type="text" placeholder="Claim" name="claim" required />
                    <input type="text" placeholder="Type of Research" name="researchType" required />
                    <textarea placeholder="Details" name="details" required></textarea>
                    <button onClick={submitData}>
                        Submit Article
                    </button>
                </form>
            </div>
        </div>

    );
};

export default Submit;
