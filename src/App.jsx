import React, { useState, useRef, useEffect } from "react";
import { Heart, Calendar, MapPin, Clock, Play, Pause, X } from "lucide-react";

export default function WeddingInvitation() {
  const [showInvitation, setShowInvitation] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showRSVP, setShowRSVP] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    guests: "",
    message: "",
  });
  const audioRef = useRef(null);

  useEffect(() => {
    if (showInvitation && audioRef.current) {
      audioRef.current.play().catch((error) => {
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
      setFormData({ name: "", guests: "", message: "" });
    } else {
      alert("Please fill in all required fields");
    }
  };

  if (!showInvitation) {
    return (
      <div
        className="min-h-screen bg-linear-to-br from-rose-100 via-pink-50
       to-purple-100 flex flex-col items-center justify-start p-4 overflow-hidden relative"
      >
        {/* Background image container */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/banner.jpg')",
          }}
        ></div>

        <div className="flex flex-col items-center justify-between flex-1 z-10 w-full max-w-2xl py-4 sm:py-8">
          <div className="text-center space-y-3 sm:space-y-6 animate-fade-in">
            <h1 className="text-xl sm:text-3xl whitespace-nowrap font-moulpali bg-linear-to-r from-yellow-300 via-yellow-400 to-amber-300 bg-clip-text text-transparent animate-slide-down bg-white/10 p-3 sm:p-4 rounded-lg">
              សិរីមង្គលអាពាហ៏ពិពាហ៍
            </h1>
            <div className="text-lg sm:text-2xl md:text-3xl text-pink-500 animate-fade-in space-x-2">
              <span className="font-noto-khmer">សុខអាន</span>
              <span className="font-noto-khmer">&</span>
              <span className="font-noto-khmer">សៀវទី</span>
            </div>

            <div
              className="text-xl sm:text-3xl md:text-4xl font-nokora font-extrabold bg-linear-to-r from-yellow-400 via-yellow-500 to-amber-500 bg-clip-text text-transparent 
        text-gold-700 drop-shadow-[0_2px_6px_rgba(0,1,0.5,10)] animate-slide-up pt-2 sm:pt-4"
            >
              សូមគោរពអញ្ជើញ
            </div>
          </div>

          <div className="flex flex-col items-center z-10 animate-fade-in pb-4 sm:pb-8" style={{ animationDelay: "0.7s" }}>
            <button
              onClick={handleOpenInvitation}
              className="group relative px-8 sm:px-12 py-3 sm:py-5 bg-linear-to-r from-rose-400 to-pink-500 text-white text-base sm:text-xl font-semibold rounded-full shadow-2xl
         hover:shadow-rose-300 transition-all duration-300 hover:scale-110 animate-slide-up overflow-hidden active:scale-95"
            >
              <span className="relative z-10 font-nokora flex items-center gap-2 sm:gap-3">
                បើកធៀប
                <Heart className="w-5 h-5 sm:w-6 sm:h-6 group-hover:animate-ping" />
              </span>
              <div className="absolute inset-0 bg-linear-to-r from-pink-500 to-rose-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            <div
              className="text-sm sm:text-xl md:text-2xl font-nokora text-white mt-3 sm:mt-5 italic animate-slide-up"
            >
              សូមចុចប៊ូតុងដើម្បីបើកធៀប
            </div>
          </div>
        </div>

        <style>{`
          @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slide-down {
            from { transform: translateY(-30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          @keyframes slide-up {
            from { transform: translateY(30px); opacity: 0; }
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
          @import url('https://fonts.googleapis.com/css2?family=Moul&family=Nokora:wght@400;700&display=swap');
          .font-moul {
            font-family: 'Moul', sans-serif;
          }
          .font-nokora {
            font-family: 'Nokora', sans-serif;
          }
          .font-moulpali {
            font-family: 'Moulpali', sans-serif;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-pink-50 to-rose-50 p-4 md:p-8">
      <div className="fixed top-2 right-2 sm:top-4 sm:right-4 z-50">
        <button
          onClick={toggleMusic}
          className="bg-white p-3 sm:p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95"
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 sm:w-6 sm:h-6 text-rose-500" />
          ) : (
            <Play className="w-5 h-5 sm:w-6 sm:h-6 text-rose-500" />
          )}
        </button>
        <audio ref={audioRef} loop>
          <source src="/song/echo-of-you.mp3" type="audio/mpeg" />
        </audio>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="relative rounded-3xl shadow-2xl overflow-hidden animate-scale-in z-10 bg-white">
          {/* Image Container */}
          <div className="relative h-auto md:h-64 lg:h-64">
            <img
              src="/images/hero-section.jpg"
              className="w-full h-full object-cover"
              alt="Wedding celebration"
            />

            {/* Mobile Only: Title OVER the image */}
            <div className="absolute inset-0 flex flex-col items-center justify-start pt-14 text-center px-4 md:hidden">
              <h1 className="text-2xl sm:text-3xl font-moulpali text-rose-600 mb-3 sm:mb-4 px-2 drop-shadow-lg whitespace-nowrap">
                សិរីមង្គលអាពាហ៍ពិពាហ៍
              </h1>
              <p className="text-lg sm:text-xl text-white font-light italic px-2 drop-shadow-md">
                The Wedding Day
              </p>
              <div className="flex items-center justify-center mt-8 gap-4 sm:gap-6">
                <h2 className="text-base sm:text-3xl font-moulpali text-rose-600 px-2 drop-shadow-lg whitespace-nowrap">
                  គាត សុខអាន
                </h2>

                <Heart className="w-12 h-12 sm:w-10 sm:h-10 text-rose-400 fill-rose-500 animate-pulse shrink-0" />

                <h2 className="text-base sm:text-3xl font-moulpali text-rose-600 px-2 drop-shadow-lg whitespace-nowrap">
                  ថេង សៀវទី
                </h2>
              </div>
            </div>
          </div>

          {/* Desktop Only: Title BELOW the image */}
          <div className="hidden md:block text-center py-10 px-4">
            <h1 className="text-3xl lg:text-4xl font-moulpali text-rose-600 mb-4 px-2">
              សិរីមង្គលអាពាហ៍ពិពាហ៍
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 font-light italic px-2">
              The Wedding Day
            </p>

            <div className="flex flex-col mt-5 items-center justify-center text-center mb-8 sm:mb-12 animate-fade-in-up space-y-4 sm:space-y-6" style={{ animationDelay: "0.2s" }}>
              {/* Header names */}
              <div className="flex flex-wrap justify-center gap-6">
                <h2 className="text-l sm:text-xl md:text-xl font-moulpali text-rose-400 px-2">
                  កូនប្រុសនាម
                </h2>

                <h2 className="text-l sm:text-xl md:text-xl font-moulpali text-rose-400 px-2">
                  កូនស្រីនាម
                </h2>
                <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-moulpali text-rose-400 px-2">
                    គាត សុខអាន
                  </h2>

                  <Heart className="w-12 h-12 sm:w-16 sm:h-16 text-rose-400 fill-rose-400 animate-pulse" />

                  <h2 className="text-xl sm:text-2xl md:text-3xl font-moulpali text-rose-400 px-2">
                    ថេង សៀវទី
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 sm:p-8 md:p-12">
            <h2 className="text-xl lg:text-2xl text-center font-moul text-rose-600 mb-4 px-2">សូមគោរពអញ្ជើញ</h2>
            <div className="flex items-center justify-center mb-6 sm:mb-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <img src="/images/kbaj_kh.PNG" alt="kbaj_kh" className="w-32 sm:w-32" />
            </div>
            <p className="text-center leading-loose font-moulpali  text-gray-700 text-base sm:text-lg md:text-xl mb-8 sm:mb-12 px-4">
              ឯកឧត្តម លោកជំទាវ អ្នកឧកញ៉ា ឧកញ៉ា​ លោក លោកស្រី​ អ្នកនាង កញ្ញា អញ្ជើញចូលរួមជាភ្ញៀវកិត្តិយស ដើម្បីប្រសិទ្ធពរជ័យ សិរីសួស្តីក្នុងកម្មពិធីសិរីមង្គលអាពាហ៍ពិពាហ៍យើងខ្ញុំ
            </p>
            <div
              className="bg-linear-to-r from-rose-50 to-purple-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 mb-8 sm:mb-12 animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                  <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-rose-500 shrink-0 mt-1 sm:mt-0" />
                  <div>
                    <p className="text-xs sm:text-sm font-nokora text-gray-500 uppercase tracking-wider">
                      កាលបរិច្ឆេទ
                    </p>
                    <p className="text-base sm:text-lg md:text-xl font-nokora text-gray-800 font-semibold">
                      ថ្ងៃច័ន្ទ ទី​២៩ ខែធ្នូ ឆ្នាំ២០២៥
                    </p>
                  </div>
                </div>

                <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                  <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-rose-500 shrink-0 mt-1 sm:mt-0" />
                  <div className="font-nokora">
                    <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wider">
                      កម្មវិធីចាប់ផ្តើមពីម៉ោង
                    </p>
                    <p className="text-base sm:text-lg md:text-xl text-gray-800 font-semibold">
                      ៥ល្ងាចតទៅ
                    </p>
                  </div>
                </div>

                <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                  <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-rose-500 shrink-0 mt-1 sm:mt-0" />
                  <div className="font-nokora">
                    <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wider">
                      ទីតាំងកម្មវិធី
                    </p>
                    <p className="text-base sm:text-lg md:text-xl text-gray-800 font-semibold">
                      ខេត្តក្រចេះ
                    </p>
                    <p className="text-sm sm:text-base text-gray-600">
                      123 Wedding Street, City, State 12345
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="mb-8 sm:mb-12 animate-fade-in-up"
              style={{ animationDelay: "0.6s" }}
            >
              <h3 className="text-2xl sm:text-3xl font-serif text-center text-gray-800 mb-4 sm:mb-6 px-2">
                Our Journey
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="aspect-square bg-linear-to-br from-rose-200 to-purple-200 rounded-xl sm:rounded-2xl hover:scale-105 active:scale-95 transition-transform duration-300 cursor-pointer shadow-lg hover:shadow-xl flex items-center justify-center text-4xl sm:text-6xl"
                  >
                    📷
                  </div>
                ))}
              </div>
              <p className="text-center text-gray-500 text-xs sm:text-sm mt-3 sm:mt-4 px-2">
                Click to add your photos
              </p>
            </div>

            <div
              className="text-center mb-8 sm:mb-12 animate-fade-in-up px-4"
              style={{ animationDelay: "0.8s" }}
            >
              <p className="text-base sm:text-lg md:text-xl text-gray-700 italic leading-relaxed max-w-2xl mx-auto">
                "Love is not about how many days, months, or years you have been
                together. Love is about how much you love each other every
                single day."
              </p>
            </div>

            <div
              className="text-center animate-fade-in-up px-4"
              style={{ animationDelay: "1s" }}
            >
              <button
                onClick={() => setShowRSVP(true)}
                className="px-8 sm:px-12 py-4 sm:py-5 bg-linear-to-r from-rose-500 to-pink-500 text-white text-lg sm:text-xl font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 w-full sm:w-auto"
              >
                RSVP Now
              </button>
            </div>

            <div
              className="text-center mt-8 sm:mt-12 animate-fade-in-up px-4"
              style={{ animationDelay: "1.2s" }}
            >
              <p className="text-sm sm:text-base text-gray-600 italic">
                We can't wait to celebrate with you!
              </p>
              <div className="text-3xl sm:text-4xl mt-3 sm:mt-4 animate-pulse">💑</div>
            </div>
          </div>
        </div>
      </div>

      {showRSVP && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-3 sm:p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl animate-scale-in max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h3 className="text-2xl sm:text-3xl font-serif text-gray-800">RSVP</h3>
              <button
                onClick={() => setShowRSVP(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 active:scale-95 transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-gray-700 mb-2 font-semibold text-sm sm:text-base">
                  Your Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-rose-200 rounded-xl focus:border-rose-400 focus:outline-none transition-colors text-sm sm:text-base"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-semibold text-sm sm:text-base">
                  Number of Guests *
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.guests}
                  onChange={(e) =>
                    setFormData({ ...formData, guests: e.target.value })
                  }
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-rose-200 rounded-xl focus:border-rose-400 focus:outline-none transition-colors text-sm sm:text-base"
                  placeholder="1"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-semibold text-sm sm:text-base">
                  Message (Optional)
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-rose-200 rounded-xl focus:border-rose-400 focus:outline-none transition-colors h-20 sm:h-24 text-sm sm:text-base resize-none"
                  placeholder="Your wishes for the couple..."
                />
              </div>

              <button
                onClick={handleSubmitRSVP}
                className="w-full py-3 sm:py-4 bg-linear-to-r from-rose-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 text-sm sm:text-base"
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
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-scale-in {
          animation: scale-in 0.5s ease-out;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        @import url('https://fonts.googleapis.com/css2?family=Moul&family=Nokora:wght@400;700&display=swap');
        .font-moul {
          font-family: 'Moul', sans-serif;
        }
        .font-nokora {
          font-family: 'Nokora', sans-serif;
        }
        .font-moulpali {
          font-family: 'Moulpali', sans-serif;
        }
        
      `}</style>
    </div>
  );
}
