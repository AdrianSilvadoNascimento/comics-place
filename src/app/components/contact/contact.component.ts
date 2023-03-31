import { ToastrService } from 'ngx-toastr';
import { Component } from '@angular/core'

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  isLoading: boolean = false

  constructor(private toastr: ToastrService) {}

  send() {
    this.isLoading = true
    setTimeout(() => {
      this.isLoading = !this.isLoading
      this.toastr.success('Success!', 'Your e-mail was sent successfully!')
    }, 3000)
  }
}
