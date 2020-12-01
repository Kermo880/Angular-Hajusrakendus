import { HttpClient } from "@angular/common/http";
import { Component, ElementRef, VERSION, ViewChild } from "@angular/core";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  @ViewChild("search") searchInput: ElementRef<HTMLInputElement>;

  constructor(private http: HttpClient) {}

  startSearch() {
    console.log(this.searchInput.nativeElement.value);
    this.http
      .get<any>(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${
          this.searchInput.nativeElement.value
        }`
      )
      .subscribe(
        data => {
          console.log(data);
          this.pageSummary = data.extract;
          this.pageThumbnail = data.thumbnail.source;
          this.name = data.titles.display;
        },
        error => {}
      );
  }

  name: string;

  pageSummary: string;
  pageThumbnail: string;
}
