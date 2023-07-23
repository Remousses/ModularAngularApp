import { Component } from "@angular/core";
import { KnowOurDatasService } from "../service/know-our-datas.service";

@Component({ template: '' })
export abstract class KnowOurDatasAbstract {
    constructor(private knowOurDatasService: KnowOurDatasService) {}

    load(datas: any) {
        let formatData = { ...datas };
        delete formatData.knowOurDatasService;

        this.knowOurDatasService.load(formatData);
    }

    displayDatas(): any[] {
        return this.knowOurDatasService.displayDatas();
    }
}
