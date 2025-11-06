import React, { useState, useRef, useEffect } from "react";
import { Heart, Calendar, MapPin, Clock, Play, Pause, X, ChevronLeft, ChevronRight } from "lucide-react";

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
  const images = [
    { url: 'images/1.jpg', alt: 'Mountain landscape' },
    { url: 'images/01.jpg', alt: 'Forest path' },
    { url: 'images/02.jpg', alt: 'Desert sunset' },
    { url: 'images/03.jpg', alt: 'Ocean waves' },
    { url: 'images/04.jpg', alt: 'Canyon vista' }
  ];

  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isSlidePlaying, setIsSlidePlaying] = useState(true);
  const slideRef = useRef(null);

  const minSwipeDistance = 50;
  const autoPlayDuration = 3000; // 3 seconds

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, autoPlayDuration);

    return () => clearInterval(interval);
  }, [current, isPlaying]);

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrent(index);
  };

  const onTouchStart = (e) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
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
            <h1 className="text-2xl sm:text-3xl whitespace-nowrap font-moulpali bg-linear-to-r from-yellow-300 via-yellow-400 to-amber-300 bg-clip-text text-transparent animate-slide-down bg-white/10 p-3 sm:p-4 rounded-lg">
              សិរីមង្គលអាពាហ៏ពិពាហ៍
            </h1>
            <div className="item-center mt-5 animate-fade-in">
              <img src="/images/wedding-mark.png" alt="mark" className="w-56 sm:w-56 mx-auto animate-float" />
            </div>

            <div
              className="text-2xl sm:text-3xl md:text-4xl font-nokora font-extrabold bg-linear-to-r from-yellow-400 via-yellow-500 to-amber-500 bg-clip-text text-transparent 
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
              className="text-base sm:text-xl md:text-2xl mb-10 font-nokora text-white mt-3 sm:mt-5 italic animate-slide-up"
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
          <div className="p-2 md:p-8">
            <h2 className="text-xl lg:text-2xl text-center font-moul text-rose-600 mb-4 px-2">សូមគោរពអញ្ជើញ</h2>
            <div className="flex items-center justify-center mb-6 sm:mb-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <img src="/images/kbaj_kh.PNG" alt="kbaj_kh" className="w-32 sm:w-32 md:w-50" />
            </div>
            <p className="text-center leading-loose font-moulpali  text-gray-700 text-base sm:text-lg md:text-xl mb-8 sm:mb-12 px-4">
              ឯកឧត្តម លោកជំទាវ អ្នកឧកញ៉ា ឧកញ៉ា​ លោក លោកស្រី​ អ្នកនាង កញ្ញា អញ្ជើញចូលរួមជាភ្ញៀវកិត្តិយស ដើម្បីប្រសិទ្ធពរជ័យ សិរីសួស្តីក្នុងកម្មពិធីសិរីមង្គលអាពាហ៍ពិពាហ៍យើងខ្ញុំ
            </p>
            <div
              className="bg-white rounded-xl sm:rounded-2xl animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="space-y-4">
                <div className="relative p-3 rounded-2xl overflow-hidden bg-no-repeat border border-rose-200 shadow-md"
                  style={{backgroundImage: "url('/images/time-bg.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "right center",
                  backgroundRepeat: "no-repeat",}}>
                  <div className="absolute inset-0 bg-linear-to-r from-white/95 via-white/70 to-white/0 backdrop-blur-[0.5px]"
                  style={{
                    width: "75%",
                  }}></div>
                  <div className="relative z-10 max-w-[60%] sm:max-w-[55%] space-y-6">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-rose-500 shrink-0 mt-1 sm:mt-0" />
                      <div>
                        <p className="text-base sm:text-sm font-nokora text-rose-500 font-semibold tracking-wider">
                          កាលបរិច្ឆេទ
                        </p>
                        <p className="text-base sm:text-base md:text-xl font-nokora text-gray-800">
                          ថ្ងៃច័ន្ទ ទី​២៩ ខែធ្នូ ឆ្នាំ២០២៥
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-rose-500 shrink-0 mt-1 sm:mt-0" />
                      <div className="font-nokora">
                        <p className="text-base sm:text-sm text-rose-500 font-semibold tracking-wider">
                          ទីតាំងកម្មវិធី
                        </p>
                        <p className="text-base md:text-xl text-gray-800 ">
                          គេហដ្ឋានខាងស្រី​ ​ភូមិសំបូរ ឃុំសំបូរ ស្រុកសំបូរ ខេត្តក្រចេះ
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center z-10 animate-fade-in" style={{ animationDelay: "0.7s" }}>
                <button
                  onClick={() => window.open(
                    "https://maps.app.goo.gl/CpNxJaGPN4R52hsaA",
                    "_blank"
                  )}
                  className="group relative px-8 sm:px-12 py-3 sm:py-5 mt-5 bg-linear-to-r from-rose-400 to-pink-500 text-white text-base sm:text-xl font-semibold rounded-full shadow-2xl
                  hover:shadow-rose-300 transition-all duration-300 hover:scale-110 animate-slide-up overflow-hidden active:scale-95"
                >
                  <span className="relative z-10 font-nokora flex items-center gap-2 sm:gap-3">
                    មើលផែនទី
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 group-hover:animate-ping" />
                  </span>
                  <div className="absolute inset-0 bg-linear-to-r from-pink-500 to-rose-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
                {/* <div
                  className="text-base sm:text-xl md:text-2xl mb-10 font-nokora text-black mt-3 sm:mt-5 italic animate-slide-up"
                >
                  សូមចុចប៊ូតុងដើម្បីបើកធៀប
                </div> */}
              </div>
            </div>
          </div>
          <div>
            <div className="relative bg-transparent shadow-2xl overflow-hidden">
              {/* Slideshow Container */}
              <div
                ref={slideRef}
                className="relative aspect-video overflow-hidden"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                {images.map((img, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${index === current ? 'opacity-100' : 'opacity-0'
                      }`}
                  >
                    <img
                      src={img.url}
                      alt={img.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}

                {/* Navigation Buttons */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-200 group"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-4 h-4 text-white" />
                </button>

                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-200 group"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-4 h-4 text-white" />
                </button>

                {/* Dot Indicators */}
                <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center gap-2 py-4 bg-transparent">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${index === current
                        ? 'w-8 bg-white'
                        : 'w-2 bg-white/40 hover:bg-white/60'
                        }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* <div className="item-center mt-5 animate-fade-in">
              <img src="/images/wedding-mark.png" alt="mark" className="w-30 sm:w-30 md:w-50 mx-auto" />
            </div> */}


            <div class="p-6 sm:p-8 md:p-12 bg-white">
              <h2 className="text-2xl sm:text-3xl text-center whitespace-nowrap font-moulpali bg-linear-to-r from-yellow-500 via-yellow-600 to-amber-300 bg-clip-text text-transparent animate-slide-down bg-white/10 p-3 sm:p-4 rounded-lg">
                កម្មវិធីមង្គលអាពាហ៍ពិពាហ៍
              </h2>
              <div className="flex items-center justify-center mb-6 sm:mb-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                <img src="/images/kbaj03.PNG" alt="kbaj_kh" className="w-32 sm:w-32 md:w-50" />
              </div>
              <div class="relative">
                {/* <!-- Vertical Timeline Line --> */}
                <div class="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-secondary dark:bg-primary/30 h-full"></div>

                {/* <!-- Timeline Events --> */}
                <div class="grid grid-cols-[auto_1fr] gap-x-4 -gap-y-2">

                  {/* <!-- Timeline Item 1 --> */}
                  <div class="flex flex-col items-left gap-1 pt-3 relative">
                    <div class="text-primary text-3xl">
                      <img src="/images/kbaj04.PNG" alt="kbaj_kh" className="w-12 sm:w-12 md:w-16" />
                    </div>
                    <div class="w-0.5 bg-secondary dark:bg-primary/30 h-2"></div>
                  </div>
                  <div class="flex flex-1 flex-col pb-6 pt-2">
                    <p class="text-text-light font-nokora bg-linear-to-r from-yellow-500 via-yellow-600 to-amber-300 bg-clip-text text-transparent text-lg font-bold leading-normal">
                      ជួបជុំភ្ញៀវកិត្តិយសរៀបចំពិធីហែជំនូន</p>
                    <p class="text-lg text-gray-600 font-nokora leading-normal">ម៉ោង ៦៖៣០ នាទីព្រឺក</p>
                  </div>

                  {/* <!-- Timeline Item 2 --> */}
                  <div class="flex flex-col items-left gap-1 relative">
                    <div class="w-0.5 bg-secondary dark:bg-primary/30 h-2"></div>
                    <div class="text-primary text-3xl">
                      <img src="/images/kbaj04.PNG" alt="kbaj_kh" className="w-12 sm:w-12 md:w-16" />
                    </div>
                    <div class="w-0.5 bg-secondary dark:bg-primary/30 h-2"></div>
                  </div>
                  <div class="flex flex-1 flex-col pb-6 pt-2">
                    <p class="text-text-light font-nokora bg-linear-to-r from-yellow-500 via-yellow-600 to-amber-300 bg-clip-text text-transparent text-lg font-bold leading-normal">
                      ពិធីហែជំនូន(កំណត់) </p>
                    <p class="text-lg text-gray-600 font-nokora leading-normal">ម៉ោង ៧ : ០០ នាទីព្រឺក</p>
                  </div>

                  {/* <!-- Timeline Item 3 --> */}
                  <div class="flex flex-col items-left gap-1 relative">
                    <div class="w-0.5 bg-secondary dark:bg-primary/30 h-2"></div>
                    <div class="text-primary text-3xl">
                      <img src="/images/kbaj04.PNG" alt="kbaj_kh" className="w-12 sm:w-12 md:w-16" />
                    </div>
                    <div class="w-0.5 bg-secondary dark:bg-primary/30 h-2"></div>
                  </div>
                  <div class="flex flex-1 flex-col pb-6 pt-2">
                    <p class="text-text-light font-nokora bg-linear-to-r from-yellow-500 via-yellow-600 to-amber-300 bg-clip-text text-transparent text-lg font-bold leading-normal">
                      អញ្ញើញភ្ញៀវកិត្តិយសពិសាអាហារពេលព្រឹក</p>
                    <p class="text-lg text-gray-600 font-nokora leading-normal">ម៉ោង ៧ : ៣០ នាទីព្រឺក</p>
                  </div>

                  {/* <!-- Timeline Item 4 --> */}
                  <div class="flex flex-col items-left gap-1 relative">
                    <div class="w-0.5 bg-secondary dark:bg-primary/30 h-2"></div>
                    <div class="text-primary text-3xl">
                      <img src="/images/kbaj04.PNG" alt="kbaj_kh" className="w-12 sm:w-12 md:w-16" />
                    </div>
                    <div class="w-0.5 bg-secondary dark:bg-primary/30 h-2"></div>
                  </div>
                  <div class="flex flex-1 flex-col pb-6 pt-2">
                    <p class="text-text-light font-nokora bg-linear-to-r from-yellow-500 via-yellow-600 to-amber-300 bg-clip-text text-transparent text-lg font-bold leading-normal">
                      ពិធីពិសាស្លាកំណត់ និងបំពាក់ចិញ្ចៀន</p>
                    <p class="text-lg text-gray-600 font-nokora leading-normal">ម៉ោង ៨ : ០០ នាទីព្រឺក</p>
                  </div>

                  {/* <!-- Timeline Item 5 --> */}
                  <div class="flex flex-col items-center gap-1 pb-3 relative">
                    <div class="w-0.5 bg-secondary dark:bg-primary/30 h-2"></div>
                    <div class="text-primary text-3xl">
                      <img src="/images/kbaj04.PNG" alt="kbaj_kh" className="w-12 sm:w-12 md:w-16" />
                    </div>
                  </div>
                  <div class="flex flex-1 flex-col pb-6 pt-2">
                    <p class="text-text-light font-nokora bg-linear-to-r from-yellow-500 via-yellow-600 to-amber-300 bg-clip-text text-transparent text-lg font-bold leading-normal">
                      ពិធីសូត្រមន្តចម្រើនព្រះបរិត្ត</p>
                    <p class="text-lg text-gray-600 font-nokora leading-normal">ម៉ោង ៨ : ៣០ នាទីព្រឺក</p>
                  </div>
                  {/* <!-- Timeline Item 6 --> */}
                  <div class="flex flex-col items-center gap-1 pb-3 relative">
                    <div class="w-0.5 bg-secondary dark:bg-primary/30 h-2"></div>
                    <div class="text-primary text-3xl">
                      <img src="/images/kbaj04.PNG" alt="kbaj_kh" className="w-12 sm:w-12 md:w-16" />
                    </div>
                  </div>
                  <div class="flex flex-1 flex-col pb-6 pt-2">
                    <p class="text-text-light font-nokora bg-linear-to-r from-yellow-500 via-yellow-600 to-amber-300 bg-clip-text text-transparent text-lg font-bold leading-normal">
                      ពិធីកាត់សក់បង្កក់សិរីកូនប្រុសកូនស្រី</p>
                    <p class="text-lg text-gray-600 font-nokora leading-normal">ម៉ោង ៩ : ៣០ នាទីព្រឺក</p>
                  </div>
                  {/* <!-- Timeline Item 7 --> */}
                  <div class="flex flex-col items-center gap-1 pb-3 relative">
                    <div class="w-0.5 bg-secondary dark:bg-primary/30 h-2"></div>
                    <div class="text-primary text-3xl">
                      <img src="/images/kbaj04.PNG" alt="kbaj_kh" className="w-12 sm:w-12 md:w-16" />
                    </div>
                  </div>
                  <div class="flex flex-1 flex-col pb-6 pt-2">
                    <p class="text-text-light font-nokora bg-linear-to-r from-yellow-500 via-yellow-600 to-amber-300 bg-clip-text text-transparent text-lg font-bold leading-normal">
                      ពិធីបង្វិលពពិល សំពះផ្ទឹមចងដៃ និងបាចផ្កាស្លាពរជ័យ</p>
                    <p class="text-lg text-gray-600 font-nokora leading-normal">ម៉ោង ១០ : ៣០ នាទីព្រឺក</p>
                  </div>
                </div>
              </div>
            </div>


            <div
              className="text-center mt-5 animate-fade-in-up px-4"
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
