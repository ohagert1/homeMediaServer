import levenshtein from 'fast-levenshtein'

export const refine = (videos, search, category) => {
  let matches = []
  for (let i = 0; i < videos.length; i++) {
    let catMatch = category !== 'all' ? videos[i].mediaType === category : true
    if (catMatch) {
      if (videos[i].title.toLowerCase() === search) {
        return [videos[i]]
      } else if (videos[i].title.toLowerCase().includes(search)) {
        matches.push(videos[i])
      } else if (levenshtein.get(search, videos[i].title.toLowerCase()) < 5) {
        matches.push(videos[i])
      }
    }
  }
  return matches
}
