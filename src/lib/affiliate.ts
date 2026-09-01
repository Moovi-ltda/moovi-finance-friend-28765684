const STORAGE_KEY = "moovi_afiliado_id";
const TS_KEY = "moovi_afiliado_ts";
const PARAM_NAMES = ["ref", "afiliado", "afiliado_id", "aff", "ref_id", "utm_ref"];

/** Janela curta de atribuição: last-click vence e expira em 30 minutos. */
const TTL_MS = 30 * 60 * 1000;

function safeLocalSet(value: string) {
  const now = String(Date.now());
  try {
    localStorage.setItem(STORAGE_KEY, value);
    localStorage.setItem(TS_KEY, now);
  } catch {
    /* storage bloqueado */
  }
  try {
    sessionStorage.setItem(STORAGE_KEY, value);
    sessionStorage.setItem(TS_KEY, now);
  } catch {
    /* storage bloqueado */
  }
  try {
    // cookie de sessão curto (30 min) como fallback
    document.cookie = `${STORAGE_KEY}=${encodeURIComponent(value)}; path=/; max-age=${TTL_MS / 1000}; SameSite=Lax`;
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

function isExpired(): boolean {
  const read = (s: Storage | null) => {
    try {
      return s?.getItem(TS_KEY) || "";
    } catch {
      return "";
    }
  };
  const ts = Number(read(typeof localStorage !== "undefined" ? localStorage : null) || read(typeof sessionStorage !== "undefined" ? sessionStorage : null));
  if (!ts) return false; // sem timestamp: confia no max-age do cookie
  return Date.now() - ts > TTL_MS;
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

/** Captura o ref da URL (last-click vence sempre) e persiste por 30 min. */
export function captureAffiliateId(): string {
  const fromParam = fromUrl();
  if (fromParam) {
    // sobrescreve qualquer afiliado anterior — última origem vence
    clearAffiliateId();
    safeLocalSet(fromParam);
    return fromParam;
  }
  return getAffiliateId();
}

/** Lê o ID do afiliado; retorna vazio se a janela de atribuição expirou. */
export function getAffiliateId(): string {
  const url = fromUrl();
  if (url) return url;

  if (isExpired()) {
    clearAffiliateId();
    return "";
  }

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
    localStorage.removeItem(TS_KEY);
  } catch {
    /* ignore */
  }
  try {
    sessionStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(TS_KEY);
  } catch {
    /* ignore */
  }
  try {
    document.cookie = `${STORAGE_KEY}=; path=/; max-age=0; SameSite=Lax`;
  } catch {
    /* ignore */
  }
}
