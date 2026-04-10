# 🌷 わたしのバケットリスト - Claude Code 引き継ぎメモ

## プロジェクト概要

バケットリスト管理スマホアプリ。React + Vite で作成し、Vercel で公開済み。
オーナー：YOKO（bhlsyo）

---

## 環境・構成

| 項目 | 内容 |
|------|------|
| フレームワーク | React + Vite |
| 言語 | JSX |
| スタイリング | インラインスタイル（CSS-in-JS） |
| データ保存 | localStorage（Firebase移行予定） |
| ホスティング | Vercel（無料プラン） |
| リポジトリ | GitHub: bhlsyo/my-bucket-list |
| ローカル場所 | ~/Desktop/my-bucket-list |

---

## ファイル構成

```
my-bucket-list/
├── src/
│   └── App.jsx        ← アプリのコードはここ1ファイルにすべて集約
├── public/
├── index.html
├── package.json
├── vite.config.js
└── CLAUDE.md          ← このファイル
```

**App.jsx の構造（上から順）：**

1. `storage` オブジェクト - localStorage読み書き（Firebase移行時はここだけ差し替え）
2. `DEFAULT_CATEGORIES` - デフォルトカテゴリ定義
3. `C` オブジェクト - 全カラー定義（色変更はここを変える）
4. `getTimeGroup()` - 目標時期のグループ判定関数
5. `TIME_GROUPS` - 時期グループの定義（今年/来年/5年以内/それ以降/期限なし）
6. `TulipSVG` - チューリップのSVGコンポーネント
7. `Celebration` - 達成時のチューリップエフェクト
8. `Sheet` - 下から出てくるモーダル
9. `Chip` - フィルターのタグボタン
10. `ItemCard` - アイテムカード
11. `SectionLabel` - セクション見出し
12. `App` - メインコンポーネント（全体の状態管理）

---

## デザイン方針

- **テーマ**：大人カジュアル、くすみパステル
- **背景**：オフホワイト `#f7f4f0`
- **アクセント5色**：テラコッタ・スカイブルー・セージグリーン・ラベンダー・アンバー
- **フォント**：Noto Sans JP（Google Fonts）
- **キャラクター**：チューリップ（クマは使わない）
- **横スクロールなし**：縦レイアウト固定

### カラー定義（C オブジェクト）

```js
const C = {
  bg:     "#f7f4f0",  // 背景
  white:  "#ffffff",  // カード背景
  terra:  "#c9716a",  // テラコッタ（メインアクセント・FABボタン）
  sky:    "#7eb8d4",  // スカイブルー
  sage:   "#8fb87a",  // セージグリーン
  lavend: "#b08ec4",  // ラベンダー
  amber:  "#d4a96a",  // アンバー
  text:   "#3a3028",  // メインテキスト
  sub:    "#9a8f85",  // サブテキスト
  border: "#e5ddd6",  // ボーダー
};
```

---

## 機能一覧

### 実装済み
- アイテム追加・編集・削除
- カテゴリ別表示 / 時期別表示の切り替え
- カテゴリフィルター・時期フィルター
- 目標時期をプルダウンで選択（今年/来年/5年以内/それ以降）
- 達成チェック（タップで切り替え）
- 達成済みアイテムを折りたたんで表示
- カテゴリ追加・編集・削除
- 達成時チューリップエフェクト
- localStorageに自動保存

### 未実装（今後の候補）
- Firebase連携（データのクラウド保存・複数端末対応）
- メモ欄（URLや備考を登録）
- 写真添付
- 並び替え（ドラッグ&ドロップ）
- 通知機能
- 達成率グラフ

---

## デプロイの流れ

コードを変更したら以下の3コマンドでVercelに自動反映：

```bash
cd ~/Desktop/my-bucket-list
git add .
git commit -m "変更内容のメモ"
git push
```

数分でVercelが自動デプロイ。VercelのURLは変わらない。

---

## よくある改修パターン

### 色を変えたい
`App.jsx` の上部にある `C` オブジェクトの値を変更する。

### デフォルトカテゴリを変えたい
`DEFAULT_CATEGORIES` 配列を編集する。
※すでにlocalStorageにデータがある場合は反映されないので注意。

### 時期グループを変えたい
`TIME_GROUPS` 配列と `getTimeGroup()` 関数を合わせて編集する。

### 新しい機能を追加したい
`App` コンポーネント内の state と、対応する Sheet（モーダル）を追加する。

---

## Firebase移行方針

現在は localStorage で保存しているが、Firebase Firestore に移行予定。
移行時は `storage` オブジェクトの `get` / `set` を Firestore の読み書きに差し替えるだけでOK。
他のコードは変更不要な設計になっている。

```js
// 現在
const storage = {
  get: (key, fallback) => { /* localStorage */ },
  set: (key, val) => { /* localStorage */ },
};

// Firebase移行後はここを差し替える
const storage = {
  get: async (key, fallback) => { /* Firestore読み込み */ },
  set: async (key, val) => { /* Firestore書き込み */ },
};
```

---

## GitHub・Vercel情報

| 項目 | 内容 |
|------|------|
| GitHubユーザー名 | bhlsyo |
| リポジトリ名 | my-bucket-list |
| Vercelプロジェクト名 | my-bucket-list |
| デプロイブランチ | main |

---

## Claude Codeへの引き継ぎ用プロンプト

Claude Codeを起動したら最初にこれを貼り付ける：

```
~/Desktop/my-bucket-list のバケットリストアプリの改修をお願いします。
CLAUDE.md を読んで構成を把握してから作業してください。
```

---

*最終更新：2026年4月*
