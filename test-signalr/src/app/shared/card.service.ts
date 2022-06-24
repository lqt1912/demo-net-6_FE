import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CardService {
  constructor(private http: HttpClient) {}

  getCard(){
      return this.http.get("https://localhost:7088/api/Card");
  }
  updateCard(data: any){
      return this.http.post("https://localhost:7088/api/Card/update-all-card", data);
  }

  updateCardInfo(data: any){
    return this.http.put(`https://localhost:7088/api/Card/${data.id}`, data);
}
}
