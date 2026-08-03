export const DEFAULT_FALLBACK_IMAGE = '/images/vault_gold_bonus_1785787230279.jpg';
export const DEFAULT_DIAMOND_IMAGE = '/images/purple_3d_diamond_1785787118017.jpg';
export const DEFAULT_AVIATOR_IMAGE = '/images/aviator_red_jet_1785787036135.jpg';
export const DEFAULT_WINGO_IMAGE = '/images/wingo_3d_balls_1785787086705.jpg';

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

  // Imgur page link -> direct image link
  if (url.includes('imgur.com') && !url.includes('i.imgur.com')) {
    const imgurId = url.split('/').pop()?.split('.')[0];
    if (imgurId) {
      return `https://i.imgur.com/${imgurId}.png`;
    }
  }

  // Dropbox share link -> raw image
  if (url.includes('dropbox.com')) {
    url = url.replace('www.dropbox.com', 'dl.dropboxusercontent.com').replace('?dl=0', '');
  }

  return url;
}
