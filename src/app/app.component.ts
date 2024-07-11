import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren,
} from "@angular/core";
import { COURSES } from "../db-data";
import { CourseCardComponent } from "./course-card/course-card.component";
import { Course } from "./model/course";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements AfterViewInit {
  courses: Course[] = COURSES;
  today: Date = new Date();

  constructor(private cdr: ChangeDetectorRef) {}
  //Puedes usar ViewChild tanto en un componente directamente como en una referencia
  //El ViewChild siempre tendra el valor del primer componente que matchee

  //ViewChild y ViewChildren solo pueden ver dentro del alcance del componente dentro del que este, no pueden hacer query dentro de componentes padres o hijos desde otro componente

  //@ViewChild(CourseCardComponent) courseCardComponent: CourseCardComponent;
  @ViewChild("cardRef") courseCardComponent: CourseCardComponent;
  //Usamos ElementRef para obtener una referencia a un elemento DOM nativo como un div
  @ViewChild("coursesRef") coursesDiv: ElementRef;
  //Obtenemos el ElementRef del componente
  @ViewChild("cardRef", { read: ElementRef }) courseCardElement: ElementRef;

  @ViewChildren(CourseCardComponent)
  coursesComponents: QueryList<CourseCardComponent>;

  quantityCourses: number;

  viewCourse(course: Course) {
    alert("Course viewed: " + course.description);
  }

  //Este metodo es un lifecycle hook que se ejecuta cuando todos los elementos hijos del componente en la plantilla (view) se inicializan
  //Al correrse este metodo es que se llenaran los campos que tengamos marcados con @ViewChild y @ViewChildren
  ngAfterViewInit(): void {
    //Inicialización del componente -> Renderizado de la vista -> ngAfterViewInit -> Actualización del DOM
    this.quantityCourses = this.coursesComponents.length;
    this.cdr.detectChanges();
    //Suscribiendome a cualquier cambio que se haga al QueryList para actualizar automaticamente quantityCourses
    this.coursesComponents.changes.subscribe(() => {
      this.quantityCourses = this.coursesComponents.length;
      this.cdr.detectChanges();
    });
    //this.coursesComponents.changes.subscribe((courses) => this.addCourse());
    //this.coursesComponents.changes.subscribe((courses) => console.log(courses));
  }
  trackCourse(index: number, course: Course) {
    return course ? course.id : index;
  }

  addCourse() {
    const newCourse: Course = {
      id: this.courses.length + 1,
      description: "Angular Forms",
      iconUrl:
        "https://miro.medium.com/v2/resize:fit:1024/1*yRllr7DVjqdcZFFxIkk68A.png",
      longDescription:
        "Angular Forms is one of the most useful Angular modules to handle forms",
      category: "INTEMEDIATE",
      lessonsCount: 12,
    };
    this.courses.push(newCourse);
    // this.quantityCourses = this.courses.length;
  }

  seeViewChild(): void {
    console.log(this.courseCardComponent);
    console.log(this.coursesDiv);
    console.log(this.courseCardElement);
  }
}
