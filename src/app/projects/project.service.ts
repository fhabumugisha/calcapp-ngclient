
import { environment } from './../../environments/environment';
import { Project } from './project.model';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { stringToKeyValue } from '@angular/flex-layout/extended/typings/style/style-transforms';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
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
      .post<{ message: string; project: any }>(
        this.baseApiUrl + '/projects',
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
        this.baseApiUrl + '/projects/' + projectId,
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
        this.baseApiUrl + '/projects/' + projectId
      )
      .pipe(
        catchError(this.handleError),
        tap(data => console.log(data))
      );
  }

  getProject(projectId: string) {
    return this.http
      .get<{ message: string; project: any }>(
        this.baseApiUrl + '/projects/' + projectId
      )
      .pipe(
        catchError(this.handleError),
        map(data => {
          return data.project;
        })
      );
  }

  private handleError(errorRes: HttpErrorResponse) {
    const errorMessage = {message: '', data: ''};
    errorMessage.message = 'An unknown error occurred!';

    if (!errorRes.error || !errorRes.error.message) {
      return throwError(errorMessage);
    }
    errorMessage.message = errorRes.error.message;
    errorMessage.data =  errorRes.error.data;
    return throwError(errorMessage);
  }

  categoryTypes = [

    {
      code: 'Income',
      label: 'Income'
    },
    {
      code: 'Expenses',
      label: 'Expenses'
    }
  ];

  getCategoryTypes() {
    return this.categoryTypes;
  }

  projectTypes =  [

    {
      code: 'Budget',
      label: 'Budget'
    },
    {
      code: 'Cost',
      label: 'Cost'
    }
  ];
  getProjectTypes(){
    return this.projectTypes;
  }
}
