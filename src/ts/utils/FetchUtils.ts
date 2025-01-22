type Url = {
  protocol: "http" | "https";
  base: string;
  port?: number;
  endpoint: string;
  url: string;
};

class MakeRequests {
  URLObject: Url = {
    protocol: "http",
    base: "localhost",
    port: 80,
    endpoint: "/",
    get url() {
      return `${this.protocol}://${this.base}${
        this.port ? ":" + this.port : ""
      }${this.endpoint}`;
    },
  };

  options: RequestInit = {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-type": "application/json",
    },
    mode: "cors",
  };

  async fetchData() {
    try {
      this.options.body = JSON.stringify(this.options.body);
      let response = await fetch(this.URLObject.url, this.options);
      const status = response.status;
      response = await response.json();
      const res: any = response as unknown;
      res.status = status;
      return res;
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }
}

export default MakeRequests;
