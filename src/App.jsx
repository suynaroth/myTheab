import React, { useState, useRef ,useEffect} from 'react';
import { Heart, Calendar, MapPin, Clock, Play, Pause, X } from 'lucide-react';

export default function WeddingInvitation() {
  const [showInvitation, setShowInvitation] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showRSVP, setShowRSVP] = useState(false);
  const [formData, setFormData] = useState({ name: '', guests: '', message: '' });
  const audioRef = useRef(null);

  useEffect(() => {
    if (showInvitation && audioRef.current) {
      audioRef.current.play().catch(error => {
        console.log("Auto-play blocked by browser:", error);
      });
      setIsPlaying(true);
    }
  }, [showInvitation]);

  const handleOpenInvitation = () => {
  setShowInvitation(true);
  
  setTimeout(() => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, 100);
};

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSubmitRSVP = () => {
    if (formData.name && formData.guests) {
      alert(`Thank you ${formData.name}! Your RSVP has been received.`);
      setShowRSVP(false);
      setFormData({ name: '', guests: '', message: '' });
    } else {
      alert('Please fill in all required fields');
    }
  };

  if (!showInvitation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-50
       to-purple-100 flex items-center justify-center p-4 overflow-hidden relative">
    {/* Background image container */}
    <div 
      className="absolute inset-0 bg-cover md:bg-contain bg-center bg-no-repeat"
      style={{ 
        backgroundImage: "url('/images/landing-bg.jpg')"
      }}
    ></div>
    {/* <div 
      className="absolute inset-0"
      style={{ 
        backgroundImage: "url('/images/landing-bg.jpg')",
        backgroundSize: 'contain',  // Changed from 'cover' to 'contain'
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    ></div> */}
        {/* <div className="absolute inset-0 bg-black bg-opacity-30"></div> */}

        {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 text-6xl animate-bounce opacity-20">💕</div>
          <div className="absolute top-40 right-20 text-5xl animate-pulse opacity-20">✨</div>
          <div className="absolute bottom-32 left-20 text-5xl animate-bounce opacity-20" style={{animationDelay: '1s'}}>💖</div>
          <div className="absolute bottom-20 right-32 text-6xl animate-pulse opacity-20" style={{animationDelay: '2s'}}>🌸</div>
          <div className="absolute top-1/2 left-1/4 text-4xl animate-bounce opacity-20" style={{animationDelay: '1.5s'}}>💐</div>
          <div className="absolute top-1/3 right-1/4 text-5xl animate-pulse opacity-20" style={{animationDelay: '0.5s'}}>🦋</div>
        </div> */}

        <div className="text-center z-10 animate-fade-in">
          <div className="mb-8 animate-float">
            <Heart className="w-24 h-24 mx-auto text-rose-400 fill-rose-400 animate-pulse" />
          </div>
          
          <div className="mt-[-20vh] mb-[50vh] backdrop-blur-md bg-white/40 p-8 rounded-2xl">
            <h1 className="text-6xl md:text-8xl font-serif text-rose-600 mb-4 animate-slide-down">
              Save the Date
            </h1>
          </div>
          
          <div className="text-3xl md:text-4xl text-gray-700 mb-3 font-light animate-slide-up" style={{animationDelay: '0.3s'}}>
            We're Getting Married!
          </div>
          
          <div className="text-xl md:text-2xl text-gray-600 mb-12 font-serif italic animate-slide-up" style={{animationDelay: '0.5s'}}>
            Join us in celebrating our special day
          </div>
          
          <button
            onClick={handleOpenInvitation}
            className="group relative px-12 py-5 bg-gradient-to-r from-rose-400 to-pink-500 text-white text-xl font-semibold rounded-full shadow-2xl hover:shadow-rose-300 transition-all duration-300 hover:scale-110 animate-slide-up overflow-hidden"
            style={{animationDelay: '0.7s'}}
          >
            <span className="relative z-10 flex items-center gap-3">
              Open Invitation
              <Heart className="w-6 h-6 group-hover:animate-ping" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>

        <style>{`
          @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slide-down {
            from { transform: translateY(-50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          @keyframes slide-up {
            from { transform: translateY(50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }
          .animate-fade-in {
            animation: fade-in 1s ease-out;
          }
          .animate-slide-down {
            animation: slide-down 1s ease-out;
          }
          .animate-slide-up {
            animation: slide-up 1s ease-out;
          }
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
          .font-moul {
            font-family: 'Moul', sans-serif;
          }
          .font-nokora {
            font-family: 'Nokora', sans-serif;
          }
          .font-noto-khmer {
            font-family: 'Noto Sans Khmer', sans-serif;
          }
          .font-roboto {
            font-family: 'Roboto', sans-serif;
          }
          .font-fira {
            font-family: 'Fira Code', monospace;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 p-4 md:p-8">
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={toggleMusic}
          className="bg-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 text-rose-500" />
          ) : (
            <Play className="w-6 h-6 text-rose-500" />
          )}
        </button>
        <audio ref={audioRef} loop>
          <source src="/song/echo-of-you.mp3" type="audio/mpeg" />
        </audio>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden animate-scale-in">
          <div className="bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 h-3"></div>
          
          <div className="p-8 md:p-12">
            <div className="text-center mb-12 animate-fade-in-up">
              <div className="flex justify-center mb-6">
                <Heart className="w-16 h-16 text-rose-400 fill-rose-400 animate-pulse" />
              </div>
              <h1 className="text-2xl md:text-3xl font-moul text-rose-600 mb-4">
                សិរីមង្គលអាពាហ៏ពិពាហ៍              </h1>
              <p className="text-2xl text-gray-600 font-light italic">
                To celebrate the wedding of
              </p>
            </div>

            <div className="text-center mb-12 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <h2 className="text-2xl md:text-3xl font-moul text-rose-400 mb-2">
                សុខអាន & សៀវទី
              </h2>
              <div className="flex items-center justify-center gap-4 text-3xl">
                <span className="text-rose-400">💕</span>
                <span className="text-purple-400">✨</span>
                <span className="text-pink-400">💖</span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-rose-50 to-purple-50 rounded-2xl p-8 mb-12 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Calendar className="w-8 h-8 text-rose-500" />
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wider">Date</p>
                    <p className="text-xl text-gray-800 font-semibold">Saturday, December 15, 2025</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <Clock className="w-8 h-8 text-rose-500" />
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wider">Time</p>
                    <p className="text-xl text-gray-800 font-semibold">4:00 PM - 10:00 PM</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <MapPin className="w-8 h-8 text-rose-500" />
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wider">Venue</p>
                    <p className="text-xl text-gray-800 font-semibold">Grand Ballroom, The Royal Hotel</p>
                    <p className="text-gray-600">123 Wedding Street, City, State 12345</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-12 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
              <h3 className="text-3xl font-serif text-center text-gray-800 mb-6">Our Journey</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="aspect-square bg-gradient-to-br from-rose-200 to-purple-200 rounded-2xl hover:scale-105 transition-transform duration-300 cursor-pointer shadow-lg hover:shadow-xl flex items-center justify-center text-6xl"
                  >
                    📷
                  </div>
                ))}
              </div>
              <p className="text-center text-gray-500 text-sm mt-4">Click to add your photos</p>
            </div>

            <div className="text-center mb-12 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
              <p className="text-xl text-gray-700 italic leading-relaxed max-w-2xl mx-auto">
                "Love is not about how many days, months, or years you have been together. 
                Love is about how much you love each other every single day."
              </p>
            </div>

            <div className="text-center animate-fade-in-up" style={{animationDelay: '1s'}}>
              <button
                onClick={() => setShowRSVP(true)}
                className="px-12 py-5 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xl font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                RSVP Now
              </button>
            </div>

            <div className="text-center mt-12 animate-fade-in-up" style={{animationDelay: '1.2s'}}>
              <p className="text-gray-600 italic">We can't wait to celebrate with you!</p>
              <div className="text-4xl mt-4 animate-pulse">💑</div>
            </div>
          </div>
        </div>
      </div>

      {showRSVP && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-scale-in">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-3xl font-serif text-gray-800">RSVP</h3>
              <button
                onClick={() => setShowRSVP(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2 font-semibold">Your Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-rose-200 rounded-xl focus:border-rose-400 focus:outline-none transition-colors"
                  placeholder="Enter your name"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2 font-semibold">Number of Guests *</label>
                <input
                  type="number"
                  min="1"
                  value={formData.guests}
                  onChange={(e) => setFormData({...formData, guests: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-rose-200 rounded-xl focus:border-rose-400 focus:outline-none transition-colors"
                  placeholder="1"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2 font-semibold">Message (Optional)</label>
                <input
                  type="text"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-rose-200 rounded-xl focus:border-rose-400 focus:outline-none transition-colors h-24"
                  placeholder="Your wishes for the couple..."
                />
              </div>
              
              <button
                onClick={handleSubmitRSVP}
                className="w-full py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                Submit RSVP
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes scale-in {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes fade-in-up {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-scale-in {
          animation: scale-in 0.5s ease-out;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
        .font-moul {
          font-family: 'Moul', sans-serif;
        }
        .font-nokora {
          font-family: 'Nokora', sans-serif;
        }
        .font-noto-khmer {
          font-family: 'Noto Sans Khmer', sans-serif;
        }
        .font-roboto {
          font-family: 'Roboto', sans-serif;
        }
        .font-fira {
          font-family: 'Fira Code', monospace;
        }
      `}</style>
    </div>
  );
}