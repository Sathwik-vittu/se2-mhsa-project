import { useState, useEffect } from 'react';
import { appointmentAPI } from '../api';
import { FiPlus, FiEdit2, FiTrash2, FiCalendar, FiClock, FiMapPin, FiUser, FiX } from 'react-icons/fi';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingApt, setEditingApt] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    doctor_name: '',
    location: '',
    appointment_date: '',
    reminder_time: 60,
    status: 'scheduled'
  });

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await appointmentAPI.getAll();
      setAppointments(res.data);
    } catch (err) {
      console.error('Failed to fetch appointments:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingApt) {
        await appointmentAPI.update(editingApt.id, formData);
      } else {
        await appointmentAPI.create(formData);
      }
      fetchAppointments();
      closeModal();
    } catch (err) {
      console.error('Failed to save appointment:', err);
      alert(err.response?.data?.error || 'Failed to save appointment');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      try {
        await appointmentAPI.delete(id);
        fetchAppointments();
      } catch (err) {
        console.error('Failed to delete appointment:', err);
      }
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await appointmentAPI.update(id, { status });
      fetchAppointments();
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const openEditModal = (apt) => {
    setEditingApt(apt);
    setFormData({
      title: apt.title || '',
      description: apt.description || '',
      doctor_name: apt.doctor_name || '',
      location: apt.location || '',
      appointment_date: apt.appointment_date ? apt.appointment_date.slice(0, 16) : '',
      reminder_time: apt.reminder_time || 60,
      status: apt.status || 'scheduled'
    });
    setShowModal(true);
  };

  const openAddModal = () => {
    setEditingApt(null);
    setFormData({
      title: '',
      description: '',
      doctor_name: '',
      location: '',
      appointment_date: '',
      reminder_time: 60,
      status: 'scheduled'
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingApt(null);
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isPast = (dateStr) => new Date(dateStr) < new Date();

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-blue-100 text-blue-700';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // Separate upcoming and past appointments
  const upcomingApts = appointments.filter(apt => !isPast(apt.appointment_date) && apt.status === 'scheduled');
  const pastApts = appointments.filter(apt => isPast(apt.appointment_date) || apt.status !== 'scheduled');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
          <p className="text-gray-600 mt-1">Schedule and manage your healthcare appointments</p>
        </div>
        <button onClick={openAddModal} className="btn-primary flex items-center">
          <FiPlus className="mr-2" /> Schedule Appointment
        </button>
      </div>

      {/* Upcoming Appointments */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Appointments</h2>
        {upcomingApts.length > 0 ? (
          <div className="space-y-4">
            {upcomingApts.map((apt) => (
              <div key={apt.id} className="card hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex items-start">
                    <div className="p-3 bg-indigo-100 rounded-lg mr-4">
                      <FiCalendar className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{apt.title}</h3>
                      <div className="mt-2 space-y-1 text-sm text-gray-600">
                        <p className="flex items-center">
                          <FiClock className="mr-2 h-4 w-4" />
                          {formatDate(apt.appointment_date)}
                        </p>
                        {apt.doctor_name && (
                          <p className="flex items-center">
                            <FiUser className="mr-2 h-4 w-4" />
                            Dr. {apt.doctor_name}
                          </p>
                        )}
                        {apt.location && (
                          <p className="flex items-center">
                            <FiMapPin className="mr-2 h-4 w-4" />
                            {apt.location}
                          </p>
                        )}
                      </div>
                      {apt.description && (
                        <p className="mt-2 text-sm text-gray-500">{apt.description}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(apt.status)}`}>
                      {apt.status}
                    </span>
                    <button
                      onClick={() => openEditModal(apt)}
                      className="p-2 text-gray-400 hover:text-indigo-600 transition-colors"
                    >
                      <FiEdit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(apt.id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <FiTrash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() => handleStatusChange(apt.id, 'completed')}
                    className="text-sm text-green-600 hover:text-green-700 font-medium"
                  >
                    Mark as Completed
                  </button>
                  <span className="text-gray-300">|</span>
                  <button
                    onClick={() => handleStatusChange(apt.id, 'cancelled')}
                    className="text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card text-center py-12">
            <FiCalendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming appointments</h3>
            <p className="text-gray-500 mb-4">Schedule your next healthcare appointment</p>
            <button onClick={openAddModal} className="btn-primary">
              <FiPlus className="inline mr-2" /> Schedule Appointment
            </button>
          </div>
        )}
      </div>

      {/* Past Appointments */}
      {pastApts.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Past Appointments</h2>
          <div className="space-y-4">
            {pastApts.map((apt) => (
              <div key={apt.id} className="card bg-gray-50 opacity-75">
                <div className="flex items-start justify-between">
                  <div className="flex items-start">
                    <div className="p-3 bg-gray-200 rounded-lg mr-4">
                      <FiCalendar className="h-6 w-6 text-gray-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-700">{apt.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {formatDate(apt.appointment_date)}
                      </p>
                      {apt.doctor_name && (
                        <p className="text-sm text-gray-500">Dr. {apt.doctor_name}</p>
                      )}
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(apt.status)}`}>
                    {apt.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">
                {editingApt ? 'Edit Appointment' : 'Schedule Appointment'}
              </h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                <FiX className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Appointment Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="input-field"
                  placeholder="e.g., Therapy Session"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date & Time *
                </label>
                <input
                  type="datetime-local"
                  value={formData.appointment_date}
                  onChange={(e) => setFormData({ ...formData, appointment_date: e.target.value })}
                  className="input-field"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Doctor Name</label>
                  <input
                    type="text"
                    value={formData.doctor_name}
                    onChange={(e) => setFormData({ ...formData, doctor_name: e.target.value })}
                    className="input-field"
                    placeholder="Dr. Smith"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="input-field"
                    placeholder="Clinic address"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="input-field"
                  rows={3}
                  placeholder="Any notes about this appointment..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reminder (minutes before)
                </label>
                <select
                  value={formData.reminder_time}
                  onChange={(e) => setFormData({ ...formData, reminder_time: parseInt(e.target.value) })}
                  className="input-field"
                >
                  <option value={15}>15 minutes</option>
                  <option value={30}>30 minutes</option>
                  <option value={60}>1 hour</option>
                  <option value={120}>2 hours</option>
                  <option value={1440}>1 day</option>
                </select>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={closeModal} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingApt ? 'Save Changes' : 'Schedule Appointment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;
