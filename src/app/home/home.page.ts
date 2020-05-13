import { Component, OnInit } from "@angular/core";
import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject,
} from "@ionic-native/file-transfer/ngx";
import { File } from "@ionic-native/file/ngx";
import { Platform, AlertController } from "@ionic/angular";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
  providers: [FileTransfer, FileTransferObject, File],
})
export class HomePage {
  storageDirectory: string = "";

  constructor(
    private transfer: FileTransfer,
    private file: File,
    public platform: Platform,
    public alertCtrl: AlertController
  ) {
    this.platform.ready().then(() => {
      // make sure this is on a device, not an emulation (e.g. chrome tools device mode)
      if (!this.platform.is("cordova")) {
        return false;
      }

      if (this.platform.is("ios")) {
        this.storageDirectory = this.file.documentsDirectory;
      } else if (this.platform.is("android")) {
        this.storageDirectory = "///storage/emulated/0/DCIM/myFile";
      } else {
        // exit otherwise, but you could add further types here e.g. Windows
        return false;
      }
    });
  }

  downloadImage(image) {
    this.platform.ready().then(() => {
      const fileTransfer: FileTransferObject = this.transfer.create();

      const imageLocation = `${this.file.applicationDirectory}www/assets/img/${image}`;

      fileTransfer.download(imageLocation, this.storageDirectory + image).then(
        (entry) => {
          alert(`${image} was successfully downloaded to: ${entry.toURL()}`);
        },
        (error) => {
          alert(JSON.stringify(error));
        }
      );
    });
  }

  download() {
    let img = "test.jpg";
    this.downloadImage(img);
  }
}
