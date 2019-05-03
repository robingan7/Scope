import { Component, ViewChild, ViewContainerRef } from "@angular/core";

import { IFilterParams } from "ag-grid-community";
import { IFilterAngularComp } from "ag-grid-angular";

@Component({
  selector: 'filter-cell',
  templateUrl: './full-width-col.component.html',
  styleUrls: ['./full-width-col.component.css']
})
export class fullWidthCellRenderer implements IFilterAngularComp {
  data: any;
  isFilterActive(){
    return true;
  }
  doesFilterPass(){
    return true;
  }
  getModel(){}
  setModel(){}
  agInit(params: IFilterParams): void {
    
    this.data = params.node.data;
    
  }

  mouseWheelListener(event) {
    event.stopPropagation();
  };

  latinText() {
    return 'hello'
  }
}