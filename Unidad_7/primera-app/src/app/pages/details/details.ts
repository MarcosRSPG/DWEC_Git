import { Component, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { HousingLocationInfo } from "src/app/interfaces/housing-location-info";
import { HousingService } from "src/app/services/housing.service";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-details",
  imports: [ReactiveFormsModule],
  templateUrl: "./details.html",
  styleUrl: "./details.css",
})
export class Details {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingLocationId = -1;
  housingLocation: HousingLocationInfo | undefined;
  housingService = inject(HousingService);
  applyForm = new FormGroup({
    firstName: new FormControl(""),
    lastName: new FormControl(""),
    email: new FormControl(""),
  });
  constructor() {
    this.housingLocationId = Number(this.route.snapshot.params["id"]);
    this.housingLocation = inject(HousingService).getHousingLocationById(
      this.housingLocationId,
    );
  }
  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? "",
      this.applyForm.value.lastName ?? "",
      this.applyForm.value.email ?? "",
    );
  }
}
