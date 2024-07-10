import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Course } from "../model/course";
import { on } from "events";

@Component({
  selector: "course-card",
  templateUrl: "./course-card.component.html",
  styleUrl: "./course-card.component.css",
})
export class CourseCardComponent {
  //Recibir props
  @Input({ required: true }) course: Course;
  //Emitir eventos y datos desde este componente hacia el padre, los eventos personalizados no se propagan como los nativos como click, mouseover, etc.
  //Si se especifica un nombre en los parametros del @Output(), ese nombre sera el nombre del evento que se emitira
  //Si no se especifica nada, pues Angular tomara el nombre de la variable como el nombre del evento
  @Output("courseSelected") courseViewed = new EventEmitter<Course>();

  styleWithClasses() {
    return { beginner: this.course.category === "BEGINNER" };
  }

  style() {
    return this.course.category === "BEGINNER"
      ? {
          "text-decoration": "underline",
        }
      : {};
  }

  getSpan() {
    return {
      [this.course.category.toLowerCase()]: true,
    };
  }

  clickButton() {
    // alert("Button clicked");
    this.onCourseViewed(this.course);
  }

  onCourseViewed(course: Course): void {
    return this.courseViewed.emit(course);
  }
}
