import React, { useState, useMemo, useEffect } from 'react';
import { questionsData } from './data/questions';
import Home from './components/Home';
import StartPage from './components/StartPage';
import Test from './components/Test';
import Result from './components/Result';
import Auth from './components/Auth';

/**
 * Fisher-Yates algoritmi orqali variantlarni aralashtirish funksiyasi.
 * To'g'ri javob indeksi yangi joylashuvga mos ravishda qayta hisoblanadi.
 */
function shuffleQuestions(questionsList) {
  return questionsList.map((item) => {
    const correctAnswerText = item.options[item.answer];
    const shuffled = [...item.options];

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    const newAnswerIndex = shuffled.indexOf(correctAnswerText);

    return {
      q: item.q,
      options: shuffled,
      answer: newAnswerIndex,
    };
  });
}

export default function App() {
  // Foydalanuvchi ma'lumotlari (Ism, Familiya, Email)
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : null;
  });

  // Light / Night (Dark) rejim holati
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('app_theme');
    if (savedTheme) return savedTheme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Sahifalar holati: "home" | "start" | "test" | "result"
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [activeQuestions, setActiveQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});

  // Theme o'zgarganda html tegiga dark classini qo'shish/o'chirish
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('app_theme', theme);
  }, [theme]);

  // Rejimni almashtirish funksiyasi (Light / Night)
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Foydalanuvchi tizimga kirganda / ro'yxatdan o'tganda
  const handleLogin = (user) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  // Tizimdan chiqish (Logout)
  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    setCurrentPage('home');
    setSelectedSubject(null);
    setActiveQuestions([]);
    setUserAnswers({});
  };

  // Fanlar ro'yxati
  const subjects = useMemo(() => Object.keys(questionsData), []);

  // Fan tanlanganda StartPage ga o'tish
  const handleSelectSubject = (subject) => {
    setSelectedSubject(subject);
    setCurrentPage('start');
  };

  // Testni boshlash (variantlarni aralashtirish)
  const handleStartTest = () => {
    if (!selectedSubject || !questionsData[selectedSubject]) return;
    const shuffled = shuffleQuestions(questionsData[selectedSubject]);
    setActiveQuestions(shuffled);
    setUserAnswers({});
    setCurrentPage('test');
  };

  // Testni yakunlash
  const handleFinishTest = (answers) => {
    setUserAnswers(answers);
    setCurrentPage('result');
  };

  // Qayta topshirish
  const handleRetakeTest = () => {
    if (!selectedSubject || !questionsData[selectedSubject]) return;
    const shuffled = shuffleQuestions(questionsData[selectedSubject]);
    setActiveQuestions(shuffled);
    setUserAnswers({});
    setCurrentPage('test');
  };

  // Bosh sahifaga qaytish
  const handleBackToHome = () => {
    setSelectedSubject(null);
    setActiveQuestions([]);
    setUserAnswers({});
    setCurrentPage('home');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col font-sans transition-colors duration-200">
      {/* Sarlavha paneli (Header) */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30 transition-colors">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <div
            onClick={handleBackToHome}
            className="flex items-center gap-2 cursor-pointer select-none"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-base shadow-sm">
              T
            </div>
            <span className="font-bold text-lg text-gray-900 dark:text-white tracking-tight">
              Onlayn Test
            </span>
          </div>

          {/* O'ng tomon: Fan, Theme toggle (Light/Night) va Foydalanuvchi */}
          <div className="flex items-center gap-2 sm:gap-4">
            {selectedSubject && currentPage !== 'home' && (
              <span className="hidden md:inline-block text-xs font-semibold px-2.5 py-1 rounded bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                {selectedSubject}
              </span>
            )}

            {/* Light / Night (Tungi rejim) almashtirish tugmasi */}
            <button
              type="button"
              onClick={toggleTheme}
              title={theme === 'dark' ? "Kunduzgi rejimga o'tish" : "Tungi rejimga o'tish"}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition flex items-center gap-1.5 text-xs font-medium"
            >
              {theme === 'dark' ? (
                <>
                  <span className="text-base">☀️</span>
                  <span className="hidden sm:inline">Kunduzgi</span>
                </>
              ) : (
                <>
                  <span className="text-base">🌙</span>
                  <span className="hidden sm:inline">Tungi</span>
                </>
              )}
            </button>

            {/* Foydalanuvchi profili va Chiqish tugmasi */}
            {currentUser && (
              <div className="flex items-center gap-2 pl-2 border-l border-gray-200 dark:border-gray-800">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold text-xs flex items-center justify-center border border-blue-300 dark:border-blue-800">
                  {currentUser.firstName?.[0]?.toUpperCase() || "F"}
                </div>
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-xs font-bold text-gray-900 dark:text-white leading-tight">
                    {currentUser.firstName} {currentUser.lastName}
                  </span>
                  <span className="text-[10px] text-gray-500 dark:text-gray-400 leading-tight">
                    {currentUser.email}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  title="Tizimdan chiqish"
                  className="ml-1 text-xs text-red-600 dark:text-red-400 hover:underline p-1"
                >
                  Chiqish
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Asosiy qism */}
      <main className="flex-1">
        {/* Agar foydalanuvchi hali kirmagan bo'lsa: Ro'yxatdan o'tish / Kirish sahifasi ko'rsatiladi */}
        {!currentUser ? (
          <Auth onLogin={handleLogin} />
        ) : (
          <>
            {currentPage === 'home' && (
              <Home
                subjects={subjects}
                user={currentUser}
                onSelectSubject={handleSelectSubject}
              />
            )}

            {currentPage === 'start' && selectedSubject && (
              <StartPage
                subject={selectedSubject}
                user={currentUser}
                questionCount={questionsData[selectedSubject]?.length || 19}
                onStartTest={handleStartTest}
                onBack={handleBackToHome}
              />
            )}

            {currentPage === 'test' && selectedSubject && (
              <Test
                subject={selectedSubject}
                questions={activeQuestions}
                onFinishTest={handleFinishTest}
                onBack={handleBackToHome}
              />
            )}

            {currentPage === 'result' && selectedSubject && (
              <Result
                subject={selectedSubject}
                user={currentUser}
                questions={activeQuestions}
                userAnswers={userAnswers}
                onRetakeTest={handleRetakeTest}
                onBackToHome={handleBackToHome}
              />
            )}
          </>
        )}
      </main>

      {/* Pastki panel (Footer) */}
      <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 py-4 text-center text-xs text-gray-500 dark:text-gray-400 transition-colors">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Onlayn Test Tizimi • Vite + React + Tailwind CSS</span>
          <span>Light & Night rejim qo'llab-quvvatlanadi</span>
        </div>
      </footer>
    </div>
  );
}
