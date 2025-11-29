import React, { useState, useRef, useEffect } from "react";
import { Heart, Calendar, MapPin, Clock, Play, Pause, X, ChevronLeft, ChevronRight } from "lucide-react";

export default function WeddingInvitation() {
  const [showInvitation, setShowInvitation] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const [current, setCurrent] = useState(0);
  const targetDate = "2025-12-29T00:00:00";

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
    setIsPlaying(true);
  };


  // const handleOpenInvitation = () => {
  //   setShowInvitation(true);

  //   setTimeout(() => {
  //     if (audioRef.current) {
  //       audioRef.current.play();
  //       setIsPlaying(true);
  //     }
  //   }, 100);
  // };

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

  const images = [
    { url: 'images/05.jpg', alt: 'Mountain landscape' },
    { url: 'images/01.jpg', alt: 'Forest path' },
    { url: 'images/02.jpg', alt: 'Desert sunset' },
    { url: 'images/03.jpg', alt: 'Ocean waves' },
    { url: 'images/11.jpg', alt: 'Canyon vista' }
  ];

  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
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

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const pad = (num) => String(num).padStart(2, "0");
  const { days, hours, minutes, seconds } = timeLeft;
  useEffect(() => {
    const countDownDate = new Date(targetDate).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);


  if (!showInvitation) {
    return (
      <div
        className="min-h-screen bg-linear-to-br from-rose-100 via-pink-50
       to-purple-100 flex flex-col items-center justify-center p-4 overflow-hidden relative"
      >
        {/* Background image container */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/banner.jpg')",
          }}
        ></div>
        {/* Fade overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-neutral-900/70 via-neutral-900/30 to-transparent pointer-events-none"></div>

        <div className="flex flex-col items-center justify-between flex-1 z-10 w-full max-w-2xl py-4 sm:py-8">
          <div className="text-center space-y-3 sm:space-y-6 animate-fade-in">
            <h1 className="text-2xl sm:text-3xl whitespace-nowrap font-moul bg-linear-to-r from-yellow-300 via-yellow-400 to-amber-300 bg-clip-text text-transparent animate-slide-down bg-white/10 p-3 sm:p-4 rounded-lg">
              សិរីមង្គលអាពាហ៏ពិពាហ៍
            </h1>
            <div className="item-center mt-5 animate-fade-in">
              <img src="/images/wedding-mark.png" alt="mark" className="w-45 sm:w-36 mx-auto animate-float" />
            </div>

            {/* <div
              className="text-2xl sm:text-3xl md:text-4xl font-nokora font-extrabold bg-linear-to-r from-yellow-400 via-yellow-500 to-amber-500 bg-clip-text text-transparent 
            text-gold-700 drop-shadow-[0_2px_6px_rgba(0,1,0.5,10)] animate-slide-up pt-2 sm:pt-4"
            >
              សូមគោរពអញ្ជើញ
            </div> */}
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
    <div className="min-h-screen p-4 md:p-8
      bg-[url('/images/floralblue.png')] bg-cover bg-center bg-fixed">
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
        <div className="relative rounded-3xl overflow-hidden animate-scale-in z-10 bg-transparent">
          {/* Image Container */}
          <div className="relative h-auto md:h-64 lg:h-64">
            <img
              src="/images/hero-section.jpg"
              className="w-full h-full object-cover"
              alt="Wedding celebration"
            />
            {/* Fade overlay */}
            <div className="absolute inset-0 bg-linear-to-b from-neutral-900/70 via-neutral-900/30 to-transparent pointer-events-none"></div>

            {/* Mobile Only: Title OVER the image */}
            <div className="absolute inset-0 flex flex-col items-center justify-start pt-14 text-center px-4 md:hidden">
              <h1 className="text-2xl sm:text-3xl whitespace-nowrap font-moul bg-linear-to-r from-yellow-500 via-yellow-600 to-amber-300 bg-clip-text text-transparent drop-shadow-2xl animate-slide-down bg-white/10 p-3 sm:p-4 rounded-lg">
                សិរីមង្គលអាពាហ៏ពិពាហ៍
              </h1>
              <p className="text-lg sm:text-xl text-white font-light italic px-2 drop-shadow-md">
                The Wedding Day
              </p>
              <div className="flex items-center justify-center mt-8 gap-4 sm:gap-6">
                <h2 className="text-lg sm:text-3xl whitespace-nowrap font-moul bg-linear-to-r from-yellow-500 via-yellow-600 to-amber-300 bg-clip-text text-transparent animate-slide-down bg-white/10 p-3 sm:p-4 rounded-lg">
                  គាត សុខអាន
                </h2>

                <Heart className="w-12 h-12 sm:w-10 sm:h-10 text-[#558fd1] fill-[#498ad4] animate-pulse shrink-0" />

                <h2 className="text-lg sm:text-l whitespace-nowrap font-moul bg-linear-to-r from-yellow-500 via-yellow-600 to-amber-300 bg-clip-text text-transparent animate-slide-down bg-white/10 p-3 sm:p-4 rounded-lg">
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
            <p className="text-xl lg:text-2xl text-[#ef9ab2] font-light italic px-2">
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

                  <Heart className="w-12 h-12 sm:w-16 sm:h-16 text-[#5986b9] fill-rose-400 animate-pulse" />

                  <h2 className="text-xl sm:text-2xl md:text-3xl font-moulpali text-rose-400 px-2">
                    ថេង សៀវទី
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <div className="p-2 md:p-8">
            <h2 className="text-lg sm:text-xl text-center whitespace-nowrap font-moulpali bg-linear-to-r from-yellow-500 via-yellow-600 to-amber-300 bg-clip-text text-transparent animate-slide-down bg-white/10 p-3 sm:p-4 rounded-lg">
              មានកិត្តិយសសូមគោរពអញ្ជើញ
            </h2>
            <div className="flex items-center justify-center mb-6 sm:mb-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <img src="/images/kbaj03.PNG" alt="kbaj_kh" className="w-32 sm:w-32 md:w-50" />
            </div>
            <p className="text-center leading-loose font-moulpali  text-[#7ca7d6] text-base sm:text-lg md:text-xl mb-8 sm:mb-12 px-4">
              ឯកឧត្តម លោកជំទាវ អ្នកឧកញ៉ា ឧកញ៉ា​ លោក លោកស្រី​ អ្នកនាង កញ្ញា អញ្ជើញចូលរួមជាភ្ញៀវកិត្តិយស ដើម្បីប្រសិទ្ធពរជ័យ សិរីសួស្តីក្នុងកម្មពិធីសិរីមង្គលអាពាហ៍ពិពាហ៍យើងខ្ញុំ
            </p>
            <div
              className="rounded-xl sm:rounded-2xl animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="space-y-4">
                <div className="relative p-3 rounded-2xl overflow-hidden bg-no-repeat border border-[#7ca7d6] shadow-md"
                  style={{
                    backgroundImage: "url('/images/time-bg.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "right center",
                    backgroundRepeat: "no-repeat",
                  }}>
                  <div className="absolute inset-0 bg-linear-to-r from-white/95 via-white/70 to-white/0 backdrop-blur-[0.5px]"
                    style={{
                      width: "70%",
                    }}></div>
                  <div className="relative z-10 max-w-[60%] sm:max-w-[55%] space-y-6">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-[#EAA4A4] shrink-0 mt-1 sm:mt-0" />
                      <div>
                        <p className="text-base sm:text-sm font-nokora text-[#EAA4A4] font-semibold tracking-wider">
                          កាលបរិច្ឆេទ
                        </p>
                        <p className="text-base sm:text-base md:text-xl font-nokora text-[#B94E48]">
                          ថ្ងៃចន្ទ ទី​២៩ ខែធ្នូ ឆ្នាំ២០២៥
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-[#5986b9] shrink-0 mt-1 sm:mt-0" />
                      <div className="font-nokora">
                        <p className="text-base sm:text-sm text-[#5986b9] font-semibold tracking-wider">
                          ទីតាំងកម្មវិធី
                        </p>
                        <p className="text-base md:text-xl text-[#2F4A66] ">
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
                    "https://maps.app.goo.gl/N3sqvDbvjU7wDsJD7",
                    "_blank"
                  )}
                  className="group relative px-8 sm:px-12 py-3 sm:py-5 mt-5 bg-linear-to-r from-[#468ad8] to-[#80abdb] text-white text-base sm:text-xl font-semibold rounded-full shadow-2xl
                  hover:shadow-rose-300 transition-all duration-300 hover:scale-110 animate-slide-up overflow-hidden active:scale-95"
                >
                  <span className="relative z-10 font-nokora flex items-center gap-2 sm:gap-3">
                    មើលផែនទី
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 group-hover:animate-ping" />
                  </span>
                  <div className="absolute inset-0 bg-linear-to-r from-pink-500 to-rose-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>

          </div>
          {/* </div> */}

          <div className="w-full max-w-2xl mx-auto">
            <p className="font-moul text-base text-center mt-3 text-[#5986b9]">រាប់ថយក្រោយថ្ងៃកម្មវិធី</p>

            <div class="grid grid-cols-4 sm:grid-cols-4 gap-4 py-4 px-4">
              <div class="flex flex-col items-stretch gap-2">
                <div class="flex h-24 sm:h-28 md:h-32 grow items-center justify-center rounded-xl px-3 bg-white/50  backdrop-blur-sm">
                  <p class="text-[#9DB7D1] text-4xl sm:text-5xl md:text-6xl font-black leading-tight tracking-tighter">{pad(days)}</p>
                </div>
                <div class="flex items-center justify-center"><p class="text-slate-500 dark:text-slate-400 text-sm font-normal uppercase tracking-widest">Days</p></div>
              </div>
              <div class="flex flex-col items-stretch gap-2">
                <div class="flex h-24 sm:h-28 md:h-32 grow items-center justify-center rounded-xl px-3 bg-white/50  backdrop-blur-sm">
                  <p class="text-[#9DB7D1]  text-4xl sm:text-5xl md:text-6xl font-black leading-tight tracking-tighter">{pad(hours)}</p>
                </div>
                <div class="flex items-center justify-center"><p class="text-slate-500 dark:text-slate-400 text-sm font-normal uppercase tracking-widest">Hours</p></div>
              </div>
              <div class="flex flex-col items-stretch gap-2">
                <div class="flex h-24 sm:h-28 md:h-32 grow items-center justify-center rounded-xl px-3 bg-white/50  backdrop-blur-sm">
                  <p class="text-[#9DB7D1]  text-4xl sm:text-5xl md:text-6xl font-black leading-tight tracking-tighter">{pad(minutes)}</p>
                </div>
                <div class="flex items-center justify-center"><p class="text-slate-500 dark:text-slate-400 text-sm font-normal uppercase tracking-widest">Minutes</p></div>
              </div>
              <div class="flex flex-col items-stretch gap-2">
                <div class="flex h-24 sm:h-28 md:h-32 grow items-center justify-center rounded-xl px-3 bg-white/50  backdrop-blur-sm">
                  <p class="text-[#9DB7D1]  text-4xl sm:text-5xl md:text-6xl font-black leading-tight tracking-tighter">{pad(seconds)}</p>
                </div>
                <div class="flex items-center justify-center"><p class="text-slate-500 dark:text-slate-400 text-sm font-normal uppercase tracking-widest">Seconds</p></div>
              </div>
            </div>
          </div>

          {/* <div className="relative shadow-2xl overflow-hidden animate-scale-in z-10 bg-white"> */}
          <div className="mt-3 justify-center">
            {/* countDownDate */}
            {/* <div class="w-full max-w-2xl justify-center items-center">
              <div class="grid grid-cols-4 sm:grid-cols-4 gap-4 py-4 px-4">
                <div class="flex flex-col items-stretch gap-2">
                  <div class="flex h-24 sm:h-28 md:h-32 grow items-center justify-center rounded-xl px-3 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                    <p class="text-slate-900 dark:text-white text-4xl sm:text-5xl md:text-6xl font-black leading-tight tracking-tighter">{pad(days)}</p>
                  </div>
                  <div class="flex items-center justify-center"><p class="text-slate-500 dark:text-slate-400 text-sm font-normal uppercase tracking-widest">Days</p></div>
                </div>
                <div class="flex flex-col items-stretch gap-2">
                  <div class="flex h-24 sm:h-28 md:h-32 grow items-center justify-center rounded-xl px-3 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                    <p class="text-slate-900 dark:text-white text-4xl sm:text-5xl md:text-6xl font-black leading-tight tracking-tighter">{pad(hours)}</p>
                  </div>
                  <div class="flex items-center justify-center"><p class="text-slate-500 dark:text-slate-400 text-sm font-normal uppercase tracking-widest">Hours</p></div>
                </div>
                <div class="flex flex-col items-stretch gap-2">
                  <div class="flex h-24 sm:h-28 md:h-32 grow items-center justify-center rounded-xl px-3 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                    <p class="text-slate-900 dark:text-white text-4xl sm:text-5xl md:text-6xl font-black leading-tight tracking-tighter">{pad(minutes)}</p>
                  </div>
                  <div class="flex items-center justify-center"><p class="text-slate-500 dark:text-slate-400 text-sm font-normal uppercase tracking-widest">Minutes</p></div>
                </div>
                <div class="flex flex-col items-stretch gap-2">
                  <div class="flex h-24 sm:h-28 md:h-32 grow items-center justify-center rounded-xl px-3 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                    <p class="text-slate-900 dark:text-white text-4xl sm:text-5xl md:text-6xl font-black leading-tight tracking-tighter">{pad(seconds)}</p>
                  </div>
                  <div class="flex items-center justify-center"><p class="text-slate-500 dark:text-slate-400 text-sm font-normal uppercase tracking-widest">Seconds</p></div>
                </div>
              </div>
            </div> */}

            <div className="relative bg-transparent z-10 shadow-2xl overflow-hidden">
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
                    className={`absolute inset-0 transition-all duration-1000 will-change-transform ${index === current
                      ? "translate-x-0 opacity-100"
                      : index < current
                        ? "-bg-conic-90translate-x-full opacity-0"
                        : "translate-x-full opacity-0"
                      }`}
                  >
                    <img
                      src={img.url}
                      alt={img.alt}
                      className={`w-full h-full object-cover transition-transform duration-1000ms will-change-transform ${index === current ? "scale-100" : "scale-110"
                        }`}

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


            <div class="p-6 sm:p-8 md:p-12 bg-transparent">
              <h2 className="text-lg sm:text-xl text-center whitespace-nowrap font-moulpali bg-linear-to-r from-yellow-500 via-yellow-600 to-amber-300 bg-clip-text text-transparent animate-slide-down bg-white/10 p-3 sm:p-4 rounded-lg">
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
                  <div class="flex flex-col items-left gap-1 pt-3 relative">
                    <div class="text-primary text-3xl">
                      <img src="/images/e1.jpg" alt="kbaj_kh" className="w-18 sm:w-12 md:w-16 rounded-xl bg-transparent mix-blend-multiply" />
                    </div>
                    <div class="w-0.5 bg-secondary dark:bg-primary/30 h-2"></div>
                  </div>
                  <div class="flex flex-1 flex-col pb-6 pt-2">
                    <p class="text-text-light font-nokora text-[#7ca7d6] text-lg font-semibold leading-normal" >
                      ពិធីសែនក្រុងពាលី</p>
                    <p class="text-base text-[#9DB7D1] font-moul leading-normal">ម៉ោង ០៦ : ០០ នាទីព្រឹក</p>
                  </div>

                  {/* <!-- Timeline Item 1 --> */}
                  <div class="flex flex-col items-left gap-1 pt-3 relative">
                    <div class="text-primary text-3xl">
                      <img src="/images/e2.png" alt="kbaj_kh" className="w-18 sm:w-12 md:w-16 rounded-xl bg-transparent mix-blend-multiply" />
                    </div>
                    <div class="w-0.5 bg-secondary dark:bg-primary/30 h-2"></div>
                  </div>
                  <div class="flex flex-1 flex-col pb-6 pt-2">
                    <p class="text-text-light font-nokora text-[#7ca7d6] text-lg font-semibold leading-normal" >
                      ជួបជុំភ្ញៀវកិត្តិយសរៀបចំពិធីហែជំនូន</p>
                    <p class="text-base text-[#9DB7D1] font-moul leading-normal">ម៉ោង ០៦ : ៣០ នាទីព្រឹក</p>
                  </div>

                  {/* <!-- Timeline Item 2 --> */}
                  <div class="flex flex-col items-left gap-1 relative">
                    <div class="w-0.5 bg-secondary dark:bg-primary/30 h-2"></div>
                    <div class="text-primary text-3xl">
                      <img src="/images/e9.png" alt="kbaj_kh" className="w-18 sm:w-12 md:w-16 rounded-xl bg-transparent mix-blend-multiply" />
                    </div>
                    <div class="w-0.5 bg-secondary dark:bg-primary/30 h-2"></div>
                  </div>
                  <div class="flex flex-1 flex-col pb-6 pt-2">
                    <p class="text-text-light font-nokora text-[#7ca7d6] text-lg font-semibold leading-normal" >
                      ពិធីហែជំនូន(កំណត់)ចូលរោងជ័យ </p>
                    <p class="text-s text-[#9DB7D1] font-moul leading-normal">ម៉ោង ០៧ : ០០ នាទីព្រឹក</p>
                  </div>

                  {/* <!-- Timeline Item 3 -->
                  <div class="flex flex-col items-left gap-1 relative">
                    <div class="w-0.5 bg-secondary dark:bg-primary/30 h-2"></div>
                    <div class="text-primary text-3xl">
                      <img src="/images/ev1.jpg" alt="kbaj_kh" className="w-18 sm:w-12 md:w-16 rounded-xl bg-transparent mix-blend-multiply" />
                    </div>
                    <div class="w-0.5 bg-secondary dark:bg-primary/30 h-2"></div>
                  </div>
                  <div class="flex flex-1 flex-col pb-6 pt-2">
                  <p class="text-text-light font-nokora text-[#CD9D8A] text-lg font-semibold leading-normal" >
                      អញ្ជើញភ្ញៀវកិត្តិយសពិសាអាហារពេលព្រឹក</p>
                    <p class="text-lg text-[#ef9ab2] font-nokora leading-normal">ម៉ោង ៧ : ៣០ នាទីព្រឹក</p>
                  </div> */}

                  {/* <!-- Timeline Item 4 --> */}
                  <div class="flex flex-col items-left gap-1 relative">
                    <div class="w-0.5 bg-secondary dark:bg-primary/30 h-2"></div>
                    <div class="text-primary text-3xl">
                      <img src="/images/e3.png" alt="kbaj_kh" className="w-18 sm:w-12 md:w-16 rounded-xl bg-transparent mix-blend-multiply" />
                    </div>
                    <div class="w-0.5 bg-secondary dark:bg-primary/30 h-2"></div>
                  </div>
                  <div class="flex flex-1 flex-col pb-6 pt-2">
                    <p class="text-text-light font-nokora text-[#7ca7d6] text-lg font-semibold leading-normal" >
                      ពិធីពិសាស្លាកំណត់ និង អញ្ជើញភ្ញៀវកិត្តិយសពិសាអាហារពេលព្រឹក</p>
                    <p class="text-base text-[#9DB7D1] font-moul leading-normal">ម៉ោង ០៧ : ៣០ នាទីព្រឹក</p>
                  </div>

                  {/* <!-- Timeline Item 5 --> */}
                  <div class="flex flex-col items-center gap-1 pb-3 relative">
                    <div class="w-0.5 bg-secondary dark:bg-primary/30 h-2"></div>
                    <div class="text-primary text-3xl">
                      <img src="/images/e4.png" alt="kbaj_kh" className="w-18 sm:w-12 md:w-16 rounded-xl bg-transparent mix-blend-multiply" />
                    </div>
                  </div>
                  <div class="flex flex-1 flex-col pb-6 pt-2">
                    <p class="text-text-light font-nokora text-[#7ca7d6] text-lg font-semibold leading-normal" >
                      ពិធីបំពាក់ចិញ្ចៀន</p>
                    <p class="text-base text-[#9DB7D1] font-moul leading-normal">ម៉ោង ៨ : ៣០ នាទីព្រឹក</p>
                  </div>
                  {/* <!-- Timeline Item 6 --> */}
                  <div class="flex flex-col items-center gap-1 pb-3 relative">
                    <div class="w-0.5 bg-secondary dark:bg-primary/30 h-2"></div>
                    <div class="text-primary text-3xl">
                      <img src="/images/e5.png" alt="kbaj_kh" className="w-18 sm:w-12 md:w-16 rounded-xl bg-transparent mix-blend-multiply" />
                    </div>
                  </div>
                  <div class="flex flex-1 flex-col pb-6 pt-2">
                    <p class="text-text-light font-nokora text-[#7ca7d6] text-lg font-semibold leading-normal" >
                      ពិធីកាត់សក់បង្កក់សិរី</p>
                    <p class="text-base text-[#9DB7D1] font-moul leading-normal">ម៉ោង ៩ : ៣០ នាទីព្រឹក</p>
                  </div>
                  {/* <!-- Timeline Item 7 --> */}
                  <div class="flex flex-col items-center gap-1 pb-3 relative">
                    <div class="w-0.5 bg-secondary dark:bg-primary/30 h-2"></div>
                    <div class="text-primary text-3xl">
                      <img src="/images/e6.png" alt="kbaj_kh" className="w-18 sm:w-12 md:w-16 rounded-xl bg-transparent mix-blend-multiply" />
                    </div>
                  </div>
                  <div class="flex flex-1 flex-col pb-6 pt-2">
                    <p class="text-text-light font-nokora text-[#7ca7d6] text-lg font-semibold leading-normal" >
                      ពិធីបង្វិលពពិល សំពះផ្ទឹមចងដៃ និងបាចផ្កាស្លាពរជ័យ</p>
                    <p class="text-base text-[#9DB7D1] font-moul leading-normal">ម៉ោង ១០ : ៣០ នាទីព្រឹក</p>
                  </div>
                  {/* <!-- Timeline Item 8 --> */}
                  <div class="flex flex-col items-center gap-1 pb-3 relative">
                    <div class="w-0.5 bg-secondary dark:bg-primary/30 h-2"></div>
                    <div class="text-primary text-3xl">
                      <img src="/images/e7.png" alt="kbaj_kh" className="w-18 sm:w-12 md:w-16 rounded-xl bg-transparent mix-blend-multiply" />
                    </div>
                  </div>
                  <div class="flex flex-1 flex-col pb-6 pt-2">
                    <p class="text-text-light font-nokora text-[#7ca7d6] text-lg font-semibold leading-normal" >
                      អញ្ញើញភ្ញៀវកិត្តិយសពិសាអាហារថ្ងៃត្រង់</p>
                    <p class="text-base text-[#9DB7D1] font-moul leading-normal">ម៉ោង ១២ : ០០ ថ្ងៃត្រង់</p>
                  </div>
                  {/* <!-- Timeline Item 8 --> */}
                  <div class="flex flex-col items-center gap-1 pb-3 relative">
                    <div class="w-0.5 bg-secondary dark:bg-primary/30 h-2"></div>
                    <div class="text-primary text-3xl">
                      <img src="/images/e8.png" alt="kbaj_kh" className="w-18 sm:w-12 md:w-16 rounded-xl bg-transparent mix-blend-multiply" />
                    </div>
                  </div>
                  <div class="flex flex-1 flex-col pb-6 pt-2">
                    <p class="text-text-light font-nokora text-[#7ca7d6] text-lg font-semibold leading-normal" >
                      ទទួលបដិសណ្ឋារកិច្ចភ្ញៀវកិត្តិយសពិសារ ភោជនាអាហារដោយមេត្រីភាព</p>
                    <p class="text-base text-[#9DB7D1] font-moul leading-normal">ម៉ោង ០៥ : ០០​ ល្ងាច </p>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-lg sm:text-xl text-center whitespace-nowrap font-moulpali text-[#447dbb] animate-slide-down bg-white/10 p-3 sm:p-4 rounded-lg">
              មានកិត្តិយសសូមគោរពអញ្ជើញ
            </h2>
            <p className="text-center leading-loose font-moulpali  text-[#7ca7d6] text-base sm:text-lg md:text-xl sm:mb-12 px-4">
              ឯកឧត្តម លោកជំទាវ អ្នកឧកញ៉ា ឧកញ៉ា​ លោក លោកស្រី​ អ្នកនាង កញ្ញា អញ្ជើញចូលរួមជាភ្ញៀវកិត្តិយសក្នុង
            </p>
            <p className="text-center leading-loose font-moul  text-[#447dbb] text-2xl sm:text-lg md:text-xl mt-3 sm:mb-12 px-4">
              ពិធីហែជំនូន
            </p>
            <p className="text-center leading-loose font-moul  text-[#7ca7d6] text-base sm:text-lg md:text-xl sm:mb-6 px-4">
              ថ្ងៃចន្ទ ទី​២៩ ខែធ្នូ ឆ្នាំ២០២៥ ម៉ោង ០៧:០០ នាទីព្រឹក នៅគេហដ្ឋានខាងស្រី​ ​ភូមិសំបូរ ឃុំសំបូរ ស្រុកសំបូរ ខេត្តក្រចេះ
            </p>
            {/* drees code */}

            <div className="w-full flex flex-col items-center px-4 py-3 bg-white/5">
              <div className="flex justify-center gap-2 py-4 px-4">
                <img src="/images/dress.png" alt="kbaj_kh" className="h-22 sm:w-12 md:w-16 rounded-xl bg-transparent mix-blend-multiply" />
                <img src="/images/suit.png" alt="kbaj_kh" className="h-22 sm:w-12 md:w-16 rounded-xl bg-transparent mix-blend-multiply" />
              </div>
              <h2 className="text-lg sm:text-2xl text-center whitespace-nowrap font-serif font-semibold tracking-wide text-[#447dbb] animate-slide-down bg-white/10 p-3 sm:p-4 rounded-lg">
                DRESS CODE
              </h2>
              <div className="flex justify-center gap-3 mt-2">
                <span className="w-10 h-10 rounded-full bg-[#7ca7d6]"></span>
                <span className="w-10 h-10 rounded-full bg-[#6b96c9]"></span>
                <span className="w-10 h-10 rounded-full bg-[#5a86bd]"></span>
                <span className="w-10 h-10 rounded-full bg-[#4977b1]"></span>
              </div>
            </div>

          </div>
        </div>
      </div>

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
        .mobile-contain: 'contain';
        
      `}</style>
    </div>
  );
}
