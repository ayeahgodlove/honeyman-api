export interface IBaseResponse {
  message: string | string[];
  success: boolean;
  validationErrors: string[];
}

export const emptyBase: IBaseResponse = {
  success: false,
  message: "",
  validationErrors: [],
};
