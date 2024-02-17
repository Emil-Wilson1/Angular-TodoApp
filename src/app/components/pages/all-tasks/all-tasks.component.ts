import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../../services/http.service';
import { DatePipe } from '@angular/common';
import { PageTitleComponent } from '../../page-title/page-title.component';
import { TaskListComponent } from '../../task-list/task-list.component';
import { StateService } from '../../../services/state.service';

@Component({
  selector: 'app-all-tasks',
  standalone: true,
  imports: [FormsModule, DatePipe, PageTitleComponent, TaskListComponent],
  templateUrl: './all-tasks.component.html',
  styleUrl: './all-tasks.component.scss'
})
export class AllTasksComponent {
  newTask = "";
  taskList: any[] = [];
  initialTaskList: any[] = [];
  httpService = inject(HttpService);
  stateService = inject(StateService);
  ngOnInit() {
    this.stateService.searchSubject.subscribe((value) => {
console.log("search",value);

      if (value) {
        this.taskList = this.initialTaskList.filter((x) => x.title.toLowerCase().includes(value.toLowerCase()))
      } else {
        this.taskList = this.initialTaskList;
      }

    })
    this.getAllTasks()
  }
  addTask() {
    console.log("addTask", this.newTask);
    this.httpService.addTask(this.newTask).subscribe(() => {
      this.newTask = "";
      this.getAllTasks()
      console.log("added");
    })
  }
  getAllTasks() {
    this.httpService.getAllTasks().subscribe((result: any) => {
      this.initialTaskList = this.taskList = result;

    })
  }
  onCompleted(task: any) {
    task.completed = true;
    console.log("complete", task);
    this.httpService.updateTask(task).subscribe(() => {
      this.getAllTasks();
    })

  }
  onImportant(task: any) {
    task.important = true;
    console.log("complete,task");
    this.httpService.updateTask(task).subscribe(() => {
      this.getAllTasks();
    })
  }
  search(searchTerm: string) {
    console.log(searchTerm);

  }
}
