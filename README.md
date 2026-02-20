
# PERN TODO (Modern Minimal Template)

このリポジトリは、**PERN（PostgreSQL / Express / React / Node.js）構成**のシンプルなToDo アプリケーションテンプレートです。

- deprecated な依存関係を極力避ける
- `pg`（node-postgres）を用いた **生SQL** を明示的に扱う

を目的として設計されています。

---

## 前提環境

このアプリケーションを実行するには、以下の環境が必要です。

### 必須
- **Node.js**: v18.x 以上（LTS推奨）
- **npm**: v9.x 以上（Node.jsに同梱）
- **PostgreSQL**: v14.x 以上

### 推奨
- **OS**: macOS / Linux / Windows（WSL2推奨）
- **ターミナル**: bash / zsh / PowerShell

### バージョン確認方法

```bash
# Node.js のバージョン確認
node --version

# npm のバージョン確認
npm --version

# PostgreSQL のバージョン確認
psql --version
```

---

## 同梱内容（構成）

```
pern_todo/
├─ server/                     # バックエンド（Node.js + Express）
│  ├─ src/
│  │  ├─ db.js                # PostgreSQL 接続（pg Pool）
│  │  ├─ app.js               # Express エントリポイント
│  │  └─ routes/
│  │      └─ todos.js         # ToDo CRUD API（SQL直書き）
│  ├─ .env                    # 環境変数（要作成）
│  ├─ .env.example            # 環境変数サンプル
│  └─ package.json            # サーバ依存関係定義
│
└─ client/                    # フロントエンド（Vite + React）
   ├─ index.html
   ├─ src/
   │  ├─ main.jsx
   │  └─ App.jsx              # ToDo UI / API 呼び出し
   ├─ .env                    # 環境変数（要作成）
   ├─ .env.example            # 環境変数サンプル
   └─ package.json            # クライアント依存関係定義
```

---

## サーバ側の特徴（server/）

### 技術スタック
- Node.js（LTS想定）
- Express 4.x
- pg（node-postgres）
- dotenv / cors

### 設計方針
- ORMは使用せず、**SQLをそのままコードに記述**
- PostgreSQL 固有の構文（例：`$1` プレースホルダ、`RETURNING`）を明示
- ルーティング・DB接続・SQLを最小限のファイル数に集約

### 主なファイル

#### `src/db.js`
- `pg.Pool` を使った PostgreSQL 接続管理
- `.env` または環境変数から接続情報を取得

#### `src/routes/todos.js`
- ToDo の CRUD API を実装
- 以下のような **変換対象として重要な要素**を含む：
  - `$1, $2 ...` プレースホルダ
  - `INSERT ... RETURNING`
  - `COALESCE` を使った部分更新


---

## クライアント側の特徴（client/）

### 技術スタック
- Vite
- React 18

### 設計方針
- 見た目は最小限、ロジックも最小限
- `/api/todos` を叩くだけの薄い UI
- バックエンド検証のための **動作確認用フロント**

### 主な役割
- ToDo の作成 / 一覧 / 更新 / 削除


---

## このテンプレートの狙い

このテンプレートは、以下の用途を想定しています。

- ✅ PostgreSQL + Node.js の **最小 CRUD 参照実装**
- ✅ **AI Agent による DB アクセスコード変換**の検証素材

---

## 使い方（1〜2分で起動）

### 1. PostgreSQL の初期化

PostgreSQL にログインし、以下を実行してください。

```sql
CREATE DATABASE pern_todo;
\c pern_todo

CREATE TABLE IF NOT EXISTS todos (
  id    SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  done  BOOLEAN NOT NULL DEFAULT FALSE
);
```

---

### 2. サーバ起動（Node.js + Express）

#### 環境変数の設定

```bash
cd pern-todo-modern/server
cp .env.example .env   # 環境に合わせて編集
```

`.env` ファイルの内容例：

```env
# PostgreSQL 接続情報
PGUSER=postgres
PGPASSWORD=postgres
PGHOST=localhost
PGDATABASE=pern_todo
PGPORT=5432

# サーバーポート
PORT=8000
```

#### サーバー起動

```bash
npm install
npm run dev
```

- 起動後、API は以下で待ち受けます。
  - http://localhost:8000
- 疎通確認：
  - http://localhost:8000/api/todos

---

### 3. クライアント起動（Vite + React）

#### 環境変数の設定

```bash
cd pern-todo-modern/client
cp .env.example .env   # 必要に応じて編集
```

`.env` ファイルの内容例：

```env
# Vite 開発サーバーポート
VITE_PORT=5173

# API サーバー URL
VITE_API=http://localhost:8000/api
```

**注意**:
- `VITE_` プレフィックスが付いた環境変数のみがクライアントコードに公開されます
- ポート番号やAPI URLを変更する場合は、この `.env` ファイルを編集してください

#### クライアント起動

```bash
npm install
npm run dev
```

- ブラウザで以下にアクセス
  - http://localhost:5173

---

### 4. 動作確認ポイント

- ToDo の追加 / 完了チェック / 削除ができること
- サーバ側ログに SQL 実行エラーが出ていないこと


---

## License

This project is licensed under the **Apache License 2.0**.

See the [LICENSE](LICENSE) file for details.