import { ThrowStmt } from '@angular/compiler';
import { HostListener } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  productLoaded: boolean = false;
  scrollLoad: boolean = false;

  products:any[] = [];
  allProducts:any[] = [];

  sorts:any[] = [
    {
      name: 'Size',
      value: 'size'
    },
    {
      name: 'Price',
      value: 'price'
    },
    {
      name: 'Id',
      value: 'id'
    }
  ]
  count: number;

  constructor(private service: ApiserviceService) { }

  ngOnInit(): void {
    this.productLoaded = false;
    this.service.getProducts().subscribe(
      res=> {        
        this.setProductList(res);
      }
    );
    this.count = 16;
  }

  setProductList(res){
    this.allProducts = res;
    this.products = this.allProducts.slice(0,12);
    this.productLoaded = true;        
  }

  // Scroll Load Items

  @HostListener('window:scroll', [])
  async onScroll(): Promise<void> {
    if (this.bottomReached()) {      
      this.scrollLoad = true;

      if (this.count + 4 <= this.allProducts.length) {
          //your code to be executed after 1 second
          await this.delay(1000);
          this.count = this.count + 4;
          this.scrollLoad = false;      

          this.products = this.allProducts.slice(0, this.count);
      }
      else if(this.products.length < this.allProducts.length){
        this.products = this.allProducts;
      }
    }
  }

   delay = (time:number) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(0);
      }, time);
    });
  }

  bottomReached(): boolean {
    // console.log( window.innerHeight + window.scrollY >= document.body.offsetHeight)
    return window.innerHeight + window.scrollY >= document.body.offsetHeight;
  }

  // Sort Items

  sortProducts(event){    
    this.productLoaded = false;
    this.service.sortProduct(event.value).subscribe(
      res=> {                 
        this.setProductList(res);
        this.count = 16;
      }
    )
  }


  getModifiedDate(date:string){
    let current_date = new Date();
    let product_date = new Date(date);

    return Math.round((current_date.getTime() - product_date.getTime())/(1000*60*60*24));

  }

}
