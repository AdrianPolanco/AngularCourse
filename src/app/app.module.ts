import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CourseCardComponent } from "./course-card/course-card.component";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  declarations: [AppComponent, CourseCardComponent],
  imports: [BrowserModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
