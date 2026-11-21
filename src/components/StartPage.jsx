import React from 'react';

/**
 * Boshlash sahifasi (StartPage)
 * Fan nomi, foydalanuvchi ma'lumoti, savollar soni va qoidalar
 */
export default function StartPage({ subject, user, questionCount, onStartTest, onBack }) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-8 shadow-sm transition-colors">
        {/* Fan sarlavhasi */}
        <div className="border-b border-gray-100 dark:border-gray-800 pb-5 mb-6">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs uppercase tracking-wider font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2.5 py-1 rounded">
              Tanlangan fan
            </span>
            {user && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Topshiruvchi: <strong className="text-gray-700 dark:text-gray-300">{user.firstName} {user.lastName}</strong>
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-2">
            {subject}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Savollar soni: <strong className="text-gray-800 dark:text-gray-200">{questionCount} ta</strong>
          </p>
        </div>

        {/* Qisqa yo'riqnoma */}
        <div className="space-y-4 mb-8">
          <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200">
            Test topshirish qoidalari va yo'riqnoma:
          </h2>
          <ul className="space-y-2.5 text-sm text-gray-600 dark:text-gray-400">
            <li className="flex items-start gap-2.5">
              <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
              <span><strong className="text-gray-800 dark:text-gray-200">Har bir savolda bitta to'g'ri javob bor.</strong></span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
              <span>Har gal test boshlanganda savollarning variantlari tasodifiy aralashtiriladi.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
              <span>Test yakunlangunga qadar istalgan savolga qaytish va javobingizni o'zgartirish mumkin.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
              <span>Javob berilmagan savollar yakunda xato javob sifatida hisoblanadi.</span>
            </li>
          </ul>
        </div>

        {/* Boshqaruv tugmalari */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
          <button
            type="button"
            onClick={onStartTest}
            className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-center shadow-sm"
          >
            Testni boshlash
          </button>
          <button
            type="button"
            onClick={onBack}
            className="w-full sm:w-auto px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 text-center"
          >
            Orqaga
          </button>
        </div>
      </div>
    </div>
  );
}
