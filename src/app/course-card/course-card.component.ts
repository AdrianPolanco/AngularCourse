import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
} from "@angular/core";
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
  //ContentChild es similar a ViewChild pero en lugar de buscar en el DOM del componente, busca en el contenido proyectado SOLAMENTE
  //ViewChild no funciona en contenido proyectado con ng-content
  @ContentChild("description") courseDescription: ElementRef;
  @ContentChildren("description") courseDescriptions: QueryList<ElementRef>;

  @Input() defaultImageTpl: TemplateRef<any>;

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
    console.log(this.courseDescriptions);
    this.onCourseViewed(this.course);
  }

  onCourseViewed(course: Course): void {
    return this.courseViewed.emit(course);
  }
}
