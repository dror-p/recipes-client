export interface Step {
    id: number;
    recipe_id: number;
    description: string;
    timer_duration: {seconds: number, minutes: number, hours: number};
    previous_step_id?: number;
    previous_step?: string;
    identifier: string;
    temp_id?: string;
  }
  