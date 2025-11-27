import { useState, useEffect } from 'react';
import { medicationAPI } from '../api';
import { FiPlus, FiEdit2, FiTrash2, FiClock, FiBell, FiX, FiCheck } from 'react-icons/fi';
import { GiMedicines } from 'react-icons/gi';

const Medications = () => {
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingMed, setEditingMed] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    dosage: '',
    frequency: '',
    time_to_take: '',
    start_date: '',
    end_date: '',
    refill_date: '',
    doctor_name: '',
    doctor_contact: '',
    notes: '',
    reminder_enabled: true
  });

  useEffect(() => {
    fetchMedications();
  }, []);

  const fetchMedications = async () => {
    try {
      const res = await medicationAPI.getAll();
      setMedications(res.data);
    } catch (err) {
      console.error('Failed to fetch medications:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingMed) {
        await medicationAPI.update(editingMed.id, formData);
      } else {
        await medicationAPI.create(formData);
      }
      fetchMedications();
      closeModal();
    } catch (err) {
      console.error('Failed to save medication:', err);
      alert(err.response?.data?.error || 'Failed to save medication');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this medication?')) {
      try {
        await medicationAPI.delete(id);
        fetchMedications();
      } catch (err) {
        console.error('Failed to delete medication:', err);
      }
    }
  };

  const openEditModal = (med) => {
    setEditingMed(med);
    setFormData({
      name: med.name || '',
      dosage: med.dosage || '',
      frequency: med.frequency || '',
      time_to_take: med.time_to_take || '',
      start_date: med.start_date || '',
      end_date: med.end_date || '',
      refill_date: med.refill_date || '',
      doctor_name: med.doctor_name || '',
      doctor_contact: med.doctor_contact || '',
      notes: med.notes || '',
      reminder_enabled: med.reminder_enabled
    });
    setShowModal(true);
  };

  const openAddModal = () => {
    setEditingMed(null);
    setFormData({
      name: '',
      dosage: '',
      frequency: '',
      time_to_take: '',
      start_date: '',
      end_date: '',
      refill_date: '',
      doctor_name: '',
      doctor_contact: '',
      notes: '',
      reminder_enabled: true
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingMed(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Medications</h1>
          <p className="text-gray-600 mt-1">Manage your medications and reminders</p>
        </div>
        <button onClick={openAddModal} className="btn-primary flex items-center">
          <FiPlus className="mr-2" /> Add Medication
        </button>
      </div>

      {/* Medications List */}
      {medications.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {medications.map((med) => (
            <div key={med.id} className="card hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="p-3 bg-indigo-100 rounded-lg mr-3">
                    <GiMedicines className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{med.name}</h3>
                    <p className="text-sm text-gray-500">{med.dosage}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => openEditModal(med)}
                    className="p-2 text-gray-400 hover:text-indigo-600 transition-colors"
                  >
                    <FiEdit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(med.id)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <FiTrash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                {med.frequency && (
                  <div className="flex items-center text-gray-600">
                    <FiClock className="mr-2 h-4 w-4" />
                    {med.frequency}
                  </div>
                )}
                {med.time_to_take && (
                  <div className="flex items-center text-gray-600">
                    <FiBell className="mr-2 h-4 w-4" />
                    Take at: {med.time_to_take}
                  </div>
                )}
                {med.refill_date && (
                  <div className={`flex items-center ${
                    new Date(med.refill_date) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                      ? 'text-orange-600'
                      : 'text-gray-600'
                  }`}>
                    <FiBell className="mr-2 h-4 w-4" />
                    Refill: {new Date(med.refill_date).toLocaleDateString()}
                  </div>
                )}
                {med.doctor_name && (
                  <p className="text-gray-500">Dr. {med.doctor_name}</p>
                )}
              </div>

              {med.reminder_enabled && (
                <div className="mt-4 flex items-center text-green-600 text-sm">
                  <FiCheck className="mr-1 h-4 w-4" />
                  Reminders enabled
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="card text-center py-12">
          <GiMedicines className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No medications yet</h3>
          <p className="text-gray-500 mb-4">Add your first medication to get started</p>
          <button onClick={openAddModal} className="btn-primary">
            <FiPlus className="inline mr-2" /> Add Medication
          </button>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">
                {editingMed ? 'Edit Medication' : 'Add Medication'}
              </h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                <FiX className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Medication Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-field"
                  placeholder="e.g., Sertraline"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dosage</label>
                  <input
                    type="text"
                    value={formData.dosage}
                    onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                    className="input-field"
                    placeholder="e.g., 50mg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                  <input
                    type="text"
                    value={formData.frequency}
                    onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                    className="input-field"
                    placeholder="e.g., Once daily"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time to Take</label>
                <input
                  type="text"
                  value={formData.time_to_take}
                  onChange={(e) => setFormData({ ...formData, time_to_take: e.target.value })}
                  className="input-field"
                  placeholder="e.g., 8:00 AM"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={formData.start_date}
                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Refill Date</label>
                  <input
                    type="date"
                    value={formData.refill_date}
                    onChange={(e) => setFormData({ ...formData, refill_date: e.target.value })}
                    className="input-field"
                  />
                </div>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Doctor Contact</label>
                  <input
                    type="text"
                    value={formData.doctor_contact}
                    onChange={(e) => setFormData({ ...formData, doctor_contact: e.target.value })}
                    className="input-field"
                    placeholder="Phone or email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="input-field"
                  rows={3}
                  placeholder="Any additional notes..."
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="reminder"
                  checked={formData.reminder_enabled}
                  onChange={(e) => setFormData({ ...formData, reminder_enabled: e.target.checked })}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="reminder" className="ml-2 text-sm text-gray-700">
                  Enable reminders for this medication
                </label>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={closeModal} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingMed ? 'Save Changes' : 'Add Medication'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Medications;
