/**
 *
 * data = {고양이 정보 }
 *
 */

class ImageInfo {
  $imageInfo = null;
  data = null;
  visible = false;

  constructor({ $target, data }) {
    const $imageInfo = document.createElement("div");
    $imageInfo.className = "ImageInfo";
    $imageInfo.style.display = "none";
    this.$imageInfo = $imageInfo;
    $target.appendChild($imageInfo);

    this.data = data;

    this.bindEvents();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    if (!this.data) {
      return;
    }

    const { name, url, temperament, origin } = this.data;

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
    this.visible = true;
    this.$imageInfo.classList.add("fadeinAni");
    this.$imageInfo.classList.remove("fadeoutAni");
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
    this.visible = false;
    this.$imageInfo.classList.add("fadeoutAni");
    this.$imageInfo.classList.remove("fadeinAni");
    setTimeout(() => {
      this.$imageInfo.style.display = "none";
    }, 2000);
  }
}
