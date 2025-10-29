import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Camera, ChefHat, Sparkles, Clock, Heart, Upload, ArrowRight, X, Menu, Mail, Phone, MapPin, Users, Target, Award, User, Lock, Flame } from 'lucide-react';
import { login as loginService, register as registerService } from './services/authService';
import { uploadAndAnalyze } from './services/uploadService';


// Floating Food Decorations
const FloatingFood = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div className="absolute top-20 left-10 text-6xl md:text-8xl opacity-20" animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>🍝</motion.div>
      <motion.div className="absolute top-32 right-10 md:right-20 text-5xl md:text-7xl opacity-20" animate={{ y: [0, 25, 0], rotate: [0, -15, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}>🌮</motion.div>
      <motion.div className="absolute top-1/3 left-20 md:left-32 text-7xl md:text-9xl opacity-15" animate={{ y: [0, -30, 0], x: [0, 10, 0], rotate: [0, 5, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}>🍕</motion.div>
      <motion.div className="absolute top-1/2 right-10 md:right-16 text-6xl md:text-8xl opacity-20" animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>🍔</motion.div>
      <motion.div className="absolute bottom-32 left-10 md:left-20 text-5xl md:text-7xl opacity-20" animate={{ y: [0, -15, 0], rotate: [0, 8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>🥗</motion.div>
      <motion.div className="absolute bottom-20 right-20 md:right-32 text-6xl md:text-8xl opacity-20" animate={{ y: [0, 25, 0], rotate: [0, -12, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}>🍱</motion.div>
      <motion.div className="absolute top-1/4 left-1/4 text-4xl md:text-5xl opacity-25" animate={{ scale: [1, 1.1, 1], rotate: [0, 360] }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}>🍳</motion.div>
      <motion.div className="absolute bottom-1/3 right-1/3 text-5xl md:text-6xl opacity-25" animate={{ scale: [1, 1.15, 1], rotate: [0, -360] }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }}>🥪</motion.div>
    </div>
  );
};

// 3D Card Container
const CardContainer = ({ children, className }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
    const mouseY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(mouseX);
    y.set(mouseY);
  };

  return (
    <motion.div onMouseMove={handleMouseMove} onMouseLeave={() => { x.set(0); y.set(0); }} style={{ rotateY, rotateX, transformStyle: "preserve-3d" }} className={className}>
      {children}
    </motion.div>
  );
};

// Animated Glow Button
const GlowButton = ({ children, onClick }) => {
  return (
    <motion.button onClick={onClick} className="relative inline-flex h-12 md:h-14 overflow-hidden rounded-2xl p-[2px] focus:outline-none" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#ec4899_0%,#fbbf24_50%,#ec4899_100%)]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-2xl bg-gradient-to-r from-pink-500 to-pink-600 px-6 md:px-10 py-1 text-base md:text-lg font-bold text-white backdrop-blur-3xl gap-2 md:gap-3">
        {children}
      </span>
    </motion.button>
  );
};

// File Upload Component
const FileUpload = ({ onFileSelect }) => {
  const [isDragging, setIsDragging] = useState(false);
  return (
    <motion.div onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }} onDragLeave={() => setIsDragging(false)} onDrop={(e) => { e.preventDefault(); setIsDragging(false); const file = e.dataTransfer.files[0]; if (file) onFileSelect(file); }} className={`relative border-2 border-dashed rounded-3xl p-8 md:p-12 transition-all duration-300 ${isDragging ? 'border-pink-500 bg-pink-50' : 'border-pink-200 bg-white'}`} whileHover={{ scale: 1.02 }}>
      <input type="file" accept="image/*" capture="environment" onChange={(e) => { const file = e.target.files[0]; if (file) onFileSelect(file); }} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
      <div className="text-center">
        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <Upload className="w-12 h-12 md:w-16 md:h-16 mx-auto text-pink-500 mb-4" />
        </motion.div>
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Drop your fridge photo here</h3>
        <p className="text-sm md:text-base text-gray-600">or click to browse</p>
      </div>
    </motion.div>
  );
};

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showUpload, setShowUpload] = useState(false);
  const [image, setImage] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null); // ← ADD THIS LINE
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Check login status on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleFileSelect = async (file) => {
  if (file) {
    setImage(URL.createObjectURL(file));
    setAnalyzing(true);
    setIngredients([]);
    setRecipes([]);

    try {
      console.log('📤 Uploading image to backend...');
      
      // Import the upload service
  
      
      // Call the real API
      const response = await uploadAndAnalyze(file);
      
      console.log('✅ Response received:', response);

      if (response.success) {
        // Set real ingredients from AI
        setIngredients(response.data.ingredients || []);
        
        // Set real recipes from AI
        setRecipes(response.data.recipes || []);
        
        // Update image with Cloudinary URL
        setImage(response.data.imageUrl);
        
        console.log('🎉 Analysis complete!');
        console.log('🥕 Ingredients:', response.data.ingredients);
        console.log('🍳 Recipes:', response.data.recipes);
      } else {
        throw new Error(response.message || 'Analysis failed');
      }
    } catch (error) {
      console.error('❌ Upload error:', error);
      alert('Failed to analyze image: ' + (error.message || 'Please try again'));
      
      // Reset state on error
      setImage(null);
      setIngredients([]);
      setRecipes([]);
    } finally {
      setAnalyzing(false);
    }
  }
};

  // Navigation Component
  const Navigation = () => (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setCurrentPage('home'); setShowUpload(false); }}>
            <ChefHat className="w-6 h-6 md:w-8 md:h-8 text-pink-500" />
            <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-pink-600 to-amber-600 bg-clip-text text-transparent">FridgeChef</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => setCurrentPage('home')} className={`font-medium transition-colors ${currentPage === 'home' ? 'text-pink-600' : 'text-gray-600 hover:text-pink-600'}`}>Home</button>
            <button onClick={() => setCurrentPage('about')} className={`font-medium transition-colors ${currentPage === 'about' ? 'text-pink-600' : 'text-gray-600 hover:text-pink-600'}`}>About</button>
            <button onClick={() => setCurrentPage('contact')} className={`font-medium transition-colors ${currentPage === 'contact' ? 'text-pink-600' : 'text-gray-600 hover:text-pink-600'}`}>Contact</button>
            
            {isLoggedIn ? (
              <>
                <span className="text-sm text-gray-700 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Hi, <span className="font-semibold text-pink-600">{user?.name}</span>!
                </span>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowUpload(true)} className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all">
                  <Upload className="w-4 h-4 inline mr-2" />
                  Upload
                </motion.button>
                <button onClick={() => {
                  localStorage.clear();
                  setIsLoggedIn(false);
                  setUser(null);
                  setCurrentPage('home');
                }} className="text-gray-600 hover:text-red-600 font-medium transition-colors">
                  Logout
                </button>
              </>
            ) : (
              <>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setCurrentPage('login')} className="text-gray-600 hover:text-pink-600 font-semibold transition-colors">
                  Login
                </motion.button>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setCurrentPage('register')} className="bg-pink-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-pink-600 transition-all shadow-md">
                  Sign Up
                </motion.button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-gray-600">
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="md:hidden mt-4 pb-4 flex flex-col gap-3">
            <button onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }} className="text-left font-medium">Home</button>
            <button onClick={() => { setCurrentPage('about'); setMobileMenuOpen(false); }} className="text-left font-medium">About</button>
            <button onClick={() => { setCurrentPage('contact'); setMobileMenuOpen(false); }} className="text-left font-medium">Contact</button>
            {isLoggedIn ? (
              <>
                <span className="text-sm text-gray-700">Hi, {user?.name}!</span>
                <button onClick={() => { setShowUpload(true); setMobileMenuOpen(false); }} className="bg-pink-500 text-white px-6 py-2 rounded-full font-semibold text-center">Upload</button>
                <button onClick={() => { localStorage.clear(); setIsLoggedIn(false); setUser(null); setCurrentPage('home'); setMobileMenuOpen(false); }} className="text-red-600 font-medium text-left">Logout</button>
              </>
            ) : (
              <>
                <button onClick={() => { setCurrentPage('login'); setMobileMenuOpen(false); }} className="text-pink-600 font-semibold text-left">Login</button>
                <button onClick={() => { setCurrentPage('register'); setMobileMenuOpen(false); }} className="bg-pink-500 text-white px-6 py-2 rounded-full font-semibold text-center">Sign Up</button>
              </>
            )}
          </motion.div>
        )}
      </div>
    </nav>
  );

  // About Page
  if (currentPage === 'about') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-amber-50 relative overflow-hidden">
        <FloatingFood />
        <Navigation />
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-20 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="text-center mb-12 md:mb-16">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 md:mb-6">About FridgeChef</h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">Revolutionizing home cooking with AI-powered recipe suggestions</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
              {[
                { icon: Users, title: 'Our Mission', desc: 'Help families reduce food waste and discover delicious recipes using ingredients they already have' },
                { icon: Target, title: 'Our Vision', desc: 'Make cooking accessible, sustainable, and fun for everyone through innovative AI technology' },
                { icon: Award, title: 'Our Impact', desc: 'Helping thousands of users save money, time, and reduce their environmental footprint' },
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2 }} className="bg-white/80 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-lg">
                  <div className="bg-gradient-to-r from-pink-500 to-amber-500 w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-4 md:mb-6 shadow-lg">
                    <item.icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-white/80 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-xl">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">Our Story</h2>
              <div className="space-y-4 text-sm md:text-base text-gray-600 leading-relaxed">
                <p>FridgeChef was born from a simple observation: people waste food not because they want to, but because they don't know what to cook with what they have.</p>
                <p>We combined cutting-edge AI technology with culinary expertise to create an app that instantly recognizes your ingredients and suggests delicious, practical recipes.</p>
                <p>Today, we're proud to help thousands of families cook smarter, save money, and reduce food waste—one meal at a time.</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Contact Page
  if (currentPage === 'contact') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-amber-50 relative overflow-hidden">
        <FloatingFood />
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-20 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="text-center mb-12 md:mb-16">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 md:mb-6">Get In Touch</h1>
              <p className="text-lg md:text-xl text-gray-600">We'd love to hear from you! Questions, feedback, or just want to say hi?</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
              {[
                { icon: Mail, title: 'Email', info: 'hello@fridgechef.com', link: 'mailto:hello@fridgechef.com' },
                { icon: Phone, title: 'Phone', info: '+1 (555) 123-4567', link: 'tel:+15551234567' },
                { icon: MapPin, title: 'Location', info: 'San Francisco, CA', link: null },
              ].map((item, i) => (
                <motion.a key={i} href={item.link || '#'} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-all">
                  <div className="bg-gradient-to-r from-pink-500 to-pink-600 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm md:text-base text-gray-600">{item.info}</p>
                </motion.a>
              ))}
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white/80 backdrop-blur-md rounded-3xl p-6 md:p-10 shadow-xl">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">Send us a message</h2>
              <form className="space-y-4 md:space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border-2 border-pink-100 focus:border-pink-500 focus:outline-none transition-colors" placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input type="email" className="w-full px-4 py-3 rounded-xl border-2 border-pink-100 focus:border-pink-500 focus:outline-none transition-colors" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea rows="5" className="w-full px-4 py-3 rounded-xl border-2 border-pink-100 focus:border-pink-500 focus:outline-none transition-colors resize-none" placeholder="Tell us what's on your mind..."></textarea>
                </div>
                <GlowButton onClick={(e) => { e.preventDefault(); alert('Message sent! (Demo only)'); }}>
                  <Mail className="w-5 h-5" />
                  Send Message
                </GlowButton>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Login Page
  if (currentPage === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-amber-50 relative overflow-hidden flex items-center justify-center p-4">
        <FloatingFood />
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md w-full bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 relative z-10 border border-pink-100">
          <div className="text-center mb-8">
            <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-pink-500 to-amber-500 rounded-3xl mb-6 shadow-2xl">
              <ChefHat className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-pink-600 to-amber-600 bg-clip-text text-transparent">Welcome Back!</h1>
            <p className="text-gray-600 text-lg">Sign in to continue cooking 👨‍🍳</p>
          </div>

          <form onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const email = formData.get('email');
            const password = formData.get('password');
            
            try {
              const response = await loginService({ email, password });
              
              if (response.success) {
                setIsLoggedIn(true);
                setUser(response.user);
                setCurrentPage('home');
                alert('✅ Login successful! Welcome back! 🎉');
              }
            } catch (error) {
              alert('❌ Login failed: ' + (error.response?.data?.message || 'Please try again'));
            }
          }} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4 text-pink-500" />
                Email Address
              </label>
              <input type="email" name="email" required className="w-full px-4 py-3 border-2 border-pink-100 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all" placeholder="your@email.com" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4 text-pink-500" />
                Password
              </label>
              <input type="password" name="password" required className="w-full px-4 py-3 border-2 border-pink-100 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all" placeholder="••••••••" />
            </div>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="w-full bg-gradient-to-r from-pink-500 via-pink-600 to-amber-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all flex items-center justify-center gap-3">
              Sign In
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button onClick={() => setCurrentPage('register')} className="text-pink-600 font-bold hover:text-pink-700 transition-colors">
                Sign up now! 🚀
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  // Register Page
  if (currentPage === 'register') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-amber-50 relative overflow-hidden flex items-center justify-center p-4">
        <FloatingFood />
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md w-full bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 relative z-10 border border-pink-100">
          <div className="text-center mb-8">
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }} className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-pink-500 to-amber-500 rounded-3xl mb-6 shadow-2xl">
              <ChefHat className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-pink-600 to-amber-600 bg-clip-text text-transparent">Join FridgeChef!</h1>
            <p className="text-gray-600 text-lg">Start cooking smarter today 🎉</p>
          </div>

          <form onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const name = formData.get('name');
            const email = formData.get('email');
            const password = formData.get('password');
            const confirmPassword = formData.get('confirmPassword');
            
            if (password !== confirmPassword) {
              alert('❌ Passwords do not match!');
              return;
            }

            try {
              const response = await registerService({ name, email, password });
              
              if (response.success) {
                setIsLoggedIn(true);
                setUser(response.user);
                setCurrentPage('home');
                alert('✅ Registration successful! Welcome to FridgeChef! 🎉');
              }
            } catch (error) {
              alert('❌ Registration failed: ' + (error.response?.data?.message || 'Please try again'));
            }
          }} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <User className="w-4 h-4 text-pink-500" />
                Full Name
              </label>
              <input type="text" name="name" required className="w-full px-4 py-3 border-2 border-pink-100 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all" placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4 text-pink-500" />
                Email Address
              </label>
              <input type="email" name="email" required className="w-full px-4 py-3 border-2 border-pink-100 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all" placeholder="your@email.com" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4 text-pink-500" />
                Password
              </label>
              <input type="password" name="password" required minLength="6" className="w-full px-4 py-3 border-2 border-pink-100 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all" placeholder="••••••••" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4 text-pink-500" />
                Confirm Password
              </label>
              <input type="password" name="confirmPassword" required className="w-full px-4 py-3 border-2 border-pink-100 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all" placeholder="••••••••" />
            </div>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="w-full bg-gradient-to-r from-pink-500 via-pink-600 to-amber-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all flex items-center justify-center gap-3">
              Create Account
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <button onClick={() => setCurrentPage('login')} className="text-pink-600 font-bold hover:text-pink-700 transition-colors">
                Sign in here! 🚀
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  // Upload Page - Protected (Requires Login)
  if (showUpload) {
    // Check if user is logged in
    if (!isLoggedIn) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-amber-50 relative overflow-hidden flex items-center justify-center p-4">
          <FloatingFood />
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md w-full bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-12 relative z-10 text-center border border-pink-100">
            <motion.div animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }} transition={{ duration: 2, repeat: Infinity }} className="inline-block mb-6">
              <Lock className="w-20 h-20 text-pink-500" />
            </motion.div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Login Required</h2>
            <p className="text-gray-600 mb-8 text-lg">Please sign in to upload your fridge photo and get personalized recipes!</p>
            <div className="space-y-3">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => { setShowUpload(false); setCurrentPage('login'); }} className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-3 rounded-xl font-bold hover:shadow-xl transition-all">
                Sign In
              </motion.button>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => { setShowUpload(false); setCurrentPage('register'); }} className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 rounded-xl font-bold hover:shadow-xl transition-all">
                Create Account
              </motion.button>
              <button onClick={() => setShowUpload(false)} className="w-full text-gray-600 hover:text-gray-900 font-medium">
                Go Back
              </button>
            </div>
          </motion.div>
        </div>
      );
    }

    // User is logged in - show upload page
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-amber-50 relative overflow-hidden">
        <FloatingFood />
        <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <ChefHat className="w-6 h-6 md:w-8 md:h-8 text-pink-500" />
              <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-pink-600 to-amber-600 bg-clip-text text-transparent">FridgeChef</span>
            </div>
            <button onClick={() => { setShowUpload(false); setImage(null); setIngredients([]); setRecipes([]); }} className="text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2">
              <X className="w-5 h-5" />
              <span className="hidden md:inline">Close</span>
            </button>
          </div>
        </nav>

        <div className="max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-12 relative z-10">
          {!image ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
              <motion.div animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }} transition={{ duration: 3, repeat: Infinity }}>
                <Camera className="w-16 h-16 md:w-20 md:h-20 mx-auto text-pink-500 mb-6" />
              </motion.div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Snap Your Fridge</h2>
              <p className="text-base md:text-lg text-gray-600 mb-8 md:mb-12">AI will analyze your ingredients in seconds ✨</p>
              <FileUpload onFileSelect={handleFileSelect} />
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 md:space-y-8">
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                <img src={image} alt="Fridge" className="w-full h-64 md:h-96 object-cover" />
              </div>

              {analyzing ? (
                <div className="text-center py-12 md:py-16 bg-white/80 backdrop-blur-md rounded-3xl">
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="inline-block">
                    <Sparkles className="w-12 h-12 md:w-16 md:h-16 text-pink-500" />
                  </motion.div>
                  <p className="text-xl md:text-2xl font-bold text-gray-700 mt-6">Analyzing ingredients...</p>
                  <p className="text-sm md:text-base text-gray-500 mt-2">AI is working its magic ✨</p>
                </div>
              ) : (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 md:space-y-8">
                  <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <Sparkles className="w-6 h-6 md:w-7 md:h-7 text-amber-500" />
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Detected Ingredients</h3>
                    </div>
                    <div className="flex flex-wrap gap-2 md:gap-3">
                      {ingredients.map((ingredient, i) => (
                        <motion.span 
                          key={i} 
                          initial={{ scale: 0 }} 
                          animate={{ scale: 1 }} 
                          transition={{ delay: i * 0.1 }} 
                          className="bg-gradient-to-r from-pink-100 to-pink-200 text-pink-700 px-4 md:px-5 py-2 md:py-3 rounded-full font-semibold shadow-md text-sm md:text-base"
                      >
                        ✓ {ingredient.name || ingredient} {ingredient.confidence && `(${ingredient.confidence}%)`}
                        </motion.span>
                      ))}
                  </div>
                  </div>

                  <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-6 md:mb-8">
                      <ChefHat className="w-6 h-6 md:w-7 md:h-7 text-pink-500" />
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Recipe Suggestions</h3>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4 md:gap-6">
                      {recipes.map((recipe, i) => {
                        // Get missing ingredients (ingredients where available is false)
                        const missingIngredients = recipe.ingredients?.filter(ing => !ing.available) || [];
  
                        return (
                          <CardContainer key={i} className="w-full">
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2 }} className="bg-gradient-to-br from-white to-pink-50 rounded-2xl p-5 md:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-pink-300" style={{ transformStyle: "preserve-3d" }}>
                              <div style={{ transform: "translateZ(50px)" }}>
                                {/* Recipe emoji or placeholder */}
                                <div className="text-5xl md:text-6xl mb-4 text-center">
                                  {recipe.emoji || '🍳'}
                                </div>
          
                                {/* Recipe name */}
                                <h4 className="font-bold text-lg md:text-xl text-gray-900 mb-3">{recipe.name}</h4>
          
                                {/* Cooking time and difficulty */}
                                <div className="flex items-center justify-between text-xs md:text-sm text-gray-600 mb-4">
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {recipe.cookingTime ? `${recipe.cookingTime} min` : recipe.time || '15 min'}
                                  </span>
                                  <span className="bg-pink-100 text-pink-700 px-2 md:px-3 py-1 rounded-full text-xs font-bold">
                                    {recipe.difficulty || 'Easy'}
                                  </span>
                                </div>
          
                                {/* Servings */}
                                {recipe.servings && (
                                  <p className="text-xs text-gray-500 mb-3">Serves: {recipe.servings}</p>
                                )}
          
                                {/* Missing ingredients */}
                                {missingIngredients.length > 0 && (
                                  <div className="mb-4 p-2 md:p-3 bg-amber-50 rounded-lg">
                                    <p className="text-xs text-amber-700 font-medium mb-1">Missing:</p>
                                    <p className="text-xs text-amber-600">
                                      {missingIngredients.map(ing => ing.name).join(', ')}
                                    </p>
                                  </div>
                                )}
          
                                {/* Calories */}
                                {recipe.calories && (
                                  <div className="mb-4 p-2 bg-green-50 rounded-lg">
                                    <p className="text-xs text-green-700 font-medium">
                                      🔥 {recipe.calories} calories
                                    </p>
                                  </div>
                                )}
          
                                <motion.button className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-2 md:py-3 rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm md:text-base">
                                View Recipe
                                <ArrowRight className="w-4 h-4" />
                                </motion.button>
                              </div>
                            </motion.div>
                          </CardContainer>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    );
  }
  {/* Recipe Details Modal */}
{selectedRecipe && (
  <div 
    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    onClick={() => setSelectedRecipe(null)}
  >
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Modal Header */}
      <div className="sticky top-0 bg-gradient-to-r from-pink-500 to-purple-600 text-white p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">{selectedRecipe.name}</h2>
            <p className="text-pink-100 text-sm md:text-base">{selectedRecipe.description}</p>
          </div>
          <button
            onClick={() => setSelectedRecipe(null)}
            className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Quick Stats */}
        <div className="flex flex-wrap gap-3 md:gap-4 mt-4 text-xs md:text-sm">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{selectedRecipe.cookingTime} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{selectedRecipe.servings} servings</span>
          </div>
          <div className="flex items-center gap-1">
            <Flame className="w-4 h-4" />
            <span>{selectedRecipe.calories} cal</span>
          </div>
          <span className="px-2 py-1 bg-white bg-opacity-20 rounded-full text-xs">
            {selectedRecipe.difficulty}
          </span>
        </div>
      </div>

      {/* Modal Body */}
      <div className="p-6">
        {/* Ingredients */}
        <div className="mb-6">
          <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 flex items-center gap-2">
            <span className="text-2xl">🥘</span>
            Ingredients
          </h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <ul className="space-y-2">
              {selectedRecipe.ingredients?.map((ingredient, index) => (
                <li
                  key={index}
                  className={`flex items-start gap-2 text-sm md:text-base ${
                    ingredient.available ? 'text-gray-700' : 'text-orange-600'
                  }`}
                >
                  <span className="mt-1 font-bold">
                    {ingredient.available ? '✓' : '○'}
                  </span>
                  <span>
                    <strong>{ingredient.amount}</strong> {ingredient.name}
                    {!ingredient.available && (
                      <span className="text-xs ml-2 text-orange-500">(need to buy)</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Instructions */}
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 flex items-center gap-2">
            <span className="text-2xl">👨‍🍳</span>
            Instructions
          </h3>
          <div className="space-y-4">
            {selectedRecipe.instructions?.map((instruction, index) => (
              <div key={index} className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
                <p className="text-gray-700 pt-1 text-sm md:text-base">{instruction}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Close Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setSelectedRecipe(null)}
          className="w-full mt-6 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-800 py-3 rounded-xl font-bold transition-all"
        >
          Close Recipe
        </motion.button>
      </div>
    </motion.div>
  </div>
)}

  // Home Page
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-amber-50 relative overflow-hidden">
      <FloatingFood />
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-20 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12 md:mb-20">
          <motion.div animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.05, 1] }} transition={{ duration: 3, repeat: Infinity }} className="inline-block mb-6 md:mb-8">
            <ChefHat className="w-16 h-16 md:w-24 md:h-24 text-pink-500" />
          </motion.div>
          <h1 className="text-4xl md:text-7xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight px-4">
            Turn Your Fridge Into
            <span className="block bg-gradient-to-r from-pink-600 via-pink-500 to-amber-500 bg-clip-text text-transparent">
              Delicious Meals
            </span>
          </h1>
          <p className="text-base md:text-xl text-gray-600 mb-8 md:mb-12 max-w-2xl mx-auto px-4">
            Snap a photo, let AI detect ingredients, get instant recipes. Zero waste, maximum flavor! 🔍✨
          </p>
          
          {isLoggedIn ? (
            <div className="space-y-4">
              <p className="text-lg text-gray-700">
                Welcome back, <span className="font-bold text-pink-600">{user?.name}</span>! Ready to cook? 👨‍🍳
              </p>
              <GlowButton onClick={() => setShowUpload(true)}>
                <Camera className="w-5 h-5 md:w-6 md:h-6" />
                Start Cooking Now
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
              </GlowButton>
            </div>
          ) : (
            <GlowButton onClick={() => setCurrentPage('register')}>
              <Camera className="w-5 h-5 md:w-6 md:h-6" />
              Start Cooking Now
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
            </GlowButton>
          )}
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-20">
          {[
            { icon: Camera, title: 'Snap & Detect', desc: 'AI instantly recognizes all ingredients', gradient: 'from-blue-500 to-cyan-500' },
            { icon: ChefHat, title: 'Smart Recipes', desc: 'Personalized based on what you have', gradient: 'from-pink-500 to-rose-500' },
            { icon: Heart, title: 'Zero Waste', desc: 'Save money and help the planet', gradient: 'from-amber-500 to-orange-500' },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white/80 backdrop-blur-md border border-pink-100 rounded-3xl p-6 md:p-8 hover:bg-white/95 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <motion.div 
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className={`bg-gradient-to-r ${feature.gradient} w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-4 md:mb-6 shadow-xl`}
              >
                <feature.icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
              </motion.div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="bg-white/80 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-xl mb-12 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8 md:mb-12">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-6 md:gap-8">
            {[
              { icon: Camera, text: '1. Take Photo', color: 'pink', desc: 'Snap your fridge' },
              { icon: Sparkles, text: '2. AI Analyzes', color: 'amber', desc: 'Instant detection' },
              { icon: ChefHat, text: '3. Get Recipes', color: 'blue', desc: 'Perfect matches' },
              { icon: Heart, text: '4. Start Cooking', color: 'rose', desc: 'Enjoy your meal' },
            ].map((step, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + i * 0.1 }}
                className="text-center"
              >
                <motion.div 
                  whileHover={{ scale: 1.15, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`bg-${step.color}-100 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md`}
                >
                  <step.icon className={`w-8 h-8 md:w-10 md:h-10 text-${step.color}-500`} />
                </motion.div>
                <p className="font-bold text-base md:text-lg text-gray-800 mb-1">{step.text}</p>
                <p className="text-xs md:text-sm text-gray-500">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2 }}
          whileHover={{ scale: 1.02 }}
          className="text-center bg-gradient-to-r from-pink-500 via-pink-600 to-amber-500 rounded-3xl p-10 md:p-16 shadow-2xl relative overflow-hidden"
        >
          <motion.div animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }} transition={{ duration: 2, repeat: Infinity }} className="inline-block mb-4 md:mb-6">
            <span className="text-4xl md:text-6xl">🎉</span>
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-3 md:mb-4">Ready to Cook Smarter?</h2>
          <p className="text-base md:text-xl text-pink-100 mb-6 md:mb-10">
            Join thousands saving time and reducing food waste
          </p>
          {isLoggedIn ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowUpload(true)}
              className="bg-white text-pink-600 px-10 py-4 rounded-2xl text-lg font-bold shadow-xl hover:shadow-2xl transition-all inline-flex items-center gap-3"
            >
              <Upload className="w-6 h-6" />
              Upload Fridge Photo
            </motion.button>
          ) : (
            <GlowButton onClick={() => setCurrentPage('register')}>
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </GlowButton>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default App;