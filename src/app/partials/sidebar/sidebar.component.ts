import { Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { TenantService } from 'src/app/services/tenant/tenant.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input()
  items: {label: string, routerLink: any}[] = [];

  @Input()
  razonSocial: string | undefined;

  @ViewChild('sidebar') sidebar: ElementRef | undefined;

  faTimes = faTimes;

  constructor(
    public tenantService: TenantService,
    private router: Router
    ) {
      router.events.subscribe((val) => {
        if(this.sidebar){
          this.sidebar.nativeElement.classList.remove('active')
        }
    });
    }
  

  ngOnInit(): void {
    
  }

  close(){
    if(this.sidebar){
      this.sidebar.nativeElement.classList.remove('active')
    }
  }
  
}
