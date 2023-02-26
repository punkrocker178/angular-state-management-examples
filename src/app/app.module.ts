import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RxActionFactory } from '@rx-angular/state/actions';
import { AppComponent } from './app.component';
import { AComponent } from './components/a.component';
import { BComponent } from './components/b.component';
import { CComponent } from './components/c.component';
import { ChecklistStateService } from './services/checklist-state.service';
import { ChecklistService } from './services/checklist.service';
import { ChecklistStore } from './store/checklist.store';
@NgModule({
  imports: [BrowserModule, CommonModule, ReactiveFormsModule],
  providers: [ChecklistStateService, ChecklistService, RxActionFactory, ChecklistStore],
  declarations: [AppComponent, AComponent, BComponent, CComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
