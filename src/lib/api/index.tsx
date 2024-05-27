

const isDev = location.hostname === "localhost";

export const env = {
    api: isDev ? "http://localhost:4005/colors/" : "https://api.vildawebben.dev/cc/colors/",
    metrics : isDev ? "http://localhost:4005/wt" : "https://api.vildawebben.dev/cc/wt",
}