# Nextjs Project

Nextjsお試しプロジェクト

使っている主なライブラリなど
  - Next.js
  - NextAuth.js
  - Prisma
  - Bulma
  - Storybook
  - React Query
  - React hook form
  - Yup

## 機能
ログアウト時
  - 記事一覧を表示
    - キーワードで絞り込み
  - ユーザー一覧を表示
    - キーワードで絞り込み
  - 個別記事を表示
  - 個別ユーザーを表示
  - ログイン

ログイン時
  - 上記ログアウト時の機能
  - 記事一覧をフォロー中ユーザー作成のものだけ絞り込み
  - ユーザー一覧をフォロー中ユーザーで絞り込み
  - ユーザーをフォローする／フォローを外す
  - 記事を書く

## 使い方
```
# ライブラリのインストール
npm install

# DBマイグレート
npx prisma migrate dev --preview-feature

# シード作成
npx prisma db seed --preview-feature

# 起動
npm run dev
```
