export type MusicRelease = {
  id: string
  title: string
  url: string
  image: string
  date: string
  source: 'spotify' | 'youtube'
}

const YOUTUBE_CHANNEL_ID = 'UCRMyFGIvKgEVBtCef7GY-Lw'

export async function getLatestYouTubeVideos(): Promise<MusicRelease[]> {
  try {
    const response = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`,
      { next: { revalidate: 3600 } },
    )
    if (!response.ok) return []
    const xml = await response.text()
    return Array.from(xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)).slice(0, 6).map(([, entry]) => {
      const read = (pattern: RegExp) => entry.match(pattern)?.[1] ?? ''
      const id = read(/<yt:videoId>(.*?)<\/yt:videoId>/)
      return {
        id,
        title: decodeXml(read(/<title>(.*?)<\/title>/)),
        url: `https://www.youtube.com/watch?v=${id}`,
        image: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
        date: read(/<published>(.*?)<\/published>/),
        source: 'youtube' as const,
      }
    }).filter((video) => video.id && video.title)
  } catch {
    return []
  }
}

function decodeXml(value: string) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
}
