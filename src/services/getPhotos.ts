const apiKey = import.meta.env.VITE_API_KEY;
const baseUrl = `https://api.unsplash.com/search/photos/?client_id=${apiKey}`;

type Urls = {
  full: string;
  raw: string;
  regular: string;
  small: string;
  small_s3: string;
  thumb: string;
};

export type Photo = {
  urls: Urls;
  id: string;
};

type ApiResponse = {
  results: Photo[];
  total: number;
  total_pages: number;
};

export const getPhotos = async (page: number = 1): Promise<Photo[]> => {
  const response = await fetch(`${baseUrl}&query=neon&page=${page}`);
  const photos: ApiResponse = await response.json();

  return photos.results;
};
