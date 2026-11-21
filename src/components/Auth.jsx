import React, { useState } from 'react';

/**
 * Ro'yxatdan o'tish va Tizimga kirish (Auth) komponenti
 * Ism, Familiya, Email va Parol kiritish
 */
export default function Auth({ onLogin }) {
  const [isLoginTab, setIsLoginTab] = useState(false); // false: Ro'yxatdan o'tish, true: Kirish
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validatsiyalar
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!isLoginTab) {
      // Ro'yxatdan o'tish tekshiruvlari
      if (!formData.firstName.trim() || formData.firstName.trim().length < 2) {
        setError("Iltimos, ismingizni to'liq kiriting (kamida 2 ta belgi).");
        return;
      }
      if (!formData.lastName.trim() || formData.lastName.trim().length < 2) {
        setError("Iltimos, familiyangizni to'liq kiriting (kamida 2 ta belgi).");
        return;
      }
      if (!emailRegex.test(formData.email.trim())) {
        setError("Iltimos, haqiqiy elektron pochta (email) manzilini kiriting.");
        return;
      }
      if (!formData.password || formData.password.length < 4) {
        setError("Parol kamida 4 ta belgidan iborat bo'lishi kerak.");
        return;
      }

      // Ro'yxatdan o'tgan foydalanuvchini saqlash
      const user = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        registeredAt: new Date().toLocaleDateString('uz-UZ'),
      };

      // Avvalgi ro'yxatdan o'tganlar ro'yxatiga qo'shish
      const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const userExists = existingUsers.some((u) => u.email === user.email);

      if (userExists) {
        setError("Ushbu email manzili bilan allaqachon ro'yxatdan o'tilgan. Tizimga kirish bo'limiga o'ting.");
        return;
      }

      existingUsers.push(user);
      localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));
      onLogin(user);
    } else {
      // Tizimga kirish tekshiruvlari
      if (!emailRegex.test(formData.email.trim())) {
        setError("Iltimos, haqiqiy elektron pochta (email) manzilini kiriting.");
        return;
      }
      if (!formData.password) {
        setError("Iltimos, parolingizni kiriting.");
        return;
      }

      const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const foundUser = existingUsers.find(
        (u) => u.email === formData.email.trim().toLowerCase() && u.password === formData.password
      );

      if (!foundUser) {
        setError("Email yoki parol noto'g'ri kiritildi. Qaytadan urinib ko'ring yoki ro'yxatdan o'ting.");
        return;
      }

      onLogin(foundUser);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 sm:p-8 shadow-sm transition-colors">
        {/* Yuqori logotip va sarlavha */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-blue-600 text-white font-bold text-xl flex items-center justify-center mx-auto mb-3 shadow-sm">
            T
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {isLoginTab ? "Tizimga kirish" : "Ro'yxatdan o'tish"}
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Test topshirish va natijalaringizni qayd etish uchun profilingizga kiring
          </p>
        </div>

        {/* Tab tugmalari: Ro'yxatdan o'tish / Kirish */}
        <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg mb-6">
          <button
            type="button"
            onClick={() => {
              setIsLoginTab(false);
              setError('');
            }}
            className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-md transition-all ${
              !isLoginTab
                ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Ro'yxatdan o'tish
          </button>
          <button
            type="button"
            onClick={() => {
              setIsLoginTab(true);
              setError('');
            }}
            className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-md transition-all ${
              isLoginTab
                ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Tizimga kirish
          </button>
        </div>

        {/* Xatolik xabari */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 rounded-lg text-xs sm:text-sm text-red-700 dark:text-red-300">
            {error}
          </div>
        )}

        {/* Forma */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLoginTab && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Ismingiz *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Ali"
                  className="w-full px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Familiyangiz *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Valiyev"
                  className="w-full px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Elektron pochta (Email) *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="foydalanuvchi@gmail.com"
              className="w-full px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Parol *
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm"
          >
            {isLoginTab ? "Tizimga kirish" : "Ro'yxatdan o'tish"}
          </button>
        </form>

        {/* Mehmon sifatida tezkor sinab ko'rish */}
        <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-800 text-center">
          <button
            type="button"
            onClick={() => {
              onLogin({
                firstName: "Mehmon",
                lastName: "Foydalanuvchi",
                email: "mehmon@test.uz",
                registeredAt: new Date().toLocaleDateString('uz-UZ'),
              });
            }}
            className="text-xs text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Mehmon sifatida davom etish &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
