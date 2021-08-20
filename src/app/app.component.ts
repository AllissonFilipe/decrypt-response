import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import * as AesJS from 'aes-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  key: string;
  iv: string;
  encrypted: string;
  decrypted: string;

  constructor(private toastr: ToastrService) {}

  public decrypt() {
    try {
      const IV = this.convertToArray(this.iv);
      const KEY = this.convertToArray(this.key);
      const aesOfb = new AesJS.ModeOfOperation.ofb(KEY, IV);
      const encryptedBytes = AesJS.utils.hex.toBytes(this.encrypted);
      const decryptedBytes = aesOfb.decrypt(encryptedBytes);
      const decryptedString = AesJS.utils.utf8.fromBytes(decryptedBytes);
      this.decrypted = decodeURI(window.atob(decryptedString));
      this.toastr.success('data successfully decrypted', 'Success');
    } catch(e) {
      this.toastr.error('It was not possible to decrypt the data', 'Error');
      this.clear();
    }
  }

  private convertToArray(text: string) {
    return text.split(',').map(value => parseInt(value.trim(), 10));
  }

  public clear() {
    this.encrypted = '';
    this.decrypted = '';
    this.key = '';
    this.iv = '';
  }
}
