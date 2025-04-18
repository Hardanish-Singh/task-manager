import { Link, Route, Routes } from 'react-router-dom';
import Tasks from './components/Tasks';
import ViewTasks from './components/ViewTasks';

const App = () => (
  <div className="flex flex-col min-h-screen">
    <header className="bg-blue-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link to="/" className="cursor-pointer">
            Task Manager
          </Link>
        </h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/tasks" className="hover:underline">
                Create Task
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>

    <main className="flex-grow p-6">
      <div className="container mx-auto">
        <Routes>
          <Route path="/" element={<ViewTasks />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/tasks/:id" element={<Tasks />} />
        </Routes>
      </div>
    </main>

    <footer className="bg-gray-800 text-white p-4 mt-auto">
      <div className="container mx-auto text-center">
        <p>&copy; 2025 Task Manager</p>
      </div>
    </footer>
  </div>
);

export default App;
