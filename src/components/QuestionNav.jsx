import React from 'react';

/**
 * QuestionNav komponenti: 1 dan 19 gacha savollar navigatsiyasi
 * - Javob berilganlar: ko'k (bg-blue-600)
 * - Joriy savol: qalin ramka (ring-2 ring-blue-600 ring-offset-2)
 * - Javob berilmaganlar: oq/kulrang
 * - Light va Night (Dark) rejimlariga to'liq moslangan
 */
export default function QuestionNav({
  totalQuestions,
  currentIndex,
  userAnswers,
  onSelectQuestion,
}) {
  const numbers = Array.from({ length: totalQuestions }, (_, i) => i);

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 transition-colors">
      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
        Savollar ro'yxati ({Object.keys(userAnswers).length}/{totalQuestions})
      </h3>
      
      {/* Mobilda 7 ustun, planshet va kompyuterda moslashuvchan */}
      <div className="grid grid-cols-7 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-5 gap-2">
        {numbers.map((index) => {
          const isCurrent = currentIndex === index;
          const isAnswered = userAnswers[index] !== undefined && userAnswers[index] !== null;

          let btnClass = "w-full aspect-square flex items-center justify-center text-sm font-medium rounded-lg transition-all ";

          if (isCurrent && isAnswered) {
            btnClass += "bg-blue-600 text-white ring-2 ring-blue-600 ring-offset-2 dark:ring-offset-gray-900 font-bold shadow-sm";
          } else if (isCurrent) {
            btnClass += "bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 border-2 border-blue-600 dark:border-blue-500 ring-2 ring-blue-400/50 font-bold";
          } else if (isAnswered) {
            btnClass += "bg-blue-600 text-white hover:bg-blue-700";
          } else {
            btnClass += "bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700";
          }

          return (
            <button
              key={index}
              type="button"
              onClick={() => onSelectQuestion(index)}
              className={btnClass}
              title={`Savol ${index + 1}${isAnswered ? " (javob berilgan)" : ""}`}
            >
              {index + 1}
            </button>
          );
        })}
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex flex-col gap-1.5 text-xs text-gray-600 dark:text-gray-400">
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded bg-blue-600 inline-block"></span>
          <span>Javob berilgan</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded bg-white dark:bg-gray-900 border-2 border-blue-600 inline-block"></span>
          <span>Joriy savol</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 inline-block"></span>
          <span>Javob berilmagan</span>
        </div>
      </div>
    </div>
  );
}
