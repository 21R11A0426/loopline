import { create } from 'zustand'
export const useThemeStore = create((set) => ({
    theme:localStorage.getItem("getTheme")||"dark",
  setTheme:(theme)=>{localStorage.setItem("getTheme",theme)
    set({theme})}
}))