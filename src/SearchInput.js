const TEMPLATE = '<input type="text">';

class SearchInput {
  constructor({ $target, onSearch, onClickRandom }) {
    this.onSearch = onSearch;

    const $searchInput = document.createElement("input");
    $searchInput.value = localStorage.getItem("recent-search") || "";
    this.$searchInput = $searchInput;
    this.$searchInput.placeholder = "고양이를 검색해보세요.|";
    $searchInput.className = "SearchInput";

    const searchWrap = document.createElement("div");
    searchWrap.className = "SearchWrap";
    searchWrap.appendChild($searchInput);

    const searchBtn = document.createElement("button");
    searchBtn.className = "SearchBtn";
    searchBtn.innerText = "random50";
    searchWrap.appendChild(searchBtn);
    searchBtn.addEventListener("click", () => onClickRandom());

    $target.appendChild(searchWrap);

    $searchInput.addEventListener("keyup", (e) => {
      if (e.keyCode === 13) {
        if (this.fivrArr.length >= 5) {
          this.fivrArr.shift();
        }

        this.fivrArr.push(e.target.value);
        localStorage.setItem("recent-list", JSON.stringify(this.fivrArr));

        this.search(e.target.value);

        this.five();
      }
    });

    console.log("SearchInput created.", this);

    this.$searchInput.focus();

    // <최근검색어 만들기>
    const savedList = localStorage.getItem("recent-list");
    this.fivrArr = savedList ? JSON.parse(savedList) : [];
    this.fiveUl = document.createElement("ul");
    this.fiveUl.className = "fiveUl";
    $target.appendChild(this.fiveUl);

    this.five();

    this.bindEvents();
  }

  five() {
    this.fiveUl.innerHTML = "";
    this.fivrArr.forEach((el) => {
      let liEl = document.createElement("li");
      liEl.innerHTML = `<button type="button" class="recent">${el}</button>`;
      this.fiveUl.appendChild(liEl);
    });
  }

  bindEvents() {
    this.fiveUl.addEventListener("click", ({ target }) => {
      if (target.nodeName !== "BUTTON") {
        return;
      }

      const { innerText: newValue } = target;

      this.search(newValue);
      this.$searchInput.value = newValue;
    });
  }

  search(text) {
    this.onSearch(text);
    localStorage.setItem("recent-search", text);
  }
}
