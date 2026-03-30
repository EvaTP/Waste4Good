"use client";
import styles from "../page.module.css";

export default function ItemLeaderboard({ volunteer }) {
  return (
    <div className={styles.volunteer_item}>
      <div className="flex flex-col gap-3 w-full p-4">
        {/* Prénom */}
        <h3 className="text-2xl font-bold text-gray-800">
          {volunteer.firstname} {volunteer.lastname}
        </h3>

        {/* Nombre de collectes */}
        <div className="flex items-center gap-2">
          <span className="text-emerald-600 text-xl">🗑️</span>
          <span className="text-lg font-semibold text-gray-700">
            {volunteer.total_collections} déchet
            {volunteer.total_collections > 1 ? "s" : ""} collecté
            {volunteer.total_collections > 1 ? "s" : ""}
          </span>
        </div>

        {/* Points donnés */}
        <div className="flex items-center gap-2">
          <span className="text-xl">💚</span>
          <span className="text-lg font-semibold text-gray-700">
            {volunteer.total_donated_points > 0
              ? `${volunteer.total_donated_points} points donnés`
              : "Aucun don effectué"}
          </span>
        </div>

        {/* Associations soutenues */}
        {volunteer.associations_supported !== "Aucun don" && (
          <div className="flex flex-col gap-1 pl-2 border-l-4 border-emerald-200">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
              Associations soutenues
            </p>
            <div className="flex flex-wrap gap-2 mt-1">
              {volunteer.associations_supported
                .split(", ")
                .map((asso, index) => (
                  <span
                    key={index}
                    className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium px-3 py-1 rounded-full"
                  >
                    {asso}
                  </span>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
