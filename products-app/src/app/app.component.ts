import { Component } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
 products_data!: any[];

  constructor(private _api:ApiService){

  }

  ngOnInit(){
    this._api.getProducts().subscribe((res:any)=>{
      console.log(res)
      this.products_data = res
    })
  }
  
   getDays = (date1:string) => {
     let product_date= new Date(date1)
     let current_date =  new Date();
    // console.log(Math.round((current_date.getTime() - product_date.getTime())/(1000*60*60*24)))
    return Math.round((current_date.getTime() - product_date.getTime())/(1000*60*60*24));
  }

  onPageChange = (pageNo: number) =>{
    console.log("Current page: ", pageNo);
  }

  
  onScroll = ()=> {
    const length = this.products_data.length
    setTimeout(() => {
      const p = ' '.repeat(100).split('').map((s, i) => i + 1 + length)

      // This approach should be used to avoid creating another memory address to the array
      while(p.length) this.products_data.push(p.shift())
    }, 1000)
  }
}


