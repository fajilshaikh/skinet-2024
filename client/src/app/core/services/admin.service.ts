import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Pagination } from '../../shared/models/pagination';
import { Order } from '../../shared/models/order';
import { OrderParams } from '../../shared/models/orderParams';
import { Product } from '../../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = environment.apiUrl
  private http = inject(HttpClient)

  getOrders(orderParams: OrderParams) {
    let params = new HttpParams();
    if (orderParams.filter && orderParams.filter !== 'All') {
      params = params.append('status', orderParams.filter);
    }
    params = params.append('pageIndex', orderParams.pageNumber);
    params = params.append('pageSize', orderParams.pageSize);
    return this.http.get<Pagination<Order>>(this.baseUrl + 'admin/orders', { params });
  }

  getOrder(id: number) {
    return this.http.get<Order>(this.baseUrl + 'admin/orders/' + id);
  }

  refundOrder(id: number) {
    return this.http.post<Order>(this.baseUrl + 'admin/orders/refund/' + id, {})
  }

  createProduct(prodcut: Product) {
    return this.http.post<Product>(this.baseUrl + 'products', prodcut);
  }

  updateProduct(product: Product) {
    return this.http.put(this.baseUrl + 'products/' + product.id, product);
  }

  deleteProduct(id:number){
    return this.http.delete(this.baseUrl + 'products/' + id);
  }

  updateStock(id:number,newQuantity:number){
    return this.http.put(this.baseUrl + 'products/update-stock/' + id , newQuantity);
  }
}
