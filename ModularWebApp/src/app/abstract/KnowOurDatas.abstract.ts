import { Component, inject } from "@angular/core";
import { KnowOurDatasService } from "../service/know-our-datas.service";

@Component({ template: '' })
export abstract class KnowOurDatasAbstract {
    private knowOurDatasService = inject(KnowOurDatasService);

    load(datas: any) {
        let formatData = { ...datas };
        delete formatData.knowOurDatasService;

        this.knowOurDatasService.load(formatData);
    }

    displayDatas(): any[] {
        return this.knowOurDatasService.displayDatas();
    }
}
