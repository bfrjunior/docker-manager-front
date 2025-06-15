import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Container } from '../models/container.model';
import { Image } from '../models/image.model';

@Injectable({
  providedIn: 'root'
})
export class DockerService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  // Container operations
  getContainers(showAll: boolean = true): Observable<Container[]> {
    return this.http.get<Container[]>(`${this.apiUrl}/containers?showAll=${showAll}`);
  }

  getContainerById(id: string): Observable<Container> {
    return this.http.get<Container>(`${this.apiUrl}/containers/${id}`);
  }

  startContainer(id: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/containers/${id}/start`, {});
  }

  stopContainer(id: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/containers/${id}/stop`, {});
  }

  deleteContainer(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/containers/${id}`);
  }

  createContainer(imageName: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/containers?imageName=${imageName}`, {});
  }

  // Image operations
  getImages(): Observable<Image[]> {
    return this.http.get<Image[]>(`${this.apiUrl}/images`);
  }

  filterImages(filterName: string): Observable<Image[]> {
    return this.http.get<Image[]>(`${this.apiUrl}/images/filter?filterName=${filterName}`);
  }
}