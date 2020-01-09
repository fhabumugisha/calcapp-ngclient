import { ConfirmDialogComponent } from "./../shared/confirm-dialog/confirm-dialog.component";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

import { MyAccountComponent } from "./my-account/my-account.component";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";

import { ErrorDialogComponent } from "../shared/error/error-dialog/error-dialog.component";
import { SharedModule } from "../shared/shared.module";

const routes: Routes = [
  { path: "", component: MyAccountComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [MyAccountComponent],
  imports: [RouterModule.forChild(routes), SharedModule],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [ConfirmDialogComponent, ErrorDialogComponent]
})
export class AccountModule {}
