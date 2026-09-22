import type { ogMetaData, mockMetaData } from '@/types/article.types.ts'
import metaDataMock from '@/mocks/ogMetaData.mock.json'

const mock: mockMetaData = metaDataMock

export async function getOgMetadata(url: string): Promise<ogMetaData | undefined> {
  if (import.meta.env.VITE_ARTICLE_DATA_SOURCE === 'mock') {
    return mock[url]
  }

  const api: string = import.meta.env.VITE_OPENGRAPH_API_KEY

  const response = await fetch(
    `https://opengraph.io/api/3.0/site/${encodeURIComponent(url)}?app_id=${api}`
  )

  if (!response.ok) {
    throw new Error("Error: API doesn't work")
  }

  const data = await response.json()

  return {
    url: data.hybridGraph.url,
    title: data.hybridGraph.title,
    description: data.hybridGraph.description,
    image: data.hybridGraph.image,
  }
}
