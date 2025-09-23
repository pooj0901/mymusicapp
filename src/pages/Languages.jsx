
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const LANGUAGES = [
  { name: "Hindi", gradient: "from-pink-500 via-red-500 to-red-700" },
  { name: "English", gradient: "from-blue-500 via-purple-500 to-indigo-700" },
  { name: "Marathi", gradient: "from-yellow-400 via-orange-500 to-red-600" },
  { name: "Punjabi", gradient: "from-purple-500 via-pink-500 to-red-500" },
];

export default function Languages() {
  return (
    <motion.main
      className="max-w-6xl mx-auto px-4 pb-32"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-bold my-6 text-white text-center md:text-left">
        Languages
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {LANGUAGES.map((lang, index) => (
          <motion.div
            key={lang.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to={`/languages/${lang.name.toLowerCase()}`}
              className={`p-6 rounded-xl shadow-lg text-white text-center block bg-gradient-to-br ${lang.gradient}`}
            >
              <h2 className="text-2xl font-semibold">{lang.name}</h2>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.main>
  );
}
