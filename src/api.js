const API_ENDPOINT =
  "https://oivhcpn8r9.execute-api.ap-northeast-2.amazonaws.com/dev";

const api = {
  fetchCats: async (keyword) => {
    const res = await fetch(`${API_ENDPOINT}/api/cats/search?q=${keyword}`);

    if (!res.ok) {
      return [];
    }

    return res.json();
  },
  fetchCat: async (id) => {
    const res = await fetch(`${API_ENDPOINT}/api/cats/${id}`);

    if (!res.ok) {
      return {};
    }

    return res.json();
  },

  random50: async () => {
    const res = await fetch(`${API_ENDPOINT}/api/cats/random50`);

    if (!res.ok) {
      return { data: [] };
    }

    return res.json();
  },
};
