import { observable, action } from "mobx";
import axios from "axios";
import { createContext } from "react";
interface TwoFactorAuthData {
  email: string;
  password: string;
}
class GlobalDataStore {
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
      const response = await axios.post(`/0.1/auth/login`, {
        email,
        password,
      });
      let { data } = response;
      if (data.two_factor_enabled) {
        this.twoFactorAuthData = { email, password };
      }
      return data;
    } catch (err) {
      this.errors.signIn_form = ["Wrong email or password."];
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
      await axios.post(`/0.1/auth/register`, {
        email,
        password,
      });
      this.userEmail = email;
      return true;
    } catch (err) {
      if (err.response.data.email) {
        this.errors.signUp_form_email = err.response.data.email;
      }
      if (err.response.data.password) {
        this.errors.signUp_form_password = err.response.data.password;
      }
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
      await axios.post(`/0.1/auth/password/reset`, {
        email,
      });
      this.userEmail = email;
      return true;
    } catch (err) {
      if (err.response.data.email) {
        this.errors.resetPassword_form = err.response.data.email;
      }
    }
  }
  @action async setupNewPasswordAction(
    uid: string,
    token: string,
    password: string
  ) {
    try {
      await axios.post(`/0.1/auth/password/reset/${uid}/${token}`, {
        password,
      });
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
}
export const globalDataStore = new GlobalDataStore();
export const GlobalDataStoreContext = createContext(globalDataStore);
