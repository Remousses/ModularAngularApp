import { Component, inject } from "@angular/core";
import { KnowOurDatasService } from "../service/know-our-datas.service";

@Component({
    template: '',
    standalone: true
})
export abstract class KnowOurDatasAbstract {
    private readonly knowOurDatasService = inject(KnowOurDatasService);

    load(datas: any) {
        let formatData = { ...datas };
        delete formatData.knowOurDatasService;
        delete formatData.apiService;
        delete formatData.pageService;

        this.knowOurDatasService.load(formatData);
    }

    displayDatas(): any[] {
        return this.knowOurDatasService.displayDatas();
    }
}
