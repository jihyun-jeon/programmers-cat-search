console.log("app is running!");

class App {
  $target = null;
  data = [];

  constructor($target) {
    this.$target = $target;

    /** 캐러셀 */
    this.carousel = new Carousel({ $target });
    api.random50().then(({ data }) => this.carousel.setState(data.slice(0, 5)));

    /** 다크모드 */
    this.theme = new Theme({ $target });

    /** 검색창 */
    this.searchInput = new SearchInput({
      $target,
      onSearch: (keyword) => {
        this.searchResult.setState({ status: "loading" });
        api
          .fetchCats(keyword)
          .then(({ data }) => this.setState({ status: "done", list: data }));
      },
      onClickRandom: () => {
        api
          .random50()
          .then(({ data }) => this.setState({ status: "done", list: data }));
      },
    });

    /** 검색결과 */
    this.searchResult = new SearchResult({
      $target,
      initialData: { status: "wait", list: this.data },
      onClick: (_data) => {
        this.imageInfo.setState(_data);

        api.fetchCat(_data.id).then(({ data }) => {
          if (this.imageInfo.visible === false) {
            return;
          }

          if (this.imageInfo.data.id !== data.id) {
            return;
          }

          this.imageInfo.setState({ ..._data, ...data });
        });
      },
    });

    /**
     * 팝업
     */
    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        image: null,
      },
    });
  }

  setState(nextData) {
    console.log(this);
    this.data = nextData;
    this.searchResult.setState(nextData);
  }
}
