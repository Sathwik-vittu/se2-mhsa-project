import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { dashboardAPI } from '../api';
import { FiCalendar, FiAlertCircle, FiMessageSquare, FiHeart, FiSun, FiArrowRight, FiActivity, FiClock } from 'react-icons/fi';
import { GiMedicines } from 'react-icons/gi';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await dashboardAPI.getStats();
      setStats(res.data);
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <div className="mt-4 text-indigo-600 font-medium">Loading your wellness dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-700 text-white shadow-xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-pink-500 opacity-10 rounded-full blur-3xl"></div>
        
        <div className="relative p-8 md:p-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="flex items-center mb-3 bg-white/20 backdrop-blur-sm w-fit px-4 py-1.5 rounded-full text-sm font-medium">
                <FiSun className="mr-2 text-yellow-300" />
                <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{getGreeting()}, {user?.full_name || user?.username}!</h1>
              <p className="text-indigo-100 text-lg max-w-xl">
                How are you feeling today? Remember, every step forward counts on your journey.
              </p>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                <div className="text-sm text-indigo-100 mb-1">Daily Streak</div>
                <div className="text-3xl font-bold flex items-center">
                  <span className="mr-2">🔥</span> 3 Days
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-indigo-50 rounded-xl group-hover:bg-indigo-100 transition-colors">
              <GiMedicines className="h-6 w-6 text-indigo-600" />
            </div>
            <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">Active</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{stats?.total_medications || 0}</div>
          <p className="text-gray-500 text-sm">Current Medications</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-green-50 rounded-xl group-hover:bg-green-100 transition-colors">
              <FiCalendar className="h-6 w-6 text-green-600" />
            </div>
            <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">Upcoming</span>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{stats?.upcoming_appointments?.length || 0}</div>
          <p className="text-gray-500 text-sm">Scheduled Appointments</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-orange-50 rounded-xl group-hover:bg-orange-100 transition-colors">
              <FiAlertCircle className="h-6 w-6 text-orange-600" />
            </div>
            {stats?.medications_needing_refill?.length > 0 && (
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
              </span>
            )}
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">{stats?.medications_needing_refill?.length || 0}</div>
          <p className="text-gray-500 text-sm">Refills Needed</p>
        </div>
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-8 order-2 lg:order-1">
          {/* Upcoming Appointments */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <FiCalendar className="mr-2 text-indigo-600" />
                Upcoming Schedule
              </h2>
              <Link to="/app/appointments" className="text-indigo-600 text-sm font-medium hover:text-indigo-700 flex items-center group">
                View Calendar <FiArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            {stats?.upcoming_appointments?.length > 0 ? (
              <div className="space-y-4">
                {stats.upcoming_appointments.map((apt) => (
                  <div key={apt.id} className="flex items-center p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-indigo-100 transition-colors">
                    <div className="flex-shrink-0 w-16 text-center bg-white rounded-lg p-2 border border-gray-100 shadow-sm mr-4">
                      <div className="text-xs text-gray-500 font-medium uppercase">{new Date(apt.appointment_date).toLocaleDateString('en-US', { month: 'short' })}</div>
                      <div className="text-xl font-bold text-indigo-600">{new Date(apt.appointment_date).getDate()}</div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">{apt.title}</h3>
                      <p className="text-sm text-gray-600 flex items-center mt-1">
                        <span className="font-medium mr-2">{apt.doctor_name}</span>
                        <span className="text-gray-300 mx-2">|</span>
                        <FiClock className="mr-1 text-gray-400" />
                        {new Date(apt.appointment_date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    <div className="hidden sm:block">
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                        Confirmed
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                <div className="bg-white p-4 rounded-full shadow-sm w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <FiCalendar className="h-8 w-8 text-gray-300" />
                </div>
                <h3 className="text-gray-900 font-medium mb-1">No upcoming appointments</h3>
                <p className="text-gray-500 text-sm mb-4">You're all caught up with your schedule.</p>
                <Link to="/app/appointments" className="btn-primary text-sm px-4 py-2 inline-flex items-center">
                  Schedule Appointment
                </Link>
              </div>
            )}
          </div>

          {/* Medication Refills */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <FiAlertCircle className="mr-2 text-orange-500" />
                Refill Alerts
              </h2>
              <Link to="/app/medications" className="text-indigo-600 text-sm font-medium hover:text-indigo-700 flex items-center group">
                Manage Medications <FiArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            {stats?.medications_needing_refill?.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {stats.medications_needing_refill.map((med) => (
                  <div key={med.id} className="flex items-start p-4 bg-orange-50 rounded-xl border border-orange-100">
                    <div className="p-2 bg-white rounded-lg shadow-sm mr-3 text-orange-500">
                      <GiMedicines className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{med.name}</h3>
                      <p className="text-sm text-orange-700 mt-1 font-medium">
                        Refill by: {new Date(med.refill_date).toLocaleDateString()}
                      </p>
                      <button className="mt-3 text-xs bg-white border border-orange-200 text-orange-600 px-3 py-1.5 rounded-lg font-medium hover:bg-orange-50 transition-colors">
                        Mark as Refilled
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center p-4 bg-green-50 rounded-xl border border-green-100 text-green-800">
                <div className="bg-white p-2 rounded-full mr-3 shadow-sm">
                  <FiActivity className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <span className="font-bold">All good!</span> No medication refills needed at this time.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-8 order-1 lg:order-2">
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <Link
                to="/app/medications"
                className="flex flex-col items-center justify-center p-4 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-all hover:-translate-y-1 border border-indigo-100"
              >
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 text-indigo-600">
                  <GiMedicines className="h-5 w-5" />
                </div>
                <span className="text-sm font-bold text-gray-900">Add Meds</span>
              </Link>
              
              <Link
                to="/app/appointments"
                className="flex flex-col items-center justify-center p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-all hover:-translate-y-1 border border-green-100"
              >
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 text-green-600">
                  <FiCalendar className="h-5 w-5" />
                </div>
                <span className="text-sm font-bold text-gray-900">Book Visit</span>
              </Link>
              
              <Link
                to="/app/forum"
                className="flex flex-col items-center justify-center p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-all hover:-translate-y-1 border border-purple-100"
              >
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 text-purple-600">
                  <FiMessageSquare className="h-5 w-5" />
                </div>
                <span className="text-sm font-bold text-gray-900">Community</span>
              </Link>
              
              <Link
                to="/app/profile"
                className="flex flex-col items-center justify-center p-4 bg-pink-50 rounded-xl hover:bg-pink-100 transition-all hover:-translate-y-1 border border-pink-100"
              >
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 text-pink-600">
                  <FiHeart className="h-5 w-5" />
                </div>
                <span className="text-sm font-bold text-gray-900">Profile</span>
              </Link>
            </div>
          </div>

          {/* Inspirational Quote */}
          <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-8 text-white shadow-lg">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full"></div>
            <FiHeart className="h-8 w-8 text-pink-400 mb-4 relative z-10" />
            <blockquote className="relative z-10">
              <p className="text-lg font-medium italic leading-relaxed mb-4 opacity-90">
                "You don't have to be positive all the time. It's perfectly okay to feel sad, angry, 
                annoyed, frustrated, scared, or anxious. Having feelings doesn't make you a negative person. 
                It makes you human."
              </p>
              <footer className="text-sm font-bold text-indigo-200">— Lori Deschene</footer>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
