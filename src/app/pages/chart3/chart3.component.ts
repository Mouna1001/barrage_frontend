import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chart3',
  templateUrl: './chart3.component.html',
  styleUrls: ['./chart3.component.scss']
})
export class Chart3Component implements OnInit {

  chartdata: any = [];
  year: any = [];
  month:any = [];
  monthData:any=[];
  data:any=[];
  
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getDataFromServer();
    this.onValueChanged(this.data)
  
  }

  getDataFromServer() {
    this.http.get('http://localhost:5000/select')
    .subscribe(res => { 
      let data: any = res['rows']; 
      if (data && data.length > 0) {   
        data.forEach( (item: { year: string; normal_capacity: any; }) => {
          if (this.year.indexOf(item.year) == -1) {
            this.year.push(item.year);
          }

          this.chartdata.push({
            ...item,
            ['year'+item.year]: item.normal_capacity
          });
        })
        console.log(this.chartdata, this.year);
      }
      // this.chartdata = res;
    })
  } 

  onValueChanged(data: { value: any; } ){
    this.http.get('http://localhost:5000/query')
    .subscribe(res => { 
      let data: any = res['rows']; 
      if (data && data.length > 0) {  
        data.forEach( (item: { month: string; normal_capacity: any; }) => {
          if (this.month.indexOf(item.month) == -1) {
            this.month.push(item.month);  
          }

          this.monthData.push({
            ...item, 
            ['month'+item.month]: item.normal_capacity
          });
          
        })
        
        console.log(this.monthData, this.month);
      }
  
    }) 
    //console.log(data.value)
    
        this.monthData.filter(['month', '=', data.value]);
        this.monthData.load();
     
    }
   }
