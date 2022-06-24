import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {Injectable} from "@angular/core";
import {NotificationToastComponent} from "./notification-toast/notification-toast.component";

@Injectable()
export class UIService {

  constructor(private snackbar: MatSnackBar) {
  }

  showNotificationToast(_duration: number, data: any) {
    let snackbarRef = this.snackbar.openFromComponent(NotificationToastComponent, {
      duration: _duration,
      verticalPosition: "bottom",
      horizontalPosition: "right"
    })
    snackbarRef.instance.data = data;

  }

  showSnackbar(message: string, action: string, _duration: number) {
    this.snackbar.open(message, action, {
      duration: _duration
    })
  }

  showSnackbarWithDirection(message: string,
                            action: string,
                            _duration: number,
                            _h: MatSnackBarHorizontalPosition,
                            _v: MatSnackBarVerticalPosition) {
    this.snackbar.open(
      message, action,
      {
        verticalPosition: _v,
        horizontalPosition: _h,
        duration: _duration
      }
    )
  }
}
