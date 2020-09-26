import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
declare var $: any;
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  InvoiceItem: any; 

  @ViewChild('content') content:ElementRef; 
  constructor() {
    this.InvoiceItem = JSON.parse(localStorage.getItem("invoice"));
  }

  ngOnInit(): void {
    $('.navbar-toggler').hide();
  }
  makePdf() {
    var data = document.getElementById('content');
    html2canvas(data).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
    let doc=new jspdf();
    let ImageHeight=canvas.height * 208 /canvas.width;
    doc.addImage(imgData,0,0,208,ImageHeight);
    doc.save("image.pdf")
    });
  }

}
