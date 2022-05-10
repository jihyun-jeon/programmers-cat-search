class SearchResult {
  $searchResult = null;
  data = null;
  onClick = null;

  constructor({ $target, initialData, onClick }) {
    this.$searchResult = document.createElement("div");
    this.$searchResult.className = "SearchResult";
    $target.appendChild(this.$searchResult);

    this.data = initialData;
    this.onClick = onClick;

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    console.log(this.data);
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
            <img src=${cat.url} alt=${cat.name} />
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
