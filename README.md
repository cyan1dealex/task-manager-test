# 📋 Task Manager

🔗 **Демо:** [task-manager-test-deploy.vercel.app](https://task-manager-test-deploy.vercel.app)

* **Стек:** React, TypeScript, TanStack Query, Axios, Vite, CSS Modules
* **Архитектура:** Feature-Sliced Design (FSD)
* **API:** MockAPI.io

Данное приложение является тестовым заданием. Реализованный функционал:

* **CRUD:** Создание, редактирование, изменение и удаление задач.
* **Детальный просмотр:** Отдельная страница с подробной информацией о задаче.
* **Фильтрация и поиск:** По статусу (*Все*, *К выполнению*, *В процессе*, *Выполненные*) и заголовку.
* **Сортировка:** По дате создания и приоритету (`low`, `medium`, `high`).
* **Пагинация:** Постраничное отображение.
* **UX/UI:** Скелетон-загрузка и валидация.

---

### Локальный запуск:

```bash
git clone https://github.com/cyan1dealex/task-manager-test.git

cd task-manager-test

npm install

cp .env.example .env

npm run dev
