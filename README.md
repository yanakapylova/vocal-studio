# Вокальная Платформа

## Описание проекта

Это проект вокальной платформы для группы вокала, которая позволяет управлять пользователями, их регистрацией и различными учебными группами. Проект состоит из backend-сервера, базы данных и frontend-интерфейса.

### Структура проекта:

- **Backend**: реализован на порту `3008`. Обрабатывает запросы, взаимодействует с базой данных и предоставляет API для работы с данными.
- **Frontend**: предоставляет веб-интерфейс для взаимодействия с пользователями на порту `3000`.
- **База данных**: используется PostgreSQL, запускается на порту `5433`.

## Запуск проекта

### Предварительные требования:

Для работы с проектом на локальной машине должны быть установлены:

- **Node.js** (для запуска frontend и backend)
- **PostgreSQL** (для базы данных)

### Установка и запуск

1. **Склонируйте репозиторий**:

   ```bash
   git clone <URL_репозитория>
   cd вокальная_платформа
   ```

2. **Настройте базу данных**:

   - Убедитесь, что PostgreSQL запущен на порту `5433`.
   - Создайте необходимую базу данных и заполните её нужными таблицами. Схема таблиц доступна в файле `schema.sql` (если таковой имеется).

3. **Настройка и запуск Backend**:

   - Перейдите в директорию `server`:
     ```bash
     cd server
     ```
   - Установите зависимости:
     ```bash
     npm install
     ```
   - Настройте файл конфигурации для соединения с базой данных (если это требуется).
   - Запустите сервер:
     ```bash
     npm start
     ```
     Backend будет доступен по адресу `http://localhost:3008`.

4. **Настройка и запуск Frontend**:

   - Перейдите в директорию `ui`:
     ```bash
     cd ui
     ```
   - Установите зависимости:
     ```bash
     npm install
     ```
   - Запустите сервер:
     ```bash
     npm start
     ```
     Frontend будет доступен по адресу `http://localhost:3000` или другому, если порт 3000 занят.

### Создание группы

Чтобы создать нового пользователя вручную, выполните POST-запрос по адресу `http://localhost:3008/users`. В теле запроса передайте следующие данные в формате JSON:

```json
{
  "name": "<Название_группы>",
  "users": [ID_пользователей],
  "schedules": [ID_расписаний]
}
```

### Создание пользователя

Чтобы создать нового пользователя вручную, выполните POST-запрос по адресу `http://localhost:3008/users`. В теле запроса передайте следующие данные в формате JSON:

```json
{
  "name": "<Имя>",
  "surname": "<Фамилия>",
  "fathername": "<Отчество>",
  "phone": "<Номер_телефона>",
  "address": "<Адрес>",
  "school": "<Учебное_заведение>",
  "birthdate": "<Дата_рождения>",
  "password": "<Пароль>",
  "role": "<Роль_пользователя>",
  "groups": [ID_групп]
  "photoURL": "<Ссылка_на_фото>"
}
```

### Создание расписания

Чтобы создать нового пользователя вручную, выполните POST-запрос по адресу `http://localhost:3008/users`. В теле запроса передайте следующие данные в формате JSON:

```json
{
  "type": "<Тип_расписания>",
  "date": "<День_недели>",
  "time": "<Время_занятия>",
  "place": "<Место_проведения>",
  "durationMin": <Длительность_минуты>,
  "activity": "<Тип_активности>",
  "groups": [<\ID_групп>]
}
```

### Пример использования

После запуска backend и frontend, откройте браузер и перейдите по адресу [http://localhost:3000](http://localhost:3000) для доступа к пользовательскому интерфейсу.

Для работы с API, используйте инструменты для выполнения HTTP-запросов, такие как **Postman** или **curl**, для взаимодействия с backend по адресу [http://localhost:3008](http://localhost:3008).

### Структура проекта

- `server/` — исходный код backend сервера (Nest.js).
- `ui/` — исходный код frontend приложения (NextJS).

### Дополнительная информация

- Порт backend: **3008**
- Порт frontend: **3000**
- Порт базы данных PostgreSQL: **5433**
