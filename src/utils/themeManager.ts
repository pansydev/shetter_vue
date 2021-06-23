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
    this.currentTheme = name;

    localStorage.setItem("theme", name);
    document.documentElement.setAttribute("data-theme", name);
  }

  get theme(): string {
    return this.currentTheme!;
  }
}

export const themeManager = new ThemeManager();
