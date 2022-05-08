class Theme {
  $root = null;

  constructor({ $target }) {
    this.render($target);
    this.bindEvents();
    this.toggleMode(this.isDarkMode() ? "dark" : "light");

    console.log("Theme created.", this);
  }

  isDarkMode() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  render($target) {
    const $root = document.createElement("div");

    $root.innerHTML = `<label><input type="checkbox"${
      this.isDarkMode() ? " checked" : ""
    }>다크모드</label>`;

    this.$root = $root;
    $root.className = "Theme";

    $target.appendChild($root);
  }

  bindEvents() {
    this.$root.addEventListener("change", (e) => {
      const cbx = e.target;

      this.toggleMode(cbx.checked ? "dark" : "light");
    });
  }

  toggleMode(mode) {
    if (mode === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }
}
