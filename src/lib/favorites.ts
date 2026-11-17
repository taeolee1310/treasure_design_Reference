import { useSyncExternalStore } from "react"
import { byName } from "@/lib/engine"

/** 찜한 사이트 이름 목록. 이 브라우저의 localStorage에만 저장한다(서버 없음). */
const KEY = "ui-ux-treasure:favs:v1"

const read = (): string[] => {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? "[]")
    // 목록에서 사라진 사이트 이름은 걸러낸다.
    return Array.isArray(v) ? v.filter((n): n is string => typeof n === "string" && n in byName) : []
  } catch {
    return []
  }
}

let favs: string[] = read()
const subs = new Set<() => void>()
const emit = () => subs.forEach((f) => f())

const subscribe = (f: () => void) => {
  subs.add(f)
  const onStorage = (e: StorageEvent) => {
    if (e.key !== KEY) return
    favs = read()
    f()
  }
  window.addEventListener("storage", onStorage)
  return () => {
    subs.delete(f)
    window.removeEventListener("storage", onStorage)
  }
}

export const toggleFav = (name: string) => {
  favs = favs.includes(name) ? favs.filter((n) => n !== name) : [...favs, name]
  try {
    localStorage.setItem(KEY, JSON.stringify(favs))
  } catch {
    /* 저장이 막힌 환경에서는 이번 방문 동안만 유지된다 */
  }
  emit()
}

export const useFavs = () => useSyncExternalStore(subscribe, () => favs)
