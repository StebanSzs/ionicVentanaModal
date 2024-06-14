import { Component } from '@angular/core';
import { ModalController, IonicModule, IonItemSliding } from '@ionic/angular';
import { NgFor, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from './task';
import { NewTaskModalComponent } from '../new-task-modal/new-task-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, NgFor, NewTaskModalComponent]
})
export class HomePage {
  tasks: Array<Task> = [];

  constructor(private modalCtrl: ModalController) {
    this.tasks = [
      {title: "Milk", status: 'open'},
      {title: 'Eggs', status: 'open'},
      {title: 'Syrup', status: 'open'},
      {title: 'Pancake Mix', status: 'open'}
    ];
  }

  async addItem() {
    const modal = await this.modalCtrl.create({
      component: NewTaskModalComponent
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.tasks.push({title: result.data, status: 'open'});
      }
    });

    await modal.present();
  }

  trackItems(index: number, itemObject: any) {
    return itemObject.title;
  }

  markAsDone(itemSliding: IonItemSliding, task: Task) {
    task.status = 'done';
    setTimeout(() => { itemSliding.close() }, 1);
  }

  removeTask(itemSliding: IonItemSliding, task: Task) {
    let index = this.tasks.indexOf(task);
    if (index > -1) {
      this.tasks.splice(index, 1);
    }
    setTimeout(() => { itemSliding.close() }, 1);
  }
}
