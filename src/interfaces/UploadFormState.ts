interface UploadFormState {
  file: File | null;
  uploading: boolean;
  toastShow: boolean;
  alertType: string;
  alertMessage: string;
  toastVariant:string;
}
export default UploadFormState;