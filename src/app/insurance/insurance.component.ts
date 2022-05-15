import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validator, FormBuilder } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { InsuranceService } from '../insurance.service';
import { Searchrequest } from '../searchrequest';
import { Searchresponse } from '../searchresponse';

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.css']
})
export class InsuranceComponent implements OnInit {

  constructor(private insuranceService: InsuranceService) { }

  //data from response we are storing here and will use below varialbes in template 
  public planNamesComponent: string[] | undefined;
  public planStatusComponent: any;

  //this variables for form binding
  public selectedPlan = "select";
  public selectedStatus = "select";

  //to bind input data to output data 
  searchrequest: Searchrequest = new Searchrequest();
  searchresponse: Searchresponse[] = [];

  //when the component will load , it show plan name and plan status dropdown data
  ngOnInit(): void {
    this.getPlaneNamesComponent();
    this.getPlanStatusComponent();

  }
  getPlaneNamesComponent() {
    this.insuranceService.getPlaneNames().subscribe(data => {
      this.planNamesComponent = data;
    });
  }

  getPlanStatusComponent() {
    this.insuranceService.getPlanStatus().subscribe(data => {
      this.planStatusComponent = data;
    });
  }

  //event call from template/UI
  onSubmit() {
    this.searchComponent();
  }

  searchComponent() {
    //what ever cxmr will select in dropdown of plan name and plan status , it will pass to variable of searhc request binding class and response data will assign to Search Response binding class varaible 
    this.searchrequest.planName = this.selectedPlan;
    this.searchrequest.planStatus = this.selectedStatus;

    this.insuranceService.planSearch(this.searchrequest).subscribe(data => {
      this.searchresponse = data;
    });

  }

  exportToExcelComponent() {
    this.insuranceService.getExcel().subscribe(data => {
      let file = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
  }

  exportToPdfComponent() {
    this.insuranceService.getPdf().subscribe(data => {
      let file = new Blob([data], { type: 'application/pdf' });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });

  }

}
