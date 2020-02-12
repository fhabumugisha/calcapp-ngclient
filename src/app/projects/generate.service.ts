
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { sanitize } from 'sanitize-filename-ts';
import { Injectable } from '@angular/core';

import { Project } from './project.model';
import { Category } from './category.model';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Injectable({
  providedIn: 'root'
})
export class GenerateService {


constructor() {}

generatePdf(project: Project) {
  const documentDefinition = {
    content: [
      {
        text: project.title,
        bold: true,
        fontSize: 20,
        alignment: 'center'
      },
      {
        text: 'Title : ' + project.title,
        style: 'name'
      },
      {
        text: 'Type : ' + project.type
      },
      {
        text: 'Description : ' + project.description
      },
      {
        text: 'Total amount : ' + project.totalAmount  + 'EUR'
      },
      this.getDetails(project)
    ],
    info: {
      title: project.title + '_PROJECT',
      author: project.title,
      subject: 'PROJECT',
      keywords: 'PROJECT, ONLINE Calcapp',
    },
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 20, 0, 10],
        decoration: 'underline'
      },
    }
  };
  const filename = sanitize(project.title);
  pdfMake.createPdf(documentDefinition).download(filename);
  // https://www.ngdevelop.tech/angular-8-export-to-pdf-using-pdfmake/
  // https://www.ngdevelop.tech/export-to-excel-in-angular-6/

}
  getDetails(project: Project) {

    const exs = [];
    if (project.type === 'Budget') {

      project.categories.forEach(category => {
        console.log(category);
      }
      );
      exs.push({
        text: 'Categories',
        style: 'header'
      }, );
      project.categories.forEach(category => {
        exs.push(
          [

            {
            columns: [
              [
                {
                text: category.title,
                style: 'jobTitle'
              },
              {
                text: category.type,
              },
              {
                text: category.description,
              },

            ],
            {
              text: category.totalAmount,
            }
            ]
          },

        ]
        );
      });
    } else {
      project.items.forEach(item => {
        exs.push(
          [
            {
              text: 'Items',
              style: 'header'
            },
            {
            columns: [
              [
                {
                text: item.title,
                style: 'jobTitle'
              },
              {
                text: item.description,
              },
              {
                text: item.amount,
              }]
            ]
          }
        ]
        );
      });
    }

    return {
      table: {
        widths: ['*'],
        body: [
          ...exs
        ]
      }
    };

  }

generateCsv(project: Project) {

}
}
