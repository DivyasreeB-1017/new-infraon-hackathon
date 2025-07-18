import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MenuTrackerService {
    private apiUrl = environment.apiURL;

  constructor(private http: HttpClient) {}

  logMenuClick(data: { menu_id: string, user_id: string, time: string }) {
    const url = '/api/menu-click'; // Replace with your actual endpoint
    return this.http.post(url, data).subscribe({
      next: res => console.log('Menu click logged:', res),
      error: err => console.error('Logging failed:', err)
    });
  }

  getInitialMenu(data: { smartgridview: any }): Observable<any> {
  const url = this.apiUrl + '/get_menu_config?smartgridview=' + data.smartgridview;
  console.log("URL>>>>", url);
  return this.http.get(url);  // ← no `.subscribe()` here
}

}
