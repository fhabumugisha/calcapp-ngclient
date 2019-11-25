
import { environment } from './../../environments/environment';
import { Project } from "./project.model";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { map, catchError, tap } from "rxjs/operators";
import { throwError } from "rxjs";


@Injectable({
  providedIn: "root"
})
export class ProjectService {
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };
   baseApiUrl =  environment.apiUrl;
  constructor(private http: HttpClient, private router: Router) {}

  getProjects(projectsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${projectsPerPage}&page=${currentPage}`;
    return this.http
      .get<{ message: string; projects: any, totalItems: number}>(this.baseApiUrl +'/projects' + queryParams)
      .pipe(
        catchError(this.handleError),
        map(data => {

          return {
            projects : data.projects.map(p => {
              return {
                ...p,
                id: p._id
              };
            }),
            totalItems : data.totalItems

          }
        })
      );
  }

  createProject(project: Project) {
    return this.http
      .post<{ message: string; projects: any }>(
        this.baseApiUrl + "/projects",
        project,
        this.httpOptions
      )
      .pipe(
        catchError(this.handleError),
        tap(data => console.log(data))
      );
  }

  updateProject(projectId: string, project: Project) {
    return this.http
      .put<{ message: string; project: any }>(
        this.baseApiUrl + "/projects/" + projectId,
        project,
        this.httpOptions
      )
      .pipe(
        catchError(this.handleError)

      );
  }

  deleteProject(projectId: string) {
    return this.http
      .delete<{ message: string }>(
        this.baseApiUrl + "/projects/" + projectId
      )
      .pipe(
        catchError(this.handleError),
        tap(data => console.log(data))
      );
  }

  getProject(projectId: string) {
    return this.http
      .get<{ message: string; project: any }>(
        this.baseApiUrl + "/projects/" + projectId
      )
      .pipe(
        catchError(this.handleError),
        map(data => {
          return data.project;
        })
      );
  }

  private handleError(errorRes: HttpErrorResponse) {
    const errorMessage = "An unknown error occurred!";
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }

    return throwError(errorRes.error.error);
  }
}
