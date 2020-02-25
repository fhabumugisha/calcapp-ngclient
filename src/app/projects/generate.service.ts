import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { sanitize } from 'sanitize-filename-ts';
import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

import { formatDate } from '@angular/common';

import { Project } from './project.model';
import { Category } from './category.model';
import { TranslateService } from '@ngx-translate/core';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Injectable({
  providedIn: 'root'
})
export class GenerateService {
  constructor(private translateService: TranslateService) {}

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
          text: 'Total amount : ' + project.totalAmount + 'EUR'
        },

      ],
      info: {
        title: project.title + '_PROJECT',
        author: project.title,
        subject: 'PROJECT',
        keywords: 'PROJECT, ONLINE Calcapp'
      },
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 20, 0, 10],
          decoration: 'underline'
        }
      }
    };
    const filename = sanitize(project.title);
    pdfMake.createPdf(documentDefinition).download(filename);
    // https://www.ngdevelop.tech/angular-8-export-to-pdf-using-pdfmake/
    // https://www.ngdevelop.tech/export-to-excel-in-angular-6/
  }


async generateExcel(project: Project) {
    // Excel Title, Header, Data
    const title = project.title;
    const header = [];
    const titleHeader = await this.translateService.get('EXCEL.TITLE').toPromise();
    const categoryHeader = await this.translateService.get('EXCEL.CATEGORY').toPromise();
    const amountHeader = await this.translateService.get('EXCEL.AMOUNT').toPromise();
    const totalAmountLabel = await this.translateService.get('EXCEL.TOTAL_AMOUNT').toPromise();
    const projectDataLabel = await this.translateService.get('EXCEL.PROJECT_DATA').toPromise();
    const copyrightLabel = await this.translateService.get('EXCEL.COPYRIGHT').toPromise();

    if (project.type === 'Budget') {
      header.push(titleHeader, categoryHeader, amountHeader, 'Description');
    } else {
      header.push(titleHeader,  amountHeader, 'Description');
    }


    // Create workbook and worksheet
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet(projectDataLabel);

    // Add Row and formatting
    const titleRow = worksheet.addRow([title]);
    titleRow.font = {
      name: 'Comic Sans MS',
      family: 4,
      size: 16,
      underline: 'double',
      bold: true
    };
    worksheet.addRow([]);
    const subTitleRow = worksheet.addRow(['Date : ' , formatDate(project.createdAt, 'dd/MM/yyyy', 'en-US')]);
    worksheet.addRow(['Type : ' , project.type]);
    worksheet.addRow(['Description : ' , project.description]);

    worksheet.addRow([totalAmountLabel + ' : ' , project.totalAmount + ' € ']);

    worksheet.mergeCells('A1:C1');
    worksheet.mergeCells('B5:C5');

    // Blank Row
    worksheet.addRow([]);

    // Add Header Row
    const headerRow = worksheet.addRow(header);

    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFF00' },
        bgColor: { argb: 'FF0000FF' }
      };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
    });


    // Add Data and Conditional Formatting
    const data = [];
    if (project.type === 'Budget') {
      project.categories.forEach(d => {
        const type = d.type;
        d.items.forEach(item => {
          const { title, description, amount } = item;
          data.push({ title, type, amount, description });
        });
      });
    } else {

        project.items.forEach(item => {
          const { title, description, amount } = item;
          data.push({ title, amount, description });
        });

    }


    data.forEach(d => {
       worksheet.addRow(Object.values(d));
    });

    worksheet.getColumn(1).width = 40;

    if (project.type === 'Budget') {
      worksheet.getColumn(2).width = 20;
      worksheet.getColumn(3).width = 10;
      worksheet.getColumn(4).width = 50;
   } else {
    worksheet.getColumn(3).width = 50;
   }

    worksheet.addRow([]);
    let totalRow ;
    if (project.type === 'Budget') {
       totalRow = worksheet.addRow([totalAmountLabel + ' :', '', project.totalAmount ]);
    } else {
       totalRow = worksheet.addRow([totalAmountLabel + ' :', project.totalAmount]);
    }
    totalRow.getCell(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFCCFFE5' }
    };
    worksheet.addRow([]);
    // Footer Row
    const footerRow = worksheet.addRow([copyrightLabel]);
    footerRow.getCell(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFCCFFE5' }
    };
    footerRow.getCell(1).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    // Merge Cells
    if (project.type === 'Budget') {
      worksheet.mergeCells(`A${footerRow.number}:D${footerRow.number}`);
    } else {
      worksheet.mergeCells(`A${footerRow.number}:C${footerRow.number}`);
    }


    // Generate Excel File with given name
    workbook.xlsx.writeBuffer().then(data => {
      const blob = new Blob([data], {
        type:
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });
      fs.saveAs(blob, project.title + '.xlsx');
    });
  }
}
