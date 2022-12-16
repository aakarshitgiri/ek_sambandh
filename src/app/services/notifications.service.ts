import { Injectable } from "@angular/core";
import { IDisposable, IToast, loaderTrigger, toastTrigger } from "../models/notification-model";

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    private pendingOperationsCount: number = 0;
    private loaderTriggers: loaderTrigger[] = [];
    private toastTriggers: toastTrigger[] = [];

    showLoader(): void {
        this.pendingOperationsCount += 1;

        if (this.pendingOperationsCount == 1)
            this.loaderTriggers.forEach(trigger => trigger(true));
    }

    hideLoader(): void {
        this.pendingOperationsCount -= 1;
        if (this.pendingOperationsCount == 0)
            this.loaderTriggers.forEach(trigger => trigger(false));
    }
    showToast(toast: IToast): void {
        this.toastTriggers.forEach(trigger => trigger(toast));
    }


    registerLoaderTrigger(trigger: loaderTrigger): IDisposable {
        this.loaderTriggers.push(trigger);

        return {
            dispose: () => {
                this.loaderTriggers = this.loaderTriggers.filter(x => x != trigger)
            }
        }
    }

    registerToastTrigger(trigger: toastTrigger): IDisposable {
        this.toastTriggers.push(trigger);

        return {
            dispose: () => {
                this.toastTriggers = this.toastTriggers.filter(x => x != trigger)
            }
        }
    }
}