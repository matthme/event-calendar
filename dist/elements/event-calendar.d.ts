import { LitElement, PropertyValues } from 'lit';
import { Event } from '../types';
export declare class EventCalendar extends LitElement {
    events: Array<Event>;
    calendarEl: HTMLElement;
    props: any;
    calendar: any;
    firstUpdated(): void;
    updated(changedValues: PropertyValues): void;
    render(): import("lit-html").TemplateResult<1>;
    static styles: any[];
}
