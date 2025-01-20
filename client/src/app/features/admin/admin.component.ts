import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Order } from '../../shared/models/order';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AdminService } from '../../core/services/admin.service';
import { MatIcon } from '@angular/material/icon';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect, MatSelectChange } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DialogService } from '../../core/services/dialog.service';
import { OrderParams } from '../../shared/models/orderParams';
import { AdminOrdersComponent } from "./admin-orders/admin-orders.component";
import { AdminCatalogComponent } from "./admin-catalog/admin-catalog.component";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    MatTableModule,
    MatIcon,
    CurrencyPipe,
    DatePipe,
    RouterLink,
    MatPaginator,
    MatTabsModule,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    MatTooltipModule,
    AdminOrdersComponent,
    AdminCatalogComponent
],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent  {


  // displayedColumns: string[] = ['id', 'buyerEmail', 'orderDate', 'total', 'status', 'action'];
  // dataSource = new MatTableDataSource<Order>([]);
  // private adminService = inject(AdminService);
  // private dialogService = inject(DialogService);
  // orderParams = new OrderParams();
  // totalItems = 0;
  // statusOptions = ['All', 'PaymentReceived', 'PaymentMismatch', 'Refunded', 'Pending'];

  // ngOnInit(): void {
  //   this.loadOrders();
  // }

  

  // loadOrders() {
  //   this.adminService.getOrders(this.orderParams).subscribe({
  //     next: response => {
  //       if (response.data) {
  //         this.dataSource.data = response.data;
  //         this.totalItems = response.count;
  //       }
  //     }
  //   });
  // }

  // onPageChange(event: PageEvent) {
  //   this.orderParams.pageNumber = event.pageIndex + 1;
  //   this.orderParams.pageSize = event.pageSize;
  //   this.loadOrders();
  // }

  // onFilterSelect(event: MatSelectChange) {
  //   this.orderParams.filter = event.value;
  //   this.orderParams.pageNumber = 1;
  //   this.loadOrders();
  // }

  // async openConfirmDialog(id: number) {
  //   const confirmed = await this.dialogService.confirm(
  //     'Confirm refund',
  //     'Are you sure you want to issue this refund? This cannot be undone'
  //   )

  //   if (confirmed) this.refundOrder(id);
  // }

  // refundOrder(id: number) {
  //   this.adminService.refundOrder(id).subscribe({
  //     next: order => {
  //       this.dataSource.data = this.dataSource.data.map(o => o.id === id ? order : o)
  //     }
  //   })
  // }

}
