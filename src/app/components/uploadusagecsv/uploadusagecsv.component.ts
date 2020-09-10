import { Component, OnInit, ViewChild } from '@angular/core';
// import { MatDialogRef } from '@angular/material/dialog';
import { UploadService } from '../../_services/upload.service';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'app-uploadusagecsv',
    templateUrl: './uploadusagecsv.component.html',
    styleUrls: ['./uploadusagecsv.component.less']
})
export class UploadUsageCSVComponent implements OnInit {
    @ViewChild('file', { static: false }) file;

    public files: Set<File> = new Set();

    constructor(public uploadService: UploadService) { }

    ngOnInit() { }

    progress;
    successMesg;
    error;
    canBeClosed = true;
    primaryButtonText = 'Upload';
    showCancelButton = true;
    uploading = false;
    uploadSuccessful = false;

    onFilesAdded() {
        const files: { [key: string]: File } = this.file.nativeElement.files;
        for (let key in files) {
            if (!isNaN(parseInt(key))) {
                this.files.add(files[key]);
            }
        }
    }

    addFiles() {
        this.file.nativeElement.click();
    }


    downloadTemplate() {

        this.uploadService.downloadUsageTemplate().subscribe(response => {
            console.log(JSON.stringify(response));
            let blob: any = new Blob([response.blob()], { type: 'text/json; charset=utf-8' });
            const url = window.URL.createObjectURL(blob);
            window.open(url);
            //window.location.href = response.url;
            //fileSaver.saveAs(blob, 'employees.json');
        }), error => console.log('Error downloading the file'),
            () => console.info('File downloaded successfully');
    }

    closeDialog() {

        // set the component state to "uploading"
        this.uploading = true;

        // start the upload and save the progress map
        this.progress = this.uploadService.upload(this.files);
        console.log(this.progress);
        for (const key in this.progress) {
            this.progress[key].progress.subscribe(val => {
                if (val === 100) {
                    this.successMesg = "File uploaded successfully";
                } else {
                    this.error = "File upload failed with error";
                }
            });
        }

        // convert the progress map into an array
        let allProgressObservables = [];
        for (let key in this.progress) {
            allProgressObservables.push(this.progress[key].progress);
        }

        // Adjust the state variables

        // The OK-button should have the text "Finish" now
        this.primaryButtonText = 'Finish';

        // The dialog should not be closed while uploading
        this.canBeClosed = false;
        // this.dialogRef.disableClose = true;

        // Hide the cancel-button
        this.showCancelButton = false;

        // When all progress-observables are completed...
        forkJoin(allProgressObservables).subscribe(end => {
            // ... the dialog can be closed again...
            this.canBeClosed = true;
            // this.dialogRef.disableClose = false;

            // ... the upload was successful...
            this.uploadSuccessful = true;

            // ... and the component is no longer uploading
            this.uploading = false;
        });
    }
}

