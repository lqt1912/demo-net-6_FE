import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class GraphUserService {
  constructor(private httpClient: HttpClient) {
  }

  getAllUsers(keyword: string) {

    let GRAPH_ENDPOINT = `https://localhost:7088/UserGraph/GetUserList?keyword=${keyword}`;
    return this.httpClient.get(GRAPH_ENDPOINT)
  }

  decodeToken(){
    return this.httpClient.get("https://localhost:7088/UserGraph/DecodeToken");
  }

  registerToken(token: string){
    return this.httpClient.get(`https://localhost:7088/UserGraph/RegisterToken?deviceToken=${token}`,{responseType: 'text'});
  }

  removeToken(token: string){
    return this.httpClient.get(`https://localhost:7088/UserGraph/RemoveToken?deviceToken=${token}`,{responseType: 'text'});
  }
}
