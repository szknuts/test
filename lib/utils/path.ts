/**
 * アプリケーションのベースパス。
 * 本番環境（GitHub Pages）では、リポジトリ名が設定されるべきですが、
 * User Pages（username.github.io）の場合はルートから配信されるため空文字となります。
 */
export const BASE_PATH = process.env.NODE_ENV === "production" ? "" : "";

/**
 * 指定されたパスにベースパスを付与します。
 * 画像やその他の静的アセットへのパス生成に使用します。
 *
 * @param path プレフィックスを付与するパス (例: "/data/image.png")
 * @returns ベースパスが付与されたパス (例: "/test/data/image.png")
 */
// R2 Bucket Public Access URL
// 本番環境用URLは.envファイルで管理します。
// ローカル開発でも.env.localを使用してください。
const R2_BASE_URL = process.env.NEXT_PUBLIC_R2_BASE_URL || "";

export function getPath(path: string): string {
  if (!path) return "";
  if (path.startsWith("http")) return path;

  // Ensure path starts with / if not present (unless empty)
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  // 画像ファイル（personディレクトリ）はR2から配信する
  if (
    normalizedPath.startsWith("/staff/") ||
    normalizedPath.startsWith("/members/")
  ) {
    // 環境変数が未設定の場合は、開発用に空文字（相対パス）等を返すか、エラーにするか検討
    // ここではそのまま連結しますが、.envの設定が必要です。
    return `${R2_BASE_URL}${normalizedPath}`;
  }

  return `${BASE_PATH}${normalizedPath}`;
}
