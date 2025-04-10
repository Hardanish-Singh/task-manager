export enum Status {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
}

export type Task = {
  title: string;
  description: string;
  id?: string;
  status?: Status;
  createdAt?: string;
  updatedAt?: string;
};

export type ToastProps = {
  message: string;
  type: string;
  onClose: () => void;
};
