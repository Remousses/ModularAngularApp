import { CheckboxComponent } from "../../custom-component/prepare-component/checkbox/checkbox.component";
import { TableComponent } from "../../custom-component/prepare-component/table/table.component";

export class ComponentTypeConstant {
    
    static readonly TYPE_MAP: any = {
        Checkbox: CheckboxComponent,
        Table: TableComponent
    };

    static readonly CHECKBOX = 'Checkbox';
    static readonly TABLE = 'Table';
}