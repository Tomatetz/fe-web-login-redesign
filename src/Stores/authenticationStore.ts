import { observable, action } from "mobx";
import axios from "axios";
import { createContext } from "react";
import { Auth } from "aws-amplify";
import { globalStore } from "./globalStore";
interface TwoFactorAuthData {
  email: string;
  password: string;
}
class AuthenticationStore {
  @observable loadingState: boolean = false;
  @observable userEmail: string = "";
  @observable twoFactorAuthData: TwoFactorAuthData = {
    email: "",
    password: "",
  };
  @observable errors: { [id: string]: string[] } = {};
  @action clearErrors() {
    this.errors = {};
  }
  @action async signInAction(email: string, password: string) {
    try {
      this.twoFactorAuthData = { email: "", password: "" };
      const response = await Auth.signIn(email, password);
      let { data } = response;
      if (data) {
        this.twoFactorAuthData = { email, password };
      }
      return response;
    } catch (err) {
      this.errors.signIn_form = ["Wrong email or password."];
      return false;
    }
  }
  @action async verifyOtpAction(token: string) {
    try {
      await axios.post(`/0.1/otp/login/`, { token });
      // this.twoFactorAuthData = { email: "", password: "" };
      return true;
    } catch (err) {
      this.errors.verify_otp_form = ["Provided code is invalid"];
    }
  }
  @action async registrationAction(email: string, password: string) {
    try {
      await Auth.signUp({
        username: email,
        password: password,
      });
      this.userEmail = email;
      return true;
    } catch (err) {
      this.errors.signUp_form_password = [err.message];
    }
  }
  @action async activateAccount(token: string) {
    try {
      await axios.get(`/0.1/auth/activate/${token}/`);
      return true;
    } catch (err) {
      return false;
    }
  }
  @action async resetPasswordAction(email: string) {
    try {
      this.clearErrors();
      await Auth.forgotPassword(email);
      this.userEmail = email;
      return true;
    } catch (err) {
      return true;
    }
  }
  @action async setupNewPasswordAction(code: string, password: string) {
    try {
      await Auth.forgotPasswordSubmit(this.userEmail, code, password);
      return true;
    } catch (err) {
      console.log(err.code);
      if (
        err.code === "UserNotFoundException" ||
        err.code === "CodeMismatchException"
      ) {
        this.errors.resetPassword_form_code = [
          "Invalid verification code provided, please try again.",
        ];
      }
      if (err.code === "ExpiredCodeException") {
        this.errors.resetPassword_form_password = [err.message];
      }
      if (
        err.code === "InvalidPasswordException" ||
        err.code === "InvalidParameterException"
      ) {
        this.errors.resetPassword_form_password = [err.message];
      }
      if (err.code === "LimitExceededException") {
        this.errors.resetPassword_detail = [err.message];
      }
    }
  }

  @action async logoutAction() {
    try {
      const response = await Auth.signOut();
      return response;
    } catch (err) {}
  }

  @action async getAuthData() {
    try {
      const resp = await Auth.currentAuthenticatedUser({
        bypassCache: false,
      });
      const { attributes } = resp;
      globalStore.userEmail = attributes.email;
      return true;
    } catch (err) {
      return false;
    }
  }
}
export const authenticationStore = new AuthenticationStore();
export const AuthenticationStoreContext = createContext(authenticationStore);
