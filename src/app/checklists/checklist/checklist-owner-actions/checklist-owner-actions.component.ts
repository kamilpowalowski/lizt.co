import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../../../modal/modal.component';
import { Checklist } from './../../../shared/checklist.model';
import { ChecklistService } from './../../../shared/checklist.service';

@Component({
  selector: 'app-checklist-owner-actions',
  templateUrl: './checklist-owner-actions.component.html',
  styleUrls: ['./checklist-owner-actions.component.scss']
})
export class ChecklistOwnerActionsComponent implements OnInit {

  @Input() checklist: Checklist;

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private checklistService: ChecklistService
  ) { }

  ngOnInit() {
  }

  edit() {
    this.router.navigate(
      ['/checklists', 'edit', this.checklist.id],
      { queryParams: { 'return-url': this.router.url } }
    );
  }

  public() {
    // TODO: Implement
  }

  share() {
    // TODO: Implement
  }

  delete() {
    const activeModal = this.modalService.open(ModalComponent, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.title = 'Delete checklist?';
    activeModal.componentInstance.body = 'This operation can\'t be reversed. Do you really want to delete this checklist?';
    activeModal.componentInstance.primaryButtonTitle = 'Cancel';
    activeModal.componentInstance.primaryButtonAction = () => activeModal.close();
    activeModal.componentInstance.destructiveButtonTitle = 'Delete';
    activeModal.componentInstance.destructiveButtonAction = () => {
      this.checklistService.removeChecklist(this.checklist)
        .subscribe(
          _ => {
            this.router.navigate(['checklists', 'me', 'all']);
            activeModal.close();
          },
          error => {
            ModalComponent.showModalError(this.modalService, error);
          });
    };
  }

}