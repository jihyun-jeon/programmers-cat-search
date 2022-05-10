class SearchResult {
  $searchResult = null;
  data = null;
  onClick = null;

  constructor({ $target, initialData, onClick }) {
    this.$searchResult = document.createElement("div");
    this.$searchResult.className = "SearchResult";
    $target.appendChild(this.$searchResult);

    this.data = initialData;

    if (localStorage.getItem("data")) {
      this.data = JSON.parse(localStorage.getItem("data"));
    }

    this.onClick = onClick;

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    localStorage.setItem("data", JSON.stringify(this.data));
    this.render();
  }

  render() {
    if (this.data.status === "wait") {
      this.$searchResult.innerHTML = ``;
    } else if (this.data.status === "loading") {
      this.$searchResult.innerHTML = `로딩 중...`;
    } else if (this.data.list.length === 0) {
      this.$searchResult.innerHTML = `검색 결과가 없습니다.`;
    } else {
      this.$searchResult.innerHTML = this.data.list
        .map(
          (cat) => `
          <div class="item">
            <img src=${cat.url} alt=${cat.name} loading="lazy" />
          </div>
        `
        )
        .join("");

      this.$searchResult.querySelectorAll(".item").forEach(($item, index) => {
        $item.addEventListener("click", () => {
          this.onClick(this.data.list[index]);
        });
      });
    }
  }
}
