# Nextjs Project

## Feature

## How to get started
Install Nextjs, Typescript
  ```
  npx create-next-app <project-name>
  npm install --save-dev typescript @types/react
  ```

Configure Typescript
  - Replace .js and .jsx with .ts and .tsx
  - Run `npm run dev`, and `tsconfig.json` will be generated

Install Prettier
  ```
  npm install --save-dev --save-exact prettier
  ```

Install Prisma
  ```
  npm install --save-dev prisma
  npm install @prisma/client
  npx prisma init
  ```

Configure Prisma
  - edit `prisma/schema.prisma`

Install NextAuth
  ```
  npm install next-auth
  ```

Configure next-auth
  - edit `pages/api/auth/[...nextahth].ts`
  - edit `prisma/schema.prisma`
    - refer to
      - [NextAuth:Models](https://next-auth.js.org/schemas/models)
      - [NextAuth:Database Adapters](https://next-auth.js.org/schemas/adapters)

Migrate
  ```
  npx prisma migrate dev --preview-feature
  ```

Install ts-node
  ```
  npm install --save-dev ts-node @types/node
  ```

Configure seed file
  - edit `prisma/seed.ts`
  - edit `package.json`
    ```json
    "scripts": {
    ...
    "ts-node": "ts-node --compiler-options \"{\\\"module\\\":\\\"CommonJS\\\"}\"",
    ...
    },
    ```

Seeding
  ```
  npx prisma db seed --preview-feature
  ```

Install Bulma
  ```
  npm install bulma
  ```

Configure Bulma
  ```
  // pages/_app.tsx
  import "bulma/css/bulma.min.css";
  ```

Install Storybook
  ```
  npx -p @storybook/cli sb init
  ```

Install balel-plugin-inline-react-svg for using svg
  ```
  npm install --save-dev babel-plugin-inline-react-svg
  ```

Configure .babelrc
  ```
  // .babelrc
  {
    "presets": ["next/babel"],
    "plugins": ["inline-react-svg"]
  }
  ```
