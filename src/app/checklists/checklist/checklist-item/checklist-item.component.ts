import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
  } from '@angular/core';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';
import { ChecklistItem } from '../../../shared/models/checklist-item.model';
import { Checklist } from '../../../shared/models/checklist.model';
import { ChecklistService } from '../../../shared/services/checklist.service';

@Component({
  selector: 'app-checklist-item',
  templateUrl: './checklist-item.component.html',
  styleUrls: ['./checklist-item.component.scss']
})
export class ChecklistItemComponent implements OnInit, OnDestroy {
  @Input() item: ChecklistItem;
  @Input() level: number;

  @Output() onChange = new EventEmitter<boolean>();

  selected = false;

  private selectedIdsSubscription: Subscription;

  constructor(
    private checklistService: ChecklistService
  ) { }

  ngOnInit() {
    this.selected = this.checklistService.isChecklistItemSelected(this.item);

    this.selectedIdsSubscription = this.checklistService.selectedIds
      .subscribe(_ => {
        this.selected = this.checklistService.isChecklistItemSelected(this.item);
      });
  }

  ngOnDestroy() {
    this.selectedIdsSubscription.unsubscribe();
  }

  getClassesForLevel(level: number): string[] {
    const columnClass = `col-${(12 - level)}`;
    const offsetClass = `offset-${level}`;
    return [columnClass, offsetClass];
  }

  onCheckboxValueChanged(newValue: boolean) {
    this.selected = newValue;

    if (this.selected === true) {
      this.checklistService.selectChecklistItem(this.item);
    } else {
      this.checklistService.unselectChecklistItem(this.item);
    }

    this.onChange.emit(this.selected);
  }

}
