import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-porteros',
  templateUrl: './porteros.component.html',
  styleUrls: ['./porteros.component.css']
})
export class PorterosComponent implements OnInit {

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    console.log(this.route);

  }

}
