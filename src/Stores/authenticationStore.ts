import { observable, action } from "mobx";
import axios from "axios";
import { createContext } from "react";
import { Auth } from "aws-amplify";
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
      // if (err.code && err.code === "InvalidPasswordException") {
      //   this.errors.signUp_form_password = [err.message];
      // }
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
      await Auth.forgotPassword(email);
      this.userEmail = email;
      return true;
    } catch (err) {
      if (err.response.data.email) {
        this.errors.resetPassword_form = err.response.data.email;
      }
    }
  }
  @action async setupNewPasswordAction(code: string, password: string) {
    try {
      await Auth.forgotPasswordSubmit(this.userEmail, code, password);
      return true;
    } catch (err) {
      if (err.response.data.password) {
        this.errors.resetPassword_form_password = err.response.data.password;
      }
      if (err.response.data.detail) {
        this.errors.resetPassword_detail = err.response.data.detail;
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
      await Auth.currentAuthenticatedUser({
        bypassCache: false,
      });
      return true;
    } catch (err) {
      return false;
    }
  }
}
export const authenticationStore = new AuthenticationStore();
export const AuthenticationStoreContext = createContext(authenticationStore);
