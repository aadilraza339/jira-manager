import React, { useState } from 'react';
import axios from 'axios';
import './CreateTicketForm.css';

const CreateTicketForm = ({handleCreateTicket, refreshTickets}) => {
    const [summary, setSummary] = useState('');
    const [description, setDescription] = useState('');
    const [issueType, setIssueType] = useState('Task');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/api/v1/create-ticket', {
                summary,
                description,
                issueType,
            });
            setMessage('Ticket created successfully!');
            setTimeout(() => {
                refreshTickets()
                handleCreateTicket()
            }, 1000);
        } catch (error) {
            setMessage('Failed to create ticket.');
            console.error(error);
        }
    };

    return (
        <div className="form-container">
            <h1>Create JIRA Ticket</h1>
            <button className="close-btn" onClick={handleCreateTicket}>X</button>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Summary:</label>
                    <input
                        type="text"
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label>Issue Type:</label>
                    <select
                        value={issueType}
                        onChange={(e) => setIssueType(e.target.value)}
                        required
                    >
                        <option value="Task">Task</option>
                        {/* <option value="Bug">Bug</option> */}
                        {/* <option value="Story">Story</option> */}
                        <option value="Epic">Epic</option>
                    </select>
                </div>
                <button type="submit" className="submit-button">Create Ticket</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default CreateTicketForm;
