import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTooltip } from '@angular/material/tooltip';
import { CustomTableComponent } from '../../../shared/components/custom-table/custom-table.component';
import { Order } from '../../../shared/models/order';
import { AdminService } from '../../../core/services/admin.service';
import { DialogService } from '../../../core/services/dialog.service';
import { Router } from '@angular/router';
import { OrderParams } from '../../../shared/models/orderParams';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect, MatSelectChange, MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [
    MatPaginatorModule,
    MatTooltip,
    MatIcon,
    CommonModule,
    CustomTableComponent,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption
  ],
  templateUrl: './admin-orders.component.html',
  styleUrl: './admin-orders.component.scss'
})
export class AdminOrdersComponent implements OnInit {
  orders: Order[] = [];
  private adminService = inject(AdminService);
  private dialogService = inject(DialogService)
  private router = inject(Router);
  orderParams = new OrderParams();
  totalItems = 0;

  statusOptions = ['All', 'PaymentReceived', 'PaymentMismatch', 'Refunded', 'Pending','Cancelled'];

  columns = [
    { field: 'id', header: 'No.' },
    { field: 'buyerEmail', header: 'Buyer Email' },
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
      label: 'Refund',
      icon: 'undo',
      tooltip: 'Refund Order',
      disabled: (row: any) => row.status === 'Refunded',
      action: (row: any) => {
        this.openConfirmDialog(row.id);
      },
      class: 'btn-delete'
    }
  ];



  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.adminService.getOrders(this.orderParams).subscribe({
      next: response => {
        if (response.data) {
          this.orders = response.data;
          this.totalItems = response.count;
        }
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.orderParams.pageNumber = event.pageIndex + 1;
    this.orderParams.pageSize = event.pageSize;
    this.loadOrders();
  }

  onAction(action: (row: any) => void, row: any) {
    action(row);
  }

  async openConfirmDialog(id: number) {
    const confirmed = await this.dialogService.confirm(
      'Confirm refund',
      'Are you sure you want to issue this refund? This cannot be undone'
    );
    if(confirmed) this.refundOrder(id);
  }

  refundOrder(id:number){
    this.adminService.refundOrder(id).subscribe({
      next: order =>{
        this.orders = this.orders.map(o => o.id === id ? order : o);
        this.loadOrders()
      }
    })
  }

   onFilterSelect(event: MatSelectChange) {
    this.orderParams.filter = event.value;
    this.orderParams.pageNumber = 1;
    this.loadOrders();
  }
}
