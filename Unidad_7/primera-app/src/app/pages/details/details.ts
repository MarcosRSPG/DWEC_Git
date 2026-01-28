import { Component, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { HousingLocationInfo } from "src/app/interfaces/housing-location-info";
import { HousingService } from "src/app/services/housing.service";

@Component({
  selector: "app-details",
  imports: [],
  templateUrl: "./details.html",
  styleUrl: "./details.css",
})
export class Details {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingLocationId = -1;
  constructor() {
    this.housingLocationId = Number(this.route.snapshot.params["id"]);
  }
}
