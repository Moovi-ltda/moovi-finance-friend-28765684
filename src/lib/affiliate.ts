const STORAGE_KEY = "moovi_afiliado_id";
const PARAM_NAMES = ["ref", "afiliado", "afiliado_id", "aff", "ref_id", "utm_ref"];

function safeLocalSet(value: string) {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    /* storage bloqueado */
  }
  try {
    sessionStorage.setItem(STORAGE_KEY, value);
  } catch {
    /* storage bloqueado */
  }
  try {
    // cookie de 90 dias como fallback (modo privado / storage bloqueado)
    document.cookie = `${STORAGE_KEY}=${encodeURIComponent(value)}; path=/; max-age=${60 * 60 * 24 * 90}; SameSite=Lax`;
  } catch {
    /* ignore */
  }
}

function readCookie(): string {
  try {
    const match = document.cookie.match(new RegExp(`(?:^|; )${STORAGE_KEY}=([^;]*)`));
    return match ? decodeURIComponent(match[1]) : "";
  } catch {
    return "";
  }
}

function fromUrl(): string {
  try {
    const search = new URLSearchParams(window.location.search);
    const hashQuery = window.location.hash.includes("?")
      ? new URLSearchParams(window.location.hash.split("?")[1])
      : null;
    for (const name of PARAM_NAMES) {
      const value = search.get(name) || hashQuery?.get(name);
      if (value && value.trim()) return value.trim();
    }
  } catch {
    /* ignore */
  }
  return "";
}

/** Captura o ref da URL (se houver) e persiste. Deve rodar em toda navegação. */
export function captureAffiliateId(): string {
  const fromParam = fromUrl();
  if (fromParam) {
    safeLocalSet(fromParam);
    return fromParam;
  }
  return getAffiliateId();
}

/** Lê o ID do afiliado de qualquer fonte disponível. */
export function getAffiliateId(): string {
  const url = fromUrl();
  if (url) return url;
  try {
    const local = localStorage.getItem(STORAGE_KEY);
    if (local && local.trim()) return local.trim();
  } catch {
    /* ignore */
  }
  try {
    const session = sessionStorage.getItem(STORAGE_KEY);
    if (session && session.trim()) return session.trim();
  } catch {
    /* ignore */
  }
  return readCookie().trim();
}

export function clearAffiliateId() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
  try {
    document.cookie = `${STORAGE_KEY}=; path=/; max-age=0; SameSite=Lax`;
  } catch {
    /* ignore */
  }
}
