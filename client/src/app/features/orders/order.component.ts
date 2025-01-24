import { Component, inject, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { OrderService } from '../../core/services/order.service';
import { Order } from '../../shared/models/order';
import { Router, RouterLink } from '@angular/router';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { CustomTableComponent } from '../../shared/components/custom-table/custom-table.component';
import { DialogService } from '../../core/services/dialog.service';
import { OrderParams } from '../../shared/models/orderParams';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    RouterLink,
    CurrencyPipe,
    DatePipe,
    CustomTableComponent
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit {
  baseUrl = environment.apiUrl;
  private orderService = inject(OrderService);
  private dialogService = inject(DialogService)
  orders: Order[] = [];
  private router = inject(Router);
  orderParams = new OrderParams();
  totalItems = 0;

  columns = [
    { field: 'id', header: 'No.' },
    { field: 'orderDate', header: 'Order Date', pipe: 'date', pipeArgs: { year: 'numeric', month: 'short', day: 'numeric' } },
    { field: 'total', header: 'Total', pipe: 'currency', pipeArgs: 'USD' },
    { field: 'status', header: 'Status' }
  ];

  actions = [
    {
      label: 'View',
      icon: 'visibility',
      tooltip: 'View Order',
      action: (row: any) => {
        this.router.navigateByUrl(`/orders/${row.id}`)
      },
      class: 'btn-edit'
    },
    {
      label: 'Cancel',
      icon: 'cancel',
      tooltip: 'Cancel Order',
      disabled: (row: any) => row.status === 'Refunded' || row.status == 'Cancelled',
      action: (row: any) => {
        console.log(row);
        this.openConfirmDialog(row.id);
      },
      class: 'btn-delete'
    }
  ];

  ngOnInit(): void {
    this.loadMyOrders()
  }

   // this.orderService.getOrderFromUser().subscribe({
    //   next: orders => this.orders = orders
    // })

  loadMyOrders() {
    this.orderService.getOrderFromUser(this.orderParams).subscribe({
      next: response => {
        if (response) {
          this.orders = response.data;
          this.totalItems = response.count;
        }
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.orderParams.pageNumber = event.pageIndex + 1;
    this.orderParams.pageSize = event.pageSize;
    this.loadMyOrders();
  }

  onAction(action: (row: any) => void, row: any) {
    action(row);
  }

  async openConfirmDialog(id: number) {
    const confirmed = await this.dialogService.confirm(
      'Cancel order',
      'Are you sure you want to cancel order? This cannot be undone'
    );
    if (confirmed) this.CancelOrder(id);
  }

  CancelOrder(id: number) {
    this.orderService.OrderCancel(id).subscribe({
      next: order =>{
        this.orders = this.orders.map(o => o.id === id ? order : o);
        this.loadMyOrders()
      }
    })
  }
}
