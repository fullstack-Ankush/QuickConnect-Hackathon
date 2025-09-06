import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

const style = `
    /* General Styles */
    body {
        font-family: 'Inter', sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f3f4f6;
    }

    .app-container {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        background-color: #f3f4f6;
    }

    /* Modal Styles */
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 50;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0.5);
        transition: opacity 0.3s;
        padding: 1rem;
    }

    .modal-content {
        background-color: #ffffff;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        padding: 2rem;
        width: 100%;
        max-width: 48rem;
        transform: scale(1);
        opacity: 1;
        transition: transform 0.3s, opacity 0.3s;
    }
    
    .modal-title {
        font-size: 1.5rem;
        font-weight: 600;
        color: #1f2937;
    }
    
    .modal-close-button {
        color: #6b7280;
        transition: color 0.3s;
        max-width: 10%;
        max-height: 20px;
        object-fit: cover;
        background-color: #fff;

    }
    button img{
        position : relative;
        max-width : 20px;
        max-height: 20px
        position: relative;
        bottom: 10px;
    }
    
    .modal-close-button:hover {
        color: #4b5563;
    }

    /* Login Page Styles */
    .login-container {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem;
    }

    .login-card {
        width: 100%;
        max-width: 24rem;
        background-color: #ffffff;
        border-radius: 0.75rem;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        padding: 2rem;
        transition: transform 0.3s;
    }

    .login-logo {
        height: 5rem;
        width: 5rem;
        border-radius: 1rem;
        margin-bottom: 1rem;
    }

    .login-title {
        font-size: 1.875rem;
        font-weight: 700;
        text-align: center;
        color: #1f2937;
        margin-bottom: 0.5rem;
    }

    .login-subtitle {
        color: #6b7280;
        text-align: center;
        margin-bottom: 1.5rem;
    }

    .login-form {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    .input-label {
        display: block;
        font-size: 0.875rem;
        font-weight: 500;
        color: #374151;
    }

    .input-field-wrapper {
        position: relative;
        margin-top: 0.25rem;
        border-radius: 0.375rem;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    }

    .input-icon {
        position: absolute;
        inset-y: 0;
        left: 0;
        padding-left: 0.75rem;
        display: flex;
        align-items: center;
        pointer-events: none;
        color: #9ca3af;
        height: 1.25rem;
        width: 1.25rem;
    }

    .input-field {
        display: block;
        width: 100%;
        // padding-left: 2.5rem;
        // padding-right: 1rem;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        font-size: 0.875rem;
        border: 1px solid #d1d5db;
        border-radius: 0.375rem;
        transition: border-color 0.3s, box-shadow 0.3s;
        background-color: white;
        color:black
    }

    .input-field:focus {
        border-color: #3b82f6;
        box-shadow: 0 0 0 1px #3b82f6;
        outline: none;
    }

    .login-button {
        width: 100%;
        display: flex;
        justify-content: center;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        padding-left: 1rem;
        padding-right: 1rem;
        border-width: 1px;
        border-color: transparent;
        border-radius: 0.375rem;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        font-size: 0.875rem;
        font-weight: 500;
        color: #ffffff;
        background-color: #1f2937;
        transition: background-color 0.3s;
    }

    .login-button:hover {
        background-color: #111827;
    }

    .login-links {
        margin-top: 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 0.875rem;
    }

    .login-link {
        font-weight: 500;
        color: #4b5563;
        transition: color 0.3s;
    }

    .login-link:hover {
        color: #1f2937;
    }

    .login-signup-text {
        color: #6b7280;
    }

    /* Header Styles */
    .header {
        width: 100%;
        background-color: #ffffff;
        border-radius: 0.5rem;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        padding: 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 2rem;
    }
    
    .header-logo-group {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .header-logo {
        height: 2.25rem;
        width: 2.25rem;
        border-radius: 9999px;
    }
    
    .header-title {
        font-size: 1.25rem;
        font-weight: 700;
        color: #1f2937;
    }

    .header-nav {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .nav-button {
        color: #ffffffff;
        font-weight: 500;
        transition: color 0.3s;
    }

    .nav-button:hover {
        color: #3b82f6;
    }
    
    .header-actions {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .search-input-wrapper {
        position: relative;
    }

    .search-input {
        display: block;
        width: 100%;
        border-radius: 0.375rem;
        border: 1px solid #d1d5db;
        padding-left: 2.5rem;
        padding-right: 1rem;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        font-size: 0.875rem;
        outline: none;
        transition: border-color 0.3s, box-shadow 0.3s;
    }

    .search-input:focus {
        border-color: #3b82f6;
        box-shadow: 0 0 0 1px #3b82f6;
    }

    .post-button {
        display: flex;
        align-items: center;
        background-color: #2563eb;
        color: #ffffff;
        font-weight: 500;
        padding: 0.5rem 1rem;
        border-radius: 0.375rem;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        transition: background-color 0.3s;
        white-space: nowrap;
    }

    .post-button:hover {
        background-color: #1d4ed8;
    }

    /* Dashboard Page Styles */
    .dashboard-container {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 1rem;
        max-width: 1280px;
        margin: 0 auto;
    }
    
    .page-title {
        font-size: 1.5rem;
        font-weight: 700;
        color: #1f2937;
        margin-bottom: 1.5rem;
    }

    .filter-bar {
        background-color: #ffffff;
        padding: 1rem;
        border-radius: 0.5rem;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        margin-bottom: 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        justify-content: space-between;
        align-items: center;
    }
    
    @media (min-width: 640px) {
        .filter-bar {
            flex-direction: row;
            gap: 0;
            padding: 1.25rem;
        }
    }
    
    .filter-title {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 600;
        color: #1f2937;
    }

    .filter-group {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 100%;
    }

    @media (min-width: 640px) {
        .filter-group {
            flex-direction: row;
            gap: 1rem;
            width: auto;
        }
    }

    .filter-label {
        display: block;
        font-size: 0.875rem;
        font-weight: 500;
        color: #374151;
    }

    .filter-select {
        display: block;
        width: 100%;
        padding: 0.5rem 0.75rem;
        border: 1px solid #d1d5db;
        background-color: #ffffff;
        border-radius: 0.375rem;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        font-size: 0.875rem;
        outline: none;
        color: black;
        transition: border-color 0.3s, box-shadow 0.3s;
    }

    .filter-select:focus {
        border-color: #3b82f6;
        box-shadow: 0 0 0 1px #3b82f6;
    }

    .task-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 1rem;
    }
    
    @media (min-width: 1024px) {
        .task-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
        }
    }

    @media (min-width: 1920px) {
        .task-grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
        }
    }

    .task-card {
        background-color: #ffffff;
        padding: 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        cursor: pointer;
        transition: box-shadow 0.2s;
    }
    
    .task-card:hover {
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
    
    .task-card-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1rem;
    }

    .task-card-title {
        font-size: 1.125rem;
        font-weight: 600;
        color: #1f2937;
    }

    .task-description {
        color: #4b5563;
        font-size: 0.875rem;
        margin-bottom: 1rem;
    }

    .task-info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 0.75rem;
        color: #6b7280;
    }

    .task-tags {
        margin-top: 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .task-action-section {
        margin-top: 1rem;
        padding-top: 1rem;
        border-top: 1px solid #e5e7eb;
    }

    .task-stats {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.875rem;
        font-weight: 500;
        color: #4b5563;
    }
    
    .task-button {
        width: 100%;
        padding: 0.5rem;
        font-size: 0.875rem;
        font-weight: 500;
        color: #ffffff;
        background-color: #2563eb;
        border-radius: 0.375rem;
        transition: background-color 0.3s;
        margin-top: 0.5rem;
    }

    .task-button:hover {
        background-color: #1d4ed8;
    }

    .no-tasks-message {
        text-align: center;
        padding-top: 2.5rem;
        padding-bottom: 2.5rem;
        color: #6b7280;
    }

    /* Tags */
    .tag {
        display: inline-block;
        font-size: 0.75rem;
        font-weight: 500;
        padding: 0.25rem 0.5rem;
        border-radius: 9999px;
    }
    
    .tag-priority-high, .tag-priority-urgent {
        background-color: #fee2e2;
        color: #991b1b;
    }
    
    .tag-priority-medium {
        background-color: #fffbeb;
        color: #92400e;
    }
    
    .tag-priority-low {
        background-color: #d1fae5;
        color: #065f46;
    }
    
    .tag-category-Electrical {
        background-color: #dbeafe;
        color: #1e40af;
    }
    
    .tag-category-Local {
        background-color: #ede9fe;
        color: #5b21b6;
    }
    
    .tag-category-Miscellaneous {
        background-color: #d1fae5;
        color: #065f46;
    }
    
    .tag-category-Mechanical {
        background-color: #fef3c7;
        color: #92400e;
    }
    
    .tag-status-open {
        background-color: #d1fae5;
        color: #065f46;
    }
    
    .tag-status-in-progress {
        background-color: #fffbeb;
        color: #92400e;
    }
    
    .tag-status-completed {
        background-color: #dbeafe;
        color: #1e40af;
    }
    
    /* Profile Page Styles */
    .profile-container {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 1rem;
        max-width: 1280px;
        margin: 0 auto;
    }
    
    .profile-card {
        background-color: #ffffff;
        border-radius: 0.5rem;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        padding: 1.5rem;
        max-width: 42rem;
        margin-left: auto;
        margin-right: auto;
    }
    
    .profile-header {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }
    
    @media (min-width: 640px) {
        .profile-header {
            flex-direction: row;
            align-items: flex-start;
            gap: 1.5rem;
        }
    }
    
    .profile-picture {
        height: 8rem;
        width: 8rem;
        border-radius: 9999px;
        border-width: 4px;
        border-color: #e5e7eb;
    }
    
    .profile-info {
        flex: 1;
        text-align: center;
    }
    
    @media (min-width: 640px) {
        .profile-info {
            text-align: left;
        }
    }
    
    .profile-name {
        font-size: 1.5rem;
        font-weight: 600;
        color: #1f2937;
    }
    
    .profile-email {
        color: #6b7280;
    }
    
    .profile-bio {
        margin-top: 0.5rem;
        color: #4b5563;
    }
    
    .profile-button {
        margin-top: 1rem;
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
        font-weight: 500;
        color: #ffffff;
        background-color: #2563eb;
        border-radius: 0.375rem;
        transition: background-color 0.3s;
    }
    
    .profile-button:hover {
        background-color: #1d4ed8;
    }
    
    .contact-info {
        margin-top: 2rem;
        padding-top: 2rem;
        border-top: 1px solid #e5e7eb;
    }
    
    .contact-title {
        font-size: 1.25rem;
        font-weight: 600;
        color: #1f2937;
        margin-bottom: 1rem;
    }

    .grid-container {
        display: grid;
        grid-template-columns: repeat(1, minmax(0, 1fr));
        gap: 1rem;
    }
    
    @media (min-width: 768px) {
        .grid-container {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }
    
    .contact-text {
        color: #4b5563;
    }
    
    .contact-label {
        font-weight: 600;
    }

    /* Applicants Modal */
    .applicant-card {
        background-color: #f3f4f6;
        padding: 1rem;
        border-radius: 0.5rem;
        display: flex;
        align-items: flex-start;
        gap: 1rem;
    }
    
    .applicant-avatar {
        height: 3rem;
        width: 3rem;
        border-radius: 9999px;
        border: 2px solid #60a5fa;
    }
    
    .applicant-info {
        flex: 1;
    }
    
    .applicant-name {
        font-size: 1.125rem;
        font-weight: 600;
        color: #1f2937;
    }
    
    .applicant-skills {
        font-size: 0.875rem;
        color: #4b5563;
        margin-bottom: 0.25rem;
    }

    .applicant-location {
        font-size: 0.875rem;
        color: #6b7280;
        margin-bottom: 0.5rem;
        display: flex;
        align-items: center;
    }

    .applicant-actions {
        display: flex;
        gap: 0.5rem;
    }

    .accept-button {
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
        font-weight: 500;
        color: #ffffff;
        background-color: #10b981;
        border-radius: 0.375rem;
        transition: background-color 0.3s;
    }

    .accept-button:hover {
        background-color: #059669;
    }
    
    .reject-button {
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
        font-weight: 500;
        color: #dc2626;
        background-color: #fee2e2;
        border-radius: 0.375rem;
        transition: background-color 0.3s;
    }
    
    .reject-button:hover {
        background-color: #fecaca;
    }

    /* Timer styles */
    .timer-container {
        text-align: center;
        padding: 2rem;
    }
    
    .timer-accepted-text {
        color: #16a34a;
        font-weight: 600;
        font-size: 1.125rem;
        margin-bottom: 0.5rem;
    }
    
    .timer-location {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        color: #2563eb;
        font-weight: 500;
        font-size: 0.875rem;
        margin-bottom: 1rem;
    }
    
    .timer-time {
        font-size: 1.5rem;
        font-weight: 700;
        color: #1f2937;
    }

    /* Animation for pulse effect */
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: .5; }
    }
    .pulse-animation {
        animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
    .map-container {
        width: 100%;
        height: 200px;       /* adjust height */
        border-radius: 0.5rem;
        overflow: hidden;
    }

    .map-container img {
        width: 100%;
        height: 100%;
        border: 0;
}










`;

// Main App component that manages the application state and routing
const App = () => {
    // State to manage the current active page
    const [currentPage, setCurrentPage] = useState('login');
    // State to manage the visibility of the "Create New Task" modal
    const [showPostModal, setShowPostModal] = useState(false);
    // State to manage the visibility of the "View Task" modal
    const [showViewModal, setShowViewModal] = useState(false);
    // State to manage the visibility of the "Applicants" modal
    const [showApplicantsModal, setShowApplicantsModal] = useState(false);
    // State for the selected task to display in the modal
    const [selectedTask, setSelectedTask] = useState(null);
    // State for the current filter category
    const [filterCategory, setFilterCategory] = useState('All Categories');
    // State for the current filter priority
    const [filterPriority, setFilterPriority] = useState('All Priorities');
    // State for the current filter status
    const [filterStatus, setFilterStatus] = useState('All Statuses');
    // State to filter tasks to show only those posted by the user
    const [filterMyTasks, setFilterMyTasks] = useState(false);

    // Initial public tasks
    const [tasks, setTasks] = useState([
        { id: 1, title: 'Fix broken pipe', priority: '₹1000+', owner: 'public', description: 'I need a plumber to fix a broken pipe in my kitchen. The water is leaking badly.', posted: 'Aug 26, 2025', category: 'Mechanical', status: 'Open', views: 24, applicants: 1 },
        { id: 2, title: 'Need a Copywriter', priority: '₹100-500', owner: 'you', description: 'Need a tutor for high school mathematics - algebra and geometry. Flexible with timing, preferably...', posted: 'Aug 27, 2025', category: 'Miscellaneous', status: 'In Progress', views: 52, applicants: 3 },
        { id: 3, title: 'Invertor kaam nhi kar rha', priority: '₹500-1000', owner: 'public', description: 'Looking for a talented electrician who helped me to fix this invertor as it not started working.', posted: 'Aug 24, 2025', category: 'Electrical', status: 'Completed', views: 95, applicants: 9 },
        { id: 4, title: 'Bazaar se Dudh laana', priority: '₹0-100', owner: 'you', description: 'Looking for someone to bring me a amul full cream milk', posted: 'Aug 27, 2025', category: 'Local', status: 'Open', views: 89, applicants: 7 },
        { id: 5, title: 'Proofread an essay', priority: '₹0-100', owner: 'public', description: 'I have a 10-page essay that needs to be proofread for grammar and spelling errors.', posted: 'Aug 25, 2025', category: 'Writing', status: 'In Progress', views: 76, applicants: 4 },
        { id: 6, title: 'Sabzi laani hain market se', priority: '₹500-1000', owner: 'public', description: 'Looking for someone to bring me 2 kg potatoes , 1 kg onion , 1 kg tomatoes ....', posted: 'Aug 27, 2025', category: 'Local', status: 'Completed', views: 120, applicants: 15 },
        { id: 7, title: 'Assignment writer ', priority: '₹100-500', owner: 'public', description: 'Need a content writer to write weekly blog posts on technology and startups. Long-term project.', posted: 'Aug 28, 2025', category: 'Miscellaneous', status: 'Open', views: 45, applicants: 6 },
        { id: 8, title: 'Dog walking ', priority: '₹0-100', owner: 'public', description: 'Need a Person who take my dog as a walk for 10 min ', posted: 'Aug 29, 2025', category: 'Local', status: 'Open', views: 60, applicants: 2 },
        { id: 9, title: 'Mobile App Developer (React Native)', priority: '₹1000+', owner: 'public', description: 'Looking for an experienced React Native developer to build a new e-commerce app.', posted: 'Aug 29, 2025', category: 'Miscellaneous', status: 'Open', views: 150, applicants: 10 },
        { id: 10, title: 'Technical  Writer', priority: '₹500-1000', owner: 'public', description: 'Write clear and concise technical documentation for a new software product.', posted: 'Aug 28, 2025', category: 'Miscellaneous', status: 'In Progress', views: 30, applicants: 1 },
        { id: 11, title: 'Illustration for Children\'s Book', priority: '₹100-500', owner: 'public', description: 'I need a talented illustrator to create fun and vibrant illustrations for a children\'s book.', posted: 'Aug 27, 2025', category: 'Miscellaneous', status: 'Open', views: 85, applicants: 4 },
        { id: 12, title: 'Full-Stack Developer', priority: '₹1000+', owner: 'public', description: 'Seeking a full-stack developer with experience in Node.js and React to build a web application from scratch.', posted: 'Aug 26, 2025', category: 'Development', status: 'In Progress', views: 110, applicants: 8 },
    ]);
    
    // Updated applicant data with Indian names and locations
    const applicants = [
        { id: 1, name: 'Priya Sharma', location: 'Delhi, India', skills: 'Expert in copywriting, content creation, and technical writing.' },
        { id: 2, name: 'Rohit Singh', location: 'Bengaluru, India', skills: 'Experienced helping in Local task.' },
        { id: 3, name: 'Rahul Kumar', location: 'Chennai, India', skills: 'Professional Mechanical-engineer repairing car for 10+ year' },
    ];
    
    // User's location for the accepted task
    const userLocation = "New Delhi, India";

    // Filter tasks based on all three criteria and if they belong to the user
    const filteredTasks = tasks.filter(task => {
        const categoryMatch = filterCategory === 'All Categories' || task.category === filterCategory;
        const priorityMatch = filterPriority === 'All Priorities' || task.priority === filterPriority;
        const statusMatch = filterStatus === 'All Statuses' || task.status === filterStatus;
        const myTasksMatch = !filterMyTasks || task.owner === 'you';
        return categoryMatch && priorityMatch && statusMatch && myTasksMatch;
    });

    const handleTaskClick = (task) => {
        setSelectedTask(task);
        setShowViewModal(true);
    };
    
    const handleChooseApplicant = (task) => {
        setSelectedTask(task);
        setShowApplicantsModal(true);
    };

    const handlePostTask = (newTaskData) => {
        const newTaskId = tasks.length + 1; // Simple unique ID for dummy data
        const newPostedTask = {
            id: newTaskId,
            ...newTaskData,
            owner: 'you',
            posted: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            views: Math.floor(Math.random() * 100) + 1,
            applicants: Math.floor(Math.random() * 10) + 1,
        };
        setTasks(prevTasks => [...prevTasks, newPostedTask]);
        setShowPostModal(false);
    };

    return (
        <div className="app-container">
            <style>{style}</style>
            {/* Conditionally render the correct page based on state */}
            {currentPage === 'login' && <LoginPage onLogin={() => setCurrentPage('dashboard')} />}
            {currentPage === 'dashboard' && (
                <DashboardPage
                    onNavigate={setCurrentPage}
                    onShowModal={() => setShowPostModal(true)}
                    tasks={filteredTasks}
                    onTaskClick={handleTaskClick}
                    filterCategory={filterCategory}
                    setFilterCategory={setFilterCategory}
                    filterPriority={filterPriority}
                    setFilterPriority={setFilterPriority}
                    filterStatus={filterStatus}
                    setFilterStatus={setFilterStatus}
                    filterMyTasks={filterMyTasks}
                    setFilterMyTasks={setFilterMyTasks}
                    onChooseApplicant={handleChooseApplicant}
                />
            )}
            {currentPage === 'profile' && <ProfilePage onNavigate={setCurrentPage} onShowModal={() => setShowPostModal(true)} />}

            {/* Conditionally render the modals */}
            {showPostModal && <PostTaskModal onClose={() => setShowPostModal(false)} onPostTask={handlePostTask} />}
            {showViewModal && <ViewTaskModal task={selectedTask} onClose={() => setShowViewModal(false)} />}
            {showApplicantsModal && <ApplicantsModal applicants={applicants} onClose={() => setShowApplicantsModal(false)} userLocation={userLocation} />}
        </div>
    );
};

// Component for the Login Page
const LoginPage = ({ onLogin }) => {
    return (
        <div className="login-container">
            <div className="login-card">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <img src="https://placehold.co/80x80/667EEA/ffffff?text=QC" alt="QuickConnect Logo" className="login-logo"/>
                    <h1 className="login-title">Welcome to QuickConnect</h1>
                    <p className="login-subtitle">Sign in to continue</p>
                </div>

                <form className="login-form">
                    <div>
                        <label htmlFor="email" className="input-label">Email</label>
                        <div className="input-field-wrapper">
                            <div className="input-icon">
                                {/* <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg> */}
                            </div>
                            <input id="email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" className="input-field"/>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="password" className="input-label">Password</label>
                        <div className="input-field-wrapper">
                            <div className="input-icon">
                                {/* <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg> */}
                            </div>
                            <input id="password" name="password" type="password" autoComplete="current-password" required placeholder="••••••••" className="input-field"/>
                        </div>
                    </div>
                    <div>
                        <button type="button" onClick={onLogin} className="login-button">
                            Sign in
                        </button>
                    </div>
                </form>
                <div className="login-links">
                    <a href="#" className="login-link">Forgot password?</a>
                    <p className="login-signup-text">Need an account? <a href="#" className="login-link" style={{ color: '#1f2937' }}>Sign up</a></p>
                </div>
            </div>
        </div>
    );
};

// Reusable Header/Navbar Component
const Header = ({ onNavigate, onShowModal, setFilterMyTasks }) => {
    return (
        <header className="header">
            <div className="header-logo-group">
                <img src="https://placehold.co/36x36/667EEA/ffffff?text=QC" alt="QuickConnect Logo" className="header-logo"/>
                <span className="header-title">QuickConnect</span>
            </div>
            <nav className="header-nav">
                <button onClick={() => { onNavigate('dashboard'); setFilterMyTasks(false); }} className="nav-button">Tasks</button>
                <button onClick={() => { onNavigate('dashboard'); setFilterMyTasks(true); }} className="nav-button">Your Tasks</button>
                <button onClick={() => onNavigate('profile')} className="nav-button">Profile</button>
            </nav>
            <div className="header-actions">
                <div className="search-input-wrapper" style={{ display: 'none' }}>
                    <span className="search-icon">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                        </svg>
                    </span>
                    <input className="search-input" placeholder="Search" type="text"/>
                </div>
                <button onClick={onShowModal} className="post-button">
                    <svg className="h-4 w-4" style={{ marginRight: '0.5rem' }} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" />
                    </svg>
                    <span>Post New Task</span>
                </button>
            </div>
        </header>
    );
};

// Component for the Dashboard Page
const DashboardPage = ({ onNavigate, onShowModal, tasks, onTaskClick, filterCategory, setFilterCategory, filterPriority, setFilterPriority, filterStatus, setFilterStatus, filterMyTasks, setFilterMyTasks, onChooseApplicant }) => {
    // Helper function to get priority styling
    const getPriorityStyle = (priority) => {
        switch (priority) {
            case '₹500-1000':
                return 'tag-priority-high';
            case '₹100-500':
                return 'tag-priority-medium';
            case '₹1000+':
                return 'tag-priority-urgent';
            case '₹0-100':
                return 'tag-priority-low';
            default:
                return '';
        }
    };

    // Helper function to get category styling
    const getCategoryStyle = (category) => {
        switch (category) {
            case 'Mechanical':
                return 'tag-category-Mechanical';
            case 'Electrical':
                return 'tag-category-Electrical';
            case 'Local':
                return 'tag-category-Local';
            case 'Miscellaneous':
                return 'tag-category-Miscellaneous';
            default:
                return '';
        }
    };

    // Helper function to get status styling
    const getStatusStyle = (status) => {
        switch (status) {
            case 'Open':
                return 'tag-status-open';
            case 'In Progress':
                return 'tag-status-in-progress';
            case 'Completed':
                return 'tag-status-completed';
            default:
                return '';
        }
    };

    return (
        <div className="dashboard-container">
            <Header onNavigate={onNavigate} onShowModal={onShowModal} setFilterMyTasks={setFilterMyTasks} />
            <main className="w-full flex-1">
                <h1 className="page-title">
                    {filterMyTasks ? 'Your Tasks' : 'Community Task Board'}
                </h1>
                
                {!filterMyTasks && (
                    <div className="filter-bar">
                        <div className="filter-title">
                            <svg className="h-6 w-6" style={{ color: '#6b7280' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v2m0-2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8v2M7 18a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2" />
                            </svg>
                            <h2 style={{ fontWeight: '600', color: '#1f2937' }}>Filter Tasks</h2>
                        </div>
                        <div className="filter-group">
                            {/* Category Filter */}
                            <div style={{ flex: 1 }}>
                                <label htmlFor="category-filter" className="filter-label">Category</label>
                                <select
                                    id="category-filter"
                                    value={filterCategory}
                                    onChange={(e) => setFilterCategory(e.target.value)}
                                    className="filter-select"
                                >
                                    <option>All Categories</option>
                                    <option>Mechanical</option>
                                    <option>Electrical</option>
                                    <option>Local</option>
                                    <option>Miscellaneous</option>
                                </select>
                            </div>
                            {/* Priority Filter */}
                            <div style={{ flex: 1 }}>
                                <label htmlFor="priority-filter" className="filter-label">Price</label>
                                <select
                                    id="priority-filter"
                                    value={filterPriority}
                                    onChange={(e) => setFilterPriority(e.target.value)}
                                    className="filter-select"
                                >
                                    <option>All Price</option>
                                    <option>₹0-100</option>
                                    <option>₹100-500</option>
                                    <option>₹500-1000</option>
                                    <option>₹1000+</option>
                                </select>
                            </div>
                            {/* Status Filter */}
                            <div style={{ flex: 1 }}>
                                <label htmlFor="status-filter" className="filter-label">Status</label>
                                <select
                                    id="status-filter"
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                    className="filter-select"
                                >
                                    <option>All Statuses</option>
                                    <option>Open</option>
                                    <option>In Progress</option>
                                    <option>Completed</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}
                

                <div className="task-grid">
                    {tasks.length > 0 ? tasks.map(task => (
                        <div
                            key={task.id}
                            className="task-card"
                            onClick={() => onTaskClick(task)}
                        >
                            <div className="task-card-header">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span className="tag" style={{ backgroundColor: '#bfdbfe', color: '#1d4ed8' }}>PA</span>
                                    <h3 className="task-card-title">{task.title}</h3>
                                </div>
                                <span className={`tag ${getPriorityStyle(task.priority)}`}>
                                    {task.priority}
                                </span>
                            </div>
                            <p className="task-description">{task.description}</p>
                            <div className="task-info">
                                <span>🗓️ Posted {task.posted}</span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" style={{ color: '#ef4444' }} viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-9H6a1 1 0 100 2h3v3a1 1 0 102 0v-3h3a1 1 0 100-2h-3V6a1 1 0 10-2 0v3z" clipRule="evenodd" />
                                    </svg>
                                    {task.owner === 'you' ? 'Your Task' : 'Public'}
                                </span>
                            </div>
                            <div className="task-tags">
                                <span className={`tag ${getCategoryStyle(task.category)}`}>
                                    {task.category}
                                </span>
                                <span className={`tag ${getStatusStyle(task.status)}`}>
                                    {task.status}
                                </span>
                            </div>
                            {filterMyTasks && task.owner === 'you' && (
                                <div className="task-action-section">
                                    <div className="task-stats">
                                        <span>Views: {task.views}</span>
                                        <span>Applicants: {task.applicants}</span>
                                    </div>
                                    <button onClick={(e) => { e.stopPropagation(); onChooseApplicant(task); }} className="task-button">
                                        Choose Applicant
                                    </button>
                                </div>
                            )}
                        </div>
                    )) : (
                        <div className="no-tasks-message">
                            No tasks found for this category.
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

// Component for the Profile Page
const ProfilePage = ({ onNavigate, onShowModal }) => {
    return (
        <div className="profile-container">
            <Header onNavigate={onNavigate} onShowModal={onShowModal} />
            <main className="w-full">
                <h1 className="page-title">Profile Settings</h1>
                <div className="profile-card">
                    <div className="profile-header">
                        <img src="https://placehold.co/128x128/667EEA/ffffff?text=AP" alt="Profile Picture" className="profile-picture"/>
                        <div className="profile-info">
                            <h2 className="profile-name">Ankush Pal</h2>
                            <p className="profile-email">palankush702gmail.com</p>
                            <p className="profile-bio">A passionate freelancer specializing in web development and design.</p>
                            <button className="profile-button">Edit Profile</button>
                        </div>
                    </div>
                    <div className="contact-info">
                        <h3 className="contact-title">Contact Information</h3>
                        <div className="grid-container">
                            <p className="contact-text"><strong>Location:</strong> New Delhi, India</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

// Component for the "Create New Task" Modal
const PostTaskModal = ({ onClose, onPostTask }) => {
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskCategory, setTaskCategory] = useState('General');
    const [taskPriority, setTaskPriority] = useState('medium');
    const [taskLocation, setTaskLocation] = useState('');
    const [taskDeadline, setTaskDeadline] = useState('');

    const handlePost = () => {
        if (!taskTitle || !taskDescription) {
            console.error('Task Title and Description are required.');
            return;
        }

        const newTask = {
            title: taskTitle,
            description: taskDescription,
            category: taskCategory,
            priority: taskPriority,
            location: taskLocation,
            deadline: taskDeadline,
        };

        onPostTask(newTask);
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content" style={{ maxWidth: '42rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ backgroundColor: '#2563eb', color: '#ffffff', borderRadius: '9999px', padding: '0.5rem' }}>
                            <svg style={{ height: '1.5rem', width: '1.5rem' }} fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" />
                            </svg>
                        </span>
                        <h2 className="modal-title">Post New Task</h2>
                    </div>
                    <button onClick={onClose} className="modal-close-button">
                        {/* <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> */}
                        {/* </svg> */}
                        <img src="cross-23.png" alt="" />
                    </button>
                </div>
                <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <label htmlFor="task-title" className="input-label">Task Title</label>
                        <input type="text" id="task-title" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} placeholder="What needs to be done?" className="input-field" style={{ paddingLeft: '1rem' }}/>
                    </div>
                    <div>
                        <label htmlFor="task-description" className="input-label">Description</label>
                        <textarea id="task-description" rows="3" value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} placeholder="Provide more details about the task..." className="input-field" style={{ paddingLeft: '1rem' }}></textarea>
                    </div>

                    <div className="grid-container">
                        <div>
                            <label htmlFor="task-category" className="input-label">Category</label>
                            <div className="input-field-wrapper" style={{ paddingLeft: '2.5rem' }}>
                                <span className="input-icon">
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                    </svg>
                                </span>
                                <select id="task-category" value={taskCategory} onChange={(e) => setTaskCategory(e.target.value)} className="input-field" style={{ paddingLeft: '2.5rem' }}>
                                    <option>Mechanical</option>
                                    <option>Electrical</option>
                                    <option>Local</option>
                                    <option>Miscellaneous</option>
                                    {/* <option>Technical</option> */}
                                </select>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="task-priority" className="input-label">Price</label>
                            <div className="input-field-wrapper" style={{ paddingLeft: '2.5rem' }}>
                                <span className="input-icon">
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </span>
                                <select id="task-priority" value={taskPriority} onChange={(e) => setTaskPriority(e.target.value)} className="input-field" style={{ paddingLeft: '2.5rem' }}>
                                    <option>₹0-100</option>
                                    <option>₹100-500</option>
                                    <option>₹500-1000</option>
                                    <option>₹1000+</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="grid-container">
                        <div>
                            <label htmlFor="task-location" className="input-label">Location </label>
                            <div className="input-field-wrapper" style={{ paddingLeft: '2.5rem' }}>
                                <span className="input-icon">
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </span>
                                <input type="text" id="task-location" value={taskLocation} onChange={(e) => setTaskLocation(e.target.value)} placeholder="Where should this be done?" className="input-field" style={{ paddingLeft: '' }}/>
                            </div>
                        </div>
                        <div>
                            {/* <label htmlFor="task-deadline" className="input-label">Price 💵     </label> */}
                            {/* <div className="input-field-wrapper" style={{ paddingLeft: '2.5rem' }}>
                                <span className="input-icon">
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </span>
                                <input type="text" id="task-deadline" value={taskDeadline} onChange={(e) => setTaskDeadline(e.target.value)} placeholder="Pick a deadline" className="input-field" style={{ paddingLeft: '' }}/>
                            </div> */}
                        </div>
                    </div>
                </form>

                <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                    <button type="button" onClick={onClose} className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors">
                        Cancel
                    </button>
                    <button type="button" onClick={handlePost} className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors">
                        Post Task
                    </button>
                </div>
            </div>
        </div>
    );
};

// Component for the "View Task" Modal
const ViewTaskModal = ({ task, onClose }) => {
    const [confirming, setConfirming] = useState(false);
    
    // Function to handle accepting a task with a confirmation message
    const handleAccept = () => {
        console.log('Accept button clicked.');
        setConfirming(true);
        setTimeout(() => {
            setConfirming(false);
            onClose();
        }, 2000);
    };

    // Helper function to get priority styling
    const getPriorityStyle = (priority) => {
        switch (priority) {
            case '₹500-1000':
                return 'tag-priority-high';
            case '₹100-500':
                return 'tag-priority-medium';
            case '₹1000+':
                return 'tag-priority-urgent';
            case '₹0-500':
                return 'tag-priority-low';
            default:
                return '';
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content" style={{ maxWidth: '28rem' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button onClick={onClose} className="modal-close-button">
                        <img  src="cross-23.png" alt="cross-button" />
                    </button>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <span className="tag" style={{ backgroundColor: '#bfdbfe', color: '#1d4ed8' }}>PA</span>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937' }}>{task?.title}</h2>
                </div>
                <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '1rem' }}>Posted by {task?.owner === 'you' ? 'You' : 'Someone else'}</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div>
                        <h3 style={{ fontSize: '1rem', fontWeight: '500', color: '#1f2937', marginBottom: '0.5rem' }}>Description</h3>
                        <p style={{ color: '#4b5563', fontSize: '0.875rem' }}>{task?.description}</p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '1rem' }}>
                        <div>
                            <h3 style={{ fontSize: '0.875rem', fontWeight: '500', color: '#6b7280' }}>Category</h3>
                            <span className={`tag ${getPriorityStyle('medium')}`}>
                                technical
                            </span>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '0.875rem', fontWeight: '500', color: '#6b7280' }}>Location</h3>
                            <p style={{ color: '#1f2937' }}>Gurgaon</p>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '0.875rem', fontWeight: '500', color: '#6b7280' }}>Priority</h3>
                            <span className={`tag ${getPriorityStyle(task?.priority)}`}>
                                {task?.priority}
                            </span>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '0.875rem', fontWeight: '500', color: '#6b7280' }}>Deadline</h3>
                            <p style={{ color: '#1f2927' }}>Aug 19, 2025</p>
                        </div>
                    </div>
                </div>

                {/* Conditional rendering for "Accept" button and confirmation message */}
                {task?.owner === 'you' ? (
                    <div style={{ backgroundColor: '#eff6ff', color: '#1e40af', padding: '1rem', borderRadius: '0.5rem', textAlign: 'center' }}>
                        <p style={{ fontWeight: '600' }}>This is your task</p>
                        <p style={{ fontSize: '0.875rem' }}>You cannot accept your own task</p>
                    </div>
                ) : (
                    <div>
                        {confirming ? (
                            <div className="pulse-animation" style={{ backgroundColor: '#d1fae5', color: '#065f46', padding: '1rem', borderRadius: '0.5rem', textAlign: 'center' }}>
                                <p style={{ fontWeight: '600' }}>Confirmed! Thank you.</p>
                                <p style={{ fontSize: '0.875rem' }}>Please wait for the user to respond.</p>
                            </div>
                        ) : (
                            <button
                                onClick={handleAccept}
                                style={{ width: '100%', paddingTop: '0.75rem', paddingBottom: '0.75rem', paddingLeft: '1rem', paddingRight: '1rem', fontSize: '0.875rem', fontWeight: '500', color: '#ffffff', backgroundColor: '#2563eb', borderRadius: '0.5rem', transition: 'background-color 0.3s' }}
                            >
                                Accept
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};


const ApplicantsModal = ({ applicants, onClose, userLocation }) => {
    const [acceptedApplicant, setAcceptedApplicant] = useState(null);
    const [countdown, setCountdown] = useState(3600); // 3600 seconds for 1 hour

    useEffect(() => {
        if (acceptedApplicant) {
            const timerId = setInterval(() => {
                setCountdown((prevTime) => {
                    if (prevTime <= 1) {
                        clearInterval(timerId);
                        
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);

            return () => clearInterval(timerId);
        }
    }, [acceptedApplicant]);

    const handleAccept = (applicant) => {
        setAcceptedApplicant(applicant);
        console.log(`Accepted applicant: ${applicant.name}`);
    };

    const handleReject = (applicant) => {
        console.log(`Rejected applicant: ${applicant.name}`);
        // In a real app, you would handle rejection logic here, e.g., send a notification.
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content" style={{ maxWidth: '28rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <h2 className="modal-title">Applicants</h2>
                    <button onClick={onClose} className="modal-close-button">
                        {/* <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> */}
                        {/* </svg> */}
                        <img src="cross-23.png" alt="cross" />
                    </button>
                </div>
                
                {acceptedApplicant ? (
                    <div className="timer-container">
                        <p className="timer-accepted-text">You've accepted {acceptedApplicant.name}!</p>
                        <p style={{ color: '#4b5563', fontSize: '0.875rem', marginBottom: '1rem' }}>A notification has been sent to them. Please share your location.</p>
                        <div className="timer-location">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>Your Location: {userLocation}</span>
                        </div>
                        <div className="timer-time">
                            Time Remaining: {formatTime(countdown)}
                        </div>
                    </div>
                ) : applicants.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '24rem', overflowY: 'auto' }}>
                        {applicants.map(applicant => (
                            <div key={applicant.id} className="applicant-card">
                                <img src="https://placehold.co/48x48/667EEA/ffffff?text=AP" alt="Applicant Profile" className="applicant-avatar"/>
                                <div className="applicant-info">
                                    <h3 className="applicant-name">{applicant.name}</h3>
                                    <p className="applicant-skills">{applicant.skills}</p>
                                    <p className="applicant-location">
                                        {/* <svg className="h-4 w-4" style={{ marginRight: '0.25rem' }} fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                        </svg> */}
                                        <div className="map-container">
                                          <img src="L1.png" alt="location" />
                                        </div>

                                    </p>
                                    <div className="applicant-actions">
                                        <button onClick={() => handleAccept(applicant)} className="accept-button">
                                            Accept
                                        </button>
                                        <button onClick={() => handleReject(applicant)} className="reject-button">
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', color: '#6b7280', paddingTop: '2rem', paddingBottom: '2rem' }}>
                        No applicants yet.
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;

