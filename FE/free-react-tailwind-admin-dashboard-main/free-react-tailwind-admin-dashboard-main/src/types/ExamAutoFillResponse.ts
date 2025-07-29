export interface ExamAutoFillResponse {
  name: string;
  duration: number;
  numberQuestion: number;
  details: {
    name: string;
    answer: string;
    description: string;
    url?: string | null;
  }[];
}
