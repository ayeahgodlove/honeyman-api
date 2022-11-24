export interface IBaseResponse {
  message: string;
  success: boolean;
  validationErrors: string[];
}

export const emptyBase: IBaseResponse = {
  success: false,
  message: "",
  validationErrors: [],
};
