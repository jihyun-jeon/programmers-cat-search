class ImageInfo {
  $imageInfo = null;
  data = null;

  constructor({ $target, data }) {
    const $imageInfo = document.createElement("div");
    $imageInfo.className = "ImageInfo";
    this.$imageInfo = $imageInfo;
    $target.appendChild($imageInfo);

    this.data = data;

    this.render();
    this.bindEvents();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    if (this.data.visible) {
      const { name, url, temperament, origin } = this.data.image;

      this.$imageInfo.innerHTML = `
        <div class="content-wrapper">
          <h1 class="title">
            <span>${name}</span>
            <button type="button" class="close">x</button>
          </h1>
          <img src="${url}" alt="${name}"/>        
          <ul class="description">
            <li>성격: ${temperament}</li>
            <li>태생: ${origin}</li>
          </ul>
        </div>`;
      this.$imageInfo.style.display = "block";
    } else {
      this.$imageInfo.style.display = "none";
    }
  }

  bindEvents() {
    document.addEventListener("keyup", (e) => {
      if (e.key === "Escape") {
        this.close();
      }
    });
    this.$imageInfo.addEventListener("click", ({ target }) => {
      if (target.className === "close" || target.className === "ImageInfo") {
        this.close();
      }
    });
  }

  close() {
    this.data.visible = false;
    this.render();
  }
}
