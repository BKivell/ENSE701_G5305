//operationalPreferences.tsx

import React from 'react';
import '../styles/operationalPreferences.module.css';
import Navbar from '../components/navbar'; // Import the Navbar component
import Link from 'next/link'; // Import Link for navigation

const OperationalPreferences = () => {
    return (

        <div>
            <Navbar />{ }
            <h1>Operational Preferences</h1>
            <p>
                Welcome to the Operational Preferences section. Here, you can customize and configure various settings to optimize the SPEED application for your specific needs.
            </p>

            <div className="preference-section">
                <h2>User Preferences</h2>
                <p>Customize your user preferences to tailor SPEED to your workflow:</p>
                <div className="preferences">
                    <label>Default View:</label>
                    <select>
                        <option>List View</option>
                        <option>Grid View</option>
                    </select>
                    <label>Notification Preferences:</label>
                    <div className="notification-preferences">
                        <label>Email Notifications:</label>
                        <input type="checkbox" />
                        <label>Push Notifications:</label>
                        <input type="checkbox" />
                    </div>
                </div>
            </div>

            <div className="preference-section">
                <h2>Appearance Settings</h2>
                <p>Choose your preferred theme and layout:</p>
                <div className="preferences">
                    <label>Theme:</label>
                    <select>
                        <option>Light Theme</option>
                        <option>Dark Theme</option>
                    </select>
                    <label>Layout:</label>
                    <div className="layout-preferences">
                        <label>Compact Layout:</label>
                        <input type="checkbox" />
                        <label>Spacious Layout:</label>
                        <input type="checkbox" />
                    </div>
                </div>
            </div>


            <p>
                This page is a central hub for configuring your operational preferences. As you continue to use SPEED and gather feedback, we'll expand the customization options to best serve your requirements.
            </p>

            <div className="back-button-container">
                <Link href="/">
                    <p className="back-button">Back to Home</p>
                </Link>
            </div>
        </div>
    );
};

export default OperationalPreferences;
