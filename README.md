# Keycloakify Application

Страницы авторизации в keycloak. Приложение реализовано с помощью библиотеки keycloakify,
которая генерирует из react-приложения ftl шаблоны.

## Runbook

### Build

- `npm run build:themes` - builds two (all) themes in folders `build_theme1` and `build_theme2`
- `npm run build:demo` - builds demo stand in folder `build_demo`
- `npm run build:theme1` - builds theme1 in folder `build_keycloak` (to run keycloak locally)
- `npm run build:theme2` - builds theme2 in folder `build_keycloak` (to run keycloak locally)

1. Installing Packages `npm install`
2. Build themes `npm run build:themes`
3. Build demo stand `npm run build:demo`

The built theme templates are located at: `{build_name}/src/main/resources/theme/{theme_name}`.

### Start

- `npm run start:demo` - launches react demo stand.
- `npm run build:theme1` -> follow the instructions in the console after build to launch the theme in keycloak.
- `npm run build:theme2` -> follow the instructions in the console after build to launch the theme in keycloak.

### Lints

- `npm run lint` - Eslint
- `npm run lint:fix` - Eslint autofix

### Debug

Helps to find broken keys in `.data_model`.

- `npm run debug` - adds debug ftl to all templates of a certain theme (without --file=...) or only to 1 file (with --file=login.ftl)

### Links

- react node - <http://localhost:3000>
- keycloak - <http://localhost:8080/admin>
- realm - <http://localhost:8080/auth/realms/myrealm/account>

## System requirements

- node v14.16.0-alpine

## Contribution

### Description of the repository's architectural features

If `process.env.REACT_APP_MODE === MODE_DEMO` then a multi-page application is being built, else standard keycloakify is being built.



