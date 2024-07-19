const prod = {
  url: {
    API_URL: "52.90.51.115:8000",
  },
};

const dev = {
  url: {
    API_URL: "http://localhost:8000",
  },
};

export const config = process.env.NODE_ENV === "development" ? dev : prod;
