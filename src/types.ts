export interface Event {
  id: string;
  resourceIds: string[];
  allDay: boolean;
  start: Date;
  end: Date;
  title: string;
  editable: boolean | undefined;
  startEditable: boolean | undefined;
  durationEditable: boolean | undefined;
  display: 'auto' | 'background';
  backgroundColor: string;
  extendedProps: any;
}
