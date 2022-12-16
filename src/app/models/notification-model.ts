export enum NotificationTrigger {
    ShowLoader = "showloader",
    HideLoader = "hideloader",
    ShowToast = "showtoast"
}

export enum ToastType {
    Info = "info",
    Error = "error"
}

export interface IToast {
    type: ToastType,
    message: string
}


export type loaderTrigger = (showLoader: boolean) => void;

export type toastTrigger = (toast: IToast) => void;

export interface IDisposable {
    dispose(): void;
}