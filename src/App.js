console.log("app is running!");

class App {
  $target = null;
  data = [];

  constructor($target) {
    this.$target = $target;

    /** 캐러셀 */
    this.carousel = new Carousel({ $target });

    (async () => {
      const { data } = api.random50();

      this.carousel.setState(data.slice(0, 5));
    })();

    /** 다크모드 */
    this.theme = new Theme({ $target });

    /** 검색창 */
    this.searchInput = new SearchInput({
      $target,
      onSearch: async (keyword) => {
        this.searchResult.setState({ status: "loading" });

        const { data } = await api.fetchCats(keyword);

        this.setState({ status: "done", list: data });
      },

      onClickRandom: async () =>
        this.setState({ status: "done", list: await api.random50() }),
    });

    /** 검색결과 */
    this.searchResult = new SearchResult({
      $target,
      initialData: { status: "wait", list: this.data },
      onClick: async (_data) => {
        this.imageInfo.setState(_data);

        const { data } = api.fetchCat(_data.id);

        if (this.imageInfo.visible === false) {
          return;
        }

        if (this.imageInfo.data.id !== data.id) {
          return;
        }

        this.imageInfo.setState({ ..._data, ...data });
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
