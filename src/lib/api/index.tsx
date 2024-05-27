

const isDev = location.hostname === "localhost";

export const env = {
    api: isDev ? "http://localhost:4005/webtone/" : "https://api.vildawebben.dev/cc/webtone/",
    metrics : isDev ? "http://localhost:4005/wt" : "https://api.vildawebben.dev/cc/wt",
}