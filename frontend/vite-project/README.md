#  Student Job Tracker (MERN Stack)

A full-stack web app to manage job applications. Add, view, update, delete jobs, and track application statuses with real-time updates and a responsive UI.

---

## 🛠 Tech Stack
- **Frontend**: React (Vite)
- **Backend**: Node.js + Express.js
- **Database**: MongoDB Atlas
- **Deployment**: Vercel (Frontend), Render (Backend)

---

##  Features
- Add job application with Company, Role, Status, Date, and Link
- View and filter applications
- Update job status
- Delete applications
- Auto-sort by latest date
- Show status counts (Applied, Interview, Offer, Rejected)

---

---

##  Setup Instructions

###  Backend (Express + MongoDB)

cd backend
npm install
# .env file
MONGO_URI=your_mongodb_connection_string
npm run dev

cd frontend
npm install
# Optional .env
VITE_BACKEND_URL=http://localhost:5000
npm run dev
## DSA ##
const getStatusCounts = (jobs) =>
  jobs.reduce((acc, job) => {
    acc[job.status] = (acc[job.status] || 0) + 1
    return acc
  }, {})
## SORTING ##
const sortByDate = (jobs) =>
  jobs.sort((a, b) => new Date(b.date) - new Date(a.date))

 ## NPM Commands ##
Backend
npm install → install deps

npm run dev → run with nodemon

Frontend
npm install → install deps

npm run dev → run Vite dev server
---





👨‍💻 Author
Manohar Yalla
MERN Stack Developer