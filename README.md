# Authorization Application

Страницы авторизации в keycloak. Приложение реализовано с помощью библиотеки keycloakify,
которая генерирует из react-приложения ftl шаблоны.

## Runbook

### Сборка

- `npm run build` - собирает react-приложение
- `npm run keycloak` - собирает приложение и тему

1. Установка пакетов `npm install`
2. Собрать тему `npm run keycloak`

Собранные шаблоны находятся по адресу `build_keycloak/src/main/resources/theme/{название_темы}`.

### Запуск

- `npm run start` - только react-приложение
- `npm run keycloak` и `` - полноценный запуск

### Тесты

...

### Линтеры

- `npm run lint:js` / `npm run fix:js` / `npm run lint:js -- --quiet` - Eslint
- `npm run lint:styles` / `npm run fix:styles` - Stylelint
- `npm run lint:md` / `npm run fix:md` - Markdownlint

### Ссылки

#### Local

- react node - <http://localhost:3000>
- react nginx - <http://localhost:5000>
- keycloak - <http://localhost:8080>
- realm - <http://localhost:8080/auth/realms/myrealm/account>

## System requirements

- node v14.16.0-alpine

## Contribution

### Описание архитектурных особенностей репозитория

...

