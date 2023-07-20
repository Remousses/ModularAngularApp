import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class KnowOurDatasService {

    allDatas: any[] = [] ;

    load(data: any) {
        this.allDatas.push(data);
    }

    displayDatas(): any[] {
        return this.allDatas;
    }
}