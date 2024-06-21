const fs = require("fs-extra");
const path = require("path");

// Функция для удаления заданной директории
function deleteDirectory(directory, callback) {
  fs.remove(directory, (err) => {
    if (err) {
      return callback(err);
    }
    callback();
  });
}

// Пример использования функции
const dirToDelete = path.join("node_modules");

deleteDirectory(dirToDelete, (err) => {
  if (err) {
    return console.error("Ошибка при удалении директории:", err);
  }
  console.log("Директория успешно удалена.");
});
