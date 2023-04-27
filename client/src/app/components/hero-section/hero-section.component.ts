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
  copyData: DataInterface[] = []
  openCheck: boolean = false
  leftCheck: boolean = true
  rightCheck: boolean = true
  Img: string = ''
  Description: string = ''
  ii: number = 0
  formOpen:boolean=false
  constructor(private imgData: ImgDataService) {}

  ngOnInit(): void {
    this.getdata()
  }
  getdata(): void {
    this.imgData.getData().subscribe((data: DataInterface[]) => {
      this.data = data
      this.copyData = data
    })
  }
  search(value: string): void {
    let searchdata: DataInterface[] = []
    this.copyData.forEach((element: DataInterface) => {
      if (element.description.toLowerCase().startsWith(value.toLowerCase())) {
        searchdata.push(element)
      }
    })
    this.data = searchdata
  }
  openLightBox(i: number) {
    if (i == 0) {
      this.leftCheck = false
    } else {
      this.leftCheck = true
    }
    if (i + 1 == this.data.length) {
      this.rightCheck = false
    } else {
      this.rightCheck = true
    }
    this.openCheck = true
    this.Img = this.data[i].url
    this.Description = this.data[i].description
    this.ii = i
  }
}
