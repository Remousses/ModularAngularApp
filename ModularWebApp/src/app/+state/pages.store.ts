import { computed, effect, inject, signal } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { signalStore, withState, withMethods, withComputed, patchState, withHooks } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { CustomComponent } from '../interface/component.interface';
import { Page } from '../interface/page.interface';
import { PageService } from '../service/page.service';
import { pipe, switchMap, tap, filter } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { ToastrService } from 'ngx-toastr';

export const PagesStore = signalStore(
  { providedIn: 'root' },
  withState({
    pages: [] as Page[],
    isLoading: false,
    error: null as any,
    currentUrl: ''
  }),

  withComputed((store) => ({
    currentPage: computed(() => {
      const currentUrl = store.currentUrl();
      return store.pages().find(p => p.url === currentUrl);
    })
  })),

  withMethods((store, pageService = inject(PageService), toastr = inject(ToastrService)) => ({
    loadFromStorage() {
      const saved = sessionStorage.getItem('pages');
      if (saved) {
        patchState(store, { pages: JSON.parse(saved) });
      }
    },

    updateCurrentUrl(url: string) {
      patchState(store, { currentUrl: url });
    },

    upsertComponent(pageId: number, component: CustomComponent) {
      patchState(store, (state) => ({
        pages: state.pages.map(p => {
          if (p.id !== pageId) return p;

          const components = p.customComponents ?? [];
          const index = components.findIndex(c => c.id === component.id);
          const updatedComponents = index !== -1
            ? components.map(c => c.id === component.id ? component : c)
            : [...components, component];

          return { ...p, customComponents: updatedComponents };
        })
      }));
    },

    deleteComponent(pageId: number, componentId: number) {
      patchState(store, (state) => ({
        pages: state.pages.map(p =>
          p.id === pageId
            ? { ...p, customComponents: p.customComponents?.filter(c => c.id !== componentId) }
            : p
        )
      }));
    },

    setPages(pages: Page[]) {
      patchState(store, { pages })
    },

    fetchPages: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() =>
          pageService.getPages().pipe(
            tapResponse({
              next: (data) => { patchState(store, { pages: data, isLoading: false }) },
              error: (error: any) => patchState(store, {
                isLoading: false,
                error,
              }),
            })
          )
        )
      )
    ),

    savePage: rxMethod<Page>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((page) =>
          pageService.save(page).pipe(
            tapResponse({
              next: (newPage) => {
                patchState(store, (state) => ({
                  pages: [...state.pages, newPage],
                  isLoading: false
                }));

                toastr.success(`The ${newPage.title} page has been successfully created!`);
              },
              error: (err) => {
                patchState(store, { isLoading: false });
                toastr.error('Your page has not been created!', 'Error');
                console.error('[PagesStore] Save error:', err);
              }
            })
          )
        )
      )
    )
  })),

  withHooks({
    onInit(store, router = inject(Router)) {
      store.loadFromStorage();

      router.events
        .pipe(
          filter(event => event instanceof NavigationEnd)
        )
        .subscribe((event: any) => {
          const url = event.urlAfterRedirects.substring(1);
          store.updateCurrentUrl(url);
        });

      effect(() => {
        const pages = store.pages();
        sessionStorage.setItem('pages', JSON.stringify(pages));
      });
    },
  })
);
