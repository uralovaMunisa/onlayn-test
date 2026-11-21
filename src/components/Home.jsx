import React from 'react';

/**
 * Bosh sahifa: Fanlar ro'yxati (Grid ko'rinishida)
 * Light va Night (Dark) rejimlariga to'liq moslangan
 */
export default function Home({ subjects, user, onSelectSubject }) {
  const subjectIcons = {
    "Matematika": "📐",
    "Fizika": "⚡",
    "Kimyo": "🧪",
    "Biologiya": "🌿",
    "Tarix": "🏛️",
    "Geografiya": "🌍",
    "Ona tili va adabiyot": "📚",
    "Ingliz tili": "🇬🇧",
    "Informatika": "💻",
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Foydalanuvchini qutlash va kirish qismi */}
      <div className="text-center mb-10">
        {user && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs sm:text-sm font-medium mb-3">
            <span>👋 Assalomu alaykum, <strong>{user.firstName} {user.lastName}</strong>!</span>
          </div>
        )}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
          Onlayn test
        </h1>
        <p className="mt-2 text-base text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
          Bilimingizni sinash uchun kerakli fanni tanlang. Har bir testda 19 ta savol beriladi.
        </p>
      </div>

      {/* Fanlar kartochkalari gridi */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {subjects.map((subject) => (
          <div
            key={subject}
            onClick={() => onSelectSubject(subject)}
            className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:border-blue-600 dark:hover:border-blue-500 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-2xl flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <span>{subjectIcons[subject] || "📝"}</span>
              </div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {subject}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                19 ta savol • 4 ta variant
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-sm font-medium text-blue-600 dark:text-blue-400">
              <span>Testni tanlash</span>
              <span className="transform group-hover:translate-x-1 transition-transform">
                &rarr;
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
