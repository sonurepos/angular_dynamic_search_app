import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Searchrequest } from './searchrequest';
import { Searchresponse } from './searchresponse';

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {

  constructor(private httpClient: HttpClient) { }

  //calling plan name url from swagger 
  getPlaneNames(): Observable<any> {
    return this.httpClient.get<any>("https://dynamicsearchwithspringboot.herokuapp.com/planames");
  }

  //calling plan status from swagger backend
  getPlanStatus(): Observable<any> {
    return this.httpClient.get<any>("http://localhost:1234/planstatus");
  }

  //calling serach plan url from swagger (heroku we have deolpyed)

  planSearch(searchrequest: Searchrequest): Observable<Searchresponse[]> {
    return this.httpClient.post<Searchresponse[]>(`http://localhost:1234/searchPlans`, searchrequest);
  }


  //calling  excel url from sewager
  getExcel() {
    return this.httpClient.get<any>(`https://dynamicsearchwithspringboot.herokuapp.com/generateExcel`, { responseType: 'arraybuffer' as 'json' });
  }

  //calling pdf url from swagger
  getPdf() {
    return this.httpClient.get<any>(`https://dynamicsearchwithspringboot.herokuapp.com/generatePdf`, { responseType: 'arraybuffer' as 'json' });
  }
}
