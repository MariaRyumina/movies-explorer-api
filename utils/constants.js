const ERROR_VALIDATION_INCORRECT_DATA = 'Переданы некорректные данные';
const ERROR_FORBIDDEN_DELETE = 'Нельзя удалять фильмы других пользователей!';
const SUCCESSFUL_DELETE = 'Фильм успешно удален';
const ERROR_NOT_FOUND_MOVIE = 'Фильм с указанным _id не найден';
const ERROR_NOT_FOUND_USER = 'Пользователь с указанным _id не найден';
const ERROR_CONFLICT = 'Пользователь с таким email уже зарегистрирован';
const ERROR_AUTH = 'Требуется авторизация';
const ERROR_SERVER = 'На сервере произошла ошибка';
const ERROR_VALIDATION_INCORRECT_URL = 'Неверный формат URL';
const ERROR_VALIDATION_INCORRECT_EMAIL = 'Неверный формат email';
const ERROR_VALIDATION_INCORRECT_LENGTH = 'Поле должно содержать от 2 до 30 символов';
const ERROR_AUTH_INCORRECT_DATA = 'Неправильные почта или пароль';
const ERROR_NOT_FOUND_PAGE = 'Страница не найдена';

module.exports = {
  ERROR_VALIDATION_INCORRECT_DATA,
  ERROR_FORBIDDEN_DELETE,
  SUCCESSFUL_DELETE,
  ERROR_NOT_FOUND_MOVIE,
  ERROR_NOT_FOUND_USER,
  ERROR_CONFLICT,
  ERROR_AUTH,
  ERROR_SERVER,
  ERROR_VALIDATION_INCORRECT_URL,
  ERROR_VALIDATION_INCORRECT_EMAIL,
  ERROR_VALIDATION_INCORRECT_LENGTH,
  ERROR_AUTH_INCORRECT_DATA,
  ERROR_NOT_FOUND_PAGE,
};
