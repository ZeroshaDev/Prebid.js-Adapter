const fs = require("fs-extra");
const path = require("path");

// Определение исходной и целевой директорий
const sourceDir = path.join("adapter");
const targetDir = path.join("node_modules", "prebid.js", "modules");

// Проверка наличия исходной директории
fs.pathExists(sourceDir, (err, exists) => {
  if (err) {
    return console.error(
      "Ошибка при проверке наличия исходной директории:",
      err
    );
  }
  if (!exists) {
    return console.error("Исходная директория не существует:", sourceDir);
  }

  // Проверка наличия целевой директории и создание, если не существует
  fs.ensureDir(targetDir, (err) => {
    if (err) {
      return console.error("Ошибка при создании целевой директории:", err);
    }

    // Копирование файлов с использованием fs-extra
    fs.copy(sourceDir, targetDir, (err) => {
      if (err) {
        return console.error("Ошибка при копировании файлов:", err);
      }
      console.log("Файлы успешно скопированы.");
    });
  });
});
