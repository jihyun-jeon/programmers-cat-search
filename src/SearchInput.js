const TEMPLATE = '<input type="text">';

class SearchInput {
  constructor({ $target, onSearch }) {
    this.onSearch = onSearch;

    const $searchInput = document.createElement("input");
    this.$searchInput = $searchInput;
    this.$searchInput.placeholder = "고양이를 검색해보세요.|";

    $searchInput.className = "SearchInput";
    $target.appendChild($searchInput);

    $searchInput.addEventListener("keyup", (e) => {
      if (e.keyCode === 13) {
        if (this.fivrArr.length >= 5) {
          this.fivrArr.shift();
        }

        this.fivrArr.push(e.target.value);

        onSearch(e.target.value);
        //
        this.five();
      }
    });

    console.log("SearchInput created.", this);

    this.$searchInput.focus();

    // <최근검색어 만들기>
    this.fivrArr = [];
    this.fiveUl = document.createElement("ul");
    this.fiveUl.className = "fiveUl";
    $target.appendChild(this.fiveUl);

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

      this.onSearch(newValue);
      this.$searchInput.value = newValue;
    });
  }
}
