import { Project } from './project.model';
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { map,catchError, tap } from "rxjs/operators";
import { throwError } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class ProjectService {

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };
  constructor(private http: HttpClient, private router: Router) {}

  getProjects() {
    return this.http
      .get<{ message: string, projects: any }>("http://localhost:3000/projects")
      .pipe(
        catchError(this.handleError),
        map(data => {
          console.log(data);
          return data.projects.map(p => {
            return {
              ...p,
              id: p._id
            };
          });
        })
      );
  }

  createProject(project: Project) {
    return this.http
      .post<{ message: string; projects: any }>("http://localhost:3000/projects", project, this.httpOptions )
      .pipe(
        catchError(this.handleError),
        tap(data =>  console.log(data))
      );
  }

  deleteProject(projectId: string) {
    return this.http
    .delete<{ message: string }>("http://localhost:3000/projects/" + projectId )
    .pipe(
      catchError(this.handleError),
      tap(data =>  console.log(data))
    );
  }

  private handleError(errorRes: HttpErrorResponse) {
    const errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }

    return throwError(errorRes.error.error);
  }
}
