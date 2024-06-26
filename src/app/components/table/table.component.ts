import {SelectionModel} from '@angular/cdk/collections';
import {Component} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common'; 
import { ToDo } from '../../models/todo.interface';
import { MatIconModule } from '@angular/material/icon';
import { ToDoResponse } from '../../models/todo.response.interface';

@Component({
  selector: 'app-table',
  styleUrl: 'table.component.scss',
  templateUrl: 'table.component.html',
  standalone: true,
  imports: [MatTableModule, MatCheckboxModule, CommonModule, MatIconModule],
})

export class TableComponent {

  ELEMENT_DATA: ToDo[] = [];
  displayedColumns: string[] = ['select', 'id', 'name', 'edit', 'delete'];
  dataSource = new MatTableDataSource<ToDo>(this.ELEMENT_DATA);
  selection = new SelectionModel<ToDo>(true, []);

  constructor(public api:ApiService){}

  fetchData(){
    this.api.getData().subscribe(
      (response:ToDoResponse) => {
        console.log(response.todos);
        this.ELEMENT_DATA = response.todos;
        this.dataSource = new MatTableDataSource<ToDo>(this.ELEMENT_DATA);
      }
    )
  }
 
  ngOnInit():void{
    this.fetchData();
  }


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: ToDo): string { 
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
  }
}