import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { forumAPI } from '../api';
import { FiPlus, FiMessageSquare, FiUser, FiClock, FiX } from 'react-icons/fi';

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [category, setCategory] = useState('all');
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'general'
  });
  const [error, setError] = useState('');

  const categories = [
    { value: 'all', label: 'All Topics' },
    { value: 'general', label: 'General' },
    { value: 'anxiety', label: 'Anxiety' },
    { value: 'depression', label: 'Depression' },
    { value: 'support', label: 'Support' },
    { value: 'success', label: 'Success Stories' },
    { value: 'resources', label: 'Resources' }
  ];

  useEffect(() => {
    fetchPosts();
  }, [category]);

  const fetchPosts = async () => {
    try {
      const res = await forumAPI.getPosts(category !== 'all' ? category : '');
      setPosts(res.data);
    } catch (err) {
      console.error('Failed to fetch posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      await forumAPI.createPost(formData);
      fetchPosts();
      setShowModal(false);
      setFormData({ title: '', content: '', category: 'general' });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create post');
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)} minutes ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)} hours ago`;
    if (diff < 604800000) return `${Math.floor(diff / 86400000)} days ago`;
    
    return date.toLocaleDateString();
  };

  const getCategoryColor = (cat) => {
    const colors = {
      general: 'bg-gray-100 text-gray-700',
      anxiety: 'bg-yellow-100 text-yellow-700',
      depression: 'bg-blue-100 text-blue-700',
      support: 'bg-pink-100 text-pink-700',
      success: 'bg-green-100 text-green-700',
      resources: 'bg-purple-100 text-purple-700'
    };
    return colors[cat] || colors.general;
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
          <h1 className="text-2xl font-bold text-gray-900">Community Forum</h1>
          <p className="text-gray-600 mt-1">Connect, share, and support each other</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary flex items-center">
          <FiPlus className="mr-2" /> New Post
        </button>
      </div>

      {/* Safety Notice */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-yellow-800 text-sm">
          <strong>Community Guidelines:</strong> This is a safe space. All posts are moderated for safety. 
          Please be kind and supportive to fellow members.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setCategory(cat.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              category === cat.value
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Posts List */}
      {posts.length > 0 ? (
        <div className="space-y-4">
          {posts.map((post) => (
            <Link
              key={post.id}
              to={`/app/forum/${post.id}`}
              className="card block hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{post.title}</h3>
                  <p className="text-gray-600 line-clamp-2">{post.content}</p>
                  <div className="flex items-center mt-4 text-sm text-gray-500 space-x-4">
                    <span className="flex items-center">
                      <FiUser className="mr-1 h-4 w-4" />
                      {post.author.username}
                    </span>
                    <span className="flex items-center">
                      <FiClock className="mr-1 h-4 w-4" />
                      {formatDate(post.created_at)}
                    </span>
                    <span className="flex items-center">
                      <FiMessageSquare className="mr-1 h-4 w-4" />
                      {post.reply_count} replies
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="card text-center py-12">
          <FiMessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
          <p className="text-gray-500 mb-4">Be the first to start a conversation</p>
          <button onClick={() => setShowModal(true)} className="btn-primary">
            <FiPlus className="inline mr-2" /> Create Post
          </button>
        </div>
      )}

      {/* New Post Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">Create New Post</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <FiX className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="input-field"
                >
                  {categories.filter(c => c.value !== 'all').map((cat) => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="input-field"
                  placeholder="What's on your mind?"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content *</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="input-field"
                  rows={6}
                  placeholder="Share your thoughts, experiences, or ask for support..."
                  required
                />
              </div>

              <p className="text-xs text-gray-500">
                Your post will be reviewed for safety before being published.
              </p>

              <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Forum;
