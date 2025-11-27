import { Link } from 'react-router-dom';
import { FiHeart, FiShield, FiUsers, FiCalendar, FiCheckCircle, FiArrowRight, FiActivity, FiSmile } from 'react-icons/fi';
import { GiMedicines } from 'react-icons/gi';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <FiHeart className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                MindCare
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Features</a>
              <a href="#testimonials" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Stories</a>
              <a href="#about" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">About</a>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-gray-600 hover:text-gray-900 font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                Sign In
              </Link>
              <Link to="/signup" className="btn-primary">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 overflow-hidden">
        {/* Animated Background Blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center px-4 py-2 bg-white/50 backdrop-blur-sm border border-indigo-100 rounded-full text-indigo-700 text-sm font-medium mb-8 shadow-sm hover:shadow-md transition-all cursor-default">
                <span className="flex h-2 w-2 rounded-full bg-indigo-500 mr-2 animate-pulse"></span>
                Your Mental Health Companion
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight tracking-tight">
                Wellness for your
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
                  Mind & Soul
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                A comprehensive platform to manage your medications, schedule appointments, 
                and connect with a supportive community. Your journey to better mental health starts here.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link to="/signup" className="btn-primary text-lg px-8 py-4 flex items-center group">
                  Start Your Journey
                  <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/login" className="btn-secondary text-lg px-8 py-4 bg-white/80 backdrop-blur-sm">
                  I Have an Account
                </Link>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white/50 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1527137342181-19aab11a8ee8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Happy friends supporting each other" 
                  className="w-full h-full object-cover"
                />
                {/* Floating Cards */}
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg flex items-center gap-3 animate-bounce-slow z-20">
                  <div className="bg-green-100 p-2 rounded-full">
                    <FiCheckCircle className="text-green-600 w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">Daily Check-in</div>
                    <div className="text-xs text-gray-500">Completed</div>
                  </div>
                </div>
                <div className="absolute top-10 -right-6 bg-white p-4 rounded-xl shadow-lg flex items-center gap-3 animate-pulse z-20">
                  <div className="bg-indigo-100 p-2 rounded-full">
                    <FiHeart className="text-indigo-600 w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">Mood Tracker</div>
                    <div className="text-xs text-gray-500">Feeling Great!</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { label: 'Active Users', value: '10K+', icon: FiUsers },
              { label: 'Medications Tracked', value: '50K+', icon: GiMedicines },
              { label: 'Appointments', value: '25K+', icon: FiCalendar },
              { label: 'Community Posts', value: '5K+', icon: FiActivity },
            ].map((stat, index) => (
              <div key={index} className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-white/20 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                <stat.icon className="w-8 h-8 text-indigo-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600 font-medium mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools designed to support your mental wellness every step of the way.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Medication Management',
                desc: 'Track your medications, set reminders, and never miss a dose. Get alerts for refills.',
                icon: GiMedicines,
                color: 'indigo'
              },
              {
                title: 'Appointment Scheduling',
                desc: 'Schedule and manage healthcare appointments. Get notifications for upcoming visits.',
                icon: FiCalendar,
                color: 'green'
              },
              {
                title: 'Community Support',
                desc: 'Connect with others on similar journeys. Share experiences in our moderated forum.',
                icon: FiUsers,
                color: 'purple'
              },
              {
                title: 'Health Profile',
                desc: 'Keep all your health information in one secure place. Track your history easily.',
                icon: FiHeart,
                color: 'pink'
              },
              {
                title: 'Safe & Secure',
                desc: 'Your data is encrypted and protected. We prioritize your privacy above all else.',
                icon: FiShield,
                color: 'orange'
              },
              {
                title: 'Moderated Content',
                desc: 'All community content is reviewed for safety to ensure a positive environment.',
                icon: FiCheckCircle,
                color: 'blue'
              }
            ].map((feature, index) => (
              <div key={index} className="group p-8 rounded-3xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 bg-${feature.color}-100 text-${feature.color}-600`}>
                  <feature.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Stories from Our Community
            </h2>
            <p className="text-xl text-gray-600">
              Real experiences from people just like you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah M.',
                role: 'Member since 2024',
                content: "MindCare has been a game-changer for managing my medications. The reminders ensure I never miss a dose, and the community support has been incredible.",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
                color: 'indigo'
              },
              {
                name: 'James K.',
                role: 'Member since 2024',
                content: "Finally, an app that understands mental health. The appointment scheduler keeps me on track, and I love connecting with others who understand.",
                image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
                color: 'green'
              },
              {
                name: 'Emily R.',
                role: 'Member since 2024',
                content: "The forum community is so supportive. It's comforting to know I'm not alone in my journey. This app has truly made a difference in my life.",
                image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
                color: 'purple'
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
                <div className="flex items-center mb-6">
                  {[1,2,3,4,5].map(i => (
                    <FiSmile key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-8 leading-relaxed italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center border-t border-gray-100 pt-6">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                  <div className="ml-4">
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-indigo-600 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-90"></div>
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-pink-400 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-indigo-100 mb-12 max-w-2xl mx-auto">
            Join thousands of others who are taking control of their mental wellness. 
            It's free to get started.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/signup" className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center">
              Create Free Account
              <FiArrowRight className="ml-2" />
            </Link>
            <Link to="/login" className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all backdrop-blur-sm">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-6">
                <div className="bg-indigo-600 p-2 rounded-lg mr-3">
                  <FiHeart className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">MindCare</span>
              </div>
              <p className="text-gray-400 max-w-sm leading-relaxed">
                Empowering you to take control of your mental health with comprehensive tools and a supportive community.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">Platform</h4>
              <ul className="space-y-4">
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Security</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">Support</h4>
              <ul className="space-y-4">
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm">
              © 2025 MindCare. All rights reserved.
            </div>
            <div className="flex items-center px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full">
              <span className="text-red-400 text-sm font-medium">
                Crisis Support: Call <strong>988</strong>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
