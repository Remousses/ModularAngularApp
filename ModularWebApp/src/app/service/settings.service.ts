import { Injectable, Injector, inject } from '@angular/core';
import { Router } from '@angular/router';

import { DragAndDropComponent } from '../drag-and-drop/drag-and-drop.component';
import { Page } from '../interface/page.interface';
import { HomeComponent } from '../home/home.component';
import { PageService } from './page.service';
import { PagesFacade } from '../+state/pages.facade';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {

    private readonly injector = inject(Injector);
    private readonly pagesService = inject(PageService);
    private readonly pagesFacade = inject(PagesFacade);

    private readonly routes: any[] = [
        {
            path: '', redirectTo: 'home', pathMatch: 'full'
        },
        {
            path: 'home', component: HomeComponent
        }
    ];

    loadSettings(): Promise<any> {
        return new Promise((resolve, reject) => {
            const router = this.injector.get(Router);
            const loadedRoutes = this.pagesFacade.pages();

            if (loadedRoutes.length === 0) {
                router.config = this.routes;
                return this.pagesService.getPages()
                    .subscribe({
                        next: pages => {
                            this.pagesFacade.setPages(pages);
                            pages.forEach(page => router.config.push(this.pushRouteConfig(page)));
                            resolve(true);
                        },
                        error: error => {
                            alert(error);
                            reject(false);
                        }
                    });
            }
            router.config = this.routes;
            loadedRoutes.forEach((page) => router.config.push(this.pushRouteConfig(page)));

            resolve(true);
            return;
        });
    }

    private pushRouteConfig(page: Page) {
        return { path: page.url, component: DragAndDropComponent, data: { page } };
    }
}
