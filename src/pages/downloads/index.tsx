import { createSignal } from "solid-js"

const DownloadsPage = () => {
    const [list, setList] = createSignal<string[]>([])

    const h1 = "text-3xl font-bold mb-3"
    const h2 = "text-2xl font-bold mt-6"
    const h3 = "mt-4 text-lg font-bold italic"
    const p = "mt-3 text-lg"
    const li = "mt-2 text-lg"
    const span = "font-bold"
    const a = "text-blue-600 underline text-xs"

    return (
        <main class="container mx-auto mb-28 flex min-h-screen max-w-7xl justify-center text-neutral-800">
            <section class="m-20 w-2/3  text-neutral-800">
                <h2 class={h2}>Assets</h2>
                <p class={p}>
                    
                </p>
                <table class="mt-6 w-full table-auto">
                    <thead>
                        <tr>
                            <th class="border border-neutral-400 px-4 py-2">File</th>
                            <th class="border border-neutral-400 px-4 py-2">Size</th>
                            <th class="border border-neutral-400 px-4 py-2">Type</th>
                            <th class="border border-neutral-400 px-4 py-2">Download</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="border border-neutral-400 px-4 py-2">WEBTONE - ACO (Adobe Suite)</td>
                            <td
                                class="py -2 border border-neutral-400
                            px-4"
                            >
                                {"< 0.1 MB"}
                            </td>
                            <td class="border border-neutral-400 px-4 py-2">ZIP</td>
                            <td class="border border-neutral-400 px-4 py-2">
                                <a href="/downloads/webtone-aco.zip" download="webtone-aco.zip" class={a}>
                                    Download
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td class="border border-neutral-400 px-4 py-2">WEBTONE - JSON</td>
                            <td class="border border-neutral-400 px-4 py-2">0.1 MB</td>
                            <td class="border border-neutral-400 px-4 py-2">ZIP</td>
                            <td class="border border-neutral-400 px-4 py-2">
                                <a href="/downloads/webtone-json.zip" download="webtone-json.zip" class={a}>
                                    Download
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </main>
    )
}

export default DownloadsPage
