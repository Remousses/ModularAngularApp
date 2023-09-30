import { Injectable, Injector, inject } from '@angular/core';
import { Router } from '@angular/router';

import { PageService } from './page.service';
import { DragAndDropComponent } from '../drag-and-drop/drag-and-drop.component';
import { Page } from '../interface/page.interface';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {

    private injector = inject(Injector);
    private pageService = inject(PageService);

    private routes: any[] = [
        {
            path: '/', redirectTo: '/home', pathMatch: 'full'
        }
    ];

    loadSettings(): Promise<any> {
        return new Promise((resolve, reject) => {
            const router = this.injector.get(Router);
            const loadedRoutes = this.pageService.getLoadedPages();

            if (loadedRoutes.length === 0) {
                router.config = this.routes;
                return this.pageService.getPages()
                    .subscribe({
                        next: pages => {
                            this.pageService.setLoadedPages(pages);
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
