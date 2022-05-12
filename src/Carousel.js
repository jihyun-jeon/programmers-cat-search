class Carousel {
  constructor({ $target }) {
    const div = (this.div = document.createElement("div"));
    div.className = "CarouselWrapper";

    div.innerHTML = `
			<button type="button" class="left">좌</button>
			<button type="button" class="right">우</button>
			<ul class="Carousel"></ul>
		`;

    $target.appendChild(div);

    this.ul = div.querySelector("ul");

    this.bindEvent();
  }

  setState(list) {
    this.list = list;
    this.render();
  }

  render() {
    if (!this.list.length) {
      this.div.style.display = "none";
    }

    this.ul.innerHTML = "";

    for (let item of this.list) {
      const li = document.createElement("li");
      li.style.backgroundImage = `url(${item.url})`;
      this.ul.appendChild(li);
    }
  }

  bindEvent() {
    let width = 0;
    this.div.addEventListener("click", (e) => {
      if (e.target.className === "left") {
        width -= 480;
        if (width <= -2400) {
          width = 0;
        }
        this.ul.style.transform = `translateX(${width}px)`;

        return;
      } else {
        width += 480;
        if (width >= 480) {
          width = -1920;
        }
        this.ul.style.transform = `translateX(${width}px)`;
      }
    });
  }
}
