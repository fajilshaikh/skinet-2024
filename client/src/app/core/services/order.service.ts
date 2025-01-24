import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Order, OrderToCreate } from '../../shared/models/order';
import { OrderParams } from '../../shared/models/orderParams';
import { Pagination } from '../../shared/models/pagination';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseUrl = environment.apiUrl;
  private http = inject(HttpClient);
  orderComplete = false;


  createOrder(OrderToCreate: OrderToCreate) {
    return this.http.post<Order>(this.baseUrl + 'orders', OrderToCreate);
  }

  // getOrderFromUser(){
  //   return this.http.get<Order[]>(this.baseUrl + 'orders')
  // }

  getOrderFromUser(orderParams: OrderParams) {
    let params = new HttpParams();
    if (orderParams.filter && orderParams.filter !== 'All') {
      params = params.append('status', orderParams.filter);
    }
    params = params.append('pageIndex', orderParams.pageNumber);
    params = params.append('pageSize', orderParams.pageSize);
    return this.http.get<Pagination<Order>>(this.baseUrl + 'orders', { params });
  }

  OrderCancel(id:number){
    return this.http.get<Order>(this.baseUrl + 'orders/cancel-order/' + id)
  }


  getOrderDetailed(id: number) {
    return this.http.get<Order>(this.baseUrl + 'orders/' + id);
  }

}
