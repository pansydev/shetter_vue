export class ThemeManager {
  private currentTheme: string;

  constructor() {
    this.currentTheme = localStorage.getItem("theme") === "dark" ? "dark" : "light";

    if (
      this.currentTheme !== "dark" &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      this.currentTheme = "dark";
    }

    this.switchTheme(this.currentTheme);
  }

  switchTheme(name: string) {
    this.currentTheme = name;
    console.log(name);

    localStorage.setItem("theme", name);
    document.documentElement.setAttribute("data-theme", name);
  }

  get theme(): string {
    return this.currentTheme;
  }
}

export const themeManager = new ThemeManager();
