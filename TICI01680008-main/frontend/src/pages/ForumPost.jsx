import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { forumAPI } from '../api';
import { useAuth } from '../AuthContext';
import { FiArrowLeft, FiUser, FiClock, FiSend } from 'react-icons/fi';

const ForumPost = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [replyContent, setReplyContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const res = await forumAPI.getPost(id);
      setPost(res.data);
    } catch (err) {
      console.error('Failed to fetch post:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReply = async (e) => {
    e.preventDefault();
    if (!replyContent.trim()) return;
    
    setError('');
    setSubmitting(true);
    
    try {
      await forumAPI.createReply(id, { content: replyContent });
      setReplyContent('');
      fetchPost();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to post reply');
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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

  if (!post) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Post not found</h2>
        <Link to="/app/forum" className="text-indigo-600 hover:text-indigo-700">
          ← Back to Forum
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Back Button */}
      <Link to="/app/forum" className="inline-flex items-center text-gray-600 hover:text-indigo-600">
        <FiArrowLeft className="mr-2" />
        Back to Forum
      </Link>

      {/* Post */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
            {post.category}
          </span>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{post.title}</h1>
        
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <div className="flex items-center mr-6">
            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-2">
              <FiUser className="h-4 w-4 text-indigo-600" />
            </div>
            <span className="font-medium text-gray-900">{post.author.username}</span>
          </div>
          <span className="flex items-center">
            <FiClock className="mr-1 h-4 w-4" />
            {formatDate(post.created_at)}
          </span>
        </div>
        
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
        </div>
      </div>

      {/* Replies Section */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Replies ({post.replies?.length || 0})
        </h2>

        {/* Reply Form */}
        <form onSubmit={handleReply} className="mb-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}
          
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
              <FiUser className="h-5 w-5 text-indigo-600" />
            </div>
            <div className="flex-1">
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className="input-field"
                rows={3}
                placeholder="Write a supportive reply..."
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-gray-500">
                  Your reply will be reviewed for safety.
                </p>
                <button
                  type="submit"
                  disabled={!replyContent.trim() || submitting}
                  className="btn-primary flex items-center"
                >
                  {submitting ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  ) : (
                    <FiSend className="mr-2 h-4 w-4" />
                  )}
                  Reply
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* Replies List */}
        {post.replies?.length > 0 ? (
          <div className="space-y-6">
            {post.replies.map((reply) => (
              <div key={reply.id} className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <FiUser className="h-5 w-5 text-gray-600" />
                </div>
                <div className="flex-1 bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{reply.author.username}</span>
                    <span className="text-xs text-gray-500">{formatDate(reply.created_at)}</span>
                  </div>
                  <p className="text-gray-700 whitespace-pre-wrap">{reply.content}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No replies yet. Be the first to respond!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForumPost;
