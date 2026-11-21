import React from 'react';

/**
 * Natija sahifasi (Result)
 * - Light va Night (Dark) rejimlariga to'liq moslangan
 * - Foydalanuvchi ma'lumotlari: Ism, Familiya, Email
 * - Jami, to'g'ri, xato savollar, foiz va baho
 * - "Xatolarni ko'rish" bo'limi
 * - "Qayta topshirish" va "Fanlar ro'yxatiga qaytish"
 */
export default function Result({
  subject,
  user,
  questions,
  userAnswers,
  onRetakeTest,
  onBackToHome,
}) {
  const total = questions.length; // 19 ta

  // To'g'ri javoblar sonini hisoblash
  let correctCount = 0;
  questions.forEach((q, idx) => {
    if (userAnswers[idx] !== undefined && userAnswers[idx] === q.answer) {
      correctCount++;
    }
  });

  const incorrectCount = total - correctCount;
  const percentage = Math.round((correctCount / total) * 100);

  // Bahoni hisoblash qoidasi
  let grade = "Qoniqarsiz";
  let gradeBadgeColor = "bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border-red-200 dark:border-red-900";

  if (percentage >= 86) {
    grade = "A'lo";
    gradeBadgeColor = "bg-green-50 dark:bg-green-950/40 text-green-700 dark:text-green-300 border-green-200 dark:border-green-900";
  } else if (percentage >= 70) {
    grade = "Yaxshi";
    gradeBadgeColor = "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-900";
  } else if (percentage >= 56) {
    grade = "Qoniqarli";
    gradeBadgeColor = "bg-yellow-50 dark:bg-yellow-950/40 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-900";
  }

  // Xato qilingan yoki javob berilmagan savollar ro'yxati
  const wrongQuestions = questions
    .map((q, idx) => ({
      questionIndex: idx,
      question: q,
      userAnswerIndex: userAnswers[idx],
      isCorrect: userAnswers[idx] !== undefined && userAnswers[idx] === q.answer,
    }))
    .filter((item) => !item.isCorrect);

  const optionLetters = ['A', 'B', 'C', 'D'];

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Natijalar xulosasi kartochkasi */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 sm:p-8 mb-8 transition-colors">
        <div className="text-center pb-6 border-b border-gray-100 dark:border-gray-800">
          <span className="text-xs uppercase tracking-wider font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2.5 py-1 rounded">
            Test yakunlandi
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-2">
            {subject} bo'yicha natijangiz
          </h1>

          {/* Foydalanuvchi ma'lumotlari kartasi */}
          {user && (
            <div className="mt-3 inline-flex flex-col sm:flex-row items-center gap-1 sm:gap-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              <span>Topshiruvchi: <strong className="text-gray-900 dark:text-white">{user.firstName} {user.lastName}</strong></span>
              <span className="hidden sm:inline">•</span>
              <span>Email: <strong className="text-gray-900 dark:text-white">{user.email}</strong></span>
            </div>
          )}
        </div>

        {/* Asosiy ko'rsatkichlar gridi */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6">
          <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-800 rounded-lg p-4 text-center">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium block">Jami savollar</span>
            <span className="text-2xl font-bold text-gray-800 dark:text-gray-100">{total}</span>
          </div>

          <div className="bg-green-50/50 dark:bg-green-950/20 border border-green-200 dark:border-green-900/60 rounded-lg p-4 text-center">
            <span className="text-xs text-green-700 dark:text-green-400 font-medium block">To'g'ri javoblar</span>
            <span className="text-2xl font-bold text-green-600 dark:text-green-400">{correctCount}</span>
          </div>

          <div className="bg-red-50/50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/60 rounded-lg p-4 text-center">
            <span className="text-xs text-red-700 dark:text-red-400 font-medium block">Xato javoblar</span>
            <span className="text-2xl font-bold text-red-600 dark:text-red-400">{incorrectCount}</span>
          </div>

          <div className="bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/60 rounded-lg p-4 text-center">
            <span className="text-xs text-blue-700 dark:text-blue-400 font-medium block">Foiz ko'rsatkichi</span>
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{percentage}%</span>
          </div>
        </div>

        {/* Baho ko'rsatkichi */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-800 rounded-lg gap-3">
          <div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Yakuniy bahongiz:</span>
            <span className="text-base font-bold text-gray-900 dark:text-white ml-2">{grade}</span>
          </div>
          <div className={`px-4 py-1.5 rounded-full border text-sm font-semibold ${gradeBadgeColor}`}>
            Baho: {grade} ({percentage}%)
          </div>
        </div>

        {/* Tugmalar */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
          <button
            type="button"
            onClick={onRetakeTest}
            className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition text-center shadow-sm"
          >
            Qayta topshirish
          </button>
          <button
            type="button"
            onClick={onBackToHome}
            className="w-full sm:w-auto px-6 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition text-center"
          >
            Fanlar ro'yxatiga qaytish
          </button>
        </div>
      </div>

      {/* Xatolarni ko'rish bo'limi */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 sm:p-8 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-gray-100 dark:border-gray-800 mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Xatolarni ko'rish
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {wrongQuestions.length > 0
                ? `${wrongQuestions.length} ta savolda xatolik mavjud:`
                : "Barcha savollarga to'g'ri javob berildi!"}
            </p>
          </div>
        </div>

        {wrongQuestions.length === 0 ? (
          <div className="p-6 bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-900 rounded-lg text-center text-green-800 dark:text-green-300 font-medium">
            Tabriklaymiz! Siz birorta ham xato qilmadingiz. Natijangiz 100%!
          </div>
        ) : (
          <div className="space-y-6">
            {wrongQuestions.map((item, i) => {
              const q = item.question;
              const hasAnswered = item.userAnswerIndex !== undefined && item.userAnswerIndex !== null;
              const userOptText = hasAnswered
                ? `${optionLetters[item.userAnswerIndex]}) ${q.options[item.userAnswerIndex]}`
                : "Javob berilmagan";
              const correctOptText = `${optionLetters[q.answer]}) ${q.options[q.answer]}`;

              return (
                <div
                  key={i}
                  className="p-5 border border-gray-200 dark:border-gray-800 rounded-lg bg-gray-50/50 dark:bg-gray-800/40 space-y-3"
                >
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-sm text-gray-500 dark:text-gray-400">
                      {item.questionIndex + 1}.
                    </span>
                    <h3 className="text-base font-medium text-gray-900 dark:text-white">
                      {q.q}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm">
                    {/* Foydalanuvchi javobi (qizil) */}
                    <div className="p-3 rounded-lg border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/40 text-red-800 dark:text-red-300">
                      <span className="text-xs font-semibold block text-red-600 dark:text-red-400 mb-1">
                        Sizning javobingiz:
                      </span>
                      <span className="font-medium">{userOptText}</span>
                    </div>

                    {/* To'g'ri javob (yashil) */}
                    <div className="p-3 rounded-lg border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950/40 text-green-800 dark:text-green-300">
                      <span className="text-xs font-semibold block text-green-700 dark:text-green-400 mb-1">
                        To'g'ri javob:
                      </span>
                      <span className="font-medium">{correctOptText}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
