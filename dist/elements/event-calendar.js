import { __decorate } from "tslib";
// @ts-ignore
import Calendar from '@event-calendar/core';
// @ts-ignore
import Interaction from '@event-calendar/interaction';
// @ts-ignore
import TimeGrid from '@event-calendar/time-grid';
// @ts-ignore
import List from '@event-calendar/list';
// @ts-ignore
import ResourceTimeGrid from '@event-calendar/resource-time-grid';
// @ts-ignore
import DayGrid from '@event-calendar/day-grid';
// @ts-ignore
import styles from '@event-calendar/core/index.css';
import { html, LitElement } from 'lit';
import { property, query } from 'lit/decorators.js';
export class EventCalendar extends LitElement {
    constructor() {
        super(...arguments);
        this.events = [];
        this.props = {};
    }
    firstUpdated() {
        this.calendar = new Calendar({
            target: this.calendarEl,
            props: {
                plugins: [TimeGrid, Interaction, List, ResourceTimeGrid, DayGrid],
                options: {
                    view: 'timeGridWeek',
                    events: this.events,
                    dateClick: (dateClickInfo) => {
                        this.dispatchEvent(new CustomEvent('date-clicked', {
                            bubbles: true,
                            composed: true,
                            detail: dateClickInfo,
                        }));
                    },
                    eventContent(eventInfo) {
                        // for properties of the eventInfo object see https://github.com/vkurko/calendar#eventcontent
                        const { event } = eventInfo;
                        const { timeText } = eventInfo;
                        const titleString = event.title.length > 18
                            ? `${event.title.slice(0, 18)}...`
                            : event.title;
                        if (event.extendedProps.weGroupInfo) {
                            const { logoSrc } = event.extendedProps.weGroupInfo;
                            const fullTitle = `${event.extendedProps.weGroupInfo.name} - ${event.title}`;
                            return `
              <div title="${fullTitle}" style="display: flex; flex-direction: column; position: relative; color: black; overflow: hidden;">
                <span style="position: absolute; right: 2px; top: 2px;"><img src=${logoSrc} style="border-radius: 50%; height: 20px; width: 20px; object-fit: cover;"></span>
                <div style="display: flex; flex-direction: row; margin: 2px 2px 0 2px;">
                  <span style="overflow-x: hidden;">${titleString}</span>
                  <span style="flex: 1;"></span>
                </div>
                <div>
                  ${timeText}
                </div>
              </div>
            `;
                        }
                        return `
            <div title="${event.title}" style="display: flex; flex-direction: column; position: relative; color: black; overflow: hidden;">
              <div style="display: flex; flex-direction: row; margin: 2px 2px 0 2px;">
                  <span>${titleString}</span>
                </div>
                <div>
                  ${timeText}
                </div>
              </div>
            `;
                    },
                    ...this.props,
                },
            },
        });
    }
    updated(changedValues) {
        super.updated(changedValues);
        if (changedValues.has('events')) {
            this.calendar.setOption('events', this.events);
        }
    }
    render() {
        return html ` <div id="calendar"></div> `;
    }
}
EventCalendar.styles = [styles];
__decorate([
    property({ type: Object })
], EventCalendar.prototype, "events", void 0);
__decorate([
    query('#calendar')
], EventCalendar.prototype, "calendarEl", void 0);
__decorate([
    property({ type: Object })
], EventCalendar.prototype, "props", void 0);
//# sourceMappingURL=event-calendar.js.map