import { Component } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './side-bar/side-bar.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { MatSidenavContainer } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatSidenavContent } from '@angular/material/sidenav';
import { MatIcon } from '@angular/material/icon';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    imports: [
        FooterComponent,
        SidebarComponent,
        RouterOutlet,
        CommonModule,
        MatSidenavContainer,
        MatSidenav,
        MatToolbar,
        MatListModule,
        MatSidenavContent,
        MatIcon,
        NgIf,
    ],
    styleUrls: ["./layout.component.scss"]
})
export class LayoutComponent {
  isMobile = false;

  constructor(private bp: BreakpointObserver) {
    this.bp.observe([Breakpoints.Handset]).subscribe((result) => {
      this.isMobile = result.matches;
    });
  }
}
