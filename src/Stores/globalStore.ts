import { observable, action } from "mobx";
import axios from "axios";
import { createContext } from "react";
import { Auth } from "aws-amplify";
class GlobalStore {
  @observable userEmail: string = "";
}
export const globalStore = new GlobalStore();
export const GlobalStoreContext = createContext(globalStore);
