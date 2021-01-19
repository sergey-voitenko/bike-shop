import {Component, OnDestroy, OnInit} from '@angular/core';
import {filter, takeUntil} from 'rxjs/operators';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  menuItems: MenuItem[] = [];
  home: MenuItem = {
    label: 'Home',
    url: '/'
  };
  destroyed$ = new Subject();

  ngOnInit(): void {
    this.initBreadcrumbs();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  private initBreadcrumbs(): void {
    this.router.events
      .pipe(
        takeUntil(this.destroyed$),
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(() => {
        this.menuItems = this.createBreadcrumbs(this.activatedRoute.root);
        this.menuItems.forEach((breadcrumb, i, breadcrumbs) => {
          if (i === breadcrumbs.length - 1) {
            breadcrumb.url = '';
          }
        });
      });
  }

  private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: MenuItem[] = []): MenuItem[] {
    const children: ActivatedRoute[] = route.children;

    console.log(route)

    if (children.length === 0) {
      return breadcrumbs;
    }

    if (route.children[0]) {
      const routeURL: string = route.children[0].snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      const label = route.children[0].snapshot.data.breadcrumb;
      if (label) {
        breadcrumbs.push({label, url});
      }

      return this.createBreadcrumbs(route.children[0], url, breadcrumbs);
    }

    return breadcrumbs;
  }
}
