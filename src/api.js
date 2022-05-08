const API_ENDPOINT =
  "https://oivhcpn8r9.execute-api.ap-northeast-2.amazonaws.com/dev";

const api = {
  fetchCats: (keyword) =>
    fetch(`${API_ENDPOINT}/api/cats/search?q=${keyword}`).then(
      (res) => res.json(),
      () => []
    ),

  fetchCat: (id) =>
    fetch(`${API_ENDPOINT}/api/cats/${id}`).then((res) => res.json()),
};
