export const DEFAULT_FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=1000&auto=format&fit=crop&q=80';
export const DEFAULT_DIAMOND_IMAGE = 'https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=800&auto=format&fit=crop&q=80';
export const DEFAULT_AVIATOR_IMAGE = 'https://images.unsplash.com/photo-1519074069444-1ba4eae287b9?w=800&auto=format&fit=crop&q=80';
export const DEFAULT_WINGO_IMAGE = 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=800&auto=format&fit=crop&q=80';

export function normalizeImageUrl(rawUrl?: string): string {
  if (!rawUrl || typeof rawUrl !== 'string') {
    return DEFAULT_FALLBACK_IMAGE;
  }

  let url = rawUrl.trim();
  if (!url) return DEFAULT_FALLBACK_IMAGE;

  // Convert legacy Vite src/assets paths to public root /images/ paths
  if (url.includes('/src/assets/images/')) {
    url = url.replace('/src/assets/images/', '/images/');
  }

  // Upgrade insecure http:// to https:// to prevent mixed-content blocks in WhatsApp / in-app webviews
  if (url.startsWith('http://')) {
    url = url.replace('http://', 'https://');
  }

  // Google Drive share link -> direct image link
  if (url.includes('drive.google.com')) {
    const fileIdMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/id=([a-zA-Z0-9_-]+)/);
    if (fileIdMatch && fileIdMatch[1]) {
      return `https://lh3.googleusercontent.com/d/${fileIdMatch[1]}`;
    }
  }

  // GitHub blob link -> raw content link
  if (url.includes('github.com') && url.includes('/blob/')) {
    url = url.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/');
  }

  // Imgur page link -> direct image link
  if (url.includes('imgur.com') && !url.includes('i.imgur.com')) {
    const imgurId = url.split('/').pop()?.split('.')[0];
    if (imgurId && imgurId.length >= 3) {
      return `https://i.imgur.com/${imgurId}.png`;
    }
  }

  // PostImage share link -> direct image link
  if (url.includes('postimg.cc') && !url.includes('i.postimg.cc')) {
    const postId = url.split('/').pop();
    if (postId) {
      return `https://i.postimg.cc/${postId}/image.png`;
    }
  }

  // Dropbox share link -> raw image
  if (url.includes('dropbox.com')) {
    url = url.replace('www.dropbox.com', 'dl.dropboxusercontent.com').replace('?dl=0', '').replace('&dl=0', '');
  }

  return url;
}

