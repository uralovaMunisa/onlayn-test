import React, { useState } from 'react';
import QuestionNav from './QuestionNav';

/**
 * Test jarayoni sahifasi (Test)
 * - Light va Night (Dark) rejimlariga to'liq moslangan
 * - Bir vaqtda 1 ta savol
 * - 4 ta variant (A, B, C, D)
 * - Navigatsiya va tasdiqlash oynasi
 */
export default function Test({ subject, questions, onFinishTest, onBack }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const totalQuestions = questions.length;
  const currentQuestion = questions[currentIndex];
  const optionLetters = ['A', 'B', 'C', 'D'];

  // Nechta savolga javob berilganligini hisoblash
  const answeredCount = Object.keys(userAnswers).length;
  const unansweredCount = totalQuestions - answeredCount;
  const progressPercentage = Math.round((answeredCount / totalQuestions) * 100);

  // Javobni tanlash yoki o'zgartirish
  const handleSelectOption = (optIndex) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentIndex]: optIndex,
    }));
  };

  // Oldingi savol
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Keyingi savol
  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  // Yakunlash tugmasi bosilganda
  const handleFinishClick = () => {
    if (unansweredCount > 0) {
      setShowConfirmModal(true);
    } else {
      onFinishTest(userAnswers);
    }
  };

  // Modal orqali yakunlashni tasdiqlash
  const handleConfirmFinish = () => {
    setShowConfirmModal(false);
    onFinishTest(userAnswers);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Yuqori panel: Fan nomi va Progress bar */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-5 mb-6 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div>
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
              {subject}
            </span>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Savol {currentIndex + 1} / {totalQuestions}
            </h2>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
            Javob berildi: <span className="text-blue-600 dark:text-blue-400 font-semibold">{answeredCount}</span> / {totalQuestions}
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Asosiy blok: Savol va QuestionNav */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Chap tomon: Savol va variantlar */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 sm:p-8 transition-colors">
          <div className="mb-6">
            <span className="inline-block text-xs font-bold text-gray-400 dark:text-gray-500 mb-2">
              SAVOL № {currentIndex + 1}
            </span>
            <h3 className="text-lg sm:text-xl font-medium text-gray-900 dark:text-white leading-relaxed">
              {currentQuestion.q}
            </h3>
          </div>

          {/* Variantlar ro'yxati (A, B, C, D) */}
          <div className="space-y-3 mb-8">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = userAnswers[currentIndex] === idx;

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full text-left p-4 rounded-lg border text-sm sm:text-base flex items-center gap-3.5 transition-all ${
                    isSelected
                      ? 'border-blue-600 dark:border-blue-500 bg-blue-50/70 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 font-medium ring-1 ring-blue-600'
                      : 'border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/60 hover:border-gray-300 dark:hover:border-gray-700'
                  }`}
                >
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700'
                    }`}
                  >
                    {optionLetters[idx]}
                  </span>
                  <span className="leading-snug">{option}</span>
                </button>
              );
            })}
          </div>

          {/* Pastki navigatsiya tugmalari: Oldingi / Keyingi / Yakunlash */}
          <div className="flex items-center justify-between pt-5 border-t border-gray-100 dark:border-gray-800 gap-3">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition ${
                currentIndex === 0
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              &larr; Oldingi
            </button>

            {currentIndex === totalQuestions - 1 ? (
              <button
                type="button"
                onClick={handleFinishClick}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm"
              >
                Yakunlash
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className="px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm"
              >
                Keyingi &rarr;
              </button>
            )}
          </div>
        </div>

        {/* O'ng tomon: QuestionNav (1-19 tugmalar) */}
        <div className="lg:col-span-1 space-y-4">
          <QuestionNav
            totalQuestions={totalQuestions}
            currentIndex={currentIndex}
            userAnswers={userAnswers}
            onSelectQuestion={(idx) => setCurrentIndex(idx)}
          />

          <button
            type="button"
            onClick={handleFinishClick}
            className="w-full py-2.5 px-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 transition text-center"
          >
            Testni yakunlash
          </button>
        </div>
      </div>

      {/* Javobsiz savollar qolganda tasdiqlash modali */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 max-w-md w-full shadow-xl">
            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              Testni yakunlaysizmi?
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
              Hali <strong className="text-red-600 dark:text-red-400 font-semibold">{unansweredCount} ta</strong> savolga javob bermadingiz. Baribir yakunlaysizmi? (Javob berilmagan savollar xato hisoblanadi).
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              >
                Bekor qilish
              </button>
              <button
                type="button"
                onClick={handleConfirmFinish}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition shadow-sm"
              >
                Ha, yakunlash
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
