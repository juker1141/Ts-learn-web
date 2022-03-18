import axios, { AxiosPromise } from "axios";

interface HasId {
  id?: number;
};

export class Sync<T extends HasId> {
  constructor(public rootUrl: string) {};

  fetch(id: number): AxiosPromise {
    return axios.get(`${this.rootUrl}/${id}`);
  };

  save(data: T): AxiosPromise {
    const { id } = data;
    // 如果有 id 那代表該 User 已經存在資料庫，put更改既有資料
    // 反之新增一筆 User 資料
    if (id) {
      return axios.put(`${this.rootUrl}/${id}`, data);
    } else {
      return axios.post(this.rootUrl, data);
    }
  };
};