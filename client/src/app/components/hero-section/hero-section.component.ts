import { Component, OnInit } from '@angular/core'
import { DataInterface } from 'src/app/services/data-interface'
import { ImgDataService } from 'src/app/services/img-data.service'

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.css'],
})
export class HeroSectionComponent implements OnInit {
  data: DataInterface[] = []
  constructor(private imgData: ImgDataService) { }

  ngOnInit(): void {
    this.imgData.getData().subscribe((data: DataInterface[]) => {
      this.data = data
    })
  }
}
