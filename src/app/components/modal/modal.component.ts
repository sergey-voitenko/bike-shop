import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Modal} from './modal';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {trigger, state, style, transition, animate} from '@angular/animations';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [
    trigger('modal', [
      state('out', style({ opacity: 1, visibility: 'visible' })),
      transition('* => out', [
        style({ opacity: '1', visibility: 'visible' }),
        animate('500ms ease-in-out', style({ opacity: 0, visibility: 'hidden' }))
      ]),
      transition(':enter', [
        style({ opacity: '0', visibility: 'hidden' }),
        animate('500ms ease-in-out', style({ opacity: 1, visibility: 'visible' }))
      ]),
    ])
  ]
})
export class ModalComponent implements OnInit {
  @Output() closeEvent = new EventEmitter<void>();
  Modal = Modal;
  visible: Modal = Modal.SignIn;
  modalState = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  googleAuth(): void {
    this.authService.googleAuth().then(() => this.router.navigate(['/']));
  }

  outAnimation(): void {
    this.modalState = 'out';
  }

  closeModal(): void {
    if (this.modalState === 'out') {
      this.closeEvent.emit();
    }
  }
}
