import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts";
import { Users, BookOpen, Layers, Smile } from "lucide-react";

const AdminDashboard = () => {
  // 🔹 Mock data (replace with API data later)
  const usersData = [
    { month: "Jan", users: 20 },
    { month: "Feb", users: 40 },
    { month: "Mar", users: 55 },
    { month: "Apr", users: 80 },
    { month: "May", users: 120 },
    { month: "Jun", users: 160 },
  ];

  const postsPerCategory = [
    { category: "Tech", posts: 50 },
    { category: "Health", posts: 30 },
    { category: "Lifestyle", posts: 70 },
    { category: "Travel", posts: 40 },
  ];

  const postsPerMonth = [
    { month: "Jan", posts: 15 },
    { month: "Feb", posts: 25 },
    { month: "Mar", posts: 35 },
    { month: "Apr", posts: 50 },
  ];

  const userTypes = [
    { name: "Admins", value: 5 },
    { name: "Users", value: 120 },
  ];

  const activeVsDeleted = [
    { name: "Active", value: 180 },
    { name: "Deleted", value: 20 },
  ];

  const COLORS = ["#6366f1", "#f97316", "#22c55e", "#ef4444"];

  const stats = [
    { title: "Total Users", value: "125", icon: <Users className="w-6 h-6 text-blue-600" /> },
    { title: "Total Posts", value: "195", icon: <BookOpen className="w-6 h-6 text-green-600" /> },
    { title: "Categories", value: "12", icon: <Layers className="w-6 h-6 text-orange-600" /> },
    { title: "Happy Readers", value: "3.2k+", icon: <Smile className="w-6 h-6 text-purple-600" /> },
  ];

  const motivationalQuotes = [
    "“The best way to predict the future is to create it.” – Peter Drucker",
    "“Success is not final, failure is not fatal: it is the courage to continue that counts.” – Winston Churchill",
    "“Small daily improvements over time lead to stunning results.” – Robin Sharma",
  ];

  return (
    <div className="p-6 bg-gradient-to-br from-orange-50 to-white min-h-screen">
      {/* Welcome / Motivation Section */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-gray-800">
          👋 Welcome Back, Admin!
        </h1>
        <p className="text-gray-600 mt-2 text-lg">
          Manage your community with confidence. Inspire. Lead. Grow.
        </p>
        <p className="italic text-orange-600 mt-4 text-md">
          {motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]}
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-2xl shadow-md flex items-center justify-between"
          >
            <div>
              <p className="text-gray-600 text-sm">{stat.title}</p>
              <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
            </div>
            <div className="p-3 bg-gray-100 rounded-full">{stat.icon}</div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* User Growth */}
        <div className="bg-white p-4 rounded-2xl shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Users Growth</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={usersData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="users" stroke="#6366f1" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Posts Per Category */}
        <div className="bg-white p-4 rounded-2xl shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Posts Per Category</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={postsPerCategory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="posts" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Posts Per Month */}
        <div className="bg-white p-4 rounded-2xl shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Posts Per Month</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={postsPerMonth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="posts" stroke="#f97316" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* User Roles */}
        <div className="bg-white p-4 rounded-2xl shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">User Roles</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={userTypes}
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
                dataKey="value"
              >
                {userTypes.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Active vs Deleted */}
        <div className="bg-white p-4 rounded-2xl shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Active vs Deleted</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={activeVsDeleted}
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
                dataKey="value"
              >
                {activeVsDeleted.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
