import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FeatureTwoComponent } from './dashboard.component';
import { FeatureTwoRoutes } from './feature-two.routes';

@NgModule({
  declarations: [FeatureTwoComponent],
  imports: [CommonModule, RouterModule.forChild(FeatureTwoRoutes)]
})
export class FeatureTwoModule {}
