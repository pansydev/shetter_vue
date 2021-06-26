export class ThemeManager {
  private currentTheme?: string;

  constructor() {
    let theme = localStorage.getItem("theme");

    if (!theme && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      theme = "dark";
    }

    this.switchTheme(theme ?? "light");
  }

  switchTheme(name: string) {
    document.documentElement.classList.remove(this.currentTheme!);
    document.documentElement.classList.add(name);

    this.currentTheme = name;
    localStorage.setItem("theme", name);
  }

  get theme(): string {
    return this.currentTheme!;
  }
}

export const themeManager = new ThemeManager();
