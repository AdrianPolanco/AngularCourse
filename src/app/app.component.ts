import { Component } from "@angular/core";
import { COURSES } from "../db-data";
import { CourseCardComponent } from "./course-card/course-card.component";
import { Course } from "./model/course";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  courses: Course[] = COURSES;
  today: Date = new Date();

  viewCourse(course: Course) {
    alert("Course viewed: " + course.description);
  }

  trackCourse(index: number, course: Course) {
    return course ? course.id : index;
  }
}
