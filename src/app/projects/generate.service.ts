
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { sanitize } from 'sanitize-filename-ts';
import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

//import { DatePipe } from '@angular/common';
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


  generateExcel(project: Project) {

    //Excel Title, Header, Data
    const title = project.title;
    const header = ["Title", "Amount", "Decription","Category"]


    //Create workbook and worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Project Data');


    //Add Row and formatting
    let titleRow = worksheet.addRow([title]);
    titleRow.font = { name: 'Comic Sans MS', family: 4, size: 16, underline: 'double', bold: true }
    worksheet.addRow([]);
    let subTitleRow = worksheet.addRow(['Date : ' + new Date(), 'medium'])


    worksheet.mergeCells('A1:D2');


    //Blank Row
    worksheet.addRow([]);

    //Add Header Row
    let headerRow = worksheet.addRow(header);

    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFF00' },
        bgColor: { argb: 'FF0000FF' }
      }
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    })
    // worksheet.addRows(data);


    // Add Data and Conditional Formatting
    const data =  [];
    project.categories.forEach(d => {
      const row = {};
      const type = d.type;
     d.items.forEach(item => {
      const { title, description, amount} = item;
      data.push({title,amount, description,  type});

     })
    });

    data.forEach(d => {
      console.log(Object.values(d));
      let row = worksheet.addRow(Object.values(d));
    });


    worksheet.getColumn(1).width = 40;
    worksheet.getColumn(3).width = 30;
    worksheet.getColumn(4).width = 30;
    worksheet.addRow([]);


    //Footer Row
    let footerRow = worksheet.addRow(['This is system generated excel sheet.']);
    footerRow.getCell(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFCCFFE5' }
    };
    footerRow.getCell(1).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }

    //Merge Cells
    worksheet.mergeCells(`A${footerRow.number}:F${footerRow.number}`);

    //Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, project.title+'.xlsx');
    })

  }

}
