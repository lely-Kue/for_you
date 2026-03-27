import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Lock, Unlock, Music, Play, Sparkles, Star } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import ReactPlayer from 'react-player';

// ─── Starry Night Background ───────────────────────────────────────────────
const stars = [...Array(150)].map((_, i) => ({
  id: i,
  size: Math.random() * 2 + 1,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  duration: Math.random() * 3 + 2,
  delay: Math.random() * 5,
}));

const StarryNight = () => (
  <div className="fixed inset-0 bg-[#020617] overflow-hidden pointer-events-none z-0">
    {stars.map((star) => (
      <motion.div
        key={star.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.2, 1, 0.2] }}
        transition={{ duration: star.duration, repeat: Infinity, delay: star.delay, ease: 'easeInOut' }}
        className="absolute bg-white rounded-full"
        style={{ width: star.size, height: star.size, top: star.top, left: star.left, boxShadow: '0 0 6px white' }}
      />
    ))}
    {/* Shooting star */}
    <motion.div
      initial={{ x: '-10vw', y: '10vh', opacity: 0 }}
      animate={{ x: '110vw', y: '80vh', opacity: [0, 1, 0] }}
      transition={{ duration: 3, repeat: Infinity, repeatDelay: 8, ease: 'linear' }}
      className="absolute w-32 h-px bg-gradient-to-r from-transparent via-white to-transparent -rotate-12"
    />
    {/* Ambient glow */}
    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/15 rounded-full blur-3xl pointer-events-none" />
  </div>
);

// ─── Typewriter Text ────────────────────────────────────────────────────────
const TypewriterText = ({ text, segmentKey }: { text: string; segmentKey: number }) => (
  <motion.p
    key={segmentKey}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="text-base md:text-lg text-blue-50/90 leading-relaxed font-medium whitespace-pre-wrap"
  >
    {text.split('').map((char, index) => (
      <motion.span
        key={index}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.02, delay: index * 0.025 }}
      >
        {char}
      </motion.span>
    ))}
  </motion.p>
);

// ─── Floating Hearts Decoration ─────────────────────────────────────────────
const FloatingHearts = () => (
  <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute"
        style={{ left: `${10 + i * 12}%`, bottom: '-50px' }}
        animate={{ y: [0, -window.innerHeight - 100], opacity: [0, 0.6, 0] }}
        transition={{
          duration: 6 + i * 0.8,
          repeat: Infinity,
          delay: i * 1.4,
          ease: 'easeInOut',
        }}
      >
        <Heart className="text-blue-500/30 fill-blue-500/20" size={14 + (i % 3) * 6} />
      </motion.div>
    ))}
  </div>
);

// ─── Message Segments ───────────────────────────────────────────────────────
const messageSegments = [
  {
    text: "Happy 22nd Birthday, Moyo❤️\n\nToday the world celebrates the day you were born, but for me, today is so much more than just your birthday. It is the celebration of the person who walked into my life and quietly became my safe place, my happiness, and one of the greatest blessings I have ever known.",
    photo: "/pictures/IMG-20241107-WA0101.jpg",
    caption: "The beginning of everything ✨"
  },
  {
    text: "Just a few weeks ago, on the 14th of March, we celebrated our first 365 days together — one whole year of laughter, growth, learning each other, choosing each other, and building something that feels real and rare. When I look back at that year, I realize how many memories we have already created, and it amazes me how naturally you became such an important part of my life.",
    photo: "/pictures/WhatsApp Image 2026-03-17 at 5.42.36 AM.jpeg",
    caption: "365 days & counting 💫"
  },
  {
    text: "You have seen sides of me that many people never understand — my sensitive moments, my overthinking, my soft heart — and instead of judging me, you embraced me every single time. You never made me feel like I was \"too much.\" Instead, you made me feel understood, protected, and accepted exactly as I am.\n\nThank you for being patient with me, for being gentle with my emotions, and for loving me in ways that heal parts of me I didn't even know needed healing.",
    photo: "/pictures/IMG-20250520-WA0047.jpg",
    caption: "You saw me, truly 🌙"
  },
  {
    text: "Your selflessness is something I admire deeply. You give so much of yourself without expecting anything back, and sometimes I wonder if you truly realize how special that makes you. You show up, you care, you listen, and you love with a quiet strength that makes me feel secure in ways words can barely explain.",
    photo: "/pictures/WhatsApp Image 2026-03-26 at 5.22.44 AM.jpeg",
    caption: "Your quiet strength 💪🏽"
  },
  {
    text: "I want you to always remember this — you can count on me. Always.\n\nIn your good days, your confusing days, your tired days, and even the days when you feel unsure of yourself. I am here to stand beside you, to support you, to encourage you, and to remind you of your worth whenever you forget it.",
    photo: "/pictures/WhatsApp Image 2026-03-17 at 5.44.27 AM.jpeg",
    caption: "Always, I promise 🤞🏽"
  },
  {
    text: "I look forward to all the moments that are still waiting for us — the dates we haven't gone on yet, the random adventures, the laughter we haven't shared, and the memories we are still going to create.\n\nI imagine us traveling together, discovering new places hand in hand, and yes… one day taking that Jamaica trip together, watching sunsets and laughing about how far we've come.\n\nYou are not just my boyfriend — you are my partner, my comfort, my best friend, and someone I genuinely want beside me through life's journey.\n\nI want you here always. I want to keep growing with you, learning with you, and choosing you again and again, every single day.\n\nas you turn 22 today, my biggest wish for you is a life overflowing with blessings. I pray for your health in abundance — strong body, peaceful mind, and a heart that continues to shine the way it does now.\n\nI pray for success to follow you everywhere you go, for opportunities that open doors you never imagined, and yes, for financial abundance too — because you deserve a life where your hard work rewards you.",
    photo: "/pictures/WhatsApp Image 2026-03-17 at 5.44.30 AM.jpeg",
    caption: "Our future adventures 🌅"
  },

  {
    text: "Never forget how loved you are. Never doubt how much you mean to me.\n\nHappy 22nd Birthday, bhangu. ❤️\n\nHere's to more years, more memories\n\n\n\n\nNdokudai moyo. 🖤",
    photo: "/pictures/WhatsApp Image 2026-03-17 at 5.42.33 AM.jpeg",
    caption: "You changed everything 🌹"
  },

];

// ─── Main App ────────────────────────────────────────────────────────────────
type AppState = 'locked' | 'loading' | 'cinematic';

export default function BirthdaySurprise() {
  const [appState, setAppState] = useState<AppState>('locked');
  const [password, setPassword] = useState('');
  const [currentSegment, setCurrentSegment] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const SECRET = 'moyo';

  const handleUnlock = () => {
    if (password.toLowerCase().trim() === SECRET) {
      setAppState('loading');
      toast.success("Welcome,Bhangu! ❤️");
    } else {
      toast.error("Incorrect secret word. Try again! 🔒");
      const el = document.getElementById('secret-input');
      el?.classList.add('shake');
      setTimeout(() => el?.classList.remove('shake'), 500);
    }
  };

  const startCinematic = () => {
    setAppState('cinematic');
    setIsPlaying(true);
  };

  const nextSegment = () => {
    if (currentSegment < messageSegments.length - 1) setCurrentSegment(p => p + 1);
  };
  const prevSegment = () => {
    if (currentSegment > 0) setCurrentSegment(p => p - 1);
  };

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
  };

  // Auto-scroll text area on segment change
  useEffect(() => {
    document.getElementById('letter-scroll')?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentSegment]);

  // ── Locked Screen ──
  if (appState === 'locked') {
    return (
      <>
        <Toaster richColors position="top-center" />
        <div className="min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden relative">
          <StarryNight />
          <FloatingHearts />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative z-10 w-full max-w-md"
          >
            {/* Glow ring */}
            <div className="absolute -inset-1 bg-gradient-to-br from-blue-600/30 to-cyan-500/10 rounded-3xl blur-xl" />

            <div className="relative bg-white/5 backdrop-blur-2xl p-10 rounded-3xl shadow-2xl border border-white/10 text-center">
              {/* Icon */}
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-7 border border-blue-500/30"
              >
                <Lock className="text-blue-400" size={32} />
              </motion.div>

              <h1 className="text-3xl font-bold text-white mb-1 tracking-tight">Private Access</h1>
              <p className="text-gray-400 mb-9 text-sm">This page is reserved for someone very special 🌙</p>

              <div className="space-y-4">
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-2xl px-4 h-14 focus-within:border-blue-500/50 transition-all">
                  <Unlock className="text-blue-400/60 shrink-0" size={18} />
                  <input
                    id="secret-input"
                    type="password"
                    placeholder="Enter secret word..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
                    className="flex-1 bg-transparent text-white placeholder:text-gray-500 outline-none text-base"
                    autoComplete="off"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleUnlock}
                  className="w-full h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-base shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all"
                >
                  Unlock Surprise 🎁
                </motion.button>
              </div>

              {/* hint hearts */}
              <div className="flex justify-center gap-2 mt-8">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, delay: i * 0.3, repeat: Infinity }}
                  >
                    <Heart className="text-blue-500/60 fill-blue-500/30" size={12} />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <style>{`.shake { animation: shake 0.4s ease; } @keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-8px)} 75%{transform:translateX(8px)} }`}</style>
      </>
    );
  }

  // ── Loading Screen ──
  if (appState === 'loading') {
    return (
      <>
        <Toaster richColors position="top-center" />
        <div className="min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden relative text-center">
          <StarryNight />
          <FloatingHearts />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="z-10 max-w-lg mx-auto"
          >
            <motion.div
              animate={{ scale: [1, 1.15, 1], rotate: [0, 8, -8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity }}
              className="mb-8 inline-block"
            >
              <Sparkles className="text-yellow-400" size={64} />
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-200 to-blue-300 mb-5 leading-tight">
              Something special<br />is waiting...
            </h2>

            <p className="text-gray-400 mb-12 text-base max-w-xs mx-auto leading-relaxed">
              Get comfortable, maybe grab some tissues, and click when you're ready 🌙
            </p>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={startCinematic}
              className="h-16 px-12 rounded-full bg-white text-black font-bold text-xl shadow-[0_0_40px_rgba(255,255,255,0.25)] hover:bg-blue-50 transition-all"
            >
              Open Your Letter 💌
            </motion.button>

            {/* music note */}
            <p className="mt-8 text-gray-600 text-xs uppercase tracking-widest">
              🎵 Turn on your volume for the full experience
            </p>
          </motion.div>
        </div>
      </>
    );
  }

  // ── Cinematic Screen ──
  const seg = messageSegments[currentSegment];
  const isLast = currentSegment === messageSegments.length - 1;

  return (
    <>
      <Toaster richColors position="top-center" />
      <div className="min-h-screen bg-[#020617] text-white relative overflow-hidden">
        <StarryNight />
        <FloatingHearts />

        {/* Background audio from YouTube (hidden) */}
        <div className="hidden">
          <ReactPlayer 
            url="https://www.youtube.com/watch?v=ShZ978fBl6Y"
            playing={isPlaying}
            loop={true}
            volume={0.7}
          />
        </div>

        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-16">
          <div className="w-full max-w-6xl">
            {/* Chapter badge */}
            <motion.div
              key={currentSegment + '-badge'}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-3 mb-10"
            >
              <div className="h-px flex-1 max-w-[80px] bg-white/10" />
              <span className="text-blue-300/80 font-semibold uppercase tracking-[0.2em] text-xs">
                Chapter {currentSegment + 1} of {messageSegments.length}
              </span>
              <div className="h-px flex-1 max-w-[80px] bg-white/10" />
            </motion.div>

            {/* Main grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start">

              {/* ── Photo ── */}
              <div className="flex justify-center order-2 lg:order-1">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSegment + '-photo'}
                    initial={{ opacity: 0, scale: 0.88, rotate: -4 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 1.06, rotate: 3 }}
                    transition={{ duration: 0.75, ease: 'easeInOut' }}
                    className="relative w-full max-w-sm"
                  >
                    {/* Card glow */}
                    <div className="absolute -inset-3 bg-gradient-to-b from-blue-600/20 to-cyan-500/5 rounded-3xl blur-2xl" />

                    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border-2 border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.6)]">
                      <img
                        src={seg.photo}
                        alt="Memory"
                        className="w-full h-full object-cover"
                      />
                      {/* Vintage overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                      {/* Caption */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="absolute bottom-0 left-0 right-0 p-5"
                      >
                        <p className="text-white/80 text-sm font-medium tracking-wide">{seg.caption}</p>
                        <div className="flex gap-1.5 mt-2">
                          {[...Array(3)].map((_, i) => (
                            <Heart key={i} className="text-blue-400 fill-blue-400" size={14} />
                          ))}
                        </div>
                      </motion.div>

                      {/* Corner stars */}
                      <div className="absolute top-3 right-3">
                        <Star className="text-yellow-300/70 fill-yellow-300/50" size={16} />
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* ── Letter ── */}
              <div className="order-1 lg:order-2 flex flex-col">
                {/* Card */}
                <div className="relative bg-white/[0.04] backdrop-blur-xl rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden">
                  {/* Top accent line */}
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

                  <div className="p-8 md:p-10">
                    {/* Letter header */}
                    <div className="flex items-center gap-3 mb-7">
                      <div className="p-2.5 bg-yellow-500/20 rounded-xl border border-yellow-500/20">
                        <Star className="text-yellow-400 fill-yellow-400" size={18} />
                      </div>
                      <div>
                        <p className="text-xs text-blue-300/60 uppercase tracking-widest font-medium">A letter for you</p>
                        <p className="text-white/50 text-xs">From: The one who loves you most</p>
                      </div>
                    </div>

                    {/* Text area */}
                    <div
                      id="letter-scroll"
                      className="min-h-[280px] max-h-[320px] overflow-y-auto pr-1 scrollbar-hide"
                      style={{ scrollbarWidth: 'none' }}
                    >
                      <AnimatePresence mode="wait">
                        <TypewriterText key={currentSegment} text={seg.text} segmentKey={currentSegment} />
                      </AnimatePresence>
                    </div>

                    {/* Progress dots */}
                    <div className="flex items-center gap-1.5 mt-8 mb-6">
                      {messageSegments.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentSegment(i)}
                          className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${i === currentSegment
                            ? 'w-8 bg-blue-500'
                            : i < currentSegment
                              ? 'w-2 bg-blue-900'
                              : 'w-2 bg-white/15'
                            }`}
                        />
                      ))}
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center justify-between pt-5 border-t border-white/8">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={prevSegment}
                        disabled={currentSegment === 0}
                        className="text-gray-400 hover:text-white disabled:opacity-20 text-sm font-medium transition-colors px-4 py-2 rounded-xl hover:bg-white/5"
                      >
                        ← Back
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={isLast ? undefined : nextSegment}
                        disabled={isLast}
                        className={`px-8 py-2.5 rounded-full font-bold text-sm transition-all shadow-lg ${isLast
                          ? 'bg-blue-500/30 text-blue-200 cursor-default border border-blue-500/30'
                          : 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-blue-900/40 hover:shadow-blue-500/30'
                          }`}
                      >
                        {isLast ? 'With all my love ❤️' : 'Continue →'}
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 text-gray-600 text-[10px] uppercase tracking-[0.25em] pointer-events-none z-10">
          Scrapbook of 2025 – 2026 ✨
        </div>

        {/* Music toggle */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleAudio}
          title={isPlaying ? 'Pause music' : 'Play music'}
          className="fixed bottom-8 right-8 p-4 bg-white/8 backdrop-blur-md rounded-full border border-white/15 text-white hover:bg-white/15 transition-all z-50 shadow-lg"
        >
          <AnimatePresence mode="wait">
            {isPlaying ? (
              <motion.div key="music" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                <Music size={22} className="animate-pulse text-blue-400" />
              </motion.div>
            ) : (
              <motion.div key="play" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                <Play size={22} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </>
  );
}
