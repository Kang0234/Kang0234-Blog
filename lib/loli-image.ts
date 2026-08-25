// 二次元随机图床 API 列表，按优先级排序
const LOLI_SOURCES = [
  { name: 'dmoe', url: (seed: string) => `https://www.dmoe.cc/random.php?t=${seed}` },
  { name: 'toubiec', url: (seed: string) => `https://acg.toubiec.cn/random.php?t=${seed}` },
  { name: 'paugram', url: (seed: string) => `https://api.paugram.com/wallpaper/?t=${seed}` },
  { name: 'loliapi', url: (seed: string) => `https://www.loliapi.com/acg/?t=${seed}` },
];

const FALLBACK = (seed: string) => `https://picsum.photos/seed/sakura-${seed}/800/450`;

export function getLoliImage(seed: string, index: number = 0): string {
  if (index >= LOLI_SOURCES.length) return FALLBACK(seed);
  return LOLI_SOURCES[index].url(seed);
}

export function getAvatar(seed: string): string {
  return `https://api.dicebear.com/7.x/adventurer/svg?seed=${seed}&backgroundColor=ffd5dc,ffdfbf,c0aede`;
}

export const LOLI_SOURCE_COUNT = LOLI_SOURCES.length;
