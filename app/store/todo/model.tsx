export interface Todo {
  id: number;
  title: string;
  description?: string;
  image?: string;
  complete: boolean;
  dateDue: Date;
}
