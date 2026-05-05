# HI dev

Here is small app where you can chat with some famous artists - responseces genereted with Google Gemini AI



**PRODUCTION:** [syntx-ai-jevgenijs-chat.vercel.app](https://syntx-ai-jevgenijs-chat.vercel.app/)

---

## Implemented features

- Desktop / mobile  view
- Chat response (Google Gemini)
- Create new chat with famous person (answers will be generated atrists style)
- Save (localstorage) new created chats and chat correspondence
- Dark / Light Theme

## TODO features

- Cover functionality with unit and e2e test
- Add new chat configuration (style language)

---

### Dependecies

| LIBS                                                                                   | Version  |
| -------------------------------------------------------------------------------------- | ------- | 
| [Vue 3](https://vuejs.org/)                                                            | ^3.5.32 | 
| [Vue Router](https://router.vuejs.org/)                                                | ^5.0.4  | 
| [Pinia](https://pinia.vuejs.org/)                                                      | ^3.0.4  |
| [pinia-plugin-persistedstate](https://prazdevs.github.io/pinia-plugin-persistedstate/) | ^4.7.1  | 
| [Naive UI](https://www.naiveui.com/)                                                   | ^2.44.1 | 
| [@vicons/ionicons5](https://www.xicons.org/)                                           | ^0.13.0 |
| [@google/generative-ai](https://ai.google.dev/)                                        | ^0.24.1 |

---

## Start

### install dependencies

```sh
npm install
```

### 
create`.env` reference -> (`.env.example`):
local mocks will be used if there is no key 

```
VITE_GEMINI_API_KEY=your_api_key_here
```

VITE_GEMINI_API_KEY: [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)

###  DEV
```sh
npm run dev
```

### PROD

```sh
npm run build-only
```

### TO Vercel

```sh
npx vercel dist --prod
```

---

## Тесты

### Unit-тесты (Vitest)

```sh
npm run test:unit
```

### E2E-тесты (Playwright)

```sh
npx playwright install  
npm run test:e2e
```

---

## Линтинг и форматирование

```sh
npm run lint    
npm run format  
```

---

## CI/CD

GitHub Actions run lint and build and deploy to Vercel.
config: [`.github/workflows/ci.yml`](.github/workflows/ci.yml)
