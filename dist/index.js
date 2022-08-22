import { css, LitElement, html } from 'lit';
import { property, query } from 'lit/decorators.js';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function noop() { }
const identity = x => x;
function assign$1(tar, src) {
    // @ts-ignore
    for (const k in src)
        tar[k] = src[k];
    return tar;
}
function run(fn) {
    return fn();
}
function blank_object() {
    return Object.create(null);
}
function run_all(fns) {
    fns.forEach(run);
}
function is_function(thing) {
    return typeof thing === 'function';
}
function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}
function is_empty(obj) {
    return Object.keys(obj).length === 0;
}
function subscribe(store, ...callbacks) {
    if (store == null) {
        return noop;
    }
    const unsub = store.subscribe(...callbacks);
    return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function get_store_value(store) {
    let value;
    subscribe(store, _ => value = _)();
    return value;
}
function component_subscribe(component, store, callback) {
    component.$$.on_destroy.push(subscribe(store, callback));
}
function create_slot(definition, ctx, $$scope, fn) {
    if (definition) {
        const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
        return definition[0](slot_ctx);
    }
}
function get_slot_context(definition, ctx, $$scope, fn) {
    return definition[1] && fn
        ? assign$1($$scope.ctx.slice(), definition[1](fn(ctx)))
        : $$scope.ctx;
}
function get_slot_changes(definition, $$scope, dirty, fn) {
    if (definition[2] && fn) {
        const lets = definition[2](fn(dirty));
        if ($$scope.dirty === undefined) {
            return lets;
        }
        if (typeof lets === 'object') {
            const merged = [];
            const len = Math.max($$scope.dirty.length, lets.length);
            for (let i = 0; i < len; i += 1) {
                merged[i] = $$scope.dirty[i] | lets[i];
            }
            return merged;
        }
        return $$scope.dirty | lets;
    }
    return $$scope.dirty;
}
function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
    if (slot_changes) {
        const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
        slot.p(slot_context, slot_changes);
    }
}
function get_all_dirty_from_scope($$scope) {
    if ($$scope.ctx.length > 32) {
        const dirty = [];
        const length = $$scope.ctx.length / 32;
        for (let i = 0; i < length; i++) {
            dirty[i] = -1;
        }
        return dirty;
    }
    return -1;
}
function set_store_value(store, ret, value) {
    store.set(value);
    return ret;
}
function action_destroyer(action_result) {
    return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
}
function append(target, node) {
    target.appendChild(node);
}
function insert(target, node, anchor) {
    target.insertBefore(node, anchor || null);
}
function detach(node) {
    node.parentNode.removeChild(node);
}
function destroy_each(iterations, detaching) {
    for (let i = 0; i < iterations.length; i += 1) {
        if (iterations[i])
            iterations[i].d(detaching);
    }
}
function element(name) {
    return document.createElement(name);
}
function text(data) {
    return document.createTextNode(data);
}
function space() {
    return text(' ');
}
function empty() {
    return text('');
}
function listen(node, event, handler, options) {
    node.addEventListener(event, handler, options);
    return () => node.removeEventListener(event, handler, options);
}
function stop_propagation(fn) {
    return function (event) {
        event.stopPropagation();
        // @ts-ignore
        return fn.call(this, event);
    };
}
function attr(node, attribute, value) {
    if (value == null)
        node.removeAttribute(attribute);
    else if (node.getAttribute(attribute) !== value)
        node.setAttribute(attribute, value);
}
function children(element) {
    return Array.from(element.childNodes);
}
function set_data(text, data) {
    data = '' + data;
    if (text.wholeText !== data)
        text.data = data;
}
function set_style(node, key, value, important) {
    if (value === null) {
        node.style.removeProperty(key);
    }
    else {
        node.style.setProperty(key, value, important ? 'important' : '');
    }
}
function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
    const e = document.createEvent('CustomEvent');
    e.initCustomEvent(type, bubbles, cancelable, detail);
    return e;
}

let current_component;
function set_current_component(component) {
    current_component = component;
}
function get_current_component() {
    if (!current_component)
        throw new Error('Function called outside component initialization');
    return current_component;
}
function onMount(fn) {
    get_current_component().$$.on_mount.push(fn);
}
function afterUpdate(fn) {
    get_current_component().$$.after_update.push(fn);
}
function onDestroy(fn) {
    get_current_component().$$.on_destroy.push(fn);
}
function createEventDispatcher() {
    const component = get_current_component();
    return (type, detail, { cancelable = false } = {}) => {
        const callbacks = component.$$.callbacks[type];
        if (callbacks) {
            // TODO are there situations where events could be dispatched
            // in a server (non-DOM) environment?
            const event = custom_event(type, detail, { cancelable });
            callbacks.slice().forEach(fn => {
                fn.call(component, event);
            });
            return !event.defaultPrevented;
        }
        return true;
    };
}
function setContext(key, context) {
    get_current_component().$$.context.set(key, context);
    return context;
}
function getContext(key) {
    return get_current_component().$$.context.get(key);
}
// TODO figure out if we still want to support
// shorthand events, or if we want to implement
// a real bubbling mechanism
function bubble(component, event) {
    const callbacks = component.$$.callbacks[event.type];
    if (callbacks) {
        // @ts-ignore
        callbacks.slice().forEach(fn => fn.call(this, event));
    }
}

const dirty_components = [];
const binding_callbacks = [];
const render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = Promise.resolve();
let update_scheduled = false;
function schedule_update() {
    if (!update_scheduled) {
        update_scheduled = true;
        resolved_promise.then(flush);
    }
}
function tick() {
    schedule_update();
    return resolved_promise;
}
function add_render_callback(fn) {
    render_callbacks.push(fn);
}
// flush() calls callbacks in this order:
// 1. All beforeUpdate callbacks, in order: parents before children
// 2. All bind:this callbacks, in reverse order: children before parents.
// 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
//    for afterUpdates called during the initial onMount, which are called in
//    reverse order: children before parents.
// Since callbacks might update component values, which could trigger another
// call to flush(), the following steps guard against this:
// 1. During beforeUpdate, any updated components will be added to the
//    dirty_components array and will cause a reentrant call to flush(). Because
//    the flush index is kept outside the function, the reentrant call will pick
//    up where the earlier call left off and go through all dirty components. The
//    current_component value is saved and restored so that the reentrant call will
//    not interfere with the "parent" flush() call.
// 2. bind:this callbacks cannot trigger new flush() calls.
// 3. During afterUpdate, any updated components will NOT have their afterUpdate
//    callback called a second time; the seen_callbacks set, outside the flush()
//    function, guarantees this behavior.
const seen_callbacks = new Set();
let flushidx = 0; // Do *not* move this inside the flush() function
function flush() {
    const saved_component = current_component;
    do {
        // first, call beforeUpdate functions
        // and update components
        while (flushidx < dirty_components.length) {
            const component = dirty_components[flushidx];
            flushidx++;
            set_current_component(component);
            update(component.$$);
        }
        set_current_component(null);
        dirty_components.length = 0;
        flushidx = 0;
        while (binding_callbacks.length)
            binding_callbacks.pop()();
        // then, once components are updated, call
        // afterUpdate functions. This may cause
        // subsequent updates...
        for (let i = 0; i < render_callbacks.length; i += 1) {
            const callback = render_callbacks[i];
            if (!seen_callbacks.has(callback)) {
                // ...so guard against infinite loops
                seen_callbacks.add(callback);
                callback();
            }
        }
        render_callbacks.length = 0;
    } while (dirty_components.length);
    while (flush_callbacks.length) {
        flush_callbacks.pop()();
    }
    update_scheduled = false;
    seen_callbacks.clear();
    set_current_component(saved_component);
}
function update($$) {
    if ($$.fragment !== null) {
        $$.update();
        run_all($$.before_update);
        const dirty = $$.dirty;
        $$.dirty = [-1];
        $$.fragment && $$.fragment.p($$.ctx, dirty);
        $$.after_update.forEach(add_render_callback);
    }
}
const outroing = new Set();
let outros;
function group_outros() {
    outros = {
        r: 0,
        c: [],
        p: outros // parent group
    };
}
function check_outros() {
    if (!outros.r) {
        run_all(outros.c);
    }
    outros = outros.p;
}
function transition_in(block, local) {
    if (block && block.i) {
        outroing.delete(block);
        block.i(local);
    }
}
function transition_out(block, local, detach, callback) {
    if (block && block.o) {
        if (outroing.has(block))
            return;
        outroing.add(block);
        outros.c.push(() => {
            outroing.delete(block);
            if (callback) {
                if (detach)
                    block.d(1);
                callback();
            }
        });
        block.o(local);
    }
}

const globals = (typeof window !== 'undefined'
    ? window
    : typeof globalThis !== 'undefined'
        ? globalThis
        : global);
function create_component(block) {
    block && block.c();
}
function mount_component(component, target, anchor, customElement) {
    const { fragment, on_mount, on_destroy, after_update } = component.$$;
    fragment && fragment.m(target, anchor);
    if (!customElement) {
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
    }
    after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
    const $$ = component.$$;
    if ($$.fragment !== null) {
        run_all($$.on_destroy);
        $$.fragment && $$.fragment.d(detaching);
        // TODO null out other refs, including component.$$ (but need to
        // preserve final state?)
        $$.on_destroy = $$.fragment = null;
        $$.ctx = [];
    }
}
function make_dirty(component, i) {
    if (component.$$.dirty[0] === -1) {
        dirty_components.push(component);
        schedule_update();
        component.$$.dirty.fill(0);
    }
    component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
}
function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
    const parent_component = current_component;
    set_current_component(component);
    const $$ = component.$$ = {
        fragment: null,
        ctx: null,
        // state
        props,
        update: noop,
        not_equal,
        bound: blank_object(),
        // lifecycle
        on_mount: [],
        on_destroy: [],
        on_disconnect: [],
        before_update: [],
        after_update: [],
        context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
        // everything else
        callbacks: blank_object(),
        dirty,
        skip_bound: false,
        root: options.target || parent_component.$$.root
    };
    append_styles && append_styles($$.root);
    let ready = false;
    $$.ctx = instance
        ? instance(component, options.props || {}, (i, ret, ...rest) => {
            const value = rest.length ? rest[0] : ret;
            if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                if (!$$.skip_bound && $$.bound[i])
                    $$.bound[i](value);
                if (ready)
                    make_dirty(component, i);
            }
            return ret;
        })
        : [];
    $$.update();
    ready = true;
    run_all($$.before_update);
    // `false` as a special case of no DOM component
    $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
    if (options.target) {
        if (options.hydrate) {
            const nodes = children(options.target);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.l(nodes);
            nodes.forEach(detach);
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.c();
        }
        if (options.intro)
            transition_in(component.$$.fragment);
        mount_component(component, options.target, options.anchor, options.customElement);
        flush();
    }
    set_current_component(parent_component);
}
/**
 * Base class for Svelte components. Used when dev=false.
 */
class SvelteComponent {
    $destroy() {
        destroy_component(this, 1);
        this.$destroy = noop;
    }
    $on(type, callback) {
        const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
        callbacks.push(callback);
        return () => {
            const index = callbacks.indexOf(callback);
            if (index !== -1)
                callbacks.splice(index, 1);
        };
    }
    $set($$props) {
        if (this.$$set && !is_empty($$props)) {
            this.$$.skip_bound = true;
            this.$$set($$props);
            this.$$.skip_bound = false;
        }
    }
}

const subscriber_queue = [];
/**
 * Creates a `Readable` store that allows reading by subscription.
 * @param value initial value
 * @param {StartStopNotifier}start start and stop notifications for subscriptions
 */
function readable(value, start) {
    return {
        subscribe: writable(value, start).subscribe
    };
}
/**
 * Create a `Writable` store that allows both updating and reading by subscription.
 * @param {*=}value initial value
 * @param {StartStopNotifier=}start start and stop notifications for subscriptions
 */
function writable(value, start = noop) {
    let stop;
    const subscribers = new Set();
    function set(new_value) {
        if (safe_not_equal(value, new_value)) {
            value = new_value;
            if (stop) { // store is ready
                const run_queue = !subscriber_queue.length;
                for (const subscriber of subscribers) {
                    subscriber[1]();
                    subscriber_queue.push(subscriber, value);
                }
                if (run_queue) {
                    for (let i = 0; i < subscriber_queue.length; i += 2) {
                        subscriber_queue[i][0](subscriber_queue[i + 1]);
                    }
                    subscriber_queue.length = 0;
                }
            }
        }
    }
    function update(fn) {
        set(fn(value));
    }
    function subscribe(run, invalidate = noop) {
        const subscriber = [run, invalidate];
        subscribers.add(subscriber);
        if (subscribers.size === 1) {
            stop = start(set) || noop;
        }
        run(value);
        return () => {
            subscribers.delete(subscriber);
            if (subscribers.size === 0) {
                stop();
                stop = null;
            }
        };
    }
    return { set, update, subscribe };
}
function derived(stores, fn, initial_value) {
    const single = !Array.isArray(stores);
    const stores_array = single
        ? [stores]
        : stores;
    const auto = fn.length < 2;
    return readable(initial_value, (set) => {
        let inited = false;
        const values = [];
        let pending = 0;
        let cleanup = noop;
        const sync = () => {
            if (pending) {
                return;
            }
            cleanup();
            const result = fn(single ? values[0] : values, set);
            if (auto) {
                set(result);
            }
            else {
                cleanup = is_function(result) ? result : noop;
            }
        };
        const unsubscribers = stores_array.map((store, i) => subscribe(store, (value) => {
            values[i] = value;
            pending &= ~(1 << i);
            if (inited) {
                sync();
            }
        }, () => {
            pending |= (1 << i);
        }));
        inited = true;
        sync();
        return function stop() {
            run_all(unsubscribers);
            cleanup();
        };
    });
}

function setContent(node, content) {
    let actions = {
        update(content) {
            while (node.firstChild) {
                node.removeChild(node.lastChild);
            }
            if (content.domNodes) {
                for (let child of content.domNodes) {
                    node.appendChild(child);
                }
            } else if (content.html) {
                node.innerHTML = content.html;
            }
        }
    };
    actions.update(content);

    return actions;
}

const DAY_IN_SECONDS = 86400;

function createDate(input) {
    if (input !== undefined) {
        return input instanceof Date ? _fromLocalDate(input) : _fromISOString(input);
    }

    return _fromLocalDate(new Date());
}

function createDuration(input) {
    if (typeof input === 'number') {
        input = {seconds: input};
    } else if (typeof input === 'string') {
        // Expected format hh[:mm[:ss]]
        let seconds = 0, exp = 2;
        for (let part of input.split(':', 3)) {
            seconds += parseInt(part, 10) * Math.pow(60, exp--);
        }
        input = {seconds};
    } else if (input instanceof Date) {
        input = {hours: input.getUTCHours(), minutes: input.getUTCMinutes(), seconds: input.getUTCSeconds()};
    }

    let weeks = input.weeks || input.week || 0;

    return {
        years: input.years || input.year || 0,
        months: input.months || input.month || 0,
        days: weeks * 7 + (input.days || input.day || 0),
        seconds: (input.hours || input.hour || 0) * 60 * 60 +
            (input.minutes || input.minute || 0) * 60 +
            (input.seconds || input.second || 0),
        inWeeks: !!weeks
    };
}

function cloneDate(date) {
    return new Date(date.getTime());
}

function addDuration(date, duration, x) {
    if (x === undefined) {
        x = 1;
    }
    date.setUTCFullYear(date.getUTCFullYear() + x * duration.years);
    let month = date.getUTCMonth() + x * duration.months;
    date.setUTCMonth(month);
    month %= 12;
    if (month < 0) {
        month += 12;
    }
    while (date.getUTCMonth() !== month) {
        subtractDay(date);
    }
    date.setUTCDate(date.getUTCDate() + x * duration.days);
    date.setUTCSeconds(date.getUTCSeconds() + x * duration.seconds);

    return date;
}

function subtractDuration(date, duration, x) {
    return addDuration(date, duration, x === undefined ? -1 : -x);
}

function addDay(date, x) {
    date.setUTCDate(date.getUTCDate() + (x === undefined ? 1 : x));

    return date;
}

function subtractDay(date, x) {
    return addDay(date, x === undefined ? -1 : -x);
}

function setMidnight(date) {
    date.setUTCHours(0, 0, 0, 0);

    return date;
}

function toLocalDate(date) {
    return new Date(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        date.getUTCHours(),
        date.getUTCMinutes(),
        date.getUTCSeconds()
    );
}

function toISOString(date) {
    return date.toISOString().substring(0, 19);
}

function formatRange(start, end, intl) {
    if (start.getFullYear() !== end.getFullYear()) {
        return intl.format(start) + ' - ' + intl.format(end);
    }

    let diff = [];
    if (start.getMonth() !== end.getMonth()) {
        diff.push('month');
    }
    if (start.getDate() !== end.getDate()) {
        diff.push('day');
    }

    if (!diff.length) {
        return intl.format(start);
    }

    let opts1 = intl.resolvedOptions();
    let opts2 = {};
    for (let key of diff) {
        opts2[key] = opts1[key];
    }
    let intl2 = new Intl.DateTimeFormat(opts1.locale, opts2);

    let full1 = intl.format(start);
    let full2 = intl.format(end);
    let part1 = intl2.format(start);
    let part2 = intl2.format(end);

    let common = _commonChunks(full1, part1, full2, part2);
    if (common) {
        return common.head + part1 + ' - ' + part2 + common.tail;
    }

    return full1 + ' - ' + full2;
}

function datesEqual(date1, date2) {
    return date1.getTime() === date2.getTime();
}

function nextClosestDay(date, day) {
    let diff = day - date.getUTCDay();
    date.setUTCDate(date.getUTCDate() + (diff >= 0 ? diff : diff + 7));
    return date;
}

function prevClosestDay(date, day) {
    let diff = day - date.getUTCDay();
    date.setUTCDate(date.getUTCDate() + (diff <= 0 ? diff : diff - 7));
    return date;
}

/**
 * Private functions
 */

function _fromLocalDate(date) {
    return new Date(Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds()
    ));
}

function _fromISOString(str) {
    const parts = str.match(/\d+/g);
    return new Date(Date.UTC(
        Number(parts[0]),
        Number(parts[1]) - 1,
        Number(parts[2]),
        Number(parts[3] || 0),
        Number(parts[4] || 0),
        Number(parts[5] || 0)
    ));
}

function _commonChunks(str1, substr1, str2, substr2) {
    let i = 0;
    while (i < str1.length) {
        let res1;
        [i, res1] = _cut(str1, substr1, i);
        if (!res1) {
            break;
        }

        let j = 0;
        while (j < str2.length) {
            let res2;
            [j, res2] = _cut(str2, substr2, j);
            if (!res2) {
                break;
            }

            if (res1.head === res2.head && res1.tail === res2.tail) {
                return res1;
            }
        }
    }

    return null
}

function _cut(str, substr, from) {
    let start = str.indexOf(substr, from);
    if (start >= 0) {
        let end = start + substr.length;

        return [end, {
            head: str.substr(0, start),
            tail: str.substr(end)
        }];
    }

    return [-1, null];
}

function assign(...args) {
    return Object.assign(...args);
}

function hasYScroll(el) {
    // return el.scrollHeight > el.clientHeight;
    return el.offsetWidth - el.clientWidth - el.clientLeft*2 > 0;  // ie11 (consider border right == border left)
}

function rect(el) {
    return el.getBoundingClientRect();
}

function ancestor(el, up) {
    while (up--) {
        el = el.parentElement;
    }
    return el;
}

function height(el) {
    return el.offsetHeight;
}

function createView(view, _viewTitle, _currentRange, _activeRange) {
    return {
        type: view,
        title: _viewTitle,
        currentStart: _currentRange.start,
        currentEnd: _currentRange.end,
        activeStart: _activeRange.start,
        activeEnd: _activeRange.end,
        calendar: undefined
    };
}

function toViewWithLocalDates(view) {
    view = assign({}, view);
    view.currentStart = toLocalDate(view.currentStart);
    view.currentEnd = toLocalDate(view.currentEnd);
    view.activeStart = toLocalDate(view.activeStart);
    view.activeEnd = toLocalDate(view.activeEnd);

    return view;
}

const display = ['background'];

let eventId = 1;
function createEvents(input) {
    return input.map(event => ({
        id: 'id' in event ? String(event.id) : `{generated-${eventId++}}`,
        resourceIds: Array.isArray(event.resourceIds)
            ? event.resourceIds.map(String)
            : ('resourceId' in event ? [String(event.resourceId)] : []),
        allDay: event.allDay || false,
        start: createDate(event.start),
        end: createDate(event.end),
        title: event.title || '',
        editable: event.editable,
        startEditable: event.startEditable,
        durationEditable: event.durationEditable,
        display: display.includes(event.display) ? event.display : 'auto',
        extendedProps: event.extendedProps || {},
        backgroundColor: event.backgroundColor || event.color
    }));
}

function createEventSources(input) {
    return input.map(source => ({
        events: source.events,
        url: (source.url && source.url.trimEnd('&')) || '',
        method: (source.method && source.method.toUpperCase()) || 'GET',
        extraParams: source.extraParams || {}
    }));
}

function createEventChunk(event, start, end) {
    return {
        start: event.start > start ? event.start : start,
        end: event.end < end ? event.end : end,
        event
    };
}

function sortEventChunks(chunks) {
    // Sort by start date
    chunks.sort((a, b) => {
        if (a.start < b.start) {
            return -1;
        }
        if (a.start > b.start) {
            return 1;
        }
        return 0;
    });
}

function createEventContent(chunk, displayEventEnd, eventContent, theme, _intlEventTime, _view) {
    let timeText = _intlEventTime.format(chunk.start), content;
    if (displayEventEnd && chunk.event.display !== 'pointer') {
        timeText += ` - ${_intlEventTime.format(chunk.end)}`;
    }
    if (eventContent) {
        content = is_function(eventContent)
            ? eventContent({
                event: toEventWithLocalDates(chunk.event),
                timeText,
                view: toViewWithLocalDates(_view)
            })
            : eventContent;
        if (typeof content === 'string') {
            content = {html: content};
        }
    } else {
        switch (chunk.event.display) {
            case 'background':
                content = {html: ''};
                break;
            case 'pointer':
                content = {
                    html: `<div class="${theme.eventTime}">${timeText}</div>`
                };
                break;
            default:
                content = {
                    html: `<div class="${theme.eventTime}">${timeText}</div>` +
                        `<div class="${theme.eventTitle}">${chunk.event.title}</div>`
                };
        }
    }

    return [timeText, content];
}

function toEventWithLocalDates(event) {
    return _cloneEvent(event, toLocalDate);
}

function cloneEvent(event) {
    return _cloneEvent(event, cloneDate);
}

function _cloneEvent(event, dateFn) {
    event = assign({}, event);
    event.start = dateFn(event.start);
    event.end = dateFn(event.end);

    return event;
}

function writable2(value, parser, start) {
    return {
        ...writable(parser ? parser(value) : value, start),
        parse: parser
    };
}

function derived2(stores, fn, initValue) {
    let storeValue = initValue;
    let hasSubscribers = false;
    let auto = fn.length < 2;
    let fn2 = (_, set) => {
        hasSubscribers = true;
        if (auto) {
            storeValue = fn(_, set);
            set(storeValue);
        } else {
            fn(_, value => {storeValue = value; set(value);});
        }
        return () => {hasSubscribers = false;};
    };
    let store = derived(stores, fn2, storeValue);
    return {
        ...store,
        get: () => hasSubscribers ? storeValue : get_store_value(store)
    };
}

function intl(locale, format) {
    return derived([locale, format], ([$locale, $format]) => {
        let intl = is_function($format)
            ? {format: $format}
            : new Intl.DateTimeFormat($locale, $format);
        return {
            format: date => intl.format(toLocalDate(date))
        };
    });
}

function intlRange(locale, format) {
    return derived([locale, format], ([$locale, $format]) => {
        if (is_function($format)) {
            return {format: (start, end) => $format(toLocalDate(start), toLocalDate(end))};
        }
        let intl = new Intl.DateTimeFormat($locale, $format);
        return {
            format: (start, end) => formatRange(toLocalDate(start), toLocalDate(end), intl)
        };
    });
}

function createOptions(plugins) {
    let options = {
        allDayContent: undefined,
        allDaySlot: true,
        buttonText: {
            today: 'today',
        },
        date: new Date(),
        dateClick: undefined,
        datesSet: undefined,
        dayHeaderFormat: {
            weekday: 'short',
            month: 'numeric',
            day: 'numeric'
        },
        displayEventEnd: true,
        duration: {weeks: 1},
        events: [],
        eventBackgroundColor: undefined,
        eventClick: undefined,
        eventColor: undefined,
        eventContent: undefined,
        eventDidMount: undefined,
        eventMouseEnter: undefined,
        eventMouseLeave: undefined,
        eventSources: [],
        eventTimeFormat: {
            hour: 'numeric',
            minute: '2-digit'
        },
        firstDay: 0,
        flexibleSlotTimeLimits: false,  // ec option
        headerToolbar: {
            start: 'title',
            center: '',
            end: 'today prev,next'
        },
        height: 'auto',
        hiddenDays: [],
        highlightedDates: [],  // ec option
        lazyFetching: true,
        loading: undefined,
        locale: undefined,
        monthMode: false,
        nowIndicator: false,
        scrollTime: '06:00:00',
        slotDuration: '00:30:00',
        slotHeight: 24,  // ec option
        slotLabelFormat: {
            hour: 'numeric',
            minute: '2-digit'
        },
        slotMaxTime: '24:00:00',
        slotMinTime: '00:00:00',
        theme: {
            allDay: 'ec-all-day',
            active: 'ec-active',
            bgEvent: 'ec-bg-event',
            bgEvents: 'ec-bg-events',
            body: 'ec-body',
            button: 'ec-button',
            buttonGroup: 'ec-button-group',
            calendar: 'ec',
            compact: 'ec-compact',
            content: 'ec-content',
            day: 'ec-day',
            dayHead: 'ec-day-head',
            days: 'ec-days',
            event: 'ec-event',
            eventBody: 'ec-event-body',
            eventTime: 'ec-event-time',
            eventTitle: 'ec-event-title',
            events: 'ec-events',
            extra: 'ec-extra',
            handle: 'ec-handle',
            header: 'ec-header',
            hiddenScroll: 'ec-hidden-scroll',
            hiddenTimes: 'ec-hidden-times',
            highlight: 'ec-highlight',
            icon: 'ec-icon',
            line: 'ec-line',
            lines: 'ec-lines',
            nowIndicator: 'ec-now-indicator',
            otherMonth: 'ec-other-month',
            sidebar: 'ec-sidebar',
            sidebarTitle: 'ec-sidebar-title',
            today: 'ec-today',
            time: 'ec-time',
            title: 'ec-title',
            toolbar: 'ec-toolbar',
            week: 'ec-week',
            withScroll: 'ec-with-scroll'
        },
        titleFormat: {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        },
        view: undefined,
        viewDidMount: undefined,
        views: {}
    };

    for (let plugin of plugins) {
        if ('createOptions' in plugin) {
            plugin.createOptions(options);
        }
    }

    return options;
}

function createParsers(options, plugins) {
    let parsers = {
        buttonText: input => is_function(input) ? input(options.buttonText) : input,
        date: date => setMidnight(createDate(date)),
        duration: createDuration,
        events: createEvents,
        eventSources: createEventSources,
        hiddenDays: days => [...new Set(days)],
        highlightedDates: dates => dates.map(createDate),
        scrollTime: createDuration,
        slotDuration: createDuration,
        slotMaxTime: createDuration,
        slotMinTime: createDuration,
        theme: input => is_function(input) ? input(options.theme) : input
    };

    for (let plugin of plugins) {
        if ('createParsers' in plugin) {
            plugin.createParsers(parsers, options);
        }
    }

    return parsers;
}

let prev;
function diff(options) {
    let diff = [];
    if (prev) {
        for (let name of Object.keys(options)) {
            if (options[name] !== prev[name]) {
                diff.push([name, options[name]]);
            }
        }
    }
    prev = assign({}, options);

    return diff;
}

function activeRange(state) {
    let _activeRange = derived(
        [state._currentRange, state.firstDay, state.monthMode, state.slotMinTime, state.slotMaxTime],
        ([$_currentRange, $firstDay, $monthMode, $slotMinTime, $slotMaxTime]) => {
            let start = cloneDate($_currentRange.start);
            let end = cloneDate($_currentRange.end);

            if ($monthMode) {
                // First day of week
                prevClosestDay(start, $firstDay);
                nextClosestDay(end, $firstDay);
            } else if ($slotMaxTime.days || $slotMaxTime.seconds > DAY_IN_SECONDS) {
                addDuration(subtractDay(end), $slotMaxTime);
                let start2 = subtractDay(cloneDate(end));
                if (start2 < start) {
                    start = start2;
                }
            }

            return {start, end};
        }
    );

    let debounce = 0;
    derived([_activeRange, state.datesSet], ([$_activeRange, $datesSet]) => {
        if ($datesSet && !debounce) {
            ++debounce;
            tick().then(() => {
                --debounce;
                $datesSet({
                    start: toLocalDate($_activeRange.start),
                    end: toLocalDate($_activeRange.end),
                    startStr: toISOString($_activeRange.start),
                    endStr: toISOString($_activeRange.end)
                });
            });
        }
    }).subscribe(noop);

    return _activeRange;
}

function currentRange(state) {
    return derived(
        [state.date, state.duration, state.monthMode, state.firstDay],
        ([$date, $duration, $monthMode, $firstDay]) => {
            let start = cloneDate($date), end;
            if ($monthMode) {
                start.setDate(1);
            } else if ($duration.inWeeks) {
                // First day of week
                prevClosestDay(start, $firstDay);
            }
            end = addDuration(cloneDate(start), $duration);

            return {start, end};
        }
    );
}

function viewDates(state) {
    return derived2([state._activeRange, state.hiddenDays], ([$_activeRange, $hiddenDays]) => {
        let dates = [];
        let date = setMidnight(cloneDate($_activeRange.start));
        let end = setMidnight(cloneDate($_activeRange.end));
        while (date < end) {
            if (!$hiddenDays.includes(date.getUTCDay())) {
                dates.push(cloneDate(date));
            }
            addDay(date);
        }
        if (!dates.length && $hiddenDays.length && $hiddenDays.length < 7) {
            // Try to move the date
            state.date.update(date => {
                while ($hiddenDays.includes(date.getUTCDay())) {
                    addDay(date);
                }
                return date;
            });
            dates = state._viewDates.get();
        }

        return dates;
    });
}

function viewTitle(state) {
    return derived(
        [state.date, state._activeRange, state._titleIntlRange, state.monthMode],
        ([$date, $_activeRange, $_titleIntlRange, $monthMode]) => {
            return $monthMode
                ? $_titleIntlRange.format($date, $date)
                : $_titleIntlRange.format($_activeRange.start, subtractDay(cloneDate($_activeRange.end)));
        }
    );
}

function view(state) {
    return derived2([state.view, state._viewTitle, state._currentRange, state._activeRange], args => createView(...args));
}

function events(state) {
    let _events = writable([]);
    let abortController;
    let fetching = 0;
    derived(
        [state.events, state.eventSources, state._activeRange, state._fetchedRange, state.lazyFetching, state.loading],
        (values, set) => tick().then(() => {
            let [$events, $eventSources, $_activeRange, $_fetchedRange, $lazyFetching, $loading] = values;
            if (!$eventSources.length) {
                set($events);
                return;
            }
            // Do not fetch if new range is within the previous one
            if (!$_fetchedRange.start || $_fetchedRange.start > $_activeRange.start || $_fetchedRange.end < $_activeRange.end || !$lazyFetching) {
                if (abortController) {
                    // Abort previous request
                    abortController.abort();
                }
                // Create new abort controller
                abortController = new AbortController();
                // Call loading hook
                if (is_function($loading) && !fetching) {
                    $loading(true);
                }
                let stopLoading = () => {
                    if (--fetching === 0 && is_function($loading)) {
                        $loading(false);
                    }
                };
                let events = [];
                // Prepare handlers
                let failure = e => stopLoading();
                let success = data => {
                    events = events.concat(createEvents(data));
                    set(events);
                    stopLoading();
                };
                // Prepare other stuff
                let startStr = toISOString($_activeRange.start);
                let endStr = toISOString($_activeRange.end);
                // Loop over event sources
                for (let source of $eventSources) {
                    if (is_function(source.events)) {
                        // Events as a function
                        let result = source.events({
                            start: toLocalDate($_activeRange.start),
                            end: toLocalDate($_activeRange.end),
                            startStr,
                            endStr
                        }, success, failure);
                        if (result !== undefined) {
                            Promise.resolve(result).then(success, failure);
                        }
                    } else {
                        // Events as a JSON feed
                        // Prepare params
                        let params = is_function(source.extraParams) ? source.extraParams() : assign({}, source.extraParams);
                        params.start = startStr;
                        params.end = endStr;
                        params = new URLSearchParams(params);
                        // Prepare fetch
                        let url = source.url, headers = {}, body;
                        if (['GET', 'HEAD'].includes(source.method)) {
                            url += (url.includes('?') ? '&' : '?') + params;
                        } else {
                            headers['content-type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
                            body = String(params);  // Safari 10.1 doesn't convert to string automatically
                        }
                        // Do the fetch
                        fetch(url, {method: source.method, headers, body, signal: abortController.signal, credentials: 'same-origin'})
                            .then(response => response.json())
                            .then(success)
                            .catch(failure);
                    }
                    ++fetching;
                }
                // Save current range for future requests
                $_fetchedRange.start = $_activeRange.start;
                $_fetchedRange.end = $_activeRange.end;
            }
        }),
        []
    ).subscribe(_events.set);

    return _events;
}

class State$4 {
    constructor(plugins, input) {
        plugins = plugins || [];

        // Create options
        let options = createOptions(plugins);
        let parsers = createParsers(options, plugins);

        // Create stores for options
        for (let [option, value] of Object.entries(options)) {
            this[option] = writable2(value, parsers[option]);
        }

        // Private stores
        this._currentRange = currentRange(this);
        this._activeRange = activeRange(this);
        this._fetchedRange = writable({start: undefined, end: undefined});
        this._events = events(this);
        this._intlEventTime = intl(this.locale, this.eventTimeFormat);
        this._intlSlotLabel = intl(this.locale, this.slotLabelFormat);
        this._intlDayHeader = intl(this.locale, this.dayHeaderFormat);
        this._titleIntlRange = intlRange(this.locale, this.titleFormat);
        this._scrollable = writable(false);
        this._viewTitle = viewTitle(this);
        this._viewDates = viewDates(this);
        this._view = view(this);
        this._viewComponent = writable(undefined);
        this._viewClass = writable(undefined);
        // Interaction
        this._interaction = writable({});
        this._iEvents = writable([null, null]);  // interaction events: [drag/resize, pointer]
        this._draggable = writable(noop);
        this._resizable = writable(noop);
        this._classes = writable(identity);
        this._iClass = writable(undefined);
        this._scroll = writable(undefined);

        // Let plugins create their private stores
        for (let plugin of plugins) {
            if ('createStores' in plugin) {
                plugin.createStores(this);
            }
        }

        if (input.view) {
            // Set initial view based on input
            this.view.set(input.view);
        }

        // Set options for each view
        let commonOpts = assign({}, options, input);
        parseOpts(commonOpts, this);
        let views = new Set([...Object.keys(options.views), ...Object.keys(input.views || {})]);
        for (let view of views) {
            let viewOpts = assign({}, options.views[view] || {}, input.views && input.views[view] || {});
            parseOpts(viewOpts, this);
            let opts = assign({}, commonOpts, viewOpts);
            // Change view component when view changes
            this.view.subscribe(newView => {
                if (newView === view) {
                    this._viewComponent.set(opts.component);
                    if (is_function(opts.viewDidMount)) {
                        tick().then(() => opts.viewDidMount(this._view.get()));
                    }
                }
            });
            for (let key of Object.keys(opts)) {
                if (this.hasOwnProperty(key) && key[0] !== '_') {
                    let {set, _set, ...rest} = this[key];

                    if (!_set) {
                        // Original set
                        _set = set;
                    }

                    this[key] = {
                        // Set value in all views
                        set: value => {opts[key] = value; set(value);},
                        _set,
                        ...rest
                    };

                    // Change value when view changes
                    this.view.subscribe(newView => {
                        if (newView === view) {
                            _set(opts[key]);
                        }
                    });
                }
            }
        }
    }
}

function parseOpts(opts, state) {
    for (let key of Object.keys(opts)) {
        if (state.hasOwnProperty(key) && key[0] !== '_') {
            if (state[key].parse) {
                opts[key] = state[key].parse(opts[key]);
            }
        }
    }
}

/* packages/core/src/Buttons.svelte generated by Svelte v3.47.0 */

function get_each_context$1$3(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[23] = list[i];
	return child_ctx;
}

// (38:1) {:else}
function create_else_block$1$1(ctx) {
	let button;
	let t_value = /*$buttonText*/ ctx[5][/*button*/ ctx[23]] + "";
	let t;
	let button_class_value;
	let mounted;
	let dispose;

	function click_handler_1() {
		return /*click_handler_1*/ ctx[20](/*button*/ ctx[23]);
	}

	return {
		c() {
			button = element("button");
			t = text(t_value);

			attr(button, "class", button_class_value = "" + (/*$theme*/ ctx[3].button + (/*$view*/ ctx[6] === /*button*/ ctx[23]
			? ' ' + /*$theme*/ ctx[3].active
			: '') + " ec-" + /*button*/ ctx[23]));
		},
		m(target, anchor) {
			insert(target, button, anchor);
			append(button, t);

			if (!mounted) {
				dispose = listen(button, "click", click_handler_1);
				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			if (dirty & /*$buttonText, buttons*/ 33 && t_value !== (t_value = /*$buttonText*/ ctx[5][/*button*/ ctx[23]] + "")) set_data(t, t_value);

			if (dirty & /*$theme, $view, buttons*/ 73 && button_class_value !== (button_class_value = "" + (/*$theme*/ ctx[3].button + (/*$view*/ ctx[6] === /*button*/ ctx[23]
			? ' ' + /*$theme*/ ctx[3].active
			: '') + " ec-" + /*button*/ ctx[23]))) {
				attr(button, "class", button_class_value);
			}
		},
		d(detaching) {
			if (detaching) detach(button);
			mounted = false;
			dispose();
		}
	};
}

// (36:30) 
function create_if_block_4(ctx) {
	let button;
	let t_value = /*$buttonText*/ ctx[5][/*button*/ ctx[23]] + "";
	let t;
	let button_class_value;
	let mounted;
	let dispose;

	return {
		c() {
			button = element("button");
			t = text(t_value);
			attr(button, "class", button_class_value = "" + (/*$theme*/ ctx[3].button + " ec-" + /*button*/ ctx[23]));
			button.disabled = /*isToday*/ ctx[1];
		},
		m(target, anchor) {
			insert(target, button, anchor);
			append(button, t);

			if (!mounted) {
				dispose = listen(button, "click", /*click_handler*/ ctx[19]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty & /*$buttonText, buttons*/ 33 && t_value !== (t_value = /*$buttonText*/ ctx[5][/*button*/ ctx[23]] + "")) set_data(t, t_value);

			if (dirty & /*$theme, buttons*/ 9 && button_class_value !== (button_class_value = "" + (/*$theme*/ ctx[3].button + " ec-" + /*button*/ ctx[23]))) {
				attr(button, "class", button_class_value);
			}

			if (dirty & /*isToday*/ 2) {
				button.disabled = /*isToday*/ ctx[1];
			}
		},
		d(detaching) {
			if (detaching) detach(button);
			mounted = false;
			dispose();
		}
	};
}

// (34:29) 
function create_if_block_3$1(ctx) {
	let button;
	let i;
	let i_class_value;
	let button_class_value;
	let mounted;
	let dispose;

	return {
		c() {
			button = element("button");
			i = element("i");
			attr(i, "class", i_class_value = "" + (/*$theme*/ ctx[3].icon + " ec-" + /*button*/ ctx[23]));
			attr(button, "class", button_class_value = "" + (/*$theme*/ ctx[3].button + " ec-" + /*button*/ ctx[23]));
		},
		m(target, anchor) {
			insert(target, button, anchor);
			append(button, i);

			if (!mounted) {
				dispose = listen(button, "click", /*next*/ ctx[17]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty & /*$theme, buttons*/ 9 && i_class_value !== (i_class_value = "" + (/*$theme*/ ctx[3].icon + " ec-" + /*button*/ ctx[23]))) {
				attr(i, "class", i_class_value);
			}

			if (dirty & /*$theme, buttons*/ 9 && button_class_value !== (button_class_value = "" + (/*$theme*/ ctx[3].button + " ec-" + /*button*/ ctx[23]))) {
				attr(button, "class", button_class_value);
			}
		},
		d(detaching) {
			if (detaching) detach(button);
			mounted = false;
			dispose();
		}
	};
}

// (32:28) 
function create_if_block_2$3(ctx) {
	let button;
	let i;
	let i_class_value;
	let button_class_value;
	let mounted;
	let dispose;

	return {
		c() {
			button = element("button");
			i = element("i");
			attr(i, "class", i_class_value = "" + (/*$theme*/ ctx[3].icon + " ec-" + /*button*/ ctx[23]));
			attr(button, "class", button_class_value = "" + (/*$theme*/ ctx[3].button + " ec-" + /*button*/ ctx[23]));
		},
		m(target, anchor) {
			insert(target, button, anchor);
			append(button, i);

			if (!mounted) {
				dispose = listen(button, "click", /*prev*/ ctx[16]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty & /*$theme, buttons*/ 9 && i_class_value !== (i_class_value = "" + (/*$theme*/ ctx[3].icon + " ec-" + /*button*/ ctx[23]))) {
				attr(i, "class", i_class_value);
			}

			if (dirty & /*$theme, buttons*/ 9 && button_class_value !== (button_class_value = "" + (/*$theme*/ ctx[3].button + " ec-" + /*button*/ ctx[23]))) {
				attr(button, "class", button_class_value);
			}
		},
		d(detaching) {
			if (detaching) detach(button);
			mounted = false;
			dispose();
		}
	};
}

// (30:29) 
function create_if_block_1$3(ctx) {
	let h2;
	let t;
	let h2_class_value;

	return {
		c() {
			h2 = element("h2");
			t = text(/*$_viewTitle*/ ctx[4]);
			attr(h2, "class", h2_class_value = /*$theme*/ ctx[3].title);
		},
		m(target, anchor) {
			insert(target, h2, anchor);
			append(h2, t);
		},
		p(ctx, dirty) {
			if (dirty & /*$_viewTitle*/ 16) set_data(t, /*$_viewTitle*/ ctx[4]);

			if (dirty & /*$theme*/ 8 && h2_class_value !== (h2_class_value = /*$theme*/ ctx[3].title)) {
				attr(h2, "class", h2_class_value);
			}
		},
		d(detaching) {
			if (detaching) detach(h2);
		}
	};
}

// (29:1) {#if button == ''}
function create_if_block$1$4(ctx) {
	return { c: noop, m: noop, p: noop, d: noop };
}

// (28:0) {#each buttons as button}
function create_each_block$1$3(ctx) {
	let if_block_anchor;

	function select_block_type(ctx, dirty) {
		if (/*button*/ ctx[23] == '') return create_if_block$1$4;
		if (/*button*/ ctx[23] == 'title') return create_if_block_1$3;
		if (/*button*/ ctx[23] == 'prev') return create_if_block_2$3;
		if (/*button*/ ctx[23] === 'next') return create_if_block_3$1;
		if (/*button*/ ctx[23] === 'today') return create_if_block_4;
		return create_else_block$1$1;
	}

	let current_block_type = select_block_type(ctx);
	let if_block = current_block_type(ctx);

	return {
		c() {
			if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if_block.m(target, anchor);
			insert(target, if_block_anchor, anchor);
		},
		p(ctx, dirty) {
			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
				if_block.p(ctx, dirty);
			} else {
				if_block.d(1);
				if_block = current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			}
		},
		d(detaching) {
			if_block.d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

function create_fragment$2$4(ctx) {
	let each_1_anchor;
	let each_value = /*buttons*/ ctx[0];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$1$3(get_each_context$1$3(ctx, each_value, i));
	}

	return {
		c() {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();
		},
		m(target, anchor) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			insert(target, each_1_anchor, anchor);
		},
		p(ctx, [dirty]) {
			if (dirty & /*buttons, $theme, $_viewTitle, prev, next, isToday, $date, cloneDate, today, $buttonText, $view*/ 229503) {
				each_value = /*buttons*/ ctx[0];
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$1$3(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block$1$3(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			destroy_each(each_blocks, detaching);
			if (detaching) detach(each_1_anchor);
		}
	};
}

function instance$2$4($$self, $$props, $$invalidate) {
	let $duration;
	let $date;
	let $hiddenDays;
	let $_currentRange;
	let $theme;
	let $_viewTitle;
	let $buttonText;
	let $view;
	let { buttons } = $$props;
	let { _currentRange, _viewTitle, buttonText, date, duration, hiddenDays, theme, view } = getContext('state');
	component_subscribe($$self, _currentRange, value => $$invalidate(18, $_currentRange = value));
	component_subscribe($$self, _viewTitle, value => $$invalidate(4, $_viewTitle = value));
	component_subscribe($$self, buttonText, value => $$invalidate(5, $buttonText = value));
	component_subscribe($$self, date, value => $$invalidate(2, $date = value));
	component_subscribe($$self, duration, value => $$invalidate(21, $duration = value));
	component_subscribe($$self, hiddenDays, value => $$invalidate(22, $hiddenDays = value));
	component_subscribe($$self, theme, value => $$invalidate(3, $theme = value));
	component_subscribe($$self, view, value => $$invalidate(6, $view = value));
	let today = setMidnight(createDate()), isToday;

	function prev() {
		let d = subtractDuration($date, $duration);

		if ($hiddenDays.length && $hiddenDays.length < 7) {
			while ($hiddenDays.includes(d.getUTCDay())) {
				subtractDay(d);
			}
		}

		set_store_value(date, $date = d, $date);
	}

	function next() {
		set_store_value(date, $date = addDuration($date, $duration), $date);
	}

	const click_handler = () => set_store_value(date, $date = cloneDate(today), $date);
	const click_handler_1 = button => set_store_value(view, $view = button, $view);

	$$self.$$set = $$props => {
		if ('buttons' in $$props) $$invalidate(0, buttons = $$props.buttons);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*$_currentRange*/ 262144) {
			$$invalidate(1, isToday = today >= $_currentRange.start && today < $_currentRange.end || null);
		}
	};

	return [
		buttons,
		isToday,
		$date,
		$theme,
		$_viewTitle,
		$buttonText,
		$view,
		_currentRange,
		_viewTitle,
		buttonText,
		date,
		duration,
		hiddenDays,
		theme,
		view,
		today,
		prev,
		next,
		$_currentRange,
		click_handler,
		click_handler_1
	];
}

class Buttons extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$2$4, create_fragment$2$4, safe_not_equal, { buttons: 0 });
	}
}

/* packages/core/src/Toolbar.svelte generated by Svelte v3.47.0 */

function get_each_context$8(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[5] = list[i];
	return child_ctx;
}

function get_each_context_1$4(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[8] = list[i];
	return child_ctx;
}

// (28:4) {:else}
function create_else_block$2(ctx) {
	let buttons;
	let current;
	buttons = new Buttons({ props: { buttons: /*buttons*/ ctx[8] } });

	return {
		c() {
			create_component(buttons.$$.fragment);
		},
		m(target, anchor) {
			mount_component(buttons, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const buttons_changes = {};
			if (dirty & /*sections*/ 1) buttons_changes.buttons = /*buttons*/ ctx[8];
			buttons.$set(buttons_changes);
		},
		i(local) {
			if (current) return;
			transition_in(buttons.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(buttons.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(buttons, detaching);
		}
	};
}

// (24:4) {#if buttons.length > 1}
function create_if_block$5(ctx) {
	let div;
	let buttons;
	let div_class_value;
	let current;
	buttons = new Buttons({ props: { buttons: /*buttons*/ ctx[8] } });

	return {
		c() {
			div = element("div");
			create_component(buttons.$$.fragment);
			attr(div, "class", div_class_value = /*$theme*/ ctx[1].buttonGroup);
		},
		m(target, anchor) {
			insert(target, div, anchor);
			mount_component(buttons, div, null);
			current = true;
		},
		p(ctx, dirty) {
			const buttons_changes = {};
			if (dirty & /*sections*/ 1) buttons_changes.buttons = /*buttons*/ ctx[8];
			buttons.$set(buttons_changes);

			if (!current || dirty & /*$theme*/ 2 && div_class_value !== (div_class_value = /*$theme*/ ctx[1].buttonGroup)) {
				attr(div, "class", div_class_value);
			}
		},
		i(local) {
			if (current) return;
			transition_in(buttons.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(buttons.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_component(buttons);
		}
	};
}

// (23:3) {#each sections[key] as buttons}
function create_each_block_1$4(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block$5, create_else_block$2];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*buttons*/ ctx[8].length > 1) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	return {
		c() {
			if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if_blocks[current_block_type_index].m(target, anchor);
			insert(target, if_block_anchor, anchor);
			current = true;
		},
		p(ctx, dirty) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(if_block_anchor.parentNode, if_block_anchor);
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if_blocks[current_block_type_index].d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

// (21:1) {#each Object.keys(sections) as key}
function create_each_block$8(ctx) {
	let div;
	let t;
	let current;
	let each_value_1 = /*sections*/ ctx[0][/*key*/ ctx[5]];
	let each_blocks = [];

	for (let i = 0; i < each_value_1.length; i += 1) {
		each_blocks[i] = create_each_block_1$4(get_each_context_1$4(ctx, each_value_1, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	return {
		c() {
			div = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t = space();
		},
		m(target, anchor) {
			insert(target, div, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div, null);
			}

			append(div, t);
			current = true;
		},
		p(ctx, dirty) {
			if (dirty & /*$theme, sections, Object*/ 3) {
				each_value_1 = /*sections*/ ctx[0][/*key*/ ctx[5]];
				let i;

				for (i = 0; i < each_value_1.length; i += 1) {
					const child_ctx = get_each_context_1$4(ctx, each_value_1, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block_1$4(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(div, t);
					}
				}

				group_outros();

				for (i = each_value_1.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}
		},
		i(local) {
			if (current) return;

			for (let i = 0; i < each_value_1.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_each(each_blocks, detaching);
		}
	};
}

function create_fragment$1$4(ctx) {
	let div;
	let div_class_value;
	let current;
	let each_value = Object.keys(/*sections*/ ctx[0]);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$8(get_each_context$8(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	return {
		c() {
			div = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr(div, "class", div_class_value = /*$theme*/ ctx[1].toolbar);
		},
		m(target, anchor) {
			insert(target, div, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div, null);
			}

			current = true;
		},
		p(ctx, [dirty]) {
			if (dirty & /*sections, Object, $theme*/ 3) {
				each_value = Object.keys(/*sections*/ ctx[0]);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$8(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block$8(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(div, null);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}

			if (!current || dirty & /*$theme*/ 2 && div_class_value !== (div_class_value = /*$theme*/ ctx[1].toolbar)) {
				attr(div, "class", div_class_value);
			}
		},
		i(local) {
			if (current) return;

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_each(each_blocks, detaching);
		}
	};
}

function instance$1$4($$self, $$props, $$invalidate) {
	let $headerToolbar;
	let $theme;
	let { headerToolbar, theme } = getContext('state');
	component_subscribe($$self, headerToolbar, value => $$invalidate(4, $headerToolbar = value));
	component_subscribe($$self, theme, value => $$invalidate(1, $theme = value));
	let sections = { start: [], center: [], end: [] };

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*sections, $headerToolbar*/ 17) {
			{
				for (let key of Object.keys(sections)) {
					$$invalidate(0, sections[key] = $headerToolbar[key].split(' ').map(group => group.split(',')), sections);
				}
			}
		}
	};

	return [sections, $theme, headerToolbar, theme, $headerToolbar];
}

class Toolbar extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$1$4, create_fragment$1$4, safe_not_equal, {});
	}
}

/* packages/core/src/Calendar.svelte generated by Svelte v3.47.0 */

function create_fragment$b(ctx) {
	let div;
	let toolbar;
	let t0;
	let switch_instance0;
	let t1;
	let switch_instance1;
	let div_class_value;
	let current;
	toolbar = new Toolbar({});
	var switch_value = /*$_viewComponent*/ ctx[4];

	function switch_props(ctx) {
		return {};
	}

	if (switch_value) {
		switch_instance0 = new switch_value(switch_props());
	}

	var switch_value_1 = /*$_interaction*/ ctx[5].component;

	function switch_props_1(ctx) {
		return {};
	}

	if (switch_value_1) {
		switch_instance1 = new switch_value_1(switch_props_1());
	}

	return {
		c() {
			div = element("div");
			create_component(toolbar.$$.fragment);
			t0 = space();
			if (switch_instance0) create_component(switch_instance0.$$.fragment);
			t1 = space();
			if (switch_instance1) create_component(switch_instance1.$$.fragment);

			attr(div, "class", div_class_value = "" + (/*$theme*/ ctx[0].calendar + (/*$_viewClass*/ ctx[1]
			? ' ' + /*$theme*/ ctx[0][/*$_viewClass*/ ctx[1]]
			: '') + (/*$_iClass*/ ctx[2]
			? ' ' + /*$theme*/ ctx[0][/*$_iClass*/ ctx[2]]
			: '')));

			set_style(div, "height", /*$height*/ ctx[3]);
		},
		m(target, anchor) {
			insert(target, div, anchor);
			mount_component(toolbar, div, null);
			append(div, t0);

			if (switch_instance0) {
				mount_component(switch_instance0, div, null);
			}

			append(div, t1);

			if (switch_instance1) {
				mount_component(switch_instance1, div, null);
			}

			current = true;
		},
		p(ctx, [dirty]) {
			if (switch_value !== (switch_value = /*$_viewComponent*/ ctx[4])) {
				if (switch_instance0) {
					group_outros();
					const old_component = switch_instance0;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance0 = new switch_value(switch_props());
					create_component(switch_instance0.$$.fragment);
					transition_in(switch_instance0.$$.fragment, 1);
					mount_component(switch_instance0, div, t1);
				} else {
					switch_instance0 = null;
				}
			}

			if (switch_value_1 !== (switch_value_1 = /*$_interaction*/ ctx[5].component)) {
				if (switch_instance1) {
					group_outros();
					const old_component = switch_instance1;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value_1) {
					switch_instance1 = new switch_value_1(switch_props_1());
					create_component(switch_instance1.$$.fragment);
					transition_in(switch_instance1.$$.fragment, 1);
					mount_component(switch_instance1, div, null);
				} else {
					switch_instance1 = null;
				}
			}

			if (!current || dirty & /*$theme, $_viewClass, $_iClass*/ 7 && div_class_value !== (div_class_value = "" + (/*$theme*/ ctx[0].calendar + (/*$_viewClass*/ ctx[1]
			? ' ' + /*$theme*/ ctx[0][/*$_viewClass*/ ctx[1]]
			: '') + (/*$_iClass*/ ctx[2]
			? ' ' + /*$theme*/ ctx[0][/*$_iClass*/ ctx[2]]
			: '')))) {
				attr(div, "class", div_class_value);
			}

			if (!current || dirty & /*$height*/ 8) {
				set_style(div, "height", /*$height*/ ctx[3]);
			}
		},
		i(local) {
			if (current) return;
			transition_in(toolbar.$$.fragment, local);
			if (switch_instance0) transition_in(switch_instance0.$$.fragment, local);
			if (switch_instance1) transition_in(switch_instance1.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(toolbar.$$.fragment, local);
			if (switch_instance0) transition_out(switch_instance0.$$.fragment, local);
			if (switch_instance1) transition_out(switch_instance1.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_component(toolbar);
			if (switch_instance0) destroy_component(switch_instance0);
			if (switch_instance1) destroy_component(switch_instance1);
		}
	};
}

function instance$b($$self, $$props, $$invalidate) {
	let $events;
	let $_events;
	let $eventSources;
	let $theme;
	let $_viewClass;
	let $_iClass;
	let $height;
	let $_viewComponent;
	let $_interaction;
	let { plugins = [] } = $$props;
	let { options = {} } = $$props;
	let state = new State$4(plugins, options);
	setContext('state', state);
	let { _viewComponent, _viewClass, _interaction, _iClass, _events, events, eventSources, height, theme } = state;
	component_subscribe($$self, _viewComponent, value => $$invalidate(4, $_viewComponent = value));
	component_subscribe($$self, _viewClass, value => $$invalidate(1, $_viewClass = value));
	component_subscribe($$self, _interaction, value => $$invalidate(5, $_interaction = value));
	component_subscribe($$self, _iClass, value => $$invalidate(2, $_iClass = value));
	component_subscribe($$self, _events, value => $$invalidate(27, $_events = value));
	component_subscribe($$self, events, value => $$invalidate(26, $events = value));
	component_subscribe($$self, eventSources, value => $$invalidate(28, $eventSources = value));
	component_subscribe($$self, height, value => $$invalidate(3, $height = value));
	component_subscribe($$self, theme, value => $$invalidate(0, $theme = value));

	function setOption(name, value) {
		if (state.hasOwnProperty(name)) {
			if (state[name].parse) {
				value = state[name].parse(value);
			}

			state[name].set(value);
		}

		return this;
	}

	function getOption(name) {
		return state.hasOwnProperty(name)
		? get_store_value(state[name])
		: undefined;
	}

	function refetchEvents() {
		state._fetchedRange.set({ start: undefined, end: undefined });
		return this;
	}

	function getEvents() {
		return get_store_value(state._events).map(toEventWithLocalDates);
	}

	function getEventById(id) {
		for (let event of get_store_value(state._events)) {
			if (event.id == id) {
				return toEventWithLocalDates(event);
			}
		}

		return null;
	}

	function addEvent(event) {
		updateEvents(events => events.concat(state.events.parse([event])));
		return this;
	}

	function updateEvent(event) {
		updateEvents(events => {
			for (let e of events) {
				if (e.id == event.id) {
					assign(e, state.events.parse([event])[0]);
					break;
				}
			}

			return events;
		});

		return this;
	}

	function removeEventById(id) {
		updateEvents(events => events.filter(event => event.id != id));
		return this;
	}

	function getView() {
		return toViewWithLocalDates(state._view.get());
	}

	function updateEvents(func) {
		if ($eventSources.length) {
			set_store_value(_events, $_events = func($_events), $_events);
		} else {
			set_store_value(events, $events = func($events), $events);
		}
	}

	$$self.$$set = $$props => {
		if ('plugins' in $$props) $$invalidate(15, plugins = $$props.plugins);
		if ('options' in $$props) $$invalidate(16, options = $$props.options);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*options*/ 65536) {
			// Reactively update options that did change
			for (let [name, value] of diff(options)) {
				setOption(name, value);
			}
		}
	};

	return [
		$theme,
		$_viewClass,
		$_iClass,
		$height,
		$_viewComponent,
		$_interaction,
		_viewComponent,
		_viewClass,
		_interaction,
		_iClass,
		_events,
		events,
		eventSources,
		height,
		theme,
		plugins,
		options,
		setOption,
		getOption,
		refetchEvents,
		getEvents,
		getEventById,
		addEvent,
		updateEvent,
		removeEventById,
		getView
	];
}

class Calendar extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance$b, create_fragment$b, safe_not_equal, {
			plugins: 15,
			options: 16,
			setOption: 17,
			getOption: 18,
			refetchEvents: 19,
			getEvents: 20,
			getEventById: 21,
			addEvent: 22,
			updateEvent: 23,
			removeEventById: 24,
			getView: 25
		});
	}

	get setOption() {
		return this.$$.ctx[17];
	}

	get getOption() {
		return this.$$.ctx[18];
	}

	get refetchEvents() {
		return this.$$.ctx[19];
	}

	get getEvents() {
		return this.$$.ctx[20];
	}

	get getEventById() {
		return this.$$.ctx[21];
	}

	get addEvent() {
		return this.$$.ctx[22];
	}

	get updateEvent() {
		return this.$$.ctx[23];
	}

	get removeEventById() {
		return this.$$.ctx[24];
	}

	get getView() {
		return this.$$.ctx[25];
	}
}

function traverseTimeGrid(el) {
    let dayEl = ancestor(el, 2);
    let colEl = child(ancestor(dayEl, 1), 1);
    let bodyEl = ancestor(dayEl, 3);
    let col = pos(dayEl) - 1;

    return [colEl, bodyEl, col];
}

function traverseResourceTimeGrid(el, datesAboveResources) {
    let dayEl = ancestor(el, 2);
    let colEl = child(child(ancestor(dayEl, 2), 1), 0);
    let resourceEl = ancestor(dayEl, 1);
    let bodyEl = ancestor(resourceEl, 3);
    let col = pos(dayEl);
    let resourceCol = pos(resourceEl) - 1;

    return datesAboveResources ? [colEl, bodyEl, resourceCol, col] : [colEl, bodyEl, col, resourceCol];
}

function traverseDayGrid(el, inPopup) {
    let dayEl = ancestor(el, inPopup ? 3 : 2);
    let daysEl = ancestor(dayEl, 1);
    let contentEl = ancestor(daysEl, 1);
    let colEl = child(child(contentEl, 0), 0);
    let bodyEl = ancestor(contentEl, 1);
    let col = pos(dayEl);
    let row = pos(daysEl);

    return [colEl, bodyEl, col, row, contentEl.children];
}

function child(el, pos) {
    return el.children[pos];
}

function pos(el) {
    let result = 0;
    while ((el = el.previousElementSibling)) {
        ++result;
    }
    return result;
}

let busy = false;
function animate(fn) {
    if (!busy) {
        busy = true;
        window.requestAnimationFrame(() => {
            fn();
            busy = false;
        });
    }
}

function limit(value, max) {
    return Math.max(0, Math.min(max, value));
}

function floor(value) {
    return Math.floor(value);
}

/* packages/interaction/src/Drag.svelte generated by Svelte v3.47.0 */

const { window: window_1 } = globals;

function create_fragment$3$3(ctx) {
	let mounted;
	let dispose;

	return {
		c: noop,
		m(target, anchor) {
			if (!mounted) {
				dispose = [
					listen(window_1, "pointermove", /*handlePointerMove*/ ctx[19]),
					listen(window_1, "pointerup", /*handlePointerUp*/ ctx[20]),
					listen(window_1, "selectstart", /*handleSelectStart*/ ctx[21]),
					listen(window_1, "scroll", /*handleScroll*/ ctx[0])
				];

				mounted = true;
			}
		},
		p: noop,
		i: noop,
		o: noop,
		d(detaching) {
			mounted = false;
			run_all(dispose);
		}
	};
}

const INTERACTING_TIME_GRID = 1;
const INTERACTING_DAY_GRID = 2;

function instance$3$3($$self, $$props, $$invalidate) {
	let $_events;
	let $_iEvents;
	let $_view;
	let $_iClass;

	let $_viewResources,
		$$unsubscribe__viewResources = noop,
		$$subscribe__viewResources = () => ($$unsubscribe__viewResources(), $$unsubscribe__viewResources = subscribe(_viewResources, $$value => $$invalidate(49, $_viewResources = $$value)), _viewResources);

	let $eventDrop;
	let $eventResize;
	let $eventDragStop;
	let $eventResizeStop;
	let $dragScroll;
	let $eventDragStart;
	let $eventResizeStart;
	let $eventDragMinDistance;
	let $_viewDates;
	let $hiddenDays;
	let $slotDuration;
	let $slotHeight;
	let $datesAboveResources;
	$$self.$$.on_destroy.push(() => $$unsubscribe__viewResources());
	let { _iEvents, _iClass, _events, _viewDates, editable, eventStartEditable, eventDragMinDistance, eventDragStart, eventDragStop, eventDrop, eventResizeStart, eventResizeStop, eventResize, dragScroll, slotDuration, slotHeight, hiddenDays, _view, datesAboveResources } = getContext('state');
	component_subscribe($$self, _iEvents, value => $$invalidate(46, $_iEvents = value));
	component_subscribe($$self, _iClass, value => $$invalidate(48, $_iClass = value));
	component_subscribe($$self, _events, value => $$invalidate(45, $_events = value));
	component_subscribe($$self, _viewDates, value => $$invalidate(58, $_viewDates = value));
	component_subscribe($$self, eventDragMinDistance, value => $$invalidate(57, $eventDragMinDistance = value));
	component_subscribe($$self, eventDragStart, value => $$invalidate(55, $eventDragStart = value));
	component_subscribe($$self, eventDragStop, value => $$invalidate(52, $eventDragStop = value));
	component_subscribe($$self, eventDrop, value => $$invalidate(50, $eventDrop = value));
	component_subscribe($$self, eventResizeStart, value => $$invalidate(56, $eventResizeStart = value));
	component_subscribe($$self, eventResizeStop, value => $$invalidate(53, $eventResizeStop = value));
	component_subscribe($$self, eventResize, value => $$invalidate(51, $eventResize = value));
	component_subscribe($$self, dragScroll, value => $$invalidate(54, $dragScroll = value));
	component_subscribe($$self, slotDuration, value => $$invalidate(60, $slotDuration = value));
	component_subscribe($$self, slotHeight, value => $$invalidate(61, $slotHeight = value));
	component_subscribe($$self, hiddenDays, value => $$invalidate(59, $hiddenDays = value));
	component_subscribe($$self, _view, value => $$invalidate(47, $_view = value));
	component_subscribe($$self, datesAboveResources, value => $$invalidate(62, $datesAboveResources = value));
	let interacting = false;
	let resizing; // whether it is just resizing
	let event;
	let col, row;
	let offsetX, offsetY;
	let fromX, fromY;
	let toX, toY;
	let delta;
	let colEl, rowEls, bodyEl;
	let colRect, bodyRect;
	let _viewResources;
	let resourceCol, newResourceCol;
	let isAllDay;
	let minEnd; // minimum end time when resizing

	function startTimeGrid(event, el, jsEvent, resourcesStore, allDay, resize) {
		if (!interacting && jsEvent.isPrimary) {
			if (resourcesStore) {
				[colEl, bodyEl, col, resourceCol] = traverseResourceTimeGrid(el, $datesAboveResources);
			} else {
				[colEl, bodyEl, col] = traverseTimeGrid(el);
			}

			start(event, jsEvent);
			offsetY = floor((jsEvent.clientY - colRect.top) / $slotHeight);
			offsetX = 0; // applicable for all-day slot

			if (allDay && (!resourcesStore || !$datesAboveResources)) {
				offsetX = floor((jsEvent.clientX - colRect.left) / colRect.width) - col - (resourceCol || 0) * $_viewDates.length;
			}

			$$subscribe__viewResources($$invalidate(1, _viewResources = resourcesStore));
			interacting = INTERACTING_TIME_GRID;
			isAllDay = allDay;
			resizing = resize;

			if (resizing) {
				minEnd = addDuration(cloneDate(event.start), $slotDuration);
				set_store_value(_iClass, $_iClass = 'resizingY', $_iClass);
			}
		}
	}

	function startDayGrid(event, el, jsEvent, inPopup, resize) {
		if (!interacting && jsEvent.isPrimary) {
			[colEl, bodyEl, col, row, rowEls] = traverseDayGrid(el, inPopup);
			start(event, jsEvent);

			offsetX = inPopup
			? 0
			: floor((jsEvent.clientX - colRect.left) / colRect.width) - col;

			$$subscribe__viewResources($$invalidate(1, _viewResources = undefined));
			interacting = INTERACTING_DAY_GRID;
			isAllDay = false;
			resizing = resize;

			if (resizing) {
				minEnd = cloneDate(event.start);
				minEnd.setUTCHours(event.end.getUTCHours(), event.end.getUTCMinutes(), event.end.getUTCSeconds());

				if (minEnd < event.start) {
					addDay(minEnd);
				} // minEnd = addDuration(cloneDate(event.start), $slotDuration);  alternative version

				set_store_value(_iClass, $_iClass = 'resizingX', $_iClass);
			}
		}
	}

	function start(eventToDrag, jsEvent) {
		window.getSelection().removeAllRanges();
		event = eventToDrag;
		colRect = rect(colEl);
		bodyRect = rect(bodyEl);
		fromX = toX = jsEvent.clientX;
		fromY = toY = jsEvent.clientY;
		set_store_value(_iClass, $_iClass = 'dragging', $_iClass);
	}

	function move(jsEvent) {
		let rx = toX - colRect.left;
		let ry = toY - colRect.top;
		let newCol = floor(rx / colRect.width);

		if (interacting === INTERACTING_TIME_GRID) {
			// timeGrid
			if (_viewResources) {
				if ($datesAboveResources) {
					let dayCol = limit(floor(newCol / $_viewResources.length), $_viewDates.length - 1);
					newResourceCol = limit(newCol - dayCol * $_viewResources.length, $_viewResources.length - 1);
					newCol = dayCol;
				} else {
					if (resizing) {
						newCol -= resourceCol * $_viewDates.length;
					} else {
						newResourceCol = limit(floor(newCol / $_viewDates.length), $_viewResources.length - 1);
						newCol -= newResourceCol * $_viewDates.length;
					}
				}
			}

			newCol = limit(newCol, $_viewDates.length - 1);

			delta = createDuration({
				days: ($_viewDates[newCol] - $_viewDates[col]) / 1000 / 60 / 60 / 24 - offsetX,
				seconds: isAllDay
				? 0
				: (floor(ry / $slotHeight) - offsetY) * $slotDuration.seconds
			});
		} else {
			// dayGrid
			let cols = 7 - $hiddenDays.length;

			newCol = limit(newCol, cols - 1);
			let newRow = -1;

			do {
				++newRow;
				ry -= rowEls[newRow].offsetHeight;
			} while (ry > 0 && newRow < rowEls.length - 1);

			delta = createDuration({
				days: ($_viewDates[newRow * cols + newCol] - $_viewDates[row * cols + col]) / 1000 / 60 / 60 / 24 - offsetX
			});
		}

		if ($_iEvents[0] || resizing || distance() >= $eventDragMinDistance) {
			if (!$_iEvents[0]) {
				createIEvent(jsEvent, resizing ? $eventResizeStart : $eventDragStart);
			}

			set_store_value(_iEvents, $_iEvents[0].end = addDuration(cloneDate(event.end), delta), $_iEvents);

			if (resizing) {
				if ($_iEvents[0].end < minEnd) {
					set_store_value(_iEvents, $_iEvents[0].end = minEnd, $_iEvents);
					delta = createDuration(($_iEvents[0].end - event.end) / 1000);
				}
			} else {
				set_store_value(_iEvents, $_iEvents[0].start = addDuration(cloneDate(event.start), delta), $_iEvents);

				if (_viewResources) {
					set_store_value(_iEvents, $_iEvents[0].resourceIds = event.resourceIds.filter(id => id !== $_viewResources[resourceCol].id), $_iEvents);
					$_iEvents[0].resourceIds.push($_viewResources[newResourceCol].id);
				}
			}
		}

		if ($dragScroll) {
			animate(() => {
				if (toY < 0) {
					window.scrollBy(0, Math.max(-10, toY / 3));
				}

				if (toY < bodyRect.top) {
					bodyEl.scrollTop += Math.max(-10, (toY - bodyRect.top) / 3);
				}

				if (toY > window.innerHeight) {
					window.scrollBy(0, Math.min(10, (toY - window.innerHeight) / 3));
				}

				if (toY > bodyRect.bottom) {
					bodyEl.scrollTop += Math.min(10, (toY - bodyRect.bottom) / 3);
				}
			});
		}
	}

	function handleScroll() {
		if (interacting) {
			colRect = rect(colEl);
			bodyRect = rect(bodyEl);
			move();
		}
	}

	function handlePointerMove(jsEvent) {
		if (interacting && jsEvent.isPrimary) {
			toX = jsEvent.clientX;
			toY = jsEvent.clientY;
			move(jsEvent);
		}
	}

	function handlePointerUp(jsEvent) {
		if (interacting && jsEvent.isPrimary) {
			if ($_iEvents[0]) {
				event.display = 'auto';
				let callback = resizing ? $eventResizeStop : $eventDragStop;

				if (is_function(callback)) {
					callback({
						event: toEventWithLocalDates(event),
						jsEvent,
						view: toViewWithLocalDates($_view)
					});
				}

				let oldEvent = cloneEvent(event);
				updateEvent(event, $_iEvents[0]);
				set_store_value(_iEvents, $_iEvents[0] = null, $_iEvents);
				callback = resizing ? $eventResize : $eventDrop;

				if (is_function(callback)) {
					let eventRef = event;

					let info = resizing
					? { endDelta: delta }
					: {
							delta,
							oldResource: resourceCol !== newResourceCol
							? $_viewResources[resourceCol]
							: undefined,
							newResource: resourceCol !== newResourceCol
							? $_viewResources[newResourceCol]
							: undefined
						};

					callback(assign(info, {
						event: toEventWithLocalDates(event),
						oldEvent: toEventWithLocalDates(oldEvent),
						jsEvent,
						view: toViewWithLocalDates($_view),
						revert() {
							updateEvent(eventRef, oldEvent);
						}
					}));
				}
			}

			colEl = rowEls = bodyEl = null;
			resourceCol = newResourceCol = undefined;
			interacting = false;
			set_store_value(_iClass, $_iClass = undefined, $_iClass);
		}
	}

	function createIEvent(jsEvent, callback) {
		if (is_function(callback)) {
			callback({
				event: toEventWithLocalDates(event),
				jsEvent,
				view: toViewWithLocalDates($_view)
			});
		}

		event.display = 'preview';
		set_store_value(_iEvents, $_iEvents[0] = cloneEvent(event), $_iEvents);
		event.display = 'ghost';
		_events.set($_events);
	}

	function updateEvent(target, source) {
		target.start = source.start;
		target.end = source.end;
		target.resourceIds = source.resourceIds;
		_events.set($_events);
	}

	function distance() {
		return Math.sqrt(Math.pow(toX - fromX, 2) + Math.pow(toY - fromY, 2));
	}

	function handleSelectStart(jsEvent) {
		if (interacting) {
			jsEvent.preventDefault();
		}
	}

	return [
		handleScroll,
		_viewResources,
		_iEvents,
		_iClass,
		_events,
		_viewDates,
		eventDragMinDistance,
		eventDragStart,
		eventDragStop,
		eventDrop,
		eventResizeStart,
		eventResizeStop,
		eventResize,
		dragScroll,
		slotDuration,
		slotHeight,
		hiddenDays,
		_view,
		datesAboveResources,
		handlePointerMove,
		handlePointerUp,
		handleSelectStart,
		startTimeGrid,
		startDayGrid
	];
}

class Drag extends SvelteComponent {
	constructor(options) {
		super();

		init(
			this,
			options,
			instance$3$3,
			create_fragment$3$3,
			safe_not_equal,
			{
				startTimeGrid: 22,
				startDayGrid: 23,
				handleScroll: 0
			},
			null,
			[-1, -1, -1]
		);
	}

	get startTimeGrid() {
		return this.$$.ctx[22];
	}

	get startDayGrid() {
		return this.$$.ctx[23];
	}

	get handleScroll() {
		return this.$$.ctx[0];
	}
}

/* packages/interaction/src/Pointer.svelte generated by Svelte v3.47.0 */

function create_fragment$2$3(ctx) {
	let mounted;
	let dispose;

	return {
		c: noop,
		m(target, anchor) {
			if (!mounted) {
				dispose = [
					listen(window, "pointermove", /*handlePointerMove*/ ctx[5]),
					listen(window, "scroll", /*handleScroll*/ ctx[0])
				];

				mounted = true;
			}
		},
		p: noop,
		i: noop,
		o: noop,
		d(detaching) {
			mounted = false;
			run_all(dispose);
		}
	};
}

function validEvent(jsEvent) {
	return jsEvent.isPrimary && jsEvent.pointerType === 'mouse';
}

function instance$2$3($$self, $$props, $$invalidate) {
	let $_iEvents;
	let $slotDuration;

	let $_slotTimeLimits,
		$$unsubscribe__slotTimeLimits = noop,
		$$subscribe__slotTimeLimits = () => ($$unsubscribe__slotTimeLimits(), $$unsubscribe__slotTimeLimits = subscribe(_slotTimeLimits, $$value => $$invalidate(17, $_slotTimeLimits = $$value)), _slotTimeLimits);

	let $slotHeight;
	$$self.$$.on_destroy.push(() => $$unsubscribe__slotTimeLimits());
	let { _iEvents, _events, _viewDates, slotDuration, slotHeight, hiddenDays, _view, datesAboveResources, theme } = getContext('state');
	component_subscribe($$self, _iEvents, value => $$invalidate(9, $_iEvents = value));
	component_subscribe($$self, slotDuration, value => $$invalidate(16, $slotDuration = value));
	component_subscribe($$self, slotHeight, value => $$invalidate(18, $slotHeight = value));
	let y;
	let colDate;
	let colEl;
	let colRect;
	let resource;
	let _slotTimeLimits;
	let date;

	function enterTimeGrid(date, el, jsEvent, slotTimeLimitsStore, resourceObj) {
		if (validEvent(jsEvent)) {
			colDate = date;
			colEl = el;
			colRect = rect(colEl);
			y = jsEvent.clientY;
			$$subscribe__slotTimeLimits($$invalidate(1, _slotTimeLimits = slotTimeLimitsStore));
			resource = resourceObj;
		}
	}

	function enterDayGrid(date, jsEvent) {
		if (validEvent(jsEvent)) {
			colDate = date;
			colEl = null;
			y = $$subscribe__slotTimeLimits($$invalidate(1, _slotTimeLimits = resource = undefined));
		}
	}

	function leave(jsEvent) {
		if (validEvent(jsEvent)) {
			removePointerEvent();
		}
	}

	function move() {
		if (!colDate) {
			return;
		}

		if (colEl) {
			// timeGrid
			let ry = y - colRect.top;

			date = addDuration(cloneDate(colDate), $slotDuration, floor(ry / $slotHeight + $_slotTimeLimits.min.seconds / $slotDuration.seconds));
		} else {
			// dayGrid
			date = colDate;
		}

		if (!$_iEvents[1]) {
			createPointerEvent();
		}

		set_store_value(_iEvents, $_iEvents[1].start = date, $_iEvents);
		set_store_value(_iEvents, $_iEvents[1].end = addDuration(cloneDate(date), $slotDuration), $_iEvents);
		set_store_value(_iEvents, $_iEvents[1].resourceIds = resource ? [resource.id] : [], $_iEvents);
	}

	function handleScroll() {
		if (colEl) {
			colRect = rect(colEl);
			move();
		}
	}

	function handlePointerMove(jsEvent) {
		if (validEvent(jsEvent)) {
			y = jsEvent.clientY;
			move();
		}
	}

	function createPointerEvent() {
		set_store_value(
			_iEvents,
			$_iEvents[1] = {
				id: '{pointer}',
				title: '',
				display: 'pointer',
				extendedProps: {},
				backgroundColor: 'transparent'
			},
			$_iEvents
		);
	}

	function removePointerEvent() {
		colDate = colEl = set_store_value(_iEvents, $_iEvents[1] = null, $_iEvents);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*$_iEvents*/ 512) {
			if ($_iEvents[0]) {
				removePointerEvent();
			}
		}
	};

	return [
		handleScroll,
		_slotTimeLimits,
		_iEvents,
		slotDuration,
		slotHeight,
		handlePointerMove,
		enterTimeGrid,
		enterDayGrid,
		leave,
		$_iEvents
	];
}

class Pointer extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance$2$3, create_fragment$2$3, safe_not_equal, {
			enterTimeGrid: 6,
			enterDayGrid: 7,
			leave: 8,
			handleScroll: 0
		});
	}

	get enterTimeGrid() {
		return this.$$.ctx[6];
	}

	get enterDayGrid() {
		return this.$$.ctx[7];
	}

	get leave() {
		return this.$$.ctx[8];
	}

	get handleScroll() {
		return this.$$.ctx[0];
	}
}

/* packages/interaction/src/Interaction.svelte generated by Svelte v3.47.0 */

function create_if_block$1$3(ctx) {
	let pointer_1;
	let current;
	let pointer_1_props = {};
	pointer_1 = new Pointer({ props: pointer_1_props });
	/*pointer_1_binding*/ ctx[18](pointer_1);

	return {
		c() {
			create_component(pointer_1.$$.fragment);
		},
		m(target, anchor) {
			mount_component(pointer_1, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const pointer_1_changes = {};
			pointer_1.$set(pointer_1_changes);
		},
		i(local) {
			if (current) return;
			transition_in(pointer_1.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(pointer_1.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			/*pointer_1_binding*/ ctx[18](null);
			destroy_component(pointer_1, detaching);
		}
	};
}

function create_fragment$1$3(ctx) {
	let drag;
	let t;
	let if_block_anchor;
	let current;
	let drag_props = {};
	drag = new Drag({ props: drag_props });
	/*drag_binding*/ ctx[17](drag);
	let if_block = /*$pointer*/ ctx[1] && create_if_block$1$3(ctx);

	return {
		c() {
			create_component(drag.$$.fragment);
			t = space();
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			mount_component(drag, target, anchor);
			insert(target, t, anchor);
			if (if_block) if_block.m(target, anchor);
			insert(target, if_block_anchor, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			const drag_changes = {};
			drag.$set(drag_changes);

			if (/*$pointer*/ ctx[1]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*$pointer*/ 2) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block$1$3(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}
		},
		i(local) {
			if (current) return;
			transition_in(drag.$$.fragment, local);
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(drag.$$.fragment, local);
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			/*drag_binding*/ ctx[17](null);
			destroy_component(drag, detaching);
			if (detaching) detach(t);
			if (if_block) if_block.d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

function instance$1$3($$self, $$props, $$invalidate) {
	let $_interaction;
	let $_scroll;
	let $editable;
	let $eventDurationEditable;
	let $_resizable;
	let $eventStartEditable;
	let $_draggable;
	let $theme;
	let $_classes;
	let $pointer;
	let { theme, editable, eventStartEditable, eventDurationEditable, pointer, _interaction, _classes, _draggable, _resizable, _scroll } = getContext('state');
	component_subscribe($$self, theme, value => $$invalidate(16, $theme = value));
	component_subscribe($$self, editable, value => $$invalidate(12, $editable = value));
	component_subscribe($$self, eventStartEditable, value => $$invalidate(14, $eventStartEditable = value));
	component_subscribe($$self, eventDurationEditable, value => $$invalidate(13, $eventDurationEditable = value));
	component_subscribe($$self, pointer, value => $$invalidate(1, $pointer = value));
	component_subscribe($$self, _interaction, value => $$invalidate(0, $_interaction = value));
	component_subscribe($$self, _classes, value => $$invalidate(21, $_classes = value));
	component_subscribe($$self, _draggable, value => $$invalidate(15, $_draggable = value));
	component_subscribe($$self, _resizable, value => $$invalidate(20, $_resizable = value));
	component_subscribe($$self, _scroll, value => $$invalidate(19, $_scroll = value));

	set_store_value(
		_scroll,
		$_scroll = () => {
			for (let component of Object.values($_interaction)) {
				component && component.handleScroll && component.handleScroll();
			}
		},
		$_scroll
	);

	function drag_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			$_interaction.drag = $$value;
			_interaction.set($_interaction);
		});
	}

	function pointer_1_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			$_interaction.pointer = $$value;
			_interaction.set($_interaction);
		});
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*$eventStartEditable, $editable*/ 20480) {
			set_store_value(_draggable, $_draggable = event => (event.startEditable ?? $eventStartEditable) || (event.editable ?? $editable), $_draggable);
		}

		if ($$self.$$.dirty & /*$_draggable, $theme*/ 98304) {
			set_store_value(
				_classes,
				$_classes = (className, event) => {
					switch (event.display) {
						case 'auto':
							return className + ($_draggable(event) ? ' ' + $theme.draggable : '');
						case 'ghost':
							return `${$theme.event} ${$theme.ghost}`;
						case 'preview':
							return `${$theme.event} ${$theme.preview}`;
						case 'pointer':
							return `${$theme.event} ${$theme.pointer}`;
						default:
							return className;
					}
				},
				$_classes
			);
		}

		if ($$self.$$.dirty & /*$eventDurationEditable, $editable*/ 12288) {
			set_store_value(_resizable, $_resizable = event => (event.durationEditable ?? $eventDurationEditable) || (event.editable ?? $editable), $_resizable);
		}
	};

	return [
		$_interaction,
		$pointer,
		theme,
		editable,
		eventStartEditable,
		eventDurationEditable,
		pointer,
		_interaction,
		_classes,
		_draggable,
		_resizable,
		_scroll,
		$editable,
		$eventDurationEditable,
		$eventStartEditable,
		$_draggable,
		$theme,
		drag_binding,
		pointer_1_binding
	];
}

class Interaction extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$1$3, create_fragment$1$3, safe_not_equal, {});
	}
}

/* packages/interaction/src/Resizer.svelte generated by Svelte v3.47.0 */

function create_if_block$4(ctx) {
	let div;
	let div_class_value;
	let mounted;
	let dispose;

	return {
		c() {
			div = element("div");
			attr(div, "class", div_class_value = /*$theme*/ ctx[2].resizer);
		},
		m(target, anchor) {
			insert(target, div, anchor);

			if (!mounted) {
				dispose = listen(div, "pointerdown", /*pointerdown_handler*/ ctx[5]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty & /*$theme*/ 4 && div_class_value !== (div_class_value = /*$theme*/ ctx[2].resizer)) {
				attr(div, "class", div_class_value);
			}
		},
		d(detaching) {
			if (detaching) detach(div);
			mounted = false;
			dispose();
		}
	};
}

function create_fragment$a(ctx) {
	let show_if = /*event*/ ctx[0].display === 'auto' && /*$_resizable*/ ctx[1](/*event*/ ctx[0]);
	let if_block_anchor;
	let if_block = show_if && create_if_block$4(ctx);

	return {
		c() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert(target, if_block_anchor, anchor);
		},
		p(ctx, [dirty]) {
			if (dirty & /*event, $_resizable*/ 3) show_if = /*event*/ ctx[0].display === 'auto' && /*$_resizable*/ ctx[1](/*event*/ ctx[0]);

			if (show_if) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block$4(ctx);
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

function instance$a($$self, $$props, $$invalidate) {
	let $_resizable;
	let $theme;
	let { event } = $$props;
	let { theme, _resizable } = getContext('state');
	component_subscribe($$self, theme, value => $$invalidate(2, $theme = value));
	component_subscribe($$self, _resizable, value => $$invalidate(1, $_resizable = value));

	function pointerdown_handler(event) {
		bubble.call(this, $$self, event);
	}

	$$self.$$set = $$props => {
		if ('event' in $$props) $$invalidate(0, event = $$props.event);
	};

	return [event, $_resizable, $theme, theme, _resizable, pointerdown_handler];
}

class Resizer extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$a, create_fragment$a, safe_not_equal, { event: 0 });
	}
}

var index$4 = {
	createOptions(options) {
		options.editable = false;
		options.eventStartEditable = true;
		options.eventDragMinDistance = 5;
		options.eventDragStart = undefined;
		options.eventDragStop = undefined;
		options.eventDrop = undefined;
		options.eventDurationEditable = true;
		options.eventResizeStart = undefined;
		options.eventResizeStop = undefined;
		options.eventResize = undefined;
		options.dragScroll = true;
		options.pointer = false;
		options.theme.draggable = 'ec-draggable';
		options.theme.ghost = 'ec-ghost';
		options.theme.preview = 'ec-preview';
		options.theme.pointer = 'ec-pointer';
		options.theme.resizer = 'ec-resizer';
		options.theme.dragging = 'ec-dragging';
		options.theme.resizingY = 'ec-resizing-y';
		options.theme.resizingX = 'ec-resizing-x';
	},

	createStores(state) {
		state._interaction.set({
			component: Interaction,
			resizer: Resizer
		});
	}
};

function times(state, localState) {
    return derived(
        [localState._slotTimeLimits, state._intlSlotLabel, state.slotDuration],
        ([$_slotTimeLimits, $_intlSlotLabel, $slotDuration]) => {
            let compact = $slotDuration.seconds >= 3600;
            let times = [];
            let date = createDate('2020-01-01');
            let end = cloneDate(date);
            let i = 1;
            addDuration(date, $_slotTimeLimits.min);
            addDuration(end, $_slotTimeLimits.max);
            while (date < end) {
                times.push(times.length && (i || compact) ? $_intlSlotLabel.format(date) : '');
                addDuration(date, $slotDuration);
                i = 1 - i;
            }

            return times;
        }
    );
}

function slotTimeLimits(state) {
    return derived(
        [state._events, state._viewDates, state.flexibleSlotTimeLimits, state.slotMinTime, state.slotMaxTime],
        ([$_events, $_viewDates, $flexibleSlotTimeLimits, $slotMinTime, $slotMaxTime]) => {
            let min = createDuration($slotMinTime);
            let max = createDuration($slotMaxTime);

            if ($flexibleSlotTimeLimits) {
                let minMin = createDuration(Math.min(min.seconds, Math.max(0, max.seconds - DAY_IN_SECONDS)));
                let maxMax = createDuration(Math.max(max.seconds, minMin.seconds + DAY_IN_SECONDS));
                loop: for (let date of $_viewDates) {
                    let start = addDuration(cloneDate(date), min);
                    let end = addDuration(cloneDate(date), max);
                    let minStart = addDuration(cloneDate(date), minMin);
                    let maxEnd = addDuration(cloneDate(date), maxMax);
                    for (let event of $_events) {
                        if (event.display === 'auto' && event.start < maxEnd && event.end > minStart) {
                            if (event.start < start) {
                                let seconds = Math.max((event.start - date) / 1000, minMin.seconds);
                                if (seconds < min.seconds) {
                                    min.seconds = seconds;
                                }
                            }
                            if (event.end > end) {
                                let seconds = Math.min((event.end - date) / 1000, maxMax.seconds);
                                if (seconds > max.seconds) {
                                    max.seconds = seconds;
                                }
                            }
                            if (min.seconds === minMin.seconds && max.seconds === maxMax.seconds) {
                                break loop;
                            }
                        }
                    }
                }
            }

            return {min, max};
        }
    );
}

class State$3 {
    constructor(state) {
        this._slotTimeLimits = slotTimeLimits(state);  // flexible limits
        this._times = times(state, this);
    }
}

function groupEventChunks(chunks) {
    if (!chunks.length) {
        return;
    }

    sortEventChunks(chunks);

    // Group
    let group = {
        columns: [],
        end: chunks[0].end
    };
    for (let chunk of chunks) {
        let c = 0;
        if (chunk.start < group.end) {
            for (; c < group.columns.length; ++c) {
                if (group.columns[c][group.columns[c].length - 1].end <= chunk.start) {
                    break;
                }
            }
            if (chunk.end > group.end) {
                group.end = chunk.end;
            }
        } else {
            group = {
                columns: [],
                end: chunk.end
            };
        }

        if (group.columns.length < c + 1) {
            group.columns.push([]);
        }
        group.columns[c].push(chunk);

        chunk.group = group;
        chunk.column = c;
    }
}

function createAllDayContent(allDayContent) {
    let text = 'all-day';
    let content;
    if (allDayContent) {
        content = is_function(allDayContent) ? allDayContent({text}) : allDayContent;
        if (typeof content === 'string') {
            content = {html: content};
        }
    } else {
        content = {
            html: text
        };
    }

    return content;
}

/* packages/time-grid/src/Header.svelte generated by Svelte v3.47.0 */

function get_each_context$5$1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[12] = list[i];
	return child_ctx;
}

// (19:3) {#each $_times as time}
function create_each_block$5$1(ctx) {
	let div;
	let t_value = /*time*/ ctx[12] + "";
	let t;
	let div_class_value;

	return {
		c() {
			div = element("div");
			t = text(t_value);
			attr(div, "class", div_class_value = /*$theme*/ ctx[2].time);
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, t);
		},
		p(ctx, dirty) {
			if (dirty & /*$_times*/ 16 && t_value !== (t_value = /*time*/ ctx[12] + "")) set_data(t, t_value);

			if (dirty & /*$theme*/ 4 && div_class_value !== (div_class_value = /*$theme*/ ctx[2].time)) {
				attr(div, "class", div_class_value);
			}
		},
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

function create_fragment$8$1(ctx) {
	let div6;
	let div2;
	let div0;
	let div0_class_value;
	let setContent_action;
	let t0;
	let div1;
	let div1_class_value;
	let div2_class_value;
	let t1;
	let div4;
	let div3;
	let div3_class_value;
	let t2;
	let div4_class_value;
	let t3;
	let div5;
	let div5_class_value;
	let div6_class_value;
	let current;
	let mounted;
	let dispose;
	let each_value = /*$_times*/ ctx[4];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$5$1(get_each_context$5$1(ctx, each_value, i));
	}

	const default_slot_template = /*#slots*/ ctx[11].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[10], null);

	return {
		c() {
			div6 = element("div");
			div2 = element("div");
			div0 = element("div");
			t0 = space();
			div1 = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t1 = space();
			div4 = element("div");
			div3 = element("div");
			t2 = space();
			if (default_slot) default_slot.c();
			t3 = space();
			div5 = element("div");
			attr(div0, "class", div0_class_value = /*$theme*/ ctx[2].sidebarTitle);
			attr(div1, "class", div1_class_value = /*$theme*/ ctx[2].hiddenTimes);
			attr(div2, "class", div2_class_value = /*$theme*/ ctx[2].sidebar);
			attr(div3, "class", div3_class_value = /*$theme*/ ctx[2].lines);
			attr(div4, "class", div4_class_value = /*$theme*/ ctx[2].days);
			attr(div5, "class", div5_class_value = /*$theme*/ ctx[2].hiddenScroll);

			attr(div6, "class", div6_class_value = "" + ((/*allDay*/ ctx[0]
			? /*$theme*/ ctx[2].allDay
			: /*$theme*/ ctx[2].header) + (/*$_scrollable*/ ctx[3]
			? ' ' + /*$theme*/ ctx[2].withScroll
			: '')));
		},
		m(target, anchor) {
			insert(target, div6, anchor);
			append(div6, div2);
			append(div2, div0);
			append(div2, t0);
			append(div2, div1);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div1, null);
			}

			append(div6, t1);
			append(div6, div4);
			append(div4, div3);
			append(div4, t2);

			if (default_slot) {
				default_slot.m(div4, null);
			}

			append(div6, t3);
			append(div6, div5);
			current = true;

			if (!mounted) {
				dispose = action_destroyer(setContent_action = setContent.call(null, div0, /*allDayText*/ ctx[1]));
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (!current || dirty & /*$theme*/ 4 && div0_class_value !== (div0_class_value = /*$theme*/ ctx[2].sidebarTitle)) {
				attr(div0, "class", div0_class_value);
			}

			if (setContent_action && is_function(setContent_action.update) && dirty & /*allDayText*/ 2) setContent_action.update.call(null, /*allDayText*/ ctx[1]);

			if (dirty & /*$theme, $_times*/ 20) {
				each_value = /*$_times*/ ctx[4];
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$5$1(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block$5$1(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(div1, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}

			if (!current || dirty & /*$theme*/ 4 && div1_class_value !== (div1_class_value = /*$theme*/ ctx[2].hiddenTimes)) {
				attr(div1, "class", div1_class_value);
			}

			if (!current || dirty & /*$theme*/ 4 && div2_class_value !== (div2_class_value = /*$theme*/ ctx[2].sidebar)) {
				attr(div2, "class", div2_class_value);
			}

			if (!current || dirty & /*$theme*/ 4 && div3_class_value !== (div3_class_value = /*$theme*/ ctx[2].lines)) {
				attr(div3, "class", div3_class_value);
			}

			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 1024)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[10],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[10])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[10], dirty, null),
						null
					);
				}
			}

			if (!current || dirty & /*$theme*/ 4 && div4_class_value !== (div4_class_value = /*$theme*/ ctx[2].days)) {
				attr(div4, "class", div4_class_value);
			}

			if (!current || dirty & /*$theme*/ 4 && div5_class_value !== (div5_class_value = /*$theme*/ ctx[2].hiddenScroll)) {
				attr(div5, "class", div5_class_value);
			}

			if (!current || dirty & /*allDay, $theme, $_scrollable*/ 13 && div6_class_value !== (div6_class_value = "" + ((/*allDay*/ ctx[0]
			? /*$theme*/ ctx[2].allDay
			: /*$theme*/ ctx[2].header) + (/*$_scrollable*/ ctx[3]
			? ' ' + /*$theme*/ ctx[2].withScroll
			: '')))) {
				attr(div6, "class", div6_class_value);
			}
		},
		i(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div6);
			destroy_each(each_blocks, detaching);
			if (default_slot) default_slot.d(detaching);
			mounted = false;
			dispose();
		}
	};
}

function instance$8$1($$self, $$props, $$invalidate) {
	let $allDayContent;
	let $theme;
	let $_scrollable;
	let $_times;
	let { $$slots: slots = {}, $$scope } = $$props;
	let { allDay = false } = $$props;
	let { _scrollable, allDayContent, theme } = getContext('state');
	component_subscribe($$self, _scrollable, value => $$invalidate(3, $_scrollable = value));
	component_subscribe($$self, allDayContent, value => $$invalidate(9, $allDayContent = value));
	component_subscribe($$self, theme, value => $$invalidate(2, $theme = value));
	let { _times } = getContext('view-state');
	component_subscribe($$self, _times, value => $$invalidate(4, $_times = value));
	let allDayText;

	$$self.$$set = $$props => {
		if ('allDay' in $$props) $$invalidate(0, allDay = $$props.allDay);
		if ('$$scope' in $$props) $$invalidate(10, $$scope = $$props.$$scope);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*$allDayContent*/ 512) {
			$$invalidate(1, allDayText = createAllDayContent($allDayContent));
		}
	};

	return [
		allDay,
		allDayText,
		$theme,
		$_scrollable,
		$_times,
		_scrollable,
		allDayContent,
		theme,
		_times,
		$allDayContent,
		$$scope,
		slots
	];
}

class Header$1 extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$8$1, create_fragment$8$1, safe_not_equal, { allDay: 0 });
	}
}

/* packages/time-grid/src/Body.svelte generated by Svelte v3.47.0 */

function get_each_context$4$1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[30] = list[i];
	return child_ctx;
}

function get_each_context_1$2(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[33] = list[i];
	return child_ctx;
}

// (46:3) {#each $_times as time}
function create_each_block_1$2(ctx) {
	let div;
	let t_value = /*time*/ ctx[33] + "";
	let t;
	let div_class_value;

	return {
		c() {
			div = element("div");
			t = text(t_value);
			attr(div, "class", div_class_value = /*$theme*/ ctx[5].time);
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, t);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*$_times*/ 2 && t_value !== (t_value = /*time*/ ctx[33] + "")) set_data(t, t_value);

			if (dirty[0] & /*$theme*/ 32 && div_class_value !== (div_class_value = /*$theme*/ ctx[5].time)) {
				attr(div, "class", div_class_value);
			}
		},
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

// (52:4) {#each lines as line}
function create_each_block$4$1(ctx) {
	let div;
	let div_class_value;

	return {
		c() {
			div = element("div");
			attr(div, "class", div_class_value = /*$theme*/ ctx[5].line);
		},
		m(target, anchor) {
			insert(target, div, anchor);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*$theme*/ 32 && div_class_value !== (div_class_value = /*$theme*/ ctx[5].line)) {
				attr(div, "class", div_class_value);
			}
		},
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

function create_fragment$7$1(ctx) {
	let div5;
	let div4;
	let div1;
	let div0;
	let div0_class_value;
	let setContent_action;
	let t0;
	let div1_class_value;
	let t1;
	let div3;
	let div2;
	let div2_class_value;
	let t2;
	let div3_class_value;
	let div4_class_value;
	let div5_class_value;
	let current;
	let mounted;
	let dispose;
	let each_value_1 = /*$_times*/ ctx[1];
	let each_blocks_1 = [];

	for (let i = 0; i < each_value_1.length; i += 1) {
		each_blocks_1[i] = create_each_block_1$2(get_each_context_1$2(ctx, each_value_1, i));
	}

	let each_value = /*lines*/ ctx[3];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$4$1(get_each_context$4$1(ctx, each_value, i));
	}

	const default_slot_template = /*#slots*/ ctx[26].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[25], null);

	return {
		c() {
			div5 = element("div");
			div4 = element("div");
			div1 = element("div");
			div0 = element("div");
			t0 = space();

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				each_blocks_1[i].c();
			}

			t1 = space();
			div3 = element("div");
			div2 = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t2 = space();
			if (default_slot) default_slot.c();
			attr(div0, "class", div0_class_value = /*$theme*/ ctx[5].sidebarTitle);
			attr(div1, "class", div1_class_value = /*$theme*/ ctx[5].sidebar);
			attr(div2, "class", div2_class_value = /*$theme*/ ctx[5].lines);
			attr(div3, "class", div3_class_value = /*$theme*/ ctx[5].days);
			attr(div4, "class", div4_class_value = /*$theme*/ ctx[5].content);

			attr(div5, "class", div5_class_value = "" + (/*$theme*/ ctx[5].body + (/*compact*/ ctx[2]
			? ' ' + /*$theme*/ ctx[5].compact
			: '')));
		},
		m(target, anchor) {
			insert(target, div5, anchor);
			append(div5, div4);
			append(div4, div1);
			append(div1, div0);
			append(div1, t0);

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				each_blocks_1[i].m(div1, null);
			}

			append(div4, t1);
			append(div4, div3);
			append(div3, div2);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div2, null);
			}

			append(div3, t2);

			if (default_slot) {
				default_slot.m(div3, null);
			}

			/*div5_binding*/ ctx[27](div5);
			current = true;

			if (!mounted) {
				dispose = [
					listen(window, "resize", /*recheckScrollable*/ ctx[17]),
					action_destroyer(setContent_action = setContent.call(null, div0, /*allDayText*/ ctx[4])),
					listen(div5, "scroll", function () {
						if (is_function(/*$_scroll*/ ctx[6])) /*$_scroll*/ ctx[6].apply(this, arguments);
					})
				];

				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;

			if (!current || dirty[0] & /*$theme*/ 32 && div0_class_value !== (div0_class_value = /*$theme*/ ctx[5].sidebarTitle)) {
				attr(div0, "class", div0_class_value);
			}

			if (setContent_action && is_function(setContent_action.update) && dirty[0] & /*allDayText*/ 16) setContent_action.update.call(null, /*allDayText*/ ctx[4]);

			if (dirty[0] & /*$theme, $_times*/ 34) {
				each_value_1 = /*$_times*/ ctx[1];
				let i;

				for (i = 0; i < each_value_1.length; i += 1) {
					const child_ctx = get_each_context_1$2(ctx, each_value_1, i);

					if (each_blocks_1[i]) {
						each_blocks_1[i].p(child_ctx, dirty);
					} else {
						each_blocks_1[i] = create_each_block_1$2(child_ctx);
						each_blocks_1[i].c();
						each_blocks_1[i].m(div1, null);
					}
				}

				for (; i < each_blocks_1.length; i += 1) {
					each_blocks_1[i].d(1);
				}

				each_blocks_1.length = each_value_1.length;
			}

			if (!current || dirty[0] & /*$theme*/ 32 && div1_class_value !== (div1_class_value = /*$theme*/ ctx[5].sidebar)) {
				attr(div1, "class", div1_class_value);
			}

			if (dirty[0] & /*$theme, lines*/ 40) {
				each_value = /*lines*/ ctx[3];
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$4$1(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block$4$1(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(div2, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}

			if (!current || dirty[0] & /*$theme*/ 32 && div2_class_value !== (div2_class_value = /*$theme*/ ctx[5].lines)) {
				attr(div2, "class", div2_class_value);
			}

			if (default_slot) {
				if (default_slot.p && (!current || dirty[0] & /*$$scope*/ 33554432)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[25],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[25])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[25], dirty, null),
						null
					);
				}
			}

			if (!current || dirty[0] & /*$theme*/ 32 && div3_class_value !== (div3_class_value = /*$theme*/ ctx[5].days)) {
				attr(div3, "class", div3_class_value);
			}

			if (!current || dirty[0] & /*$theme*/ 32 && div4_class_value !== (div4_class_value = /*$theme*/ ctx[5].content)) {
				attr(div4, "class", div4_class_value);
			}

			if (!current || dirty[0] & /*$theme, compact*/ 36 && div5_class_value !== (div5_class_value = "" + (/*$theme*/ ctx[5].body + (/*compact*/ ctx[2]
			? ' ' + /*$theme*/ ctx[5].compact
			: '')))) {
				attr(div5, "class", div5_class_value);
			}
		},
		i(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div5);
			destroy_each(each_blocks_1, detaching);
			destroy_each(each_blocks, detaching);
			if (default_slot) default_slot.d(detaching);
			/*div5_binding*/ ctx[27](null);
			mounted = false;
			run_all(dispose);
		}
	};
}

function instance$7$1($$self, $$props, $$invalidate) {
	let $_scrollable;
	let $slotDuration;
	let $_times;
	let $slotHeight;
	let $scrollTime;
	let $_viewDates;
	let $allDayContent;
	let $_slotTimeLimits;
	let $theme;
	let $_scroll;
	let { $$slots: slots = {}, $$scope } = $$props;
	let { _intlSlotLabel, _viewDates, scrollTime, _scrollable, _scroll, allDayContent, slotDuration, slotHeight, theme } = getContext('state');
	component_subscribe($$self, _viewDates, value => $$invalidate(22, $_viewDates = value));
	component_subscribe($$self, scrollTime, value => $$invalidate(21, $scrollTime = value));
	component_subscribe($$self, _scrollable, value => $$invalidate(28, $_scrollable = value));
	component_subscribe($$self, _scroll, value => $$invalidate(6, $_scroll = value));
	component_subscribe($$self, allDayContent, value => $$invalidate(23, $allDayContent = value));
	component_subscribe($$self, slotDuration, value => $$invalidate(19, $slotDuration = value));
	component_subscribe($$self, slotHeight, value => $$invalidate(20, $slotHeight = value));
	component_subscribe($$self, theme, value => $$invalidate(5, $theme = value));
	let { _slotTimeLimits, _times } = getContext('view-state');
	component_subscribe($$self, _slotTimeLimits, value => $$invalidate(24, $_slotTimeLimits = value));
	component_subscribe($$self, _times, value => $$invalidate(1, $_times = value));
	let el;
	let compact;
	let lines = [];
	let timeLimitMin;
	let allDayText;

	function recheckScrollable() {
		set_store_value(_scrollable, $_scrollable = hasYScroll(el), $_scrollable);
	}

	function div5_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			el = $$value;
			((((((($$invalidate(0, el), $$invalidate(22, $_viewDates)), $$invalidate(21, $scrollTime)), $$invalidate(18, timeLimitMin)), $$invalidate(19, $slotDuration)), $$invalidate(20, $slotHeight)), $$invalidate(1, $_times)), $$invalidate(24, $_slotTimeLimits));
		});
	}

	$$self.$$set = $$props => {
		if ('$$scope' in $$props) $$invalidate(25, $$scope = $$props.$$scope);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty[0] & /*$slotDuration, $_times, $_slotTimeLimits*/ 17301506) {
			{
				$$invalidate(2, compact = $slotDuration.seconds >= 3600);
				$$invalidate(3, lines.length = $_times.length, lines);

				// Use intermediate variable so that changes in _slotTimeLimits do not trigger setting the el.scrollTop
				$$invalidate(18, timeLimitMin = $_slotTimeLimits.min.seconds);
			}
		}

		if ($$self.$$.dirty[0] & /*$allDayContent*/ 8388608) {
			$$invalidate(4, allDayText = createAllDayContent($allDayContent));
		}

		if ($$self.$$.dirty[0] & /*el, $_viewDates, $scrollTime, timeLimitMin, $slotDuration, $slotHeight*/ 8126465) {
			if (el && $_viewDates) {
				$$invalidate(0, el.scrollTop = (($scrollTime.seconds - timeLimitMin) / $slotDuration.seconds - 0.5) * $slotHeight, el);
			}
		}

		if ($$self.$$.dirty[0] & /*el, $_times, $slotDuration*/ 524291) {
			if (el && $_times && $slotDuration) {
				setTimeout(recheckScrollable);
			}
		}
	};

	return [
		el,
		$_times,
		compact,
		lines,
		allDayText,
		$theme,
		$_scroll,
		_viewDates,
		scrollTime,
		_scrollable,
		_scroll,
		allDayContent,
		slotDuration,
		slotHeight,
		theme,
		_slotTimeLimits,
		_times,
		recheckScrollable,
		timeLimitMin,
		$slotDuration,
		$slotHeight,
		$scrollTime,
		$_viewDates,
		$allDayContent,
		$_slotTimeLimits,
		$$scope,
		slots,
		div5_binding
	];
}

class Body$2 extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$7$1, create_fragment$7$1, safe_not_equal, {}, null, [-1, -1]);
	}
}

/* packages/time-grid/src/Event.svelte generated by Svelte v3.47.0 */

function create_fragment$6$1(ctx) {
	let div1;
	let div0;
	let div0_class_value;
	let setContent_action;
	let t;
	let switch_instance;
	let current;
	let mounted;
	let dispose;
	var switch_value = /*$_interaction*/ ctx[7].resizer;

	function switch_props(ctx) {
		return { props: { event: /*event*/ ctx[0] } };
	}

	if (switch_value) {
		switch_instance = new switch_value(switch_props(ctx));
		switch_instance.$on("pointerdown", /*createDragHandler*/ ctx[30](true));
	}

	return {
		c() {
			div1 = element("div");
			div0 = element("div");
			t = space();
			if (switch_instance) create_component(switch_instance.$$.fragment);
			attr(div0, "class", div0_class_value = /*$theme*/ ctx[2].eventBody);
			attr(div1, "class", /*classes*/ ctx[4]);
			attr(div1, "style", /*style*/ ctx[5]);
		},
		m(target, anchor) {
			insert(target, div1, anchor);
			append(div1, div0);
			append(div1, t);

			if (switch_instance) {
				mount_component(switch_instance, div1, null);
			}

			/*div1_binding*/ ctx[43](div1);
			current = true;

			if (!mounted) {
				dispose = [
					action_destroyer(setContent_action = setContent.call(null, div0, /*content*/ ctx[6])),
					listen(div1, "click", function () {
						if (is_function(/*createHandler*/ ctx[29](/*$eventClick*/ ctx[8], /*display*/ ctx[1]))) /*createHandler*/ ctx[29](/*$eventClick*/ ctx[8], /*display*/ ctx[1]).apply(this, arguments);
					}),
					listen(div1, "mouseenter", function () {
						if (is_function(/*createHandler*/ ctx[29](/*$eventMouseEnter*/ ctx[9], /*display*/ ctx[1]))) /*createHandler*/ ctx[29](/*$eventMouseEnter*/ ctx[9], /*display*/ ctx[1]).apply(this, arguments);
					}),
					listen(div1, "mouseleave", function () {
						if (is_function(/*createHandler*/ ctx[29](/*$eventMouseLeave*/ ctx[10], /*display*/ ctx[1]))) /*createHandler*/ ctx[29](/*$eventMouseLeave*/ ctx[10], /*display*/ ctx[1]).apply(this, arguments);
					}),
					listen(div1, "pointerdown", function () {
						if (is_function(/*display*/ ctx[1] === 'auto' && /*$_draggable*/ ctx[11](/*event*/ ctx[0])
						? /*createDragHandler*/ ctx[30]()
						: undefined)) (/*display*/ ctx[1] === 'auto' && /*$_draggable*/ ctx[11](/*event*/ ctx[0])
						? /*createDragHandler*/ ctx[30]()
						: undefined).apply(this, arguments);
					})
				];

				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;

			if (!current || dirty[0] & /*$theme*/ 4 && div0_class_value !== (div0_class_value = /*$theme*/ ctx[2].eventBody)) {
				attr(div0, "class", div0_class_value);
			}

			if (setContent_action && is_function(setContent_action.update) && dirty[0] & /*content*/ 64) setContent_action.update.call(null, /*content*/ ctx[6]);
			const switch_instance_changes = {};
			if (dirty[0] & /*event*/ 1) switch_instance_changes.event = /*event*/ ctx[0];

			if (switch_value !== (switch_value = /*$_interaction*/ ctx[7].resizer)) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props(ctx));
					switch_instance.$on("pointerdown", /*createDragHandler*/ ctx[30](true));
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, div1, null);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}

			if (!current || dirty[0] & /*classes*/ 16) {
				attr(div1, "class", /*classes*/ ctx[4]);
			}

			if (!current || dirty[0] & /*style*/ 32) {
				attr(div1, "style", /*style*/ ctx[5]);
			}
		},
		i(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div1);
			if (switch_instance) destroy_component(switch_instance);
			/*div1_binding*/ ctx[43](null);
			mounted = false;
			run_all(dispose);
		}
	};
}

function instance$6$1($$self, $$props, $$invalidate) {
	let $_interaction;
	let $_view;
	let $eventDidMount;
	let $_intlEventTime;
	let $theme;
	let $eventContent;
	let $displayEventEnd;
	let $_classes;
	let $eventColor;
	let $eventBackgroundColor;
	let $slotHeight;
	let $_slotTimeLimits;
	let $slotDuration;
	let $eventClick;
	let $eventMouseEnter;
	let $eventMouseLeave;
	let $_draggable;
	let { date } = $$props;
	let { chunk } = $$props;
	let { displayEventEnd, eventBackgroundColor, eventColor, eventContent, eventClick, eventDidMount, eventMouseEnter, eventMouseLeave, slotDuration, slotHeight, theme, _view, _intlEventTime, _interaction, _classes, _draggable } = getContext('state');
	component_subscribe($$self, displayEventEnd, value => $$invalidate(36, $displayEventEnd = value));
	component_subscribe($$self, eventBackgroundColor, value => $$invalidate(39, $eventBackgroundColor = value));
	component_subscribe($$self, eventColor, value => $$invalidate(38, $eventColor = value));
	component_subscribe($$self, eventContent, value => $$invalidate(35, $eventContent = value));
	component_subscribe($$self, eventClick, value => $$invalidate(8, $eventClick = value));
	component_subscribe($$self, eventDidMount, value => $$invalidate(45, $eventDidMount = value));
	component_subscribe($$self, eventMouseEnter, value => $$invalidate(9, $eventMouseEnter = value));
	component_subscribe($$self, eventMouseLeave, value => $$invalidate(10, $eventMouseLeave = value));
	component_subscribe($$self, slotDuration, value => $$invalidate(42, $slotDuration = value));
	component_subscribe($$self, slotHeight, value => $$invalidate(40, $slotHeight = value));
	component_subscribe($$self, theme, value => $$invalidate(2, $theme = value));
	component_subscribe($$self, _view, value => $$invalidate(33, $_view = value));
	component_subscribe($$self, _intlEventTime, value => $$invalidate(34, $_intlEventTime = value));
	component_subscribe($$self, _interaction, value => $$invalidate(7, $_interaction = value));
	component_subscribe($$self, _classes, value => $$invalidate(37, $_classes = value));
	component_subscribe($$self, _draggable, value => $$invalidate(11, $_draggable = value));
	let { _slotTimeLimits, _viewResources } = getContext('view-state');
	component_subscribe($$self, _slotTimeLimits, value => $$invalidate(41, $_slotTimeLimits = value));
	let el;
	let event;
	let display;
	let classes;
	let style;
	let content;
	let timeText;

	onMount(() => {
		if (is_function($eventDidMount)) {
			$eventDidMount({
				event: toEventWithLocalDates(event),
				timeText,
				el,
				view: toViewWithLocalDates($_view)
			});
		}
	});

	function createHandler(fn, display) {
		return display !== 'preview' && is_function(fn)
		? jsEvent => fn({
				event: toEventWithLocalDates(event),
				el,
				jsEvent,
				view: toViewWithLocalDates($_view)
			})
		: undefined;
	}

	function createDragHandler(resize) {
		return jsEvent => $_interaction.drag.startTimeGrid(event, el, jsEvent, _viewResources, false, resize);
	}

	function div1_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			el = $$value;
			$$invalidate(3, el);
		});
	}

	$$self.$$set = $$props => {
		if ('date' in $$props) $$invalidate(31, date = $$props.date);
		if ('chunk' in $$props) $$invalidate(32, chunk = $$props.chunk);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty[1] & /*chunk*/ 2) {
			$$invalidate(0, event = chunk.event);
		}

		if ($$self.$$.dirty[0] & /*event, style, display, $theme*/ 39 | $$self.$$.dirty[1] & /*$slotDuration, $_slotTimeLimits, chunk, date, $slotHeight, $eventBackgroundColor, $eventColor, $_classes*/ 4035) {
			{
				$$invalidate(1, display = event.display);

				// Style
				let step = $slotDuration.seconds / 60;

				let offset = $_slotTimeLimits.min.seconds / 60;
				let start = (chunk.start - date) / 1000 / 60;
				let end = (chunk.end - date) / 1000 / 60;
				let top = (start - offset) / step * $slotHeight;
				let height = (end - start) / step * $slotHeight;
				let maxHeight = ($_slotTimeLimits.max.seconds / 60 - start) / step * $slotHeight;
				let bgColor = event.backgroundColor || $eventBackgroundColor || $eventColor;
				$$invalidate(5, style = `top:${top}px;` + `min-height:${height}px;` + `height:${height}px;` + `max-height:${maxHeight}px;`);

				if (bgColor) {
					$$invalidate(5, style += `background-color:${bgColor};`);
				}

				if (display === 'auto' || display === 'ghost') {
					$$invalidate(5, style += `z-index:${chunk.column + 1};` + `left:${100 / chunk.group.columns.length * chunk.column}%;` + `width:${100 / chunk.group.columns.length * 0.5 * (1 + chunk.group.columns.length - chunk.column)}%;`);
				}

				// Class
				$$invalidate(4, classes = $_classes(display === 'background' ? $theme.bgEvent : $theme.event, event));
			}
		}

		if ($$self.$$.dirty[0] & /*$theme*/ 4 | $$self.$$.dirty[1] & /*chunk, $displayEventEnd, $eventContent, $_intlEventTime, $_view*/ 62) {
			// Content
			$$invalidate(6, [timeText, content] = createEventContent(chunk, $displayEventEnd, $eventContent, $theme, $_intlEventTime, $_view), content);
		}
	};

	return [
		event,
		display,
		$theme,
		el,
		classes,
		style,
		content,
		$_interaction,
		$eventClick,
		$eventMouseEnter,
		$eventMouseLeave,
		$_draggable,
		displayEventEnd,
		eventBackgroundColor,
		eventColor,
		eventContent,
		eventClick,
		eventDidMount,
		eventMouseEnter,
		eventMouseLeave,
		slotDuration,
		slotHeight,
		theme,
		_view,
		_intlEventTime,
		_interaction,
		_classes,
		_draggable,
		_slotTimeLimits,
		createHandler,
		createDragHandler,
		date,
		chunk,
		$_view,
		$_intlEventTime,
		$eventContent,
		$displayEventEnd,
		$_classes,
		$eventColor,
		$eventBackgroundColor,
		$slotHeight,
		$_slotTimeLimits,
		$slotDuration,
		div1_binding
	];
}

class Event$1$1 extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$6$1, create_fragment$6$1, safe_not_equal, { date: 31, chunk: 32 }, null, [-1, -1]);
	}
}

/* packages/time-grid/src/NowIndicator.svelte generated by Svelte v3.47.0 */

function create_fragment$5$1(ctx) {
	let div;
	let div_class_value;

	return {
		c() {
			div = element("div");
			attr(div, "class", div_class_value = /*$theme*/ ctx[1].nowIndicator);
			set_style(div, "top", /*top*/ ctx[0] + "px");
		},
		m(target, anchor) {
			insert(target, div, anchor);
		},
		p(ctx, [dirty]) {
			if (dirty & /*$theme*/ 2 && div_class_value !== (div_class_value = /*$theme*/ ctx[1].nowIndicator)) {
				attr(div, "class", div_class_value);
			}

			if (dirty & /*top*/ 1) {
				set_style(div, "top", /*top*/ ctx[0] + "px");
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

function instance$5$1($$self, $$props, $$invalidate) {
	let $slotHeight;
	let $_slotTimeLimits;
	let $slotDuration;
	let $theme;
	let { slotDuration, slotHeight, theme } = getContext('state');
	component_subscribe($$self, slotDuration, value => $$invalidate(10, $slotDuration = value));
	component_subscribe($$self, slotHeight, value => $$invalidate(8, $slotHeight = value));
	component_subscribe($$self, theme, value => $$invalidate(1, $theme = value));
	let { _slotTimeLimits } = getContext('view-state');
	component_subscribe($$self, _slotTimeLimits, value => $$invalidate(9, $_slotTimeLimits = value));
	let now;
	let today;
	let top = 0;
	let intervalID;
	timer();

	onMount(() => setTimeout(
		() => {
			intervalID = setInterval(timer, 60000);
			timer();
		},
		(60 - now.getSeconds()) * 1000
	));

	onDestroy(() => clearInterval(intervalID));

	function timer() {
		$$invalidate(6, now = createDate());
		$$invalidate(7, today = setMidnight(createDate()));
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*$slotDuration, $_slotTimeLimits, now, today, $slotHeight*/ 1984) {
			{
				// Style
				let step = $slotDuration.seconds / 60;

				let offset = $_slotTimeLimits.min.seconds / 60;
				let start = (now - today) / 1000 / 60;
				$$invalidate(0, top = (start - offset) / step * $slotHeight);
			}
		}
	};

	return [
		top,
		$theme,
		slotDuration,
		slotHeight,
		theme,
		_slotTimeLimits,
		now,
		today,
		$slotHeight,
		$_slotTimeLimits,
		$slotDuration
	];
}

class NowIndicator extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$5$1, create_fragment$5$1, safe_not_equal, {});
	}
}

/* packages/time-grid/src/Day.svelte generated by Svelte v3.47.0 */

function get_each_context$3$1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[37] = list[i];
	return child_ctx;
}

function get_each_context_1$1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[37] = list[i];
	return child_ctx;
}

// (107:2) {#each bgChunks as chunk}
function create_each_block_1$1(ctx) {
	let event;
	let current;

	event = new Event$1$1({
			props: {
				date: /*date*/ ctx[0],
				chunk: /*chunk*/ ctx[37]
			}
		});

	return {
		c() {
			create_component(event.$$.fragment);
		},
		m(target, anchor) {
			mount_component(event, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const event_changes = {};
			if (dirty[0] & /*date*/ 1) event_changes.date = /*date*/ ctx[0];
			if (dirty[0] & /*bgChunks*/ 4) event_changes.chunk = /*chunk*/ ctx[37];
			event.$set(event_changes);
		},
		i(local) {
			if (current) return;
			transition_in(event.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(event.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(event, detaching);
		}
	};
}

// (113:2) {#if iChunks[1]}
function create_if_block_2$2(ctx) {
	let event;
	let current;

	event = new Event$1$1({
			props: {
				date: /*date*/ ctx[0],
				chunk: /*iChunks*/ ctx[4][1]
			}
		});

	return {
		c() {
			create_component(event.$$.fragment);
		},
		m(target, anchor) {
			mount_component(event, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const event_changes = {};
			if (dirty[0] & /*date*/ 1) event_changes.date = /*date*/ ctx[0];
			if (dirty[0] & /*iChunks*/ 16) event_changes.chunk = /*iChunks*/ ctx[4][1];
			event.$set(event_changes);
		},
		i(local) {
			if (current) return;
			transition_in(event.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(event.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(event, detaching);
		}
	};
}

// (116:2) {#each chunks as chunk}
function create_each_block$3$1(ctx) {
	let event;
	let current;

	event = new Event$1$1({
			props: {
				date: /*date*/ ctx[0],
				chunk: /*chunk*/ ctx[37]
			}
		});

	return {
		c() {
			create_component(event.$$.fragment);
		},
		m(target, anchor) {
			mount_component(event, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const event_changes = {};
			if (dirty[0] & /*date*/ 1) event_changes.date = /*date*/ ctx[0];
			if (dirty[0] & /*chunks*/ 2) event_changes.chunk = /*chunk*/ ctx[37];
			event.$set(event_changes);
		},
		i(local) {
			if (current) return;
			transition_in(event.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(event.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(event, detaching);
		}
	};
}

// (120:2) {#if iChunks[0] && !iChunks[0].event.allDay}
function create_if_block_1$2(ctx) {
	let event;
	let current;

	event = new Event$1$1({
			props: {
				date: /*date*/ ctx[0],
				chunk: /*iChunks*/ ctx[4][0]
			}
		});

	return {
		c() {
			create_component(event.$$.fragment);
		},
		m(target, anchor) {
			mount_component(event, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const event_changes = {};
			if (dirty[0] & /*date*/ 1) event_changes.date = /*date*/ ctx[0];
			if (dirty[0] & /*iChunks*/ 16) event_changes.chunk = /*iChunks*/ ctx[4][0];
			event.$set(event_changes);
		},
		i(local) {
			if (current) return;
			transition_in(event.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(event.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(event, detaching);
		}
	};
}

// (126:2) {#if $nowIndicator && isToday}
function create_if_block$2$1(ctx) {
	let nowindicator;
	let current;
	nowindicator = new NowIndicator({});

	return {
		c() {
			create_component(nowindicator.$$.fragment);
		},
		m(target, anchor) {
			mount_component(nowindicator, target, anchor);
			current = true;
		},
		i(local) {
			if (current) return;
			transition_in(nowindicator.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(nowindicator.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(nowindicator, detaching);
		}
	};
}

function create_fragment$4$1(ctx) {
	let div3;
	let div0;
	let div0_class_value;
	let t0;
	let div1;
	let t1;
	let t2;
	let div1_class_value;
	let t3;
	let div2;
	let div2_class_value;
	let div3_class_value;
	let current;
	let mounted;
	let dispose;
	let each_value_1 = /*bgChunks*/ ctx[2];
	let each_blocks_1 = [];

	for (let i = 0; i < each_value_1.length; i += 1) {
		each_blocks_1[i] = create_each_block_1$1(get_each_context_1$1(ctx, each_value_1, i));
	}

	const out = i => transition_out(each_blocks_1[i], 1, 1, () => {
		each_blocks_1[i] = null;
	});

	let if_block0 = /*iChunks*/ ctx[4][1] && create_if_block_2$2(ctx);
	let each_value = /*chunks*/ ctx[1];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$3$1(get_each_context$3$1(ctx, each_value, i));
	}

	const out_1 = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	let if_block1 = /*iChunks*/ ctx[4][0] && !/*iChunks*/ ctx[4][0].event.allDay && create_if_block_1$2(ctx);
	let if_block2 = /*$nowIndicator*/ ctx[10] && /*isToday*/ ctx[5] && create_if_block$2$1();

	return {
		c() {
			div3 = element("div");
			div0 = element("div");

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				each_blocks_1[i].c();
			}

			t0 = space();
			div1 = element("div");
			if (if_block0) if_block0.c();
			t1 = space();

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t2 = space();
			if (if_block1) if_block1.c();
			t3 = space();
			div2 = element("div");
			if (if_block2) if_block2.c();
			attr(div0, "class", div0_class_value = /*$theme*/ ctx[7].bgEvents);
			attr(div1, "class", div1_class_value = /*$theme*/ ctx[7].events);
			attr(div2, "class", div2_class_value = /*$theme*/ ctx[7].extra);

			attr(div3, "class", div3_class_value = "" + (/*$theme*/ ctx[7].day + (/*isToday*/ ctx[5] ? ' ' + /*$theme*/ ctx[7].today : '') + (/*highlight*/ ctx[6]
			? ' ' + /*$theme*/ ctx[7].highlight
			: '')));
		},
		m(target, anchor) {
			insert(target, div3, anchor);
			append(div3, div0);

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				each_blocks_1[i].m(div0, null);
			}

			append(div3, t0);
			append(div3, div1);
			if (if_block0) if_block0.m(div1, null);
			append(div1, t1);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div1, null);
			}

			append(div1, t2);
			if (if_block1) if_block1.m(div1, null);
			append(div3, t3);
			append(div3, div2);
			if (if_block2) if_block2.m(div2, null);
			/*div3_binding*/ ctx[31](div3);
			current = true;

			if (!mounted) {
				dispose = [
					listen(div3, "click", function () {
						if (is_function(/*createClickHandler*/ ctx[22](/*$dateClick*/ ctx[8]))) /*createClickHandler*/ ctx[22](/*$dateClick*/ ctx[8]).apply(this, arguments);
					}),
					listen(div3, "pointerenter", function () {
						if (is_function(/*createPointerEnterHandler*/ ctx[23](/*$_interaction*/ ctx[9]))) /*createPointerEnterHandler*/ ctx[23](/*$_interaction*/ ctx[9]).apply(this, arguments);
					}),
					listen(div3, "pointerleave", function () {
						if (is_function(createPointerLeaveHandler$1(/*$_interaction*/ ctx[9]))) createPointerLeaveHandler$1(/*$_interaction*/ ctx[9]).apply(this, arguments);
					})
				];

				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;

			if (dirty[0] & /*date, bgChunks*/ 5) {
				each_value_1 = /*bgChunks*/ ctx[2];
				let i;

				for (i = 0; i < each_value_1.length; i += 1) {
					const child_ctx = get_each_context_1$1(ctx, each_value_1, i);

					if (each_blocks_1[i]) {
						each_blocks_1[i].p(child_ctx, dirty);
						transition_in(each_blocks_1[i], 1);
					} else {
						each_blocks_1[i] = create_each_block_1$1(child_ctx);
						each_blocks_1[i].c();
						transition_in(each_blocks_1[i], 1);
						each_blocks_1[i].m(div0, null);
					}
				}

				group_outros();

				for (i = each_value_1.length; i < each_blocks_1.length; i += 1) {
					out(i);
				}

				check_outros();
			}

			if (!current || dirty[0] & /*$theme*/ 128 && div0_class_value !== (div0_class_value = /*$theme*/ ctx[7].bgEvents)) {
				attr(div0, "class", div0_class_value);
			}

			if (/*iChunks*/ ctx[4][1]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);

					if (dirty[0] & /*iChunks*/ 16) {
						transition_in(if_block0, 1);
					}
				} else {
					if_block0 = create_if_block_2$2(ctx);
					if_block0.c();
					transition_in(if_block0, 1);
					if_block0.m(div1, t1);
				}
			} else if (if_block0) {
				group_outros();

				transition_out(if_block0, 1, 1, () => {
					if_block0 = null;
				});

				check_outros();
			}

			if (dirty[0] & /*date, chunks*/ 3) {
				each_value = /*chunks*/ ctx[1];
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$3$1(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block$3$1(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(div1, t2);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out_1(i);
				}

				check_outros();
			}

			if (/*iChunks*/ ctx[4][0] && !/*iChunks*/ ctx[4][0].event.allDay) {
				if (if_block1) {
					if_block1.p(ctx, dirty);

					if (dirty[0] & /*iChunks*/ 16) {
						transition_in(if_block1, 1);
					}
				} else {
					if_block1 = create_if_block_1$2(ctx);
					if_block1.c();
					transition_in(if_block1, 1);
					if_block1.m(div1, null);
				}
			} else if (if_block1) {
				group_outros();

				transition_out(if_block1, 1, 1, () => {
					if_block1 = null;
				});

				check_outros();
			}

			if (!current || dirty[0] & /*$theme*/ 128 && div1_class_value !== (div1_class_value = /*$theme*/ ctx[7].events)) {
				attr(div1, "class", div1_class_value);
			}

			if (/*$nowIndicator*/ ctx[10] && /*isToday*/ ctx[5]) {
				if (if_block2) {
					if (dirty[0] & /*$nowIndicator, isToday*/ 1056) {
						transition_in(if_block2, 1);
					}
				} else {
					if_block2 = create_if_block$2$1();
					if_block2.c();
					transition_in(if_block2, 1);
					if_block2.m(div2, null);
				}
			} else if (if_block2) {
				group_outros();

				transition_out(if_block2, 1, 1, () => {
					if_block2 = null;
				});

				check_outros();
			}

			if (!current || dirty[0] & /*$theme*/ 128 && div2_class_value !== (div2_class_value = /*$theme*/ ctx[7].extra)) {
				attr(div2, "class", div2_class_value);
			}

			if (!current || dirty[0] & /*$theme, isToday, highlight*/ 224 && div3_class_value !== (div3_class_value = "" + (/*$theme*/ ctx[7].day + (/*isToday*/ ctx[5] ? ' ' + /*$theme*/ ctx[7].today : '') + (/*highlight*/ ctx[6]
			? ' ' + /*$theme*/ ctx[7].highlight
			: '')))) {
				attr(div3, "class", div3_class_value);
			}
		},
		i(local) {
			if (current) return;

			for (let i = 0; i < each_value_1.length; i += 1) {
				transition_in(each_blocks_1[i]);
			}

			transition_in(if_block0);

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			transition_in(if_block1);
			transition_in(if_block2);
			current = true;
		},
		o(local) {
			each_blocks_1 = each_blocks_1.filter(Boolean);

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				transition_out(each_blocks_1[i]);
			}

			transition_out(if_block0);
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			transition_out(if_block1);
			transition_out(if_block2);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div3);
			destroy_each(each_blocks_1, detaching);
			if (if_block0) if_block0.d();
			destroy_each(each_blocks, detaching);
			if (if_block1) if_block1.d();
			if (if_block2) if_block2.d();
			/*div3_binding*/ ctx[31](null);
			mounted = false;
			run_all(dispose);
		}
	};
}

function createPointerLeaveHandler$1(interaction) {
	return interaction.pointer
	? interaction.pointer.leave
	: undefined;
}

function instance$4$1($$self, $$props, $$invalidate) {
	let $_view;
	let $slotDuration;
	let $_slotTimeLimits;
	let $slotHeight;
	let $highlightedDates;
	let $_iEvents;
	let $_events;
	let $theme;
	let $dateClick;
	let $_interaction;
	let $nowIndicator;
	let { date } = $$props;
	let { resource = undefined } = $$props;
	let { _events, _iEvents, dateClick, highlightedDates, nowIndicator, slotDuration, slotHeight, _view, theme, _interaction } = getContext('state');
	component_subscribe($$self, _events, value => $$invalidate(30, $_events = value));
	component_subscribe($$self, _iEvents, value => $$invalidate(29, $_iEvents = value));
	component_subscribe($$self, dateClick, value => $$invalidate(8, $dateClick = value));
	component_subscribe($$self, highlightedDates, value => $$invalidate(28, $highlightedDates = value));
	component_subscribe($$self, nowIndicator, value => $$invalidate(10, $nowIndicator = value));
	component_subscribe($$self, slotDuration, value => $$invalidate(33, $slotDuration = value));
	component_subscribe($$self, slotHeight, value => $$invalidate(34, $slotHeight = value));
	component_subscribe($$self, _view, value => $$invalidate(32, $_view = value));
	component_subscribe($$self, theme, value => $$invalidate(7, $theme = value));
	component_subscribe($$self, _interaction, value => $$invalidate(9, $_interaction = value));
	let { _slotTimeLimits } = getContext('view-state');
	component_subscribe($$self, _slotTimeLimits, value => $$invalidate(27, $_slotTimeLimits = value));
	let el;
	let chunks, bgChunks, iChunks = [];
	let today = setMidnight(createDate()), isToday, highlight;
	let start, end;

	function createClickHandler(fn) {
		return is_function(fn)
		? jsEvent => {
				let r = rect(el);
				let y = jsEvent.clientY - r.top;
				let d = addDuration(cloneDate(date), $slotDuration, Math.floor(y / $slotHeight + $_slotTimeLimits.min.seconds / $slotDuration.seconds));

				fn({
					date: toLocalDate(d),
					dateStr: toISOString(d),
					dayEl: el,
					jsEvent,
					view: toViewWithLocalDates($_view),
					resource
				});
			}
		: undefined;
	}

	function createPointerEnterHandler(interaction) {
		return interaction.pointer
		? jsEvent => interaction.pointer.enterTimeGrid(date, el, jsEvent, _slotTimeLimits, resource)
		: undefined;
	}

	function intersects(event) {
		return event.start < end && event.end > start && (resource === undefined || event.resourceIds.includes(resource.id));
	}

	function div3_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			el = $$value;
			$$invalidate(3, el);
		});
	}

	$$self.$$set = $$props => {
		if ('date' in $$props) $$invalidate(0, date = $$props.date);
		if ('resource' in $$props) $$invalidate(24, resource = $$props.resource);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty[0] & /*date, $_slotTimeLimits*/ 134217729) {
			{
				$$invalidate(25, start = addDuration(cloneDate(date), $_slotTimeLimits.min));
				$$invalidate(26, end = addDuration(cloneDate(date), $_slotTimeLimits.max));
			}
		}

		if ($$self.$$.dirty[0] & /*$_events, start, end, bgChunks, chunks*/ 1174405126) {
			{
				$$invalidate(1, chunks = []);
				$$invalidate(2, bgChunks = []);

				for (let event of $_events) {
					if (!event.allDay && intersects(event)) {
						let chunk = createEventChunk(event, start, end);

						switch (event.display) {
							case 'background':
								bgChunks.push(chunk);
								break;
							default:
								chunks.push(chunk);
						}
					}
				}

				groupEventChunks(chunks);
			}
		}

		if ($$self.$$.dirty[0] & /*$_iEvents, start, end*/ 637534208) {
			$$invalidate(4, iChunks = $_iEvents.map(event => event && intersects(event)
			? createEventChunk(event, start, end)
			: null));
		}

		if ($$self.$$.dirty[0] & /*date, $highlightedDates*/ 268435457) {
			{
				$$invalidate(5, isToday = datesEqual(date, today));
				$$invalidate(6, highlight = $highlightedDates.some(d => datesEqual(d, date)));
			}
		}
	};

	return [
		date,
		chunks,
		bgChunks,
		el,
		iChunks,
		isToday,
		highlight,
		$theme,
		$dateClick,
		$_interaction,
		$nowIndicator,
		_events,
		_iEvents,
		dateClick,
		highlightedDates,
		nowIndicator,
		slotDuration,
		slotHeight,
		_view,
		theme,
		_interaction,
		_slotTimeLimits,
		createClickHandler,
		createPointerEnterHandler,
		resource,
		start,
		end,
		$_slotTimeLimits,
		$highlightedDates,
		$_iEvents,
		$_events,
		div3_binding
	];
}

class Day$1$1 extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$4$1, create_fragment$4$1, safe_not_equal, { date: 0, resource: 24 }, null, [-1, -1]);
	}
}

function prepareEventChunks$1(chunks, hiddenDays) {
    if (!chunks.length) {
        return;
    }

    sortEventChunks(chunks);

    let longChunks = {};
    let prevChunk;
    for (let chunk of chunks) {
        let dates = [];
        let date = setMidnight(cloneDate(chunk.start));
        while (chunk.end > date) {
            if (!hiddenDays.includes(date.getUTCDay())) {
                dates.push(cloneDate(date));
                if (dates.length > 1) {
                    let key = date.getTime();
                    if (longChunks[key]) {
                        longChunks[key].push(chunk);
                    } else {
                        longChunks[key] = [chunk];
                    }
                }
            }
            addDay(date);
        }
        if (dates.length) {
            chunk.date = dates[0];
            chunk.days = dates.length;
            chunk.dates = dates;
            if (chunk.start < dates[0]) {
                chunk.start = dates[0];
            }
            if (setMidnight(cloneDate(chunk.end)) > dates[dates.length - 1]) {
                chunk.end = dates[dates.length - 1];
            }
        } else {
            chunk.date = setMidnight(cloneDate(chunk.start));
            chunk.days = 1;
            chunk.dates = [chunk.date];
        }

        if (prevChunk && datesEqual(prevChunk.date, chunk.date)) {
            chunk.prev = prevChunk;
        }
        prevChunk = chunk;
    }

    return longChunks;
}

/* packages/time-grid/src/all-day/Event.svelte generated by Svelte v3.47.0 */

function create_fragment$3$2(ctx) {
	let div1;
	let div0;
	let div0_class_value;
	let setContent_action;
	let t;
	let switch_instance;
	let current;
	let mounted;
	let dispose;
	var switch_value = /*$_interaction*/ ctx[7].resizer;

	function switch_props(ctx) {
		return { props: { event: /*event*/ ctx[0] } };
	}

	if (switch_value) {
		switch_instance = new switch_value(switch_props(ctx));
		switch_instance.$on("pointerdown", /*createDragHandler*/ ctx[27](true));
	}

	return {
		c() {
			div1 = element("div");
			div0 = element("div");
			t = space();
			if (switch_instance) create_component(switch_instance.$$.fragment);
			attr(div0, "class", div0_class_value = /*$theme*/ ctx[1].eventBody);
			attr(div1, "class", /*classes*/ ctx[3]);
			attr(div1, "style", /*style*/ ctx[4]);
		},
		m(target, anchor) {
			insert(target, div1, anchor);
			append(div1, div0);
			append(div1, t);

			if (switch_instance) {
				mount_component(switch_instance, div1, null);
			}

			/*div1_binding*/ ctx[39](div1);
			current = true;

			if (!mounted) {
				dispose = [
					listen(window, "resize", /*reposition*/ ctx[28]),
					action_destroyer(setContent_action = setContent.call(null, div0, /*content*/ ctx[5])),
					listen(div1, "click", function () {
						if (is_function(/*createHandler*/ ctx[26](/*$eventClick*/ ctx[8], /*display*/ ctx[6]))) /*createHandler*/ ctx[26](/*$eventClick*/ ctx[8], /*display*/ ctx[6]).apply(this, arguments);
					}),
					listen(div1, "mouseenter", function () {
						if (is_function(/*createHandler*/ ctx[26](/*$eventMouseEnter*/ ctx[9], /*display*/ ctx[6]))) /*createHandler*/ ctx[26](/*$eventMouseEnter*/ ctx[9], /*display*/ ctx[6]).apply(this, arguments);
					}),
					listen(div1, "mouseleave", function () {
						if (is_function(/*createHandler*/ ctx[26](/*$eventMouseLeave*/ ctx[10], /*display*/ ctx[6]))) /*createHandler*/ ctx[26](/*$eventMouseLeave*/ ctx[10], /*display*/ ctx[6]).apply(this, arguments);
					}),
					listen(div1, "pointerdown", function () {
						if (is_function(/*display*/ ctx[6] === 'auto' && /*$_draggable*/ ctx[11](/*event*/ ctx[0])
						? /*createDragHandler*/ ctx[27]()
						: undefined)) (/*display*/ ctx[6] === 'auto' && /*$_draggable*/ ctx[11](/*event*/ ctx[0])
						? /*createDragHandler*/ ctx[27]()
						: undefined).apply(this, arguments);
					})
				];

				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;

			if (!current || dirty[0] & /*$theme*/ 2 && div0_class_value !== (div0_class_value = /*$theme*/ ctx[1].eventBody)) {
				attr(div0, "class", div0_class_value);
			}

			if (setContent_action && is_function(setContent_action.update) && dirty[0] & /*content*/ 32) setContent_action.update.call(null, /*content*/ ctx[5]);
			const switch_instance_changes = {};
			if (dirty[0] & /*event*/ 1) switch_instance_changes.event = /*event*/ ctx[0];

			if (switch_value !== (switch_value = /*$_interaction*/ ctx[7].resizer)) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props(ctx));
					switch_instance.$on("pointerdown", /*createDragHandler*/ ctx[27](true));
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, div1, null);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}

			if (!current || dirty[0] & /*classes*/ 8) {
				attr(div1, "class", /*classes*/ ctx[3]);
			}

			if (!current || dirty[0] & /*style*/ 16) {
				attr(div1, "style", /*style*/ ctx[4]);
			}
		},
		i(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div1);
			if (switch_instance) destroy_component(switch_instance);
			/*div1_binding*/ ctx[39](null);
			mounted = false;
			run_all(dispose);
		}
	};
}

function instance$3$2($$self, $$props, $$invalidate) {
	let $_interaction;
	let $_view;
	let $eventDidMount;
	let $_intlEventTime;
	let $theme;
	let $eventContent;
	let $displayEventEnd;
	let $_classes;
	let $eventColor;
	let $eventBackgroundColor;
	let $eventClick;
	let $eventMouseEnter;
	let $eventMouseLeave;
	let $_draggable;
	let { chunk } = $$props;
	let { longChunks = {} } = $$props;
	let { displayEventEnd, eventBackgroundColor, eventClick, eventColor, eventContent, eventDidMount, eventMouseEnter, eventMouseLeave, theme, _view, _intlEventTime, _interaction, _classes, _draggable } = getContext('state');
	component_subscribe($$self, displayEventEnd, value => $$invalidate(35, $displayEventEnd = value));
	component_subscribe($$self, eventBackgroundColor, value => $$invalidate(38, $eventBackgroundColor = value));
	component_subscribe($$self, eventClick, value => $$invalidate(8, $eventClick = value));
	component_subscribe($$self, eventColor, value => $$invalidate(37, $eventColor = value));
	component_subscribe($$self, eventContent, value => $$invalidate(34, $eventContent = value));
	component_subscribe($$self, eventDidMount, value => $$invalidate(41, $eventDidMount = value));
	component_subscribe($$self, eventMouseEnter, value => $$invalidate(9, $eventMouseEnter = value));
	component_subscribe($$self, eventMouseLeave, value => $$invalidate(10, $eventMouseLeave = value));
	component_subscribe($$self, theme, value => $$invalidate(1, $theme = value));
	component_subscribe($$self, _view, value => $$invalidate(32, $_view = value));
	component_subscribe($$self, _intlEventTime, value => $$invalidate(33, $_intlEventTime = value));
	component_subscribe($$self, _interaction, value => $$invalidate(7, $_interaction = value));
	component_subscribe($$self, _classes, value => $$invalidate(36, $_classes = value));
	component_subscribe($$self, _draggable, value => $$invalidate(11, $_draggable = value));
	let { _viewResources } = getContext('view-state');
	createEventDispatcher();
	let el;
	let event;
	let classes;
	let style;
	let content;
	let timeText;
	let margin = 1;
	let display;

	onMount(() => {
		if (is_function($eventDidMount)) {
			$eventDidMount({
				event: toEventWithLocalDates(event),
				timeText,
				el,
				view: toViewWithLocalDates($_view)
			});
		}
	});

	afterUpdate(reposition);

	function createHandler(fn, display) {
		return display !== 'preview' && is_function(fn)
		? jsEvent => fn({
				event: toEventWithLocalDates(event),
				el,
				jsEvent,
				view: toViewWithLocalDates($_view)
			})
		: undefined;
	}

	function createDragHandler(resize) {
		return jsEvent => $_interaction.drag.startTimeGrid(event, el, jsEvent, _viewResources, true, resize);
	}

	function reposition() {
		if (!el || display === 'preview') {
			return;
		}

		$$invalidate(29, chunk.top = 0, chunk);

		if (chunk.prev) {
			if (chunk.prev.bottom === undefined) {
				// 'prev' is not ready yet, try again later
				tick().then(reposition);

				return;
			}

			$$invalidate(29, chunk.top = chunk.prev.bottom + 1, chunk);
		}

		$$invalidate(29, chunk.bottom = chunk.top + height(el), chunk);
		let m = 1;
		let key = chunk.date.getTime();

		if (longChunks[key]) {
			for (let longChunk of longChunks[key]) {
				if (longChunk.bottom === undefined) {
					// 'longChunk' is not ready yet, try again later
					tick().then(reposition);

					return;
				}

				if (chunk.top < longChunk.bottom && chunk.bottom > longChunk.top) {
					let offset = longChunk.bottom - chunk.top + 1;
					m += offset;
					$$invalidate(29, chunk.top += offset, chunk);
					$$invalidate(29, chunk.bottom += offset, chunk);
				}
			}
		}

		$$invalidate(31, margin = m);
	}

	function div1_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			el = $$value;
			$$invalidate(2, el);
		});
	}

	$$self.$$set = $$props => {
		if ('chunk' in $$props) $$invalidate(29, chunk = $$props.chunk);
		if ('longChunks' in $$props) $$invalidate(30, longChunks = $$props.longChunks);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty[0] & /*chunk*/ 536870912) {
			$$invalidate(0, event = chunk.event);
		}

		if ($$self.$$.dirty[0] & /*event, chunk, style, $theme*/ 536870931 | $$self.$$.dirty[1] & /*$eventBackgroundColor, $eventColor, margin, $_classes*/ 225) {
			{
				$$invalidate(6, display = event.display);

				// Class & Style
				let bgColor = event.backgroundColor || $eventBackgroundColor || $eventColor;

				$$invalidate(4, style = `width:calc(${chunk.days * 100}% + ${(chunk.days - 1) * 7}px);` + `margin-top:${margin}px;`);

				if (bgColor) {
					$$invalidate(4, style += `background-color:${bgColor};`);
				}

				$$invalidate(3, classes = $_classes($theme.event, event));
			}
		}

		if ($$self.$$.dirty[0] & /*chunk, $theme*/ 536870914 | $$self.$$.dirty[1] & /*$displayEventEnd, $eventContent, $_intlEventTime, $_view*/ 30) {
			// Content
			$$invalidate(5, [timeText, content] = createEventContent(chunk, $displayEventEnd, $eventContent, $theme, $_intlEventTime, $_view), content);
		}
	};

	return [
		event,
		$theme,
		el,
		classes,
		style,
		content,
		display,
		$_interaction,
		$eventClick,
		$eventMouseEnter,
		$eventMouseLeave,
		$_draggable,
		displayEventEnd,
		eventBackgroundColor,
		eventClick,
		eventColor,
		eventContent,
		eventDidMount,
		eventMouseEnter,
		eventMouseLeave,
		theme,
		_view,
		_intlEventTime,
		_interaction,
		_classes,
		_draggable,
		createHandler,
		createDragHandler,
		reposition,
		chunk,
		longChunks,
		margin,
		$_view,
		$_intlEventTime,
		$eventContent,
		$displayEventEnd,
		$_classes,
		$eventColor,
		$eventBackgroundColor,
		div1_binding
	];
}

class Event$2 extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$3$2, create_fragment$3$2, safe_not_equal, { chunk: 29, longChunks: 30 }, null, [-1, -1]);
	}
}

/* packages/time-grid/src/all-day/Day.svelte generated by Svelte v3.47.0 */

function get_each_context$2$1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[22] = list[i];
	return child_ctx;
}

// (57:1) {#if iChunks[0] && datesEqual(iChunks[0].date, date)}
function create_if_block$1$2(ctx) {
	let div;
	let event;
	let div_class_value;
	let current;
	event = new Event$2({ props: { chunk: /*iChunks*/ ctx[2][0] } });

	return {
		c() {
			div = element("div");
			create_component(event.$$.fragment);
			attr(div, "class", div_class_value = "" + (/*$theme*/ ctx[7].events + " " + /*$theme*/ ctx[7].preview));
		},
		m(target, anchor) {
			insert(target, div, anchor);
			mount_component(event, div, null);
			current = true;
		},
		p(ctx, dirty) {
			const event_changes = {};
			if (dirty & /*iChunks*/ 4) event_changes.chunk = /*iChunks*/ ctx[2][0];
			event.$set(event_changes);

			if (!current || dirty & /*$theme*/ 128 && div_class_value !== (div_class_value = "" + (/*$theme*/ ctx[7].events + " " + /*$theme*/ ctx[7].preview))) {
				attr(div, "class", div_class_value);
			}
		},
		i(local) {
			if (current) return;
			transition_in(event.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(event.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_component(event);
		}
	};
}

// (63:2) {#each dayChunks as chunk}
function create_each_block$2$1(ctx) {
	let event;
	let current;

	event = new Event$2({
			props: {
				chunk: /*chunk*/ ctx[22],
				longChunks: /*longChunks*/ ctx[1]
			}
		});

	return {
		c() {
			create_component(event.$$.fragment);
		},
		m(target, anchor) {
			mount_component(event, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const event_changes = {};
			if (dirty & /*dayChunks*/ 8) event_changes.chunk = /*chunk*/ ctx[22];
			if (dirty & /*longChunks*/ 2) event_changes.longChunks = /*longChunks*/ ctx[1];
			event.$set(event_changes);
		},
		i(local) {
			if (current) return;
			transition_in(event.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(event.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(event, detaching);
		}
	};
}

function create_fragment$2$2(ctx) {
	let div1;
	let show_if = /*iChunks*/ ctx[2][0] && datesEqual(/*iChunks*/ ctx[2][0].date, /*date*/ ctx[0]);
	let t;
	let div0;
	let div0_class_value;
	let div1_class_value;
	let current;
	let mounted;
	let dispose;
	let if_block = show_if && create_if_block$1$2(ctx);
	let each_value = /*dayChunks*/ ctx[3];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$2$1(get_each_context$2$1(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	return {
		c() {
			div1 = element("div");
			if (if_block) if_block.c();
			t = space();
			div0 = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr(div0, "class", div0_class_value = /*$theme*/ ctx[7].events);

			attr(div1, "class", div1_class_value = "" + (/*$theme*/ ctx[7].day + (/*isToday*/ ctx[5] ? ' ' + /*$theme*/ ctx[7].today : '') + (/*highlight*/ ctx[6]
			? ' ' + /*$theme*/ ctx[7].highlight
			: '')));
		},
		m(target, anchor) {
			insert(target, div1, anchor);
			if (if_block) if_block.m(div1, null);
			append(div1, t);
			append(div1, div0);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div0, null);
			}

			/*div1_binding*/ ctx[17](div1);
			current = true;

			if (!mounted) {
				dispose = listen(div1, "click", function () {
					if (is_function(/*createClickHandler*/ ctx[13](/*$dateClick*/ ctx[8]))) /*createClickHandler*/ ctx[13](/*$dateClick*/ ctx[8]).apply(this, arguments);
				});

				mounted = true;
			}
		},
		p(new_ctx, [dirty]) {
			ctx = new_ctx;
			if (dirty & /*iChunks, date*/ 5) show_if = /*iChunks*/ ctx[2][0] && datesEqual(/*iChunks*/ ctx[2][0].date, /*date*/ ctx[0]);

			if (show_if) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*iChunks, date*/ 5) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block$1$2(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(div1, t);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}

			if (dirty & /*dayChunks, longChunks*/ 10) {
				each_value = /*dayChunks*/ ctx[3];
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$2$1(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block$2$1(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(div0, null);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}

			if (!current || dirty & /*$theme*/ 128 && div0_class_value !== (div0_class_value = /*$theme*/ ctx[7].events)) {
				attr(div0, "class", div0_class_value);
			}

			if (!current || dirty & /*$theme, isToday, highlight*/ 224 && div1_class_value !== (div1_class_value = "" + (/*$theme*/ ctx[7].day + (/*isToday*/ ctx[5] ? ' ' + /*$theme*/ ctx[7].today : '') + (/*highlight*/ ctx[6]
			? ' ' + /*$theme*/ ctx[7].highlight
			: '')))) {
				attr(div1, "class", div1_class_value);
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block);

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o(local) {
			transition_out(if_block);
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d(detaching) {
			if (detaching) detach(div1);
			if (if_block) if_block.d();
			destroy_each(each_blocks, detaching);
			/*div1_binding*/ ctx[17](null);
			mounted = false;
			dispose();
		}
	};
}

function instance$2$2($$self, $$props, $$invalidate) {
	let $_view;
	let $highlightedDates;
	let $theme;
	let $dateClick;
	let { date } = $$props;
	let { chunks } = $$props;
	let { longChunks } = $$props;
	let { iChunks = [] } = $$props;
	let { resource = undefined } = $$props;
	let { date: currentDate, dateClick, highlightedDates, theme, _view, _interaction } = getContext('state');
	component_subscribe($$self, dateClick, value => $$invalidate(8, $dateClick = value));
	component_subscribe($$self, highlightedDates, value => $$invalidate(16, $highlightedDates = value));
	component_subscribe($$self, theme, value => $$invalidate(7, $theme = value));
	component_subscribe($$self, _view, value => $$invalidate(18, $_view = value));
	let el;
	let dayChunks;
	let today = setMidnight(createDate());
	let isToday;
	let highlight;

	function createClickHandler(fn) {
		return is_function(fn)
		? jsEvent => {
				fn({
					date: toLocalDate(date),
					dateStr: toISOString(date),
					dayEl: el,
					jsEvent,
					view: toViewWithLocalDates($_view),
					resource
				});
			}
		: undefined;
	}

	function div1_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			el = $$value;
			$$invalidate(4, el);
		});
	}

	$$self.$$set = $$props => {
		if ('date' in $$props) $$invalidate(0, date = $$props.date);
		if ('chunks' in $$props) $$invalidate(14, chunks = $$props.chunks);
		if ('longChunks' in $$props) $$invalidate(1, longChunks = $$props.longChunks);
		if ('iChunks' in $$props) $$invalidate(2, iChunks = $$props.iChunks);
		if ('resource' in $$props) $$invalidate(15, resource = $$props.resource);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*chunks, date, dayChunks*/ 16393) {
			{
				$$invalidate(3, dayChunks = []);

				for (let chunk of chunks) {
					if (datesEqual(chunk.date, date)) {
						dayChunks.push(chunk);
					}
				}
			}
		}

		if ($$self.$$.dirty & /*date, $highlightedDates*/ 65537) {
			{
				$$invalidate(5, isToday = datesEqual(date, today));
				$$invalidate(6, highlight = $highlightedDates.some(d => datesEqual(d, date)));
			}
		}
	};

	return [
		date,
		longChunks,
		iChunks,
		dayChunks,
		el,
		isToday,
		highlight,
		$theme,
		$dateClick,
		dateClick,
		highlightedDates,
		theme,
		_view,
		createClickHandler,
		chunks,
		resource,
		$highlightedDates,
		div1_binding
	];
}

class Day$2 extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance$2$2, create_fragment$2$2, safe_not_equal, {
			date: 0,
			chunks: 14,
			longChunks: 1,
			iChunks: 2,
			resource: 15
		});
	}
}

/* packages/time-grid/src/all-day/Week.svelte generated by Svelte v3.47.0 */

function get_each_context$1$2(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[15] = list[i];
	return child_ctx;
}

// (50:0) {#each dates as date}
function create_each_block$1$2(ctx) {
	let day;
	let current;

	day = new Day$2({
			props: {
				date: /*date*/ ctx[15],
				chunks: /*chunks*/ ctx[2],
				longChunks: /*longChunks*/ ctx[3],
				iChunks: /*iChunks*/ ctx[4],
				resource: /*resource*/ ctx[1]
			}
		});

	return {
		c() {
			create_component(day.$$.fragment);
		},
		m(target, anchor) {
			mount_component(day, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const day_changes = {};
			if (dirty & /*dates*/ 1) day_changes.date = /*date*/ ctx[15];
			if (dirty & /*chunks*/ 4) day_changes.chunks = /*chunks*/ ctx[2];
			if (dirty & /*longChunks*/ 8) day_changes.longChunks = /*longChunks*/ ctx[3];
			if (dirty & /*iChunks*/ 16) day_changes.iChunks = /*iChunks*/ ctx[4];
			if (dirty & /*resource*/ 2) day_changes.resource = /*resource*/ ctx[1];
			day.$set(day_changes);
		},
		i(local) {
			if (current) return;
			transition_in(day.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(day.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(day, detaching);
		}
	};
}

function create_fragment$1$2(ctx) {
	let each_1_anchor;
	let current;
	let each_value = /*dates*/ ctx[0];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$1$2(get_each_context$1$2(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	return {
		c() {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();
		},
		m(target, anchor) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			insert(target, each_1_anchor, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			if (dirty & /*dates, chunks, longChunks, iChunks, resource*/ 31) {
				each_value = /*dates*/ ctx[0];
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$1$2(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block$1$2(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}
		},
		i(local) {
			if (current) return;

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d(detaching) {
			destroy_each(each_blocks, detaching);
			if (detaching) detach(each_1_anchor);
		}
	};
}

function instance$1$2($$self, $$props, $$invalidate) {
	let $hiddenDays;
	let $_iEvents;
	let $_events;
	let { dates } = $$props;
	let { resource = undefined } = $$props;
	let { _events, _iEvents, hiddenDays, theme } = getContext('state');
	component_subscribe($$self, _events, value => $$invalidate(12, $_events = value));
	component_subscribe($$self, _iEvents, value => $$invalidate(11, $_iEvents = value));
	component_subscribe($$self, hiddenDays, value => $$invalidate(10, $hiddenDays = value));
	let chunks, longChunks, iChunks = [];
	let start;
	let end;

	function intersects(event) {
		return event.start < end && event.end > start && (resource === undefined || event.resourceIds.includes(resource.id));
	}

	$$self.$$set = $$props => {
		if ('dates' in $$props) $$invalidate(0, dates = $$props.dates);
		if ('resource' in $$props) $$invalidate(1, resource = $$props.resource);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*dates*/ 1) {
			{
				$$invalidate(8, start = dates[0]);
				$$invalidate(9, end = addDay(cloneDate(dates[dates.length - 1])));
			}
		}

		if ($$self.$$.dirty & /*$_events, start, end, chunks, $hiddenDays*/ 5892) {
			{
				$$invalidate(2, chunks = []);

				for (let event of $_events) {
					if (event.allDay && event.display !== 'background' && intersects(event)) {
						let chunk = createEventChunk(event, start, end);
						chunks.push(chunk);
					}
				}

				$$invalidate(3, longChunks = prepareEventChunks$1(chunks, $hiddenDays));
			}
		}

		if ($$self.$$.dirty & /*$_iEvents, start, end, $hiddenDays*/ 3840) {
			$$invalidate(4, iChunks = $_iEvents.map(event => {
				let chunk;

				if (event && event.allDay && intersects(event)) {
					chunk = createEventChunk(event, start, end);
					prepareEventChunks$1([chunk], $hiddenDays);
				} else {
					chunk = null;
				}

				return chunk;
			}));
		}
	};

	return [
		dates,
		resource,
		chunks,
		longChunks,
		iChunks,
		_events,
		_iEvents,
		hiddenDays,
		start,
		end,
		$hiddenDays,
		$_iEvents,
		$_events
	];
}

class Week$1 extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$1$2, create_fragment$1$2, safe_not_equal, { dates: 0, resource: 1 });
	}
}

/* packages/time-grid/src/View.svelte generated by Svelte v3.47.0 */

function get_each_context$7(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[11] = list[i];
	return child_ctx;
}

function get_each_context_1$3(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[11] = list[i];
	return child_ctx;
}

// (18:1) {#each $_viewDates as date}
function create_each_block_1$3(ctx) {
	let div;
	let t_value = /*$_intlDayHeader*/ ctx[2].format(/*date*/ ctx[11]) + "";
	let t;
	let div_class_value;

	return {
		c() {
			div = element("div");
			t = text(t_value);
			attr(div, "class", div_class_value = /*$theme*/ ctx[1].day);
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, t);
		},
		p(ctx, dirty) {
			if (dirty & /*$_intlDayHeader, $_viewDates*/ 5 && t_value !== (t_value = /*$_intlDayHeader*/ ctx[2].format(/*date*/ ctx[11]) + "")) set_data(t, t_value);

			if (dirty & /*$theme*/ 2 && div_class_value !== (div_class_value = /*$theme*/ ctx[1].day)) {
				attr(div, "class", div_class_value);
			}
		},
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

// (17:0) <Header>
function create_default_slot_2$1(ctx) {
	let each_1_anchor;
	let each_value_1 = /*$_viewDates*/ ctx[0];
	let each_blocks = [];

	for (let i = 0; i < each_value_1.length; i += 1) {
		each_blocks[i] = create_each_block_1$3(get_each_context_1$3(ctx, each_value_1, i));
	}

	return {
		c() {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();
		},
		m(target, anchor) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			insert(target, each_1_anchor, anchor);
		},
		p(ctx, dirty) {
			if (dirty & /*$theme, $_intlDayHeader, $_viewDates*/ 7) {
				each_value_1 = /*$_viewDates*/ ctx[0];
				let i;

				for (i = 0; i < each_value_1.length; i += 1) {
					const child_ctx = get_each_context_1$3(ctx, each_value_1, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_1$3(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value_1.length;
			}
		},
		d(detaching) {
			destroy_each(each_blocks, detaching);
			if (detaching) detach(each_1_anchor);
		}
	};
}

// (22:0) {#if $allDaySlot}
function create_if_block$3(ctx) {
	let header;
	let current;

	header = new Header$1({
			props: {
				allDay: true,
				$$slots: { default: [create_default_slot_1$1] },
				$$scope: { ctx }
			}
		});

	return {
		c() {
			create_component(header.$$.fragment);
		},
		m(target, anchor) {
			mount_component(header, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const header_changes = {};

			if (dirty & /*$$scope, $_viewDates*/ 65537) {
				header_changes.$$scope = { dirty, ctx };
			}

			header.$set(header_changes);
		},
		i(local) {
			if (current) return;
			transition_in(header.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(header.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(header, detaching);
		}
	};
}

// (23:1) <Header allDay>
function create_default_slot_1$1(ctx) {
	let week;
	let current;
	week = new Week$1({ props: { dates: /*$_viewDates*/ ctx[0] } });

	return {
		c() {
			create_component(week.$$.fragment);
		},
		m(target, anchor) {
			mount_component(week, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const week_changes = {};
			if (dirty & /*$_viewDates*/ 1) week_changes.dates = /*$_viewDates*/ ctx[0];
			week.$set(week_changes);
		},
		i(local) {
			if (current) return;
			transition_in(week.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(week.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(week, detaching);
		}
	};
}

// (28:1) {#each $_viewDates as date}
function create_each_block$7(ctx) {
	let day;
	let current;
	day = new Day$1$1({ props: { date: /*date*/ ctx[11] } });

	return {
		c() {
			create_component(day.$$.fragment);
		},
		m(target, anchor) {
			mount_component(day, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const day_changes = {};
			if (dirty & /*$_viewDates*/ 1) day_changes.date = /*date*/ ctx[11];
			day.$set(day_changes);
		},
		i(local) {
			if (current) return;
			transition_in(day.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(day.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(day, detaching);
		}
	};
}

// (27:0) <Body>
function create_default_slot$3(ctx) {
	let each_1_anchor;
	let current;
	let each_value = /*$_viewDates*/ ctx[0];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$7(get_each_context$7(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	return {
		c() {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();
		},
		m(target, anchor) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			insert(target, each_1_anchor, anchor);
			current = true;
		},
		p(ctx, dirty) {
			if (dirty & /*$_viewDates*/ 1) {
				each_value = /*$_viewDates*/ ctx[0];
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$7(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block$7(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}
		},
		i(local) {
			if (current) return;

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d(detaching) {
			destroy_each(each_blocks, detaching);
			if (detaching) detach(each_1_anchor);
		}
	};
}

function create_fragment$9(ctx) {
	let header;
	let t0;
	let t1;
	let body;
	let current;

	header = new Header$1({
			props: {
				$$slots: { default: [create_default_slot_2$1] },
				$$scope: { ctx }
			}
		});

	let if_block = /*$allDaySlot*/ ctx[3] && create_if_block$3(ctx);

	body = new Body$2({
			props: {
				$$slots: { default: [create_default_slot$3] },
				$$scope: { ctx }
			}
		});

	return {
		c() {
			create_component(header.$$.fragment);
			t0 = space();
			if (if_block) if_block.c();
			t1 = space();
			create_component(body.$$.fragment);
		},
		m(target, anchor) {
			mount_component(header, target, anchor);
			insert(target, t0, anchor);
			if (if_block) if_block.m(target, anchor);
			insert(target, t1, anchor);
			mount_component(body, target, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			const header_changes = {};

			if (dirty & /*$$scope, $_viewDates, $theme, $_intlDayHeader*/ 65543) {
				header_changes.$$scope = { dirty, ctx };
			}

			header.$set(header_changes);

			if (/*$allDaySlot*/ ctx[3]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*$allDaySlot*/ 8) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block$3(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(t1.parentNode, t1);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}

			const body_changes = {};

			if (dirty & /*$$scope, $_viewDates*/ 65537) {
				body_changes.$$scope = { dirty, ctx };
			}

			body.$set(body_changes);
		},
		i(local) {
			if (current) return;
			transition_in(header.$$.fragment, local);
			transition_in(if_block);
			transition_in(body.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(header.$$.fragment, local);
			transition_out(if_block);
			transition_out(body.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(header, detaching);
			if (detaching) detach(t0);
			if (if_block) if_block.d(detaching);
			if (detaching) detach(t1);
			destroy_component(body, detaching);
		}
	};
}

function instance$9($$self, $$props, $$invalidate) {
	let $_viewClass;
	let $_viewDates;
	let $theme;
	let $_intlDayHeader;
	let $allDaySlot;
	let state = getContext('state');
	let { _viewDates, _intlDayHeader, _viewClass, allDaySlot, theme } = state;
	component_subscribe($$self, _viewDates, value => $$invalidate(0, $_viewDates = value));
	component_subscribe($$self, _intlDayHeader, value => $$invalidate(2, $_intlDayHeader = value));
	component_subscribe($$self, _viewClass, value => $$invalidate(9, $_viewClass = value));
	component_subscribe($$self, allDaySlot, value => $$invalidate(3, $allDaySlot = value));
	component_subscribe($$self, theme, value => $$invalidate(1, $theme = value));
	setContext('view-state', new State$3(state));
	set_store_value(_viewClass, $_viewClass = 'week', $_viewClass);

	return [
		$_viewDates,
		$theme,
		$_intlDayHeader,
		$allDaySlot,
		_viewDates,
		_intlDayHeader,
		_viewClass,
		allDaySlot,
		theme
	];
}

class View$3 extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$9, create_fragment$9, safe_not_equal, {});
	}
}

var index$3 = {
	createOptions(options) {
		// Common options
		options.buttonText.timeGridDay = 'day';
		options.buttonText.timeGridWeek = 'week';
		options.view = 'timeGridWeek';
		options.views.timeGridDay = {
			component: View$3,
			dayHeaderFormat: {weekday: 'long'},
			duration: {days: 1},
			titleFormat: {year: 'numeric', month: 'long', day: 'numeric'}
		};
		options.views.timeGridWeek = {
			component: View$3,
			duration: {weeks: 1}
		};
	}
};

/* packages/list/src/Body.svelte generated by Svelte v3.47.0 */

function create_fragment$3$1(ctx) {
	let div1;
	let div0;
	let div0_class_value;
	let div1_class_value;
	let current;
	const default_slot_template = /*#slots*/ ctx[3].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);

	return {
		c() {
			div1 = element("div");
			div0 = element("div");
			if (default_slot) default_slot.c();
			attr(div0, "class", div0_class_value = /*$theme*/ ctx[0].content);
			attr(div1, "class", div1_class_value = /*$theme*/ ctx[0].body);
		},
		m(target, anchor) {
			insert(target, div1, anchor);
			append(div1, div0);

			if (default_slot) {
				default_slot.m(div0, null);
			}

			current = true;
		},
		p(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 4)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[2],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[2])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[2], dirty, null),
						null
					);
				}
			}

			if (!current || dirty & /*$theme*/ 1 && div0_class_value !== (div0_class_value = /*$theme*/ ctx[0].content)) {
				attr(div0, "class", div0_class_value);
			}

			if (!current || dirty & /*$theme*/ 1 && div1_class_value !== (div1_class_value = /*$theme*/ ctx[0].body)) {
				attr(div1, "class", div1_class_value);
			}
		},
		i(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div1);
			if (default_slot) default_slot.d(detaching);
		}
	};
}

function instance$3$1($$self, $$props, $$invalidate) {
	let $theme;
	let { $$slots: slots = {}, $$scope } = $$props;
	let { theme } = getContext('state');
	component_subscribe($$self, theme, value => $$invalidate(0, $theme = value));

	$$self.$$set = $$props => {
		if ('$$scope' in $$props) $$invalidate(2, $$scope = $$props.$$scope);
	};

	return [$theme, theme, $$scope, slots];
}

class Body$1 extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$3$1, create_fragment$3$1, safe_not_equal, {});
	}
}

/* packages/list/src/Event.svelte generated by Svelte v3.47.0 */

function create_fragment$2$1(ctx) {
	let div2;
	let div0;
	let div0_class_value;
	let t;
	let div1;
	let div1_class_value;
	let setContent_action;
	let div2_class_value;
	let mounted;
	let dispose;

	return {
		c() {
			div2 = element("div");
			div0 = element("div");
			t = space();
			div1 = element("div");
			attr(div0, "class", div0_class_value = /*$theme*/ ctx[0].eventTag);
			attr(div0, "style", /*style*/ ctx[2]);
			attr(div1, "class", div1_class_value = /*$theme*/ ctx[0].eventBody);
			attr(div2, "class", div2_class_value = /*$theme*/ ctx[0].event);
		},
		m(target, anchor) {
			insert(target, div2, anchor);
			append(div2, div0);
			append(div2, t);
			append(div2, div1);
			/*div2_binding*/ ctx[26](div2);

			if (!mounted) {
				dispose = [
					action_destroyer(setContent_action = setContent.call(null, div1, /*content*/ ctx[3])),
					listen(div2, "click", function () {
						if (is_function(/*createHandler*/ ctx[18](/*$eventClick*/ ctx[4]))) /*createHandler*/ ctx[18](/*$eventClick*/ ctx[4]).apply(this, arguments);
					}),
					listen(div2, "mouseenter", function () {
						if (is_function(/*createHandler*/ ctx[18](/*$eventMouseEnter*/ ctx[5]))) /*createHandler*/ ctx[18](/*$eventMouseEnter*/ ctx[5]).apply(this, arguments);
					}),
					listen(div2, "mouseleave", function () {
						if (is_function(/*createHandler*/ ctx[18](/*$eventMouseLeave*/ ctx[6]))) /*createHandler*/ ctx[18](/*$eventMouseLeave*/ ctx[6]).apply(this, arguments);
					})
				];

				mounted = true;
			}
		},
		p(new_ctx, [dirty]) {
			ctx = new_ctx;

			if (dirty & /*$theme*/ 1 && div0_class_value !== (div0_class_value = /*$theme*/ ctx[0].eventTag)) {
				attr(div0, "class", div0_class_value);
			}

			if (dirty & /*style*/ 4) {
				attr(div0, "style", /*style*/ ctx[2]);
			}

			if (dirty & /*$theme*/ 1 && div1_class_value !== (div1_class_value = /*$theme*/ ctx[0].eventBody)) {
				attr(div1, "class", div1_class_value);
			}

			if (setContent_action && is_function(setContent_action.update) && dirty & /*content*/ 8) setContent_action.update.call(null, /*content*/ ctx[3]);

			if (dirty & /*$theme*/ 1 && div2_class_value !== (div2_class_value = /*$theme*/ ctx[0].event)) {
				attr(div2, "class", div2_class_value);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div2);
			/*div2_binding*/ ctx[26](null);
			mounted = false;
			run_all(dispose);
		}
	};
}

function instance$2$1($$self, $$props, $$invalidate) {
	let $_view;
	let $eventDidMount;
	let $_intlEventTime;
	let $theme;
	let $eventContent;
	let $displayEventEnd;
	let $eventColor;
	let $eventBackgroundColor;
	let $eventClick;
	let $eventMouseEnter;
	let $eventMouseLeave;
	let { chunk } = $$props;
	let { displayEventEnd, eventBackgroundColor, eventColor, eventContent, eventClick, eventDidMount, eventMouseEnter, eventMouseLeave, theme, _view, _intlEventTime } = getContext('state');
	component_subscribe($$self, displayEventEnd, value => $$invalidate(23, $displayEventEnd = value));
	component_subscribe($$self, eventBackgroundColor, value => $$invalidate(25, $eventBackgroundColor = value));
	component_subscribe($$self, eventColor, value => $$invalidate(24, $eventColor = value));
	component_subscribe($$self, eventContent, value => $$invalidate(22, $eventContent = value));
	component_subscribe($$self, eventClick, value => $$invalidate(4, $eventClick = value));
	component_subscribe($$self, eventDidMount, value => $$invalidate(28, $eventDidMount = value));
	component_subscribe($$self, eventMouseEnter, value => $$invalidate(5, $eventMouseEnter = value));
	component_subscribe($$self, eventMouseLeave, value => $$invalidate(6, $eventMouseLeave = value));
	component_subscribe($$self, theme, value => $$invalidate(0, $theme = value));
	component_subscribe($$self, _view, value => $$invalidate(20, $_view = value));
	component_subscribe($$self, _intlEventTime, value => $$invalidate(21, $_intlEventTime = value));
	let el;
	let style;
	let content;
	let timeText;

	onMount(() => {
		if (is_function($eventDidMount)) {
			$eventDidMount({
				event: toEventWithLocalDates(chunk.event),
				timeText,
				el,
				view: toViewWithLocalDates($_view)
			});
		}
	});

	function createHandler(fn) {
		return jsEvent => {
			if (is_function(fn)) {
				fn({
					event: toEventWithLocalDates(chunk.event),
					el,
					jsEvent,
					view: toViewWithLocalDates($_view)
				});
			}
		};
	}

	function div2_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			el = $$value;
			$$invalidate(1, el);
		});
	}

	$$self.$$set = $$props => {
		if ('chunk' in $$props) $$invalidate(19, chunk = $$props.chunk);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*chunk, $eventBackgroundColor, $eventColor*/ 50855936) {
			{
				// Class & Style
				let bgColor = chunk.event.backgroundColor || $eventBackgroundColor || $eventColor;

				if (bgColor) {
					$$invalidate(2, style = `background-color:${bgColor};`);
				}
			}
		}

		if ($$self.$$.dirty & /*chunk, $displayEventEnd, $eventContent, $theme, $_intlEventTime, $_view*/ 16252929) {
			{
				// Content
				$$invalidate(3, [timeText, content] = createEventContent(chunk, $displayEventEnd, $eventContent, $theme, $_intlEventTime, $_view), content);
			}
		}
	};

	return [
		$theme,
		el,
		style,
		content,
		$eventClick,
		$eventMouseEnter,
		$eventMouseLeave,
		displayEventEnd,
		eventBackgroundColor,
		eventColor,
		eventContent,
		eventClick,
		eventDidMount,
		eventMouseEnter,
		eventMouseLeave,
		theme,
		_view,
		_intlEventTime,
		createHandler,
		chunk,
		$_view,
		$_intlEventTime,
		$eventContent,
		$displayEventEnd,
		$eventColor,
		$eventBackgroundColor,
		div2_binding
	];
}

class Event$1 extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$2$1, create_fragment$2$1, safe_not_equal, { chunk: 19 });
	}
}

/* packages/list/src/Day.svelte generated by Svelte v3.47.0 */

function get_each_context$1$1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[24] = list[i];
	return child_ctx;
}

// (60:0) {#if chunks.length}
function create_if_block$1$1(ctx) {
	let div;
	let t0_value = /*$_intlListDayFormat*/ ctx[7].format(/*date*/ ctx[0]) + "";
	let t0;
	let t1;
	let span;
	let t2_value = /*$_intlListDaySideFormat*/ ctx[8].format(/*date*/ ctx[0]) + "";
	let t2;
	let span_class_value;
	let div_class_value;
	let t3;
	let each_1_anchor;
	let current;
	let mounted;
	let dispose;
	let each_value = /*chunks*/ ctx[1];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$1$1(get_each_context$1$1(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	return {
		c() {
			div = element("div");
			t0 = text(t0_value);
			t1 = space();
			span = element("span");
			t2 = text(t2_value);
			t3 = space();

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();
			attr(span, "class", span_class_value = /*$theme*/ ctx[5].daySide);

			attr(div, "class", div_class_value = "" + (/*$theme*/ ctx[5].day + (/*isToday*/ ctx[3] ? ' ' + /*$theme*/ ctx[5].today : '') + (/*highlight*/ ctx[4]
			? ' ' + /*$theme*/ ctx[5].highlight
			: '')));
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, t0);
			append(div, t1);
			append(div, span);
			append(span, t2);
			/*div_binding*/ ctx[19](div);
			insert(target, t3, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			insert(target, each_1_anchor, anchor);
			current = true;

			if (!mounted) {
				dispose = listen(div, "click", function () {
					if (is_function(/*createClickHandler*/ ctx[16](/*$dateClick*/ ctx[6]))) /*createClickHandler*/ ctx[16](/*$dateClick*/ ctx[6]).apply(this, arguments);
				});

				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			if ((!current || dirty & /*$_intlListDayFormat, date*/ 129) && t0_value !== (t0_value = /*$_intlListDayFormat*/ ctx[7].format(/*date*/ ctx[0]) + "")) set_data(t0, t0_value);
			if ((!current || dirty & /*$_intlListDaySideFormat, date*/ 257) && t2_value !== (t2_value = /*$_intlListDaySideFormat*/ ctx[8].format(/*date*/ ctx[0]) + "")) set_data(t2, t2_value);

			if (!current || dirty & /*$theme*/ 32 && span_class_value !== (span_class_value = /*$theme*/ ctx[5].daySide)) {
				attr(span, "class", span_class_value);
			}

			if (!current || dirty & /*$theme, isToday, highlight*/ 56 && div_class_value !== (div_class_value = "" + (/*$theme*/ ctx[5].day + (/*isToday*/ ctx[3] ? ' ' + /*$theme*/ ctx[5].today : '') + (/*highlight*/ ctx[4]
			? ' ' + /*$theme*/ ctx[5].highlight
			: '')))) {
				attr(div, "class", div_class_value);
			}

			if (dirty & /*chunks*/ 2) {
				each_value = /*chunks*/ ctx[1];
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$1$1(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block$1$1(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}
		},
		i(local) {
			if (current) return;

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			/*div_binding*/ ctx[19](null);
			if (detaching) detach(t3);
			destroy_each(each_blocks, detaching);
			if (detaching) detach(each_1_anchor);
			mounted = false;
			dispose();
		}
	};
}

// (69:1) {#each chunks as chunk}
function create_each_block$1$1(ctx) {
	let event;
	let current;
	event = new Event$1({ props: { chunk: /*chunk*/ ctx[24] } });

	return {
		c() {
			create_component(event.$$.fragment);
		},
		m(target, anchor) {
			mount_component(event, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const event_changes = {};
			if (dirty & /*chunks*/ 2) event_changes.chunk = /*chunk*/ ctx[24];
			event.$set(event_changes);
		},
		i(local) {
			if (current) return;
			transition_in(event.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(event.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(event, detaching);
		}
	};
}

function create_fragment$1$1(ctx) {
	let if_block_anchor;
	let current;
	let if_block = /*chunks*/ ctx[1].length && create_if_block$1$1(ctx);

	return {
		c() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert(target, if_block_anchor, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			if (/*chunks*/ ctx[1].length) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*chunks*/ 2) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block$1$1(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

function instance$1$1($$self, $$props, $$invalidate) {
	let $_view;
	let $highlightedDates;
	let $_events;
	let $theme;
	let $dateClick;
	let $_intlListDayFormat;
	let $_intlListDaySideFormat;
	let { date } = $$props;
	let { _events, _intlDayHeader, _view, date: currentDate, dateClick, highlightedDates, theme } = getContext('state');
	component_subscribe($$self, _events, value => $$invalidate(18, $_events = value));
	component_subscribe($$self, _view, value => $$invalidate(20, $_view = value));
	component_subscribe($$self, dateClick, value => $$invalidate(6, $dateClick = value));
	component_subscribe($$self, highlightedDates, value => $$invalidate(17, $highlightedDates = value));
	component_subscribe($$self, theme, value => $$invalidate(5, $theme = value));
	let { _intlListDayFormat, _intlListDaySideFormat } = getContext('view-state');
	component_subscribe($$self, _intlListDayFormat, value => $$invalidate(7, $_intlListDayFormat = value));
	component_subscribe($$self, _intlListDaySideFormat, value => $$invalidate(8, $_intlListDaySideFormat = value));
	let el;
	let chunks;
	let today = setMidnight(createDate()), isToday, highlight;

	function createClickHandler(fn) {
		return is_function(fn)
		? jsEvent => {
				fn({
					date: toLocalDate(date),
					dateStr: toISOString(date),
					dayEl: el,
					jsEvent,
					view: toViewWithLocalDates($_view)
				});
			}
		: undefined;
	}

	function div_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			el = $$value;
			$$invalidate(2, el);
		});
	}

	$$self.$$set = $$props => {
		if ('date' in $$props) $$invalidate(0, date = $$props.date);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*date, $_events, chunks*/ 262147) {
			{
				$$invalidate(1, chunks = []);
				let start = date;
				let end = addDay(cloneDate(date));

				for (let event of $_events) {
					if (event.display === 'auto' && event.start < end && event.end > start) {
						let chunk = createEventChunk(event, start, end);
						chunks.push(chunk);
					}
				}

				sortEventChunks(chunks);
			}
		}

		if ($$self.$$.dirty & /*date, $highlightedDates*/ 131073) {
			{
				$$invalidate(3, isToday = datesEqual(date, today));
				$$invalidate(4, highlight = $highlightedDates.some(d => datesEqual(d, date)));
			}
		}
	};

	return [
		date,
		chunks,
		el,
		isToday,
		highlight,
		$theme,
		$dateClick,
		$_intlListDayFormat,
		$_intlListDaySideFormat,
		_events,
		_view,
		dateClick,
		highlightedDates,
		theme,
		_intlListDayFormat,
		_intlListDaySideFormat,
		createClickHandler,
		$highlightedDates,
		$_events,
		div_binding
	];
}

class Day$1 extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$1$1, create_fragment$1$1, safe_not_equal, { date: 0 });
	}
}

class State$2 {
    constructor(state) {
        this._intlListDayFormat = intl(state.locale, state.listDayFormat);
        this._intlListDaySideFormat = intl(state.locale, state.listDaySideFormat);
    }
}

/* packages/list/src/View.svelte generated by Svelte v3.47.0 */

function get_each_context$6(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[18] = list[i];
	return child_ctx;
}

// (49:1) {:else}
function create_else_block$1(ctx) {
	let each_1_anchor;
	let current;
	let each_value = /*$_viewDates*/ ctx[1];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$6(get_each_context$6(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	return {
		c() {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();
		},
		m(target, anchor) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			insert(target, each_1_anchor, anchor);
			current = true;
		},
		p(ctx, dirty) {
			if (dirty & /*$_viewDates*/ 2) {
				each_value = /*$_viewDates*/ ctx[1];
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$6(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block$6(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}
		},
		i(local) {
			if (current) return;

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d(detaching) {
			destroy_each(each_blocks, detaching);
			if (detaching) detach(each_1_anchor);
		}
	};
}

// (47:1) {#if noEvents}
function create_if_block$2(ctx) {
	let div;
	let div_class_value;
	let setContent_action;
	let mounted;
	let dispose;

	return {
		c() {
			div = element("div");
			attr(div, "class", div_class_value = /*$theme*/ ctx[3].noEvents);
		},
		m(target, anchor) {
			insert(target, div, anchor);

			if (!mounted) {
				dispose = [
					action_destroyer(setContent_action = setContent.call(null, div, /*content*/ ctx[0])),
					listen(div, "click", /*handleClick*/ ctx[11])
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty & /*$theme*/ 8 && div_class_value !== (div_class_value = /*$theme*/ ctx[3].noEvents)) {
				attr(div, "class", div_class_value);
			}

			if (setContent_action && is_function(setContent_action.update) && dirty & /*content*/ 1) setContent_action.update.call(null, /*content*/ ctx[0]);
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
			mounted = false;
			run_all(dispose);
		}
	};
}

// (50:2) {#each $_viewDates as date}
function create_each_block$6(ctx) {
	let day;
	let current;
	day = new Day$1({ props: { date: /*date*/ ctx[18] } });

	return {
		c() {
			create_component(day.$$.fragment);
		},
		m(target, anchor) {
			mount_component(day, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const day_changes = {};
			if (dirty & /*$_viewDates*/ 2) day_changes.date = /*date*/ ctx[18];
			day.$set(day_changes);
		},
		i(local) {
			if (current) return;
			transition_in(day.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(day.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(day, detaching);
		}
	};
}

// (46:0) <Body>
function create_default_slot$2(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block$2, create_else_block$1];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*noEvents*/ ctx[2]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	return {
		c() {
			if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if_blocks[current_block_type_index].m(target, anchor);
			insert(target, if_block_anchor, anchor);
			current = true;
		},
		p(ctx, dirty) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(if_block_anchor.parentNode, if_block_anchor);
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if_blocks[current_block_type_index].d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

function create_fragment$8(ctx) {
	let body;
	let current;

	body = new Body$1({
			props: {
				$$slots: { default: [create_default_slot$2] },
				$$scope: { ctx }
			}
		});

	return {
		c() {
			create_component(body.$$.fragment);
		},
		m(target, anchor) {
			mount_component(body, target, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			const body_changes = {};

			if (dirty & /*$$scope, $theme, content, noEvents, $_viewDates*/ 2097167) {
				body_changes.$$scope = { dirty, ctx };
			}

			body.$set(body_changes);
		},
		i(local) {
			if (current) return;
			transition_in(body.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(body.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(body, detaching);
		}
	};
}

function instance$8($$self, $$props, $$invalidate) {
	let $_view;
	let $noEventsClick;
	let $noEventsContent;
	let $_events;
	let $_viewDates;
	let $_viewClass;
	let $theme;
	let { _events, _view, _viewDates, _viewClass, noEventsClick, noEventsContent, theme } = getContext('state');
	component_subscribe($$self, _events, value => $$invalidate(13, $_events = value));
	component_subscribe($$self, _view, value => $$invalidate(14, $_view = value));
	component_subscribe($$self, _viewDates, value => $$invalidate(1, $_viewDates = value));
	component_subscribe($$self, _viewClass, value => $$invalidate(16, $_viewClass = value));
	component_subscribe($$self, noEventsClick, value => $$invalidate(15, $noEventsClick = value));
	component_subscribe($$self, noEventsContent, value => $$invalidate(12, $noEventsContent = value));
	component_subscribe($$self, theme, value => $$invalidate(3, $theme = value));
	let state = new State$2(getContext('state'));
	setContext('view-state', state);
	set_store_value(_viewClass, $_viewClass = 'list', $_viewClass);
	let noEvents, content;

	function handleClick(jsEvent) {
		if (is_function($noEventsClick)) {
			$noEventsClick({
				jsEvent,
				view: toViewWithLocalDates($_view)
			});
		}
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*$_viewDates, $_events*/ 8194) {
			{
				$$invalidate(2, noEvents = true);

				if ($_viewDates.length) {
					let start = $_viewDates[0];
					let end = addDay(cloneDate($_viewDates[$_viewDates.length - 1]));

					for (let event of $_events) {
						if (event.display === 'auto' && event.start < end && event.end > start) {
							$$invalidate(2, noEvents = false);
							break;
						}
					}
				}
			}
		}

		if ($$self.$$.dirty & /*$noEventsContent, content*/ 4097) {
			{
				$$invalidate(0, content = is_function($noEventsContent)
				? $noEventsContent()
				: $noEventsContent);

				if (typeof content === 'string') {
					$$invalidate(0, content = { html: content });
				}
			}
		}
	};

	return [
		content,
		$_viewDates,
		noEvents,
		$theme,
		_events,
		_view,
		_viewDates,
		_viewClass,
		noEventsClick,
		noEventsContent,
		theme,
		handleClick,
		$noEventsContent,
		$_events
	];
}

class View$2 extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$8, create_fragment$8, safe_not_equal, {});
	}
}

var index$2 = {
	createOptions(options) {
		// Common options
		options.buttonText.listDay = 'list';
		options.buttonText.listWeek = 'list';
		options.buttonText.listMonth = 'list';
		options.buttonText.listYear = 'list';
		options.listDayFormat = {weekday: 'long'};
		options.listDaySideFormat = {year: 'numeric', month: 'long', day: 'numeric'};
		options.noEventsClick = undefined;  // ec option
		options.noEventsContent = 'No events';
		options.theme.daySide = 'ec-day-side';
		options.theme.eventTag = 'ec-event-tag';
		options.theme.list = 'ec-list';
		options.theme.noEvents = 'ec-no-events';
		options.view = 'listWeek';
		options.views.listDay = {
			component: View$2,
			duration: {days: 1}
		};
		options.views.listWeek = {
			component: View$2,
			duration: {weeks: 1}
		};
		options.views.listMonth = {
			component: View$2,
			duration: {months: 1}
		};
		options.views.listYear = {
			component: View$2,
			duration: {years: 1}
		};
	}
};

function viewResources(state) {
    return derived(
        [state.resources, state.filterResourcesWithEvents, state._events, state._activeRange],
        ([$resources, $filterResourcesWithEvents, $_events, $_activeRange]) => {
            let result = $resources;

            if ($filterResourcesWithEvents) {
                result = $resources.filter(resource => {
                    for (let event of $_events) {
                        if (
                            event.display !== 'background' &&
                            event.resourceIds.includes(resource.id) &&
                            event.start < $_activeRange.end &&
                            event.end > $_activeRange.start
                        ) {
                            return true;
                        }
                    }
                    return false;
                });
            }

            if (!result.length) {
                result = state.resources.parse([{}]);
            }

            return result;
        }
    );
}

class State$1 extends State$3 {
    constructor(state) {
        super(state);

        this._viewResources = viewResources(state);
    }
}

/* packages/resource-time-grid/src/View.svelte generated by Svelte v3.47.0 */

function get_each_context$5(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[18] = list[i];
	return child_ctx;
}

function get_each_context_1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[21] = list[i];
	return child_ctx;
}

function get_each_context_4(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[27] = list[i];
	return child_ctx;
}

function get_each_context_2(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[24] = list[i];
	return child_ctx;
}

function get_each_context_3(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[27] = list[i];
	return child_ctx;
}

function get_each_context_5(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[18] = list[i];
	return child_ctx;
}

function get_each_context_6(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[21] = list[i];
	return child_ctx;
}

// (31:3) {#if loops[1].length > 1}
function create_if_block_2$1(ctx) {
	let div;
	let div_class_value;
	let each_value_6 = /*loops*/ ctx[0][1];
	let each_blocks = [];

	for (let i = 0; i < each_value_6.length; i += 1) {
		each_blocks[i] = create_each_block_6(get_each_context_6(ctx, each_value_6, i));
	}

	return {
		c() {
			div = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr(div, "class", div_class_value = /*$theme*/ ctx[5].days);
		},
		m(target, anchor) {
			insert(target, div, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div, null);
			}
		},
		p(ctx, dirty) {
			if (dirty[0] & /*$theme, titles, loops*/ 35) {
				each_value_6 = /*loops*/ ctx[0][1];
				let i;

				for (i = 0; i < each_value_6.length; i += 1) {
					const child_ctx = get_each_context_6(ctx, each_value_6, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_6(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(div, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value_6.length;
			}

			if (dirty[0] & /*$theme*/ 32 && div_class_value !== (div_class_value = /*$theme*/ ctx[5].days)) {
				attr(div, "class", div_class_value);
			}
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_each(each_blocks, detaching);
		}
	};
}

// (33:5) {#each loops[1] as item1}
function create_each_block_6(ctx) {
	let div;
	let t_value = /*titles*/ ctx[1][1](/*item1*/ ctx[21]) + "";
	let t;
	let div_class_value;

	return {
		c() {
			div = element("div");
			t = text(t_value);
			attr(div, "class", div_class_value = /*$theme*/ ctx[5].day);
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, t);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*titles, loops*/ 3 && t_value !== (t_value = /*titles*/ ctx[1][1](/*item1*/ ctx[21]) + "")) set_data(t, t_value);

			if (dirty[0] & /*$theme*/ 32 && div_class_value !== (div_class_value = /*$theme*/ ctx[5].day)) {
				attr(div, "class", div_class_value);
			}
		},
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

// (28:1) {#each loops[0] as item0}
function create_each_block_5(ctx) {
	let div1;
	let div0;
	let t0_value = /*titles*/ ctx[1][0](/*item0*/ ctx[18]) + "";
	let t0;
	let div0_class_value;
	let t1;
	let t2;
	let div1_class_value;
	let if_block = /*loops*/ ctx[0][1].length > 1 && create_if_block_2$1(ctx);

	return {
		c() {
			div1 = element("div");
			div0 = element("div");
			t0 = text(t0_value);
			t1 = space();
			if (if_block) if_block.c();
			t2 = space();
			attr(div0, "class", div0_class_value = /*$theme*/ ctx[5].day);
			attr(div1, "class", div1_class_value = /*$theme*/ ctx[5].resource);
		},
		m(target, anchor) {
			insert(target, div1, anchor);
			append(div1, div0);
			append(div0, t0);
			append(div1, t1);
			if (if_block) if_block.m(div1, null);
			append(div1, t2);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*titles, loops*/ 3 && t0_value !== (t0_value = /*titles*/ ctx[1][0](/*item0*/ ctx[18]) + "")) set_data(t0, t0_value);

			if (dirty[0] & /*$theme*/ 32 && div0_class_value !== (div0_class_value = /*$theme*/ ctx[5].day)) {
				attr(div0, "class", div0_class_value);
			}

			if (/*loops*/ ctx[0][1].length > 1) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block_2$1(ctx);
					if_block.c();
					if_block.m(div1, t2);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}

			if (dirty[0] & /*$theme*/ 32 && div1_class_value !== (div1_class_value = /*$theme*/ ctx[5].resource)) {
				attr(div1, "class", div1_class_value);
			}
		},
		d(detaching) {
			if (detaching) detach(div1);
			if (if_block) if_block.d();
		}
	};
}

// (27:0) <Header>
function create_default_slot_2(ctx) {
	let each_1_anchor;
	let each_value_5 = /*loops*/ ctx[0][0];
	let each_blocks = [];

	for (let i = 0; i < each_value_5.length; i += 1) {
		each_blocks[i] = create_each_block_5(get_each_context_5(ctx, each_value_5, i));
	}

	return {
		c() {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();
		},
		m(target, anchor) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			insert(target, each_1_anchor, anchor);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*$theme, loops, titles*/ 35) {
				each_value_5 = /*loops*/ ctx[0][0];
				let i;

				for (i = 0; i < each_value_5.length; i += 1) {
					const child_ctx = get_each_context_5(ctx, each_value_5, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_5(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value_5.length;
			}
		},
		d(detaching) {
			destroy_each(each_blocks, detaching);
			if (detaching) detach(each_1_anchor);
		}
	};
}

// (41:0) {#if $allDaySlot}
function create_if_block$1(ctx) {
	let header;
	let current;

	header = new Header$1({
			props: {
				allDay: true,
				$$slots: { default: [create_default_slot_1] },
				$$scope: { ctx }
			}
		});

	return {
		c() {
			create_component(header.$$.fragment);
		},
		m(target, anchor) {
			mount_component(header, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const header_changes = {};

			if (dirty[0] & /*$_viewDates, $theme, $_viewResources, $datesAboveResources*/ 60 | dirty[1] & /*$$scope*/ 32) {
				header_changes.$$scope = { dirty, ctx };
			}

			header.$set(header_changes);
		},
		i(local) {
			if (current) return;
			transition_in(header.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(header.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(header, detaching);
		}
	};
}

// (51:2) {:else}
function create_else_block(ctx) {
	let each_1_anchor;
	let current;
	let each_value_4 = /*$_viewResources*/ ctx[2];
	let each_blocks = [];

	for (let i = 0; i < each_value_4.length; i += 1) {
		each_blocks[i] = create_each_block_4(get_each_context_4(ctx, each_value_4, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	return {
		c() {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();
		},
		m(target, anchor) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			insert(target, each_1_anchor, anchor);
			current = true;
		},
		p(ctx, dirty) {
			if (dirty[0] & /*$theme, $_viewDates, $_viewResources*/ 44) {
				each_value_4 = /*$_viewResources*/ ctx[2];
				let i;

				for (i = 0; i < each_value_4.length; i += 1) {
					const child_ctx = get_each_context_4(ctx, each_value_4, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block_4(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
					}
				}

				group_outros();

				for (i = each_value_4.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}
		},
		i(local) {
			if (current) return;

			for (let i = 0; i < each_value_4.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d(detaching) {
			destroy_each(each_blocks, detaching);
			if (detaching) detach(each_1_anchor);
		}
	};
}

// (43:2) {#if $datesAboveResources}
function create_if_block_1$1(ctx) {
	let each_1_anchor;
	let current;
	let each_value_2 = /*$_viewDates*/ ctx[3];
	let each_blocks = [];

	for (let i = 0; i < each_value_2.length; i += 1) {
		each_blocks[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	return {
		c() {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();
		},
		m(target, anchor) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			insert(target, each_1_anchor, anchor);
			current = true;
		},
		p(ctx, dirty) {
			if (dirty[0] & /*$theme, $_viewResources, $_viewDates*/ 44) {
				each_value_2 = /*$_viewDates*/ ctx[3];
				let i;

				for (i = 0; i < each_value_2.length; i += 1) {
					const child_ctx = get_each_context_2(ctx, each_value_2, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block_2(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
					}
				}

				group_outros();

				for (i = each_value_2.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}
		},
		i(local) {
			if (current) return;

			for (let i = 0; i < each_value_2.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d(detaching) {
			destroy_each(each_blocks, detaching);
			if (detaching) detach(each_1_anchor);
		}
	};
}

// (52:3) {#each $_viewResources as resource}
function create_each_block_4(ctx) {
	let div;
	let week;
	let t;
	let div_class_value;
	let current;

	week = new Week$1({
			props: {
				dates: /*$_viewDates*/ ctx[3],
				resource: /*resource*/ ctx[27]
			}
		});

	return {
		c() {
			div = element("div");
			create_component(week.$$.fragment);
			t = space();
			attr(div, "class", div_class_value = /*$theme*/ ctx[5].resource);
		},
		m(target, anchor) {
			insert(target, div, anchor);
			mount_component(week, div, null);
			append(div, t);
			current = true;
		},
		p(ctx, dirty) {
			const week_changes = {};
			if (dirty[0] & /*$_viewDates*/ 8) week_changes.dates = /*$_viewDates*/ ctx[3];
			if (dirty[0] & /*$_viewResources*/ 4) week_changes.resource = /*resource*/ ctx[27];
			week.$set(week_changes);

			if (!current || dirty[0] & /*$theme*/ 32 && div_class_value !== (div_class_value = /*$theme*/ ctx[5].resource)) {
				attr(div, "class", div_class_value);
			}
		},
		i(local) {
			if (current) return;
			transition_in(week.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(week.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_component(week);
		}
	};
}

// (46:5) {#each $_viewResources as resource}
function create_each_block_3(ctx) {
	let week;
	let current;

	week = new Week$1({
			props: {
				dates: [/*date*/ ctx[24]],
				resource: /*resource*/ ctx[27]
			}
		});

	return {
		c() {
			create_component(week.$$.fragment);
		},
		m(target, anchor) {
			mount_component(week, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const week_changes = {};
			if (dirty[0] & /*$_viewDates*/ 8) week_changes.dates = [/*date*/ ctx[24]];
			if (dirty[0] & /*$_viewResources*/ 4) week_changes.resource = /*resource*/ ctx[27];
			week.$set(week_changes);
		},
		i(local) {
			if (current) return;
			transition_in(week.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(week.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(week, detaching);
		}
	};
}

// (44:3) {#each $_viewDates as date}
function create_each_block_2(ctx) {
	let div;
	let t;
	let div_class_value;
	let current;
	let each_value_3 = /*$_viewResources*/ ctx[2];
	let each_blocks = [];

	for (let i = 0; i < each_value_3.length; i += 1) {
		each_blocks[i] = create_each_block_3(get_each_context_3(ctx, each_value_3, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	return {
		c() {
			div = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t = space();
			attr(div, "class", div_class_value = /*$theme*/ ctx[5].resource);
		},
		m(target, anchor) {
			insert(target, div, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div, null);
			}

			append(div, t);
			current = true;
		},
		p(ctx, dirty) {
			if (dirty[0] & /*$_viewDates, $_viewResources*/ 12) {
				each_value_3 = /*$_viewResources*/ ctx[2];
				let i;

				for (i = 0; i < each_value_3.length; i += 1) {
					const child_ctx = get_each_context_3(ctx, each_value_3, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block_3(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(div, t);
					}
				}

				group_outros();

				for (i = each_value_3.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}

			if (!current || dirty[0] & /*$theme*/ 32 && div_class_value !== (div_class_value = /*$theme*/ ctx[5].resource)) {
				attr(div, "class", div_class_value);
			}
		},
		i(local) {
			if (current) return;

			for (let i = 0; i < each_value_3.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_each(each_blocks, detaching);
		}
	};
}

// (42:1) <Header allDay>
function create_default_slot_1(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block_1$1, create_else_block];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*$datesAboveResources*/ ctx[4]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	return {
		c() {
			if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if_blocks[current_block_type_index].m(target, anchor);
			insert(target, if_block_anchor, anchor);
			current = true;
		},
		p(ctx, dirty) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(if_block_anchor.parentNode, if_block_anchor);
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if_blocks[current_block_type_index].d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

// (63:3) {#each loops[1] as item1}
function create_each_block_1(ctx) {
	let day;
	let current;

	day = new Day$1$1({
			props: {
				date: /*$datesAboveResources*/ ctx[4]
				? /*item0*/ ctx[18]
				: /*item1*/ ctx[21],
				resource: /*$datesAboveResources*/ ctx[4]
				? /*item1*/ ctx[21]
				: /*item0*/ ctx[18]
			}
		});

	return {
		c() {
			create_component(day.$$.fragment);
		},
		m(target, anchor) {
			mount_component(day, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const day_changes = {};

			if (dirty[0] & /*$datesAboveResources, loops*/ 17) day_changes.date = /*$datesAboveResources*/ ctx[4]
			? /*item0*/ ctx[18]
			: /*item1*/ ctx[21];

			if (dirty[0] & /*$datesAboveResources, loops*/ 17) day_changes.resource = /*$datesAboveResources*/ ctx[4]
			? /*item1*/ ctx[21]
			: /*item0*/ ctx[18];

			day.$set(day_changes);
		},
		i(local) {
			if (current) return;
			transition_in(day.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(day.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(day, detaching);
		}
	};
}

// (61:1) {#each loops[0] as item0}
function create_each_block$5(ctx) {
	let div;
	let t;
	let div_class_value;
	let current;
	let each_value_1 = /*loops*/ ctx[0][1];
	let each_blocks = [];

	for (let i = 0; i < each_value_1.length; i += 1) {
		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	return {
		c() {
			div = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t = space();
			attr(div, "class", div_class_value = /*$theme*/ ctx[5].resource);
		},
		m(target, anchor) {
			insert(target, div, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div, null);
			}

			append(div, t);
			current = true;
		},
		p(ctx, dirty) {
			if (dirty[0] & /*$datesAboveResources, loops*/ 17) {
				each_value_1 = /*loops*/ ctx[0][1];
				let i;

				for (i = 0; i < each_value_1.length; i += 1) {
					const child_ctx = get_each_context_1(ctx, each_value_1, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block_1(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(div, t);
					}
				}

				group_outros();

				for (i = each_value_1.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}

			if (!current || dirty[0] & /*$theme*/ 32 && div_class_value !== (div_class_value = /*$theme*/ ctx[5].resource)) {
				attr(div, "class", div_class_value);
			}
		},
		i(local) {
			if (current) return;

			for (let i = 0; i < each_value_1.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_each(each_blocks, detaching);
		}
	};
}

// (60:0) <Body>
function create_default_slot$1(ctx) {
	let each_1_anchor;
	let current;
	let each_value = /*loops*/ ctx[0][0];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$5(get_each_context$5(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	return {
		c() {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();
		},
		m(target, anchor) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			insert(target, each_1_anchor, anchor);
			current = true;
		},
		p(ctx, dirty) {
			if (dirty[0] & /*$theme, loops, $datesAboveResources*/ 49) {
				each_value = /*loops*/ ctx[0][0];
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$5(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block$5(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}
		},
		i(local) {
			if (current) return;

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d(detaching) {
			destroy_each(each_blocks, detaching);
			if (detaching) detach(each_1_anchor);
		}
	};
}

function create_fragment$7(ctx) {
	let header;
	let t0;
	let t1;
	let body;
	let current;

	header = new Header$1({
			props: {
				$$slots: { default: [create_default_slot_2] },
				$$scope: { ctx }
			}
		});

	let if_block = /*$allDaySlot*/ ctx[6] && create_if_block$1(ctx);

	body = new Body$2({
			props: {
				$$slots: { default: [create_default_slot$1] },
				$$scope: { ctx }
			}
		});

	return {
		c() {
			create_component(header.$$.fragment);
			t0 = space();
			if (if_block) if_block.c();
			t1 = space();
			create_component(body.$$.fragment);
		},
		m(target, anchor) {
			mount_component(header, target, anchor);
			insert(target, t0, anchor);
			if (if_block) if_block.m(target, anchor);
			insert(target, t1, anchor);
			mount_component(body, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const header_changes = {};

			if (dirty[0] & /*loops, $theme, titles*/ 35 | dirty[1] & /*$$scope*/ 32) {
				header_changes.$$scope = { dirty, ctx };
			}

			header.$set(header_changes);

			if (/*$allDaySlot*/ ctx[6]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty[0] & /*$allDaySlot*/ 64) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block$1(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(t1.parentNode, t1);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}

			const body_changes = {};

			if (dirty[0] & /*loops, $theme, $datesAboveResources*/ 49 | dirty[1] & /*$$scope*/ 32) {
				body_changes.$$scope = { dirty, ctx };
			}

			body.$set(body_changes);
		},
		i(local) {
			if (current) return;
			transition_in(header.$$.fragment, local);
			transition_in(if_block);
			transition_in(body.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(header.$$.fragment, local);
			transition_out(if_block);
			transition_out(body.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(header, detaching);
			if (detaching) detach(t0);
			if (if_block) if_block.d(detaching);
			if (detaching) detach(t1);
			destroy_component(body, detaching);
		}
	};
}

function instance$7($$self, $$props, $$invalidate) {
	let $_intlDayHeader;
	let $_viewResources;
	let $_viewDates;
	let $datesAboveResources;
	let $_viewClass;
	let $theme;
	let $allDaySlot;
	let state = getContext('state');
	let { datesAboveResources, _viewDates, _intlDayHeader, _viewClass, allDaySlot, theme } = state;
	component_subscribe($$self, datesAboveResources, value => $$invalidate(4, $datesAboveResources = value));
	component_subscribe($$self, _viewDates, value => $$invalidate(3, $_viewDates = value));
	component_subscribe($$self, _intlDayHeader, value => $$invalidate(14, $_intlDayHeader = value));
	component_subscribe($$self, _viewClass, value => $$invalidate(15, $_viewClass = value));
	component_subscribe($$self, allDaySlot, value => $$invalidate(6, $allDaySlot = value));
	component_subscribe($$self, theme, value => $$invalidate(5, $theme = value));
	let viewState = new State$1(state);
	setContext('view-state', viewState);
	let { _viewResources } = viewState;
	component_subscribe($$self, _viewResources, value => $$invalidate(2, $_viewResources = value));
	set_store_value(_viewClass, $_viewClass = 'week', $_viewClass);
	let loops, titles;

	$$self.$$.update = () => {
		if ($$self.$$.dirty[0] & /*$datesAboveResources, loops, $_viewDates, $_viewResources, titles, $_intlDayHeader*/ 16415) {
			{
				$$invalidate(0, loops = []);
				$$invalidate(1, titles = []);

				for (let i of $datesAboveResources ? [1, 0] : [0, 1]) {
					loops.push(i ? $_viewDates : $_viewResources);

					titles.push(i
					? date => $_intlDayHeader.format(date)
					: resource => resource.title);
				}
			}
		}
	};

	return [
		loops,
		titles,
		$_viewResources,
		$_viewDates,
		$datesAboveResources,
		$theme,
		$allDaySlot,
		datesAboveResources,
		_viewDates,
		_intlDayHeader,
		_viewClass,
		allDaySlot,
		theme,
		_viewResources,
		$_intlDayHeader
	];
}

class View$1 extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$7, create_fragment$7, safe_not_equal, {}, null, [-1, -1]);
	}
}

var index$1 = {
	createOptions(options) {
		options.resources = [];
		options.datesAboveResources = false;
		options.filterResourcesWithEvents = false;
		// Common options
		options.buttonText.resourceTimeGridDay = 'day';
		options.buttonText.resourceTimeGridWeek = 'week';
		options.theme.resource = 'ec-resource';
		options.theme.resourceTitle = 'ec-resource-title';
		options.view = 'resourceTimeGridWeek';
		options.views.resourceTimeGridDay = {
			component: View$1,
			duration: {days: 1}
		};
		options.views.resourceTimeGridWeek = {
			component: View$1,
			duration: {weeks: 1}
		};
	},
	createParsers(parsers, options) {
		parsers.resources = createResources;
	}
};

function createResources(input) {
	return input.map(resource => ({
		id: String(resource.id),
		title: resource.title || ''
	}));
}

function days(state) {
    return derived([state.date, state.firstDay, state.hiddenDays], ([$date, $firstDay, $hiddenDays]) => {
        let days = [];
        let day = cloneDate($date);
        let max = 7;
        // First day of week
        while (day.getUTCDay() !== $firstDay && max) {
            subtractDay(day);
            --max;
        }
        for (let i = 0; i < 7; ++i) {
            if (!$hiddenDays.includes(day.getUTCDay())) {
                days.push(cloneDate(day));
            }
            addDay(day);
        }

        return days;
    });
}

class State {
    constructor(state) {
        this._days = days(state);
        this._hiddenEvents = writable({});
        this._popup = writable({
            date: null,
            chunks: []
        });
    }
}

/* packages/day-grid/src/Header.svelte generated by Svelte v3.47.0 */

function get_each_context$4(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[8] = list[i];
	return child_ctx;
}

// (10:2) {#each $_days as day}
function create_each_block$4(ctx) {
	let div;
	let t_value = /*$_intlDayHeader*/ ctx[3].format(/*day*/ ctx[8]) + "";
	let t;
	let div_class_value;

	return {
		c() {
			div = element("div");
			t = text(t_value);
			attr(div, "class", div_class_value = /*$theme*/ ctx[0].day);
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, t);
		},
		p(ctx, dirty) {
			if (dirty & /*$_intlDayHeader, $_days*/ 12 && t_value !== (t_value = /*$_intlDayHeader*/ ctx[3].format(/*day*/ ctx[8]) + "")) set_data(t, t_value);

			if (dirty & /*$theme*/ 1 && div_class_value !== (div_class_value = /*$theme*/ ctx[0].day)) {
				attr(div, "class", div_class_value);
			}
		},
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

function create_fragment$6(ctx) {
	let div2;
	let div0;
	let div0_class_value;
	let t;
	let div1;
	let div1_class_value;
	let div2_class_value;
	let each_value = /*$_days*/ ctx[2];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$4(get_each_context$4(ctx, each_value, i));
	}

	return {
		c() {
			div2 = element("div");
			div0 = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t = space();
			div1 = element("div");
			attr(div0, "class", div0_class_value = /*$theme*/ ctx[0].days);
			attr(div1, "class", div1_class_value = /*$theme*/ ctx[0].hiddenScroll);

			attr(div2, "class", div2_class_value = "" + (/*$theme*/ ctx[0].header + (/*$_scrollable*/ ctx[1]
			? ' ' + /*$theme*/ ctx[0].withScroll
			: '')));
		},
		m(target, anchor) {
			insert(target, div2, anchor);
			append(div2, div0);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div0, null);
			}

			append(div2, t);
			append(div2, div1);
		},
		p(ctx, [dirty]) {
			if (dirty & /*$theme, $_intlDayHeader, $_days*/ 13) {
				each_value = /*$_days*/ ctx[2];
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$4(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block$4(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(div0, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}

			if (dirty & /*$theme*/ 1 && div0_class_value !== (div0_class_value = /*$theme*/ ctx[0].days)) {
				attr(div0, "class", div0_class_value);
			}

			if (dirty & /*$theme*/ 1 && div1_class_value !== (div1_class_value = /*$theme*/ ctx[0].hiddenScroll)) {
				attr(div1, "class", div1_class_value);
			}

			if (dirty & /*$theme, $_scrollable*/ 3 && div2_class_value !== (div2_class_value = "" + (/*$theme*/ ctx[0].header + (/*$_scrollable*/ ctx[1]
			? ' ' + /*$theme*/ ctx[0].withScroll
			: '')))) {
				attr(div2, "class", div2_class_value);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div2);
			destroy_each(each_blocks, detaching);
		}
	};
}

function instance$6($$self, $$props, $$invalidate) {
	let $theme;
	let $_scrollable;
	let $_days;
	let $_intlDayHeader;
	let { theme, _intlDayHeader, _scrollable } = getContext('state');
	component_subscribe($$self, theme, value => $$invalidate(0, $theme = value));
	component_subscribe($$self, _intlDayHeader, value => $$invalidate(3, $_intlDayHeader = value));
	component_subscribe($$self, _scrollable, value => $$invalidate(1, $_scrollable = value));
	let { _days } = getContext('view-state');
	component_subscribe($$self, _days, value => $$invalidate(2, $_days = value));

	return [
		$theme,
		$_scrollable,
		$_days,
		$_intlDayHeader,
		theme,
		_intlDayHeader,
		_scrollable,
		_days
	];
}

class Header extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$6, create_fragment$6, safe_not_equal, {});
	}
}

/* packages/day-grid/src/Body.svelte generated by Svelte v3.47.0 */

function create_fragment$5(ctx) {
	let div1;
	let div0;
	let div0_class_value;
	let div1_class_value;
	let current;
	let mounted;
	let dispose;
	const default_slot_template = /*#slots*/ ctx[12].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[11], null);

	return {
		c() {
			div1 = element("div");
			div0 = element("div");
			if (default_slot) default_slot.c();
			attr(div0, "class", div0_class_value = /*$theme*/ ctx[1].content);

			attr(div1, "class", div1_class_value = "" + (/*$theme*/ ctx[1].body + (/*$dayMaxEvents*/ ctx[2] === true
			? ' ' + /*$theme*/ ctx[1].uniform
			: '')));
		},
		m(target, anchor) {
			insert(target, div1, anchor);
			append(div1, div0);

			if (default_slot) {
				default_slot.m(div0, null);
			}

			/*div1_binding*/ ctx[13](div1);
			current = true;

			if (!mounted) {
				dispose = [
					listen(window, "resize", /*recheckScrollable*/ ctx[9]),
					listen(div1, "scroll", function () {
						if (is_function(/*$_scroll*/ ctx[3])) /*$_scroll*/ ctx[3].apply(this, arguments);
					})
				];

				mounted = true;
			}
		},
		p(new_ctx, [dirty]) {
			ctx = new_ctx;

			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 2048)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[11],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[11])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[11], dirty, null),
						null
					);
				}
			}

			if (!current || dirty & /*$theme*/ 2 && div0_class_value !== (div0_class_value = /*$theme*/ ctx[1].content)) {
				attr(div0, "class", div0_class_value);
			}

			if (!current || dirty & /*$theme, $dayMaxEvents*/ 6 && div1_class_value !== (div1_class_value = "" + (/*$theme*/ ctx[1].body + (/*$dayMaxEvents*/ ctx[2] === true
			? ' ' + /*$theme*/ ctx[1].uniform
			: '')))) {
				attr(div1, "class", div1_class_value);
			}
		},
		i(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div1);
			if (default_slot) default_slot.d(detaching);
			/*div1_binding*/ ctx[13](null);
			mounted = false;
			run_all(dispose);
		}
	};
}

function instance$5($$self, $$props, $$invalidate) {
	let $_scrollable;
	let $_events;
	let $theme;
	let $dayMaxEvents;
	let $_scroll;
	let { $$slots: slots = {}, $$scope } = $$props;
	let { dayMaxEvents, _events, _scrollable, _scroll, theme } = getContext('state');
	component_subscribe($$self, dayMaxEvents, value => $$invalidate(2, $dayMaxEvents = value));
	component_subscribe($$self, _events, value => $$invalidate(10, $_events = value));
	component_subscribe($$self, _scrollable, value => $$invalidate(14, $_scrollable = value));
	component_subscribe($$self, _scroll, value => $$invalidate(3, $_scroll = value));
	component_subscribe($$self, theme, value => $$invalidate(1, $theme = value));
	let el;

	function recheckScrollable() {
		set_store_value(_scrollable, $_scrollable = hasYScroll(el), $_scrollable);
	}

	function div1_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			el = $$value;
			$$invalidate(0, el);
		});
	}

	$$self.$$set = $$props => {
		if ('$$scope' in $$props) $$invalidate(11, $$scope = $$props.$$scope);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*el, $_events*/ 1025) {
			if (el && $_events) {
				tick().then(recheckScrollable);
			}
		}
	};

	return [
		el,
		$theme,
		$dayMaxEvents,
		$_scroll,
		dayMaxEvents,
		_events,
		_scrollable,
		_scroll,
		theme,
		recheckScrollable,
		$_events,
		$$scope,
		slots,
		div1_binding
	];
}

class Body extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$5, create_fragment$5, safe_not_equal, {});
	}
}

function prepareEventChunks(chunks, hiddenDays) {
    if (!chunks.length) {
        return;
    }

    sortEventChunks(chunks);

    let longChunks = {};
    let prevChunk;
    for (let chunk of chunks) {
        let dates = [];
        let date = setMidnight(cloneDate(chunk.start));
        while (chunk.end > date) {
            if (!hiddenDays.includes(date.getUTCDay())) {
                dates.push(cloneDate(date));
                if (dates.length > 1) {
                    let key = date.getTime();
                    if (longChunks[key]) {
                        longChunks[key].push(chunk);
                    } else {
                        longChunks[key] = [chunk];
                    }
                }
            }
            addDay(date);
        }
        if (dates.length) {
            chunk.date = dates[0];
            chunk.days = dates.length;
            chunk.dates = dates;
            if (chunk.start < dates[0]) {
                chunk.start = dates[0];
            }
            if (setMidnight(cloneDate(chunk.end)) > dates[dates.length - 1]) {
                chunk.end = dates[dates.length - 1];
            }
        } else {
            chunk.date = setMidnight(cloneDate(chunk.start));
            chunk.days = 1;
            chunk.dates = [chunk.date];
        }

        if (prevChunk && datesEqual(prevChunk.date, chunk.date)) {
            chunk.prev = prevChunk;
        }
        prevChunk = chunk;
    }

    return longChunks;
}

/* packages/day-grid/src/Event.svelte generated by Svelte v3.47.0 */

function create_fragment$4(ctx) {
	let div1;
	let div0;
	let div0_class_value;
	let setContent_action;
	let t;
	let switch_instance;
	let current;
	let mounted;
	let dispose;
	var switch_value = /*$_interaction*/ ctx[7].resizer;

	function switch_props(ctx) {
		return { props: { event: /*event*/ ctx[0] } };
	}

	if (switch_value) {
		switch_instance = new switch_value(switch_props(ctx));
		switch_instance.$on("pointerdown", /*createDragHandler*/ ctx[30](true));
	}

	return {
		c() {
			div1 = element("div");
			div0 = element("div");
			t = space();
			if (switch_instance) create_component(switch_instance.$$.fragment);
			attr(div0, "class", div0_class_value = /*$theme*/ ctx[1].eventBody);
			attr(div1, "class", /*classes*/ ctx[3]);
			attr(div1, "style", /*style*/ ctx[4]);
		},
		m(target, anchor) {
			insert(target, div1, anchor);
			append(div1, div0);
			append(div1, t);

			if (switch_instance) {
				mount_component(switch_instance, div1, null);
			}

			/*div1_binding*/ ctx[45](div1);
			current = true;

			if (!mounted) {
				dispose = [
					listen(window, "resize", /*reposition*/ ctx[31]),
					action_destroyer(setContent_action = setContent.call(null, div0, /*content*/ ctx[5])),
					listen(div1, "click", function () {
						if (is_function(/*createClickHandler*/ ctx[29](/*$eventClick*/ ctx[8], /*display*/ ctx[6]))) /*createClickHandler*/ ctx[29](/*$eventClick*/ ctx[8], /*display*/ ctx[6]).apply(this, arguments);
					}),
					listen(div1, "mouseenter", function () {
						if (is_function(/*createHandler*/ ctx[28](/*$eventMouseEnter*/ ctx[9], /*display*/ ctx[6]))) /*createHandler*/ ctx[28](/*$eventMouseEnter*/ ctx[9], /*display*/ ctx[6]).apply(this, arguments);
					}),
					listen(div1, "mouseleave", function () {
						if (is_function(/*createHandler*/ ctx[28](/*$eventMouseLeave*/ ctx[10], /*display*/ ctx[6]))) /*createHandler*/ ctx[28](/*$eventMouseLeave*/ ctx[10], /*display*/ ctx[6]).apply(this, arguments);
					}),
					listen(div1, "pointerdown", function () {
						if (is_function(/*display*/ ctx[6] === 'auto' && /*$_draggable*/ ctx[11](/*event*/ ctx[0])
						? /*createDragHandler*/ ctx[30]()
						: undefined)) (/*display*/ ctx[6] === 'auto' && /*$_draggable*/ ctx[11](/*event*/ ctx[0])
						? /*createDragHandler*/ ctx[30]()
						: undefined).apply(this, arguments);
					})
				];

				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;

			if (!current || dirty[0] & /*$theme*/ 2 && div0_class_value !== (div0_class_value = /*$theme*/ ctx[1].eventBody)) {
				attr(div0, "class", div0_class_value);
			}

			if (setContent_action && is_function(setContent_action.update) && dirty[0] & /*content*/ 32) setContent_action.update.call(null, /*content*/ ctx[5]);
			const switch_instance_changes = {};
			if (dirty[0] & /*event*/ 1) switch_instance_changes.event = /*event*/ ctx[0];

			if (switch_value !== (switch_value = /*$_interaction*/ ctx[7].resizer)) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props(ctx));
					switch_instance.$on("pointerdown", /*createDragHandler*/ ctx[30](true));
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, div1, null);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}

			if (!current || dirty[0] & /*classes*/ 8) {
				attr(div1, "class", /*classes*/ ctx[3]);
			}

			if (!current || dirty[0] & /*style*/ 16) {
				attr(div1, "style", /*style*/ ctx[4]);
			}
		},
		i(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div1);
			if (switch_instance) destroy_component(switch_instance);
			/*div1_binding*/ ctx[45](null);
			mounted = false;
			run_all(dispose);
		}
	};
}

function instance$4($$self, $$props, $$invalidate) {
	let $_hiddenEvents;
	let $dayMaxEvents;
	let $_interaction;
	let $_view;
	let $eventDidMount;
	let $_intlEventTime;
	let $theme;
	let $eventContent;
	let $displayEventEnd;
	let $_classes;
	let $eventColor;
	let $eventBackgroundColor;
	let $eventClick;
	let $eventMouseEnter;
	let $eventMouseLeave;
	let $_draggable;
	let { chunk } = $$props;
	let { longChunks = {} } = $$props;
	let { inPopup = false } = $$props;
	let { dayMaxEvents, displayEventEnd, eventBackgroundColor, eventClick, eventColor, eventContent, eventDidMount, eventMouseEnter, eventMouseLeave, theme, _view, _intlEventTime, _interaction, _classes, _draggable } = getContext('state');
	component_subscribe($$self, dayMaxEvents, value => $$invalidate(47, $dayMaxEvents = value));
	component_subscribe($$self, displayEventEnd, value => $$invalidate(41, $displayEventEnd = value));
	component_subscribe($$self, eventBackgroundColor, value => $$invalidate(44, $eventBackgroundColor = value));
	component_subscribe($$self, eventClick, value => $$invalidate(8, $eventClick = value));
	component_subscribe($$self, eventColor, value => $$invalidate(43, $eventColor = value));
	component_subscribe($$self, eventContent, value => $$invalidate(40, $eventContent = value));
	component_subscribe($$self, eventDidMount, value => $$invalidate(48, $eventDidMount = value));
	component_subscribe($$self, eventMouseEnter, value => $$invalidate(9, $eventMouseEnter = value));
	component_subscribe($$self, eventMouseLeave, value => $$invalidate(10, $eventMouseLeave = value));
	component_subscribe($$self, theme, value => $$invalidate(1, $theme = value));
	component_subscribe($$self, _view, value => $$invalidate(38, $_view = value));
	component_subscribe($$self, _intlEventTime, value => $$invalidate(39, $_intlEventTime = value));
	component_subscribe($$self, _interaction, value => $$invalidate(7, $_interaction = value));
	component_subscribe($$self, _classes, value => $$invalidate(42, $_classes = value));
	component_subscribe($$self, _draggable, value => $$invalidate(11, $_draggable = value));
	let { _hiddenEvents } = getContext('view-state');
	component_subscribe($$self, _hiddenEvents, value => $$invalidate(37, $_hiddenEvents = value));
	createEventDispatcher();
	let el;
	let event;
	let classes;
	let style;
	let content;
	let timeText;
	let margin = 1;
	let hidden = false;
	let display;

	onMount(() => {
		if (is_function($eventDidMount)) {
			$eventDidMount({
				event: toEventWithLocalDates(event),
				timeText,
				el,
				view: toViewWithLocalDates($_view)
			});
		}
	});

	afterUpdate(reposition);

	function createHandler(fn, display) {
		return display !== 'preview' && is_function(fn)
		? jsEvent => fn({
				event: toEventWithLocalDates(event),
				el,
				jsEvent,
				view: toViewWithLocalDates($_view)
			})
		: undefined;
	}

	function createClickHandler(fn, display) {
		let handler = createHandler(fn, display);

		return handler
		? jsEvent => !jsEvent.ecClosingPopup && handler(jsEvent)
		: handler;
	}

	function createDragHandler(resize) {
		return jsEvent => $_interaction.drag.startDayGrid(event, el, jsEvent, inPopup, resize);
	}

	function reposition() {
		if (!el || display === 'preview' || inPopup) {
			return;
		}

		$$invalidate(32, chunk.top = 0, chunk);

		if (chunk.prev) {
			if (chunk.prev.bottom === undefined) {
				// 'prev' is not ready yet, try again later
				tick().then(reposition);

				return;
			}

			$$invalidate(32, chunk.top = chunk.prev.bottom + 1, chunk);
		}

		$$invalidate(32, chunk.bottom = chunk.top + height(el), chunk);
		let m = 1;
		let key = chunk.date.getTime();

		if (longChunks[key]) {
			for (let longChunk of longChunks[key]) {
				if (longChunk.bottom === undefined) {
					// 'longChunk' is not ready yet, try again later
					tick().then(reposition);

					return;
				}

				if (chunk.top < longChunk.bottom && chunk.bottom > longChunk.top) {
					let offset = longChunk.bottom - chunk.top + 1;
					m += offset;
					$$invalidate(32, chunk.top += offset, chunk);
					$$invalidate(32, chunk.bottom += offset, chunk);
				}
			}
		}

		$$invalidate(35, margin = m);

		if ($dayMaxEvents === true) {
			hide();
		} else {
			$$invalidate(36, hidden = false);
		}
	}

	function hide() {
		if (!el) {
			return;
		}

		let dayEl = ancestor(el, 2);
		let h = height(dayEl) - height(dayEl.firstElementChild) - footHeight(dayEl);
		$$invalidate(36, hidden = chunk.bottom > h);
		cloneDate(chunk.date);
		let update = false;

		// Hide or show the event throughout all days
		for (let date of chunk.dates) {
			let hiddenEvents = $_hiddenEvents[date.getTime()];

			if (hiddenEvents) {
				let size = hiddenEvents.size;

				if (hidden) {
					hiddenEvents.add(chunk.event);
				} else {
					hiddenEvents.delete(chunk.event);
				}

				if (size !== hiddenEvents.size) {
					update = true;
				}
			}
		}

		if (update) {
			_hiddenEvents.set($_hiddenEvents);
		}
	}

	function footHeight(dayEl) {
		let h = 0;

		for (let i = 0; i < chunk.days; ++i) {
			h = Math.max(h, height(dayEl.lastElementChild));
			dayEl = dayEl.nextElementSibling;

			if (!dayEl) {
				break;
			}
		}

		return h;
	}

	function div1_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			el = $$value;
			$$invalidate(2, el);
		});
	}

	$$self.$$set = $$props => {
		if ('chunk' in $$props) $$invalidate(32, chunk = $$props.chunk);
		if ('longChunks' in $$props) $$invalidate(33, longChunks = $$props.longChunks);
		if ('inPopup' in $$props) $$invalidate(34, inPopup = $$props.inPopup);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty[1] & /*chunk*/ 2) {
			$$invalidate(0, event = chunk.event);
		}

		if ($$self.$$.dirty[0] & /*event, style, $theme*/ 19 | $$self.$$.dirty[1] & /*$eventBackgroundColor, $eventColor, chunk, margin, hidden, $_classes*/ 14386) {
			{
				$$invalidate(6, display = event.display);

				// Class & Style
				let bgColor = event.backgroundColor || $eventBackgroundColor || $eventColor;

				$$invalidate(4, style = `width:calc(${chunk.days * 100}% + ${(chunk.days - 1) * 7}px);` + `margin-top:${margin}px;`);

				if (bgColor) {
					$$invalidate(4, style += `background-color:${bgColor};`);
				}

				if (hidden) {
					$$invalidate(4, style += 'visibility:hidden;');
				}

				$$invalidate(3, classes = $_classes($theme.event, event));
			}
		}

		if ($$self.$$.dirty[0] & /*$theme*/ 2 | $$self.$$.dirty[1] & /*chunk, $displayEventEnd, $eventContent, $_intlEventTime, $_view*/ 1922) {
			// Content
			$$invalidate(5, [timeText, content] = createEventContent(chunk, $displayEventEnd, $eventContent, $theme, $_intlEventTime, $_view), content);
		}

		if ($$self.$$.dirty[1] & /*$_hiddenEvents*/ 64) {
			if ($_hiddenEvents) {
				tick().then(reposition);
			}
		}
	};

	return [
		event,
		$theme,
		el,
		classes,
		style,
		content,
		display,
		$_interaction,
		$eventClick,
		$eventMouseEnter,
		$eventMouseLeave,
		$_draggable,
		dayMaxEvents,
		displayEventEnd,
		eventBackgroundColor,
		eventClick,
		eventColor,
		eventContent,
		eventDidMount,
		eventMouseEnter,
		eventMouseLeave,
		theme,
		_view,
		_intlEventTime,
		_interaction,
		_classes,
		_draggable,
		_hiddenEvents,
		createHandler,
		createClickHandler,
		createDragHandler,
		reposition,
		chunk,
		longChunks,
		inPopup,
		margin,
		hidden,
		$_hiddenEvents,
		$_view,
		$_intlEventTime,
		$eventContent,
		$displayEventEnd,
		$_classes,
		$eventColor,
		$eventBackgroundColor,
		div1_binding
	];
}

class Event extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$4, create_fragment$4, safe_not_equal, { chunk: 32, longChunks: 33, inPopup: 34 }, null, [-1, -1]);
	}
}

/** Dispatch event on click outside of node */
function clickOutside(node) {

    const handleClick = clickEvent => {
        if (node && !node.contains(clickEvent.target)) {
            node.dispatchEvent(
                new CustomEvent('clickoutside', {detail: {clickEvent}})
            );
        }
    };

    document.addEventListener('click', handleClick, true);

    return {
        destroy() {
            document.removeEventListener('click', handleClick, true);
        }
    };
}

/* packages/day-grid/src/Popup.svelte generated by Svelte v3.47.0 */

function get_each_context$3(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[12] = list[i];
	return child_ctx;
}

// (50:8) {#each $_popup.chunks as chunk}
function create_each_block$3(ctx) {
	let event;
	let current;

	event = new Event({
			props: { chunk: /*chunk*/ ctx[12], inPopup: true }
		});

	return {
		c() {
			create_component(event.$$.fragment);
		},
		m(target, anchor) {
			mount_component(event, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const event_changes = {};
			if (dirty & /*$_popup*/ 4) event_changes.chunk = /*chunk*/ ctx[12];
			event.$set(event_changes);
		},
		i(local) {
			if (current) return;
			transition_in(event.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(event.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(event, detaching);
		}
	};
}

function create_fragment$3(ctx) {
	let div2;
	let div0;
	let t0_value = /*$_intlDayPopover*/ ctx[4].format(/*$_popup*/ ctx[2].date) + "";
	let t0;
	let t1;
	let a;
	let div0_class_value;
	let t3;
	let div1;
	let div1_class_value;
	let div2_class_value;
	let current;
	let mounted;
	let dispose;
	let each_value = /*$_popup*/ ctx[2].chunks;
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	return {
		c() {
			div2 = element("div");
			div0 = element("div");
			t0 = text(t0_value);
			t1 = space();
			a = element("a");
			a.textContent = "×";
			t3 = space();
			div1 = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr(div0, "class", div0_class_value = /*$theme*/ ctx[3].dayHead);
			attr(div1, "class", div1_class_value = /*$theme*/ ctx[3].events);
			attr(div2, "class", div2_class_value = /*$theme*/ ctx[3].popup);
			attr(div2, "style", /*style*/ ctx[1]);
		},
		m(target, anchor) {
			insert(target, div2, anchor);
			append(div2, div0);
			append(div0, t0);
			append(div0, t1);
			append(div0, a);
			append(div2, t3);
			append(div2, div1);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div1, null);
			}

			/*div2_binding*/ ctx[11](div2);
			current = true;

			if (!mounted) {
				dispose = [
					listen(a, "click", stop_propagation(/*close*/ ctx[8])),
					listen(div2, "click", stop_propagation(/*click_handler*/ ctx[10])),
					action_destroyer(clickOutside.call(null, div2)),
					listen(div2, "clickoutside", /*handleClickOutside*/ ctx[9])
				];

				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if ((!current || dirty & /*$_intlDayPopover, $_popup*/ 20) && t0_value !== (t0_value = /*$_intlDayPopover*/ ctx[4].format(/*$_popup*/ ctx[2].date) + "")) set_data(t0, t0_value);

			if (!current || dirty & /*$theme*/ 8 && div0_class_value !== (div0_class_value = /*$theme*/ ctx[3].dayHead)) {
				attr(div0, "class", div0_class_value);
			}

			if (dirty & /*$_popup*/ 4) {
				each_value = /*$_popup*/ ctx[2].chunks;
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$3(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block$3(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(div1, null);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}

			if (!current || dirty & /*$theme*/ 8 && div1_class_value !== (div1_class_value = /*$theme*/ ctx[3].events)) {
				attr(div1, "class", div1_class_value);
			}

			if (!current || dirty & /*$theme*/ 8 && div2_class_value !== (div2_class_value = /*$theme*/ ctx[3].popup)) {
				attr(div2, "class", div2_class_value);
			}

			if (!current || dirty & /*style*/ 2) {
				attr(div2, "style", /*style*/ ctx[1]);
			}
		},
		i(local) {
			if (current) return;

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d(detaching) {
			if (detaching) detach(div2);
			destroy_each(each_blocks, detaching);
			/*div2_binding*/ ctx[11](null);
			mounted = false;
			run_all(dispose);
		}
	};
}

function instance$3($$self, $$props, $$invalidate) {
	let $_popup;
	let $theme;
	let $_intlDayPopover;
	let { theme, _intlDayPopover } = getContext('state');
	component_subscribe($$self, theme, value => $$invalidate(3, $theme = value));
	component_subscribe($$self, _intlDayPopover, value => $$invalidate(4, $_intlDayPopover = value));
	let { _popup } = getContext('view-state');
	component_subscribe($$self, _popup, value => $$invalidate(2, $_popup = value));
	let el;
	let style = '';

	onMount(() => {
		let dayEl = ancestor(el, 1);
		let bodyEl = ancestor(dayEl, 3);
		let popupRect = rect(el);
		let bodyRect = rect(bodyEl);

		if (!dayEl.previousElementSibling) {
			$$invalidate(1, style = 'left:0;');
		} else if (!dayEl.nextElementSibling) {
			$$invalidate(1, style = 'right:0;');
		} else {
			let left = (dayEl.offsetWidth - popupRect.width) / 2;
			$$invalidate(1, style = `left:${left}px;`);
		}

		let top = (dayEl.offsetHeight - popupRect.height) / 2;

		if (popupRect.top + top < bodyRect.top) {
			top = bodyRect.top - popupRect.top;
		} else if (popupRect.bottom + top > bodyRect.bottom) {
			top = bodyRect.bottom - popupRect.bottom;
		}

		$$invalidate(1, style += `top:${top}px;`);
	});

	function close(e) {
		set_store_value(_popup, $_popup.date = null, $_popup);
	}

	function handleClickOutside(e) {
		close();
		e.detail.clickEvent.ecClosingPopup = true;
	}

	function click_handler(event) {
		bubble.call(this, $$self, event);
	}

	function div2_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			el = $$value;
			$$invalidate(0, el);
		});
	}

	return [
		el,
		style,
		$_popup,
		$theme,
		$_intlDayPopover,
		theme,
		_intlDayPopover,
		_popup,
		close,
		handleClickOutside,
		click_handler,
		div2_binding
	];
}

class Popup extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});
	}
}

/* packages/day-grid/src/Day.svelte generated by Svelte v3.47.0 */

function get_each_context$2(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[36] = list[i];
	return child_ctx;
}

// (111:1) {#if iChunks[1] && datesEqual(iChunks[1].date, date)}
function create_if_block_3(ctx) {
	let div;
	let event;
	let div_class_value;
	let current;
	event = new Event({ props: { chunk: /*iChunks*/ ctx[2][1] } });

	return {
		c() {
			div = element("div");
			create_component(event.$$.fragment);
			attr(div, "class", div_class_value = /*$theme*/ ctx[11].events);
		},
		m(target, anchor) {
			insert(target, div, anchor);
			mount_component(event, div, null);
			current = true;
		},
		p(ctx, dirty) {
			const event_changes = {};
			if (dirty[0] & /*iChunks*/ 4) event_changes.chunk = /*iChunks*/ ctx[2][1];
			event.$set(event_changes);

			if (!current || dirty[0] & /*$theme*/ 2048 && div_class_value !== (div_class_value = /*$theme*/ ctx[11].events)) {
				attr(div, "class", div_class_value);
			}
		},
		i(local) {
			if (current) return;
			transition_in(event.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(event.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_component(event);
		}
	};
}

// (117:1) {#if iChunks[0] && datesEqual(iChunks[0].date, date)}
function create_if_block_2(ctx) {
	let div;
	let event;
	let div_class_value;
	let current;
	event = new Event({ props: { chunk: /*iChunks*/ ctx[2][0] } });

	return {
		c() {
			div = element("div");
			create_component(event.$$.fragment);
			attr(div, "class", div_class_value = "" + (/*$theme*/ ctx[11].events + " " + /*$theme*/ ctx[11].preview));
		},
		m(target, anchor) {
			insert(target, div, anchor);
			mount_component(event, div, null);
			current = true;
		},
		p(ctx, dirty) {
			const event_changes = {};
			if (dirty[0] & /*iChunks*/ 4) event_changes.chunk = /*iChunks*/ ctx[2][0];
			event.$set(event_changes);

			if (!current || dirty[0] & /*$theme*/ 2048 && div_class_value !== (div_class_value = "" + (/*$theme*/ ctx[11].events + " " + /*$theme*/ ctx[11].preview))) {
				attr(div, "class", div_class_value);
			}
		},
		i(local) {
			if (current) return;
			transition_in(event.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(event.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_component(event);
		}
	};
}

// (123:2) {#each dayChunks as chunk}
function create_each_block$2(ctx) {
	let event;
	let current;

	event = new Event({
			props: {
				chunk: /*chunk*/ ctx[36],
				longChunks: /*longChunks*/ ctx[1]
			}
		});

	return {
		c() {
			create_component(event.$$.fragment);
		},
		m(target, anchor) {
			mount_component(event, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const event_changes = {};
			if (dirty[0] & /*dayChunks*/ 8) event_changes.chunk = /*chunk*/ ctx[36];
			if (dirty[0] & /*longChunks*/ 2) event_changes.longChunks = /*longChunks*/ ctx[1];
			event.$set(event_changes);
		},
		i(local) {
			if (current) return;
			transition_in(event.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(event.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(event, detaching);
		}
	};
}

// (127:1) {#if $_popup.date && datesEqual(date, $_popup.date)}
function create_if_block_1(ctx) {
	let popup;
	let current;
	popup = new Popup({});

	return {
		c() {
			create_component(popup.$$.fragment);
		},
		m(target, anchor) {
			mount_component(popup, target, anchor);
			current = true;
		},
		i(local) {
			if (current) return;
			transition_in(popup.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(popup.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(popup, detaching);
		}
	};
}

// (131:2) {#if hiddenEvents.size}
function create_if_block(ctx) {
	let a;
	let setContent_action;
	let mounted;
	let dispose;

	return {
		c() {
			a = element("a");
		},
		m(target, anchor) {
			insert(target, a, anchor);

			if (!mounted) {
				dispose = [
					listen(a, "click", stop_propagation(/*showMore*/ ctx[25])),
					action_destroyer(setContent_action = setContent.call(null, a, /*moreLink*/ ctx[5]))
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (setContent_action && is_function(setContent_action.update) && dirty[0] & /*moreLink*/ 32) setContent_action.update.call(null, /*moreLink*/ ctx[5]);
		},
		d(detaching) {
			if (detaching) detach(a);
			mounted = false;
			run_all(dispose);
		}
	};
}

function create_fragment$2(ctx) {
	let div3;
	let div0;
	let t0_value = /*date*/ ctx[0].getUTCDate() + "";
	let t0;
	let div0_class_value;
	let t1;
	let show_if_2 = /*iChunks*/ ctx[2][1] && datesEqual(/*iChunks*/ ctx[2][1].date, /*date*/ ctx[0]);
	let t2;
	let show_if_1 = /*iChunks*/ ctx[2][0] && datesEqual(/*iChunks*/ ctx[2][0].date, /*date*/ ctx[0]);
	let t3;
	let div1;
	let div1_class_value;
	let t4;
	let show_if = /*$_popup*/ ctx[6].date && datesEqual(/*date*/ ctx[0], /*$_popup*/ ctx[6].date);
	let t5;
	let div2;
	let div2_class_value;
	let div3_class_value;
	let current;
	let mounted;
	let dispose;
	let if_block0 = show_if_2 && create_if_block_3(ctx);
	let if_block1 = show_if_1 && create_if_block_2(ctx);
	let each_value = /*dayChunks*/ ctx[3];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	let if_block2 = show_if && create_if_block_1();
	let if_block3 = /*hiddenEvents*/ ctx[4].size && create_if_block(ctx);

	return {
		c() {
			div3 = element("div");
			div0 = element("div");
			t0 = text(t0_value);
			t1 = space();
			if (if_block0) if_block0.c();
			t2 = space();
			if (if_block1) if_block1.c();
			t3 = space();
			div1 = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t4 = space();
			if (if_block2) if_block2.c();
			t5 = space();
			div2 = element("div");
			if (if_block3) if_block3.c();
			attr(div0, "class", div0_class_value = /*$theme*/ ctx[11].dayHead);
			attr(div1, "class", div1_class_value = /*$theme*/ ctx[11].events);
			attr(div2, "class", div2_class_value = /*$theme*/ ctx[11].dayFoot);

			attr(div3, "class", div3_class_value = "" + (/*$theme*/ ctx[11].day + (/*isToday*/ ctx[8] ? ' ' + /*$theme*/ ctx[11].today : '') + (/*otherMonth*/ ctx[9]
			? ' ' + /*$theme*/ ctx[11].otherMonth
			: '') + (/*highlight*/ ctx[10]
			? ' ' + /*$theme*/ ctx[11].highlight
			: '')));
		},
		m(target, anchor) {
			insert(target, div3, anchor);
			append(div3, div0);
			append(div0, t0);
			append(div3, t1);
			if (if_block0) if_block0.m(div3, null);
			append(div3, t2);
			if (if_block1) if_block1.m(div3, null);
			append(div3, t3);
			append(div3, div1);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div1, null);
			}

			append(div3, t4);
			if (if_block2) if_block2.m(div3, null);
			append(div3, t5);
			append(div3, div2);
			if (if_block3) if_block3.m(div2, null);
			/*div3_binding*/ ctx[31](div3);
			current = true;

			if (!mounted) {
				dispose = [
					listen(div3, "click", function () {
						if (is_function(/*createClickHandler*/ ctx[23](/*$dateClick*/ ctx[12]))) /*createClickHandler*/ ctx[23](/*$dateClick*/ ctx[12]).apply(this, arguments);
					}),
					listen(div3, "pointerenter", function () {
						if (is_function(/*createPointerEnterHandler*/ ctx[24](/*$_interaction*/ ctx[13]))) /*createPointerEnterHandler*/ ctx[24](/*$_interaction*/ ctx[13]).apply(this, arguments);
					}),
					listen(div3, "pointerleave", function () {
						if (is_function(createPointerLeaveHandler(/*$_interaction*/ ctx[13]))) createPointerLeaveHandler(/*$_interaction*/ ctx[13]).apply(this, arguments);
					})
				];

				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			if ((!current || dirty[0] & /*date*/ 1) && t0_value !== (t0_value = /*date*/ ctx[0].getUTCDate() + "")) set_data(t0, t0_value);

			if (!current || dirty[0] & /*$theme*/ 2048 && div0_class_value !== (div0_class_value = /*$theme*/ ctx[11].dayHead)) {
				attr(div0, "class", div0_class_value);
			}

			if (dirty[0] & /*iChunks, date*/ 5) show_if_2 = /*iChunks*/ ctx[2][1] && datesEqual(/*iChunks*/ ctx[2][1].date, /*date*/ ctx[0]);

			if (show_if_2) {
				if (if_block0) {
					if_block0.p(ctx, dirty);

					if (dirty[0] & /*iChunks, date*/ 5) {
						transition_in(if_block0, 1);
					}
				} else {
					if_block0 = create_if_block_3(ctx);
					if_block0.c();
					transition_in(if_block0, 1);
					if_block0.m(div3, t2);
				}
			} else if (if_block0) {
				group_outros();

				transition_out(if_block0, 1, 1, () => {
					if_block0 = null;
				});

				check_outros();
			}

			if (dirty[0] & /*iChunks, date*/ 5) show_if_1 = /*iChunks*/ ctx[2][0] && datesEqual(/*iChunks*/ ctx[2][0].date, /*date*/ ctx[0]);

			if (show_if_1) {
				if (if_block1) {
					if_block1.p(ctx, dirty);

					if (dirty[0] & /*iChunks, date*/ 5) {
						transition_in(if_block1, 1);
					}
				} else {
					if_block1 = create_if_block_2(ctx);
					if_block1.c();
					transition_in(if_block1, 1);
					if_block1.m(div3, t3);
				}
			} else if (if_block1) {
				group_outros();

				transition_out(if_block1, 1, 1, () => {
					if_block1 = null;
				});

				check_outros();
			}

			if (dirty[0] & /*dayChunks, longChunks*/ 10) {
				each_value = /*dayChunks*/ ctx[3];
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$2(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block$2(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(div1, null);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}

			if (!current || dirty[0] & /*$theme*/ 2048 && div1_class_value !== (div1_class_value = /*$theme*/ ctx[11].events)) {
				attr(div1, "class", div1_class_value);
			}

			if (dirty[0] & /*$_popup, date*/ 65) show_if = /*$_popup*/ ctx[6].date && datesEqual(/*date*/ ctx[0], /*$_popup*/ ctx[6].date);

			if (show_if) {
				if (if_block2) {
					if (dirty[0] & /*$_popup, date*/ 65) {
						transition_in(if_block2, 1);
					}
				} else {
					if_block2 = create_if_block_1();
					if_block2.c();
					transition_in(if_block2, 1);
					if_block2.m(div3, t5);
				}
			} else if (if_block2) {
				group_outros();

				transition_out(if_block2, 1, 1, () => {
					if_block2 = null;
				});

				check_outros();
			}

			if (/*hiddenEvents*/ ctx[4].size) {
				if (if_block3) {
					if_block3.p(ctx, dirty);
				} else {
					if_block3 = create_if_block(ctx);
					if_block3.c();
					if_block3.m(div2, null);
				}
			} else if (if_block3) {
				if_block3.d(1);
				if_block3 = null;
			}

			if (!current || dirty[0] & /*$theme*/ 2048 && div2_class_value !== (div2_class_value = /*$theme*/ ctx[11].dayFoot)) {
				attr(div2, "class", div2_class_value);
			}

			if (!current || dirty[0] & /*$theme, isToday, otherMonth, highlight*/ 3840 && div3_class_value !== (div3_class_value = "" + (/*$theme*/ ctx[11].day + (/*isToday*/ ctx[8] ? ' ' + /*$theme*/ ctx[11].today : '') + (/*otherMonth*/ ctx[9]
			? ' ' + /*$theme*/ ctx[11].otherMonth
			: '') + (/*highlight*/ ctx[10]
			? ' ' + /*$theme*/ ctx[11].highlight
			: '')))) {
				attr(div3, "class", div3_class_value);
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block0);
			transition_in(if_block1);

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			transition_in(if_block2);
			current = true;
		},
		o(local) {
			transition_out(if_block0);
			transition_out(if_block1);
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			transition_out(if_block2);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div3);
			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d();
			destroy_each(each_blocks, detaching);
			if (if_block2) if_block2.d();
			if (if_block3) if_block3.d();
			/*div3_binding*/ ctx[31](null);
			mounted = false;
			run_all(dispose);
		}
	};
}

function createPointerLeaveHandler(interaction) {
	return interaction.pointer
	? interaction.pointer.leave
	: undefined;
}

function instance$2($$self, $$props, $$invalidate) {
	let $_popup;
	let $_view;
	let $moreLinkContent;
	let $_hiddenEvents;
	let $highlightedDates;
	let $currentDate;
	let $theme;
	let $dateClick;
	let $_interaction;
	let { date } = $$props;
	let { chunks } = $$props;
	let { longChunks } = $$props;
	let { iChunks = [] } = $$props;
	let { date: currentDate, dateClick, dayMaxEvents, highlightedDates, moreLinkContent, theme, _view, _interaction } = getContext('state');
	component_subscribe($$self, currentDate, value => $$invalidate(30, $currentDate = value));
	component_subscribe($$self, dateClick, value => $$invalidate(12, $dateClick = value));
	component_subscribe($$self, highlightedDates, value => $$invalidate(29, $highlightedDates = value));
	component_subscribe($$self, moreLinkContent, value => $$invalidate(27, $moreLinkContent = value));
	component_subscribe($$self, theme, value => $$invalidate(11, $theme = value));
	component_subscribe($$self, _view, value => $$invalidate(32, $_view = value));
	component_subscribe($$self, _interaction, value => $$invalidate(13, $_interaction = value));
	let { _hiddenEvents, _popup } = getContext('view-state');
	component_subscribe($$self, _hiddenEvents, value => $$invalidate(28, $_hiddenEvents = value));
	component_subscribe($$self, _popup, value => $$invalidate(6, $_popup = value));
	let el;
	let dayChunks;
	let today = setMidnight(createDate());
	let isToday;
	let otherMonth;
	let highlight;
	let hiddenEvents = new Set(); // hidden events of this day
	let moreLink = '';

	function createClickHandler(fn) {
		return is_function(fn)
		? jsEvent => {
				!jsEvent.ecClosingPopup && fn({
					date: toLocalDate(date),
					dateStr: toISOString(date),
					dayEl: el,
					jsEvent,
					view: toViewWithLocalDates($_view)
				});
			}
		: undefined;
	}

	function createPointerEnterHandler(interaction) {
		return interaction.pointer
		? jsEvent => interaction.pointer.enterDayGrid(date, jsEvent)
		: undefined;
	}

	function showMore() {
		setPopupChunks();
		set_store_value(_popup, $_popup.date = date, $_popup);
	}

	function setPopupChunks() {
		let nextDay = addDay(cloneDate(date));
		set_store_value(_popup, $_popup.chunks = dayChunks.concat(longChunks[date.getTime()] || []).map(c => assign({}, c, createEventChunk(c.event, date, nextDay), { days: 1, dates: [date] })).sort((a, b) => a.top - b.top), $_popup);
	}

	function div3_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			el = $$value;
			$$invalidate(7, el);
		});
	}

	$$self.$$set = $$props => {
		if ('date' in $$props) $$invalidate(0, date = $$props.date);
		if ('chunks' in $$props) $$invalidate(26, chunks = $$props.chunks);
		if ('longChunks' in $$props) $$invalidate(1, longChunks = $$props.longChunks);
		if ('iChunks' in $$props) $$invalidate(2, iChunks = $$props.iChunks);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty[0] & /*hiddenEvents, chunks, date, dayChunks*/ 67108889) {
			{
				$$invalidate(3, dayChunks = []);
				hiddenEvents.clear();
				((($$invalidate(4, hiddenEvents), $$invalidate(26, chunks)), $$invalidate(0, date)), $$invalidate(3, dayChunks));

				for (let chunk of chunks) {
					if (datesEqual(chunk.date, date)) {
						dayChunks.push(chunk);
					} // if ($dayMaxEvents !== false && dayChunks.length > $dayMaxEvents) {
					// 	chunk.hidden = true;
				} // }
			}
		}

		if ($$self.$$.dirty[0] & /*date, hiddenEvents*/ 17) {
			set_store_value(_hiddenEvents, $_hiddenEvents[date.getTime()] = hiddenEvents, $_hiddenEvents);
		}

		if ($$self.$$.dirty[0] & /*date, $currentDate, $highlightedDates*/ 1610612737) {
			{
				$$invalidate(8, isToday = datesEqual(date, today));
				$$invalidate(9, otherMonth = date.getUTCMonth() !== $currentDate.getUTCMonth());
				$$invalidate(10, highlight = $highlightedDates.some(d => datesEqual(d, date)));
			}
		}

		if ($$self.$$.dirty[0] & /*$_hiddenEvents, hiddenEvents, $moreLinkContent, moreLink*/ 402653232) {
			if ($_hiddenEvents && hiddenEvents.size) {
				// make Svelte update this block on $_hiddenEvents update
				let text = '+' + hiddenEvents.size + ' more';

				if ($moreLinkContent) {
					$$invalidate(5, moreLink = is_function($moreLinkContent)
					? $moreLinkContent({ num: hiddenEvents.size, text })
					: $moreLinkContent);

					if (typeof moreLink === 'string') {
						$$invalidate(5, moreLink = { html: moreLink });
					}
				} else {
					$$invalidate(5, moreLink = { html: text });
				}
			}
		}

		if ($$self.$$.dirty[0] & /*$_popup, date, longChunks, dayChunks*/ 75) {
			if ($_popup.date && datesEqual(date, $_popup.date) && longChunks && dayChunks) {
				setPopupChunks();
			}
		}
	};

	return [
		date,
		longChunks,
		iChunks,
		dayChunks,
		hiddenEvents,
		moreLink,
		$_popup,
		el,
		isToday,
		otherMonth,
		highlight,
		$theme,
		$dateClick,
		$_interaction,
		currentDate,
		dateClick,
		highlightedDates,
		moreLinkContent,
		theme,
		_view,
		_interaction,
		_hiddenEvents,
		_popup,
		createClickHandler,
		createPointerEnterHandler,
		showMore,
		chunks,
		$moreLinkContent,
		$_hiddenEvents,
		$highlightedDates,
		$currentDate,
		div3_binding
	];
}

class Day extends SvelteComponent {
	constructor(options) {
		super();

		init(
			this,
			options,
			instance$2,
			create_fragment$2,
			safe_not_equal,
			{
				date: 0,
				chunks: 26,
				longChunks: 1,
				iChunks: 2
			},
			null,
			[-1, -1]
		);
	}
}

/* packages/day-grid/src/Week.svelte generated by Svelte v3.47.0 */

function get_each_context$1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[15] = list[i];
	return child_ctx;
}

// (50:1) {#each dates as date}
function create_each_block$1(ctx) {
	let day;
	let current;

	day = new Day({
			props: {
				date: /*date*/ ctx[15],
				chunks: /*chunks*/ ctx[1],
				longChunks: /*longChunks*/ ctx[2],
				iChunks: /*iChunks*/ ctx[3]
			}
		});

	return {
		c() {
			create_component(day.$$.fragment);
		},
		m(target, anchor) {
			mount_component(day, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const day_changes = {};
			if (dirty & /*dates*/ 1) day_changes.date = /*date*/ ctx[15];
			if (dirty & /*chunks*/ 2) day_changes.chunks = /*chunks*/ ctx[1];
			if (dirty & /*longChunks*/ 4) day_changes.longChunks = /*longChunks*/ ctx[2];
			if (dirty & /*iChunks*/ 8) day_changes.iChunks = /*iChunks*/ ctx[3];
			day.$set(day_changes);
		},
		i(local) {
			if (current) return;
			transition_in(day.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(day.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(day, detaching);
		}
	};
}

function create_fragment$1(ctx) {
	let div;
	let div_class_value;
	let current;
	let each_value = /*dates*/ ctx[0];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	return {
		c() {
			div = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr(div, "class", div_class_value = /*$theme*/ ctx[4].days);
		},
		m(target, anchor) {
			insert(target, div, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div, null);
			}

			current = true;
		},
		p(ctx, [dirty]) {
			if (dirty & /*dates, chunks, longChunks, iChunks*/ 15) {
				each_value = /*dates*/ ctx[0];
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$1(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block$1(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(div, null);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}

			if (!current || dirty & /*$theme*/ 16 && div_class_value !== (div_class_value = /*$theme*/ ctx[4].days)) {
				attr(div, "class", div_class_value);
			}
		},
		i(local) {
			if (current) return;

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_each(each_blocks, detaching);
		}
	};
}

function instance$1($$self, $$props, $$invalidate) {
	let $hiddenDays;
	let $_iEvents;
	let $_events;
	let $theme;
	let { dates } = $$props;
	let { _events, _iEvents, hiddenDays, theme } = getContext('state');
	component_subscribe($$self, _events, value => $$invalidate(13, $_events = value));
	component_subscribe($$self, _iEvents, value => $$invalidate(12, $_iEvents = value));
	component_subscribe($$self, hiddenDays, value => $$invalidate(11, $hiddenDays = value));
	component_subscribe($$self, theme, value => $$invalidate(4, $theme = value));
	let chunks, longChunks, iChunks = [];
	let start;
	let end;

	function intersects(event) {
		return event.start < end && event.end > start;
	}

	$$self.$$set = $$props => {
		if ('dates' in $$props) $$invalidate(0, dates = $$props.dates);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*dates*/ 1) {
			{
				$$invalidate(9, start = dates[0]);
				$$invalidate(10, end = addDay(cloneDate(dates[dates.length - 1])));
			}
		}

		if ($$self.$$.dirty & /*$_events, start, end, chunks, $hiddenDays*/ 11778) {
			{
				$$invalidate(1, chunks = []);

				for (let event of $_events) {
					if (event.display !== 'background' && intersects(event)) {
						let chunk = createEventChunk(event, start, end);
						chunks.push(chunk);
					}
				}

				$$invalidate(2, longChunks = prepareEventChunks(chunks, $hiddenDays));
			}
		}

		if ($$self.$$.dirty & /*$_iEvents, start, end, $hiddenDays*/ 7680) {
			$$invalidate(3, iChunks = $_iEvents.map(event => {
				let chunk;

				if (event && intersects(event)) {
					chunk = createEventChunk(event, start, end);
					prepareEventChunks([chunk], $hiddenDays);
				} else {
					chunk = null;
				}

				return chunk;
			}));
		}
	};

	return [
		dates,
		chunks,
		longChunks,
		iChunks,
		$theme,
		_events,
		_iEvents,
		hiddenDays,
		theme,
		start,
		end,
		$hiddenDays,
		$_iEvents,
		$_events
	];
}

class Week extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$1, create_fragment$1, safe_not_equal, { dates: 0 });
	}
}

/* packages/day-grid/src/View.svelte generated by Svelte v3.47.0 */

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[14] = list[i];
	return child_ctx;
}

// (37:1) {#each weeks as dates}
function create_each_block(ctx) {
	let week;
	let current;
	week = new Week({ props: { dates: /*dates*/ ctx[14] } });

	return {
		c() {
			create_component(week.$$.fragment);
		},
		m(target, anchor) {
			mount_component(week, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const week_changes = {};
			if (dirty & /*weeks*/ 1) week_changes.dates = /*dates*/ ctx[14];
			week.$set(week_changes);
		},
		i(local) {
			if (current) return;
			transition_in(week.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(week.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(week, detaching);
		}
	};
}

// (36:0) <Body>
function create_default_slot(ctx) {
	let each_1_anchor;
	let current;
	let each_value = /*weeks*/ ctx[0];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	return {
		c() {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();
		},
		m(target, anchor) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			insert(target, each_1_anchor, anchor);
			current = true;
		},
		p(ctx, dirty) {
			if (dirty & /*weeks*/ 1) {
				each_value = /*weeks*/ ctx[0];
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}
		},
		i(local) {
			if (current) return;

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d(detaching) {
			destroy_each(each_blocks, detaching);
			if (detaching) detach(each_1_anchor);
		}
	};
}

function create_fragment(ctx) {
	let header;
	let t;
	let body;
	let current;
	header = new Header({});

	body = new Body({
			props: {
				$$slots: { default: [create_default_slot] },
				$$scope: { ctx }
			}
		});

	return {
		c() {
			create_component(header.$$.fragment);
			t = space();
			create_component(body.$$.fragment);
		},
		m(target, anchor) {
			mount_component(header, target, anchor);
			insert(target, t, anchor);
			mount_component(body, target, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			const body_changes = {};

			if (dirty & /*$$scope, weeks*/ 131073) {
				body_changes.$$scope = { dirty, ctx };
			}

			body.$set(body_changes);
		},
		i(local) {
			if (current) return;
			transition_in(header.$$.fragment, local);
			transition_in(body.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(header.$$.fragment, local);
			transition_out(body.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(header, detaching);
			if (detaching) detach(t);
			destroy_component(body, detaching);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let $_viewDates;
	let $dayMaxEvents;
	let $_hiddenEvents;
	let $hiddenDays;
	let $_viewClass;
	let { _viewDates, _viewClass, dayMaxEvents, hiddenDays, theme } = getContext('state');
	component_subscribe($$self, _viewDates, value => $$invalidate(7, $_viewDates = value));
	component_subscribe($$self, _viewClass, value => $$invalidate(11, $_viewClass = value));
	component_subscribe($$self, dayMaxEvents, value => $$invalidate(8, $dayMaxEvents = value));
	component_subscribe($$self, hiddenDays, value => $$invalidate(9, $hiddenDays = value));
	let viewState = new State(getContext('state'));
	setContext('view-state', viewState);
	let { _hiddenEvents } = viewState;
	component_subscribe($$self, _hiddenEvents, value => $$invalidate(10, $_hiddenEvents = value));
	set_store_value(_viewClass, $_viewClass = 'month', $_viewClass);
	let weeks;
	let days;

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*$hiddenDays, $dayMaxEvents, $_viewDates, days, weeks*/ 961) {
			{
				$$invalidate(0, weeks = []);
				$$invalidate(6, days = 7 - $hiddenDays.length);
				set_store_value(_hiddenEvents, $_hiddenEvents = {}, $_hiddenEvents);

				for (let i = 0; i < $_viewDates.length / days; ++i) {
					let dates = [];

					for (let j = 0; j < days; ++j) {
						dates.push($_viewDates[i * days + j]);
					}

					weeks.push(dates);
				}
			}
		}
	};

	return [
		weeks,
		_viewDates,
		_viewClass,
		dayMaxEvents,
		hiddenDays,
		_hiddenEvents,
		days,
		$_viewDates,
		$dayMaxEvents,
		$hiddenDays
	];
}

class View extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, {});
	}
}

var index = {
	createOptions(options) {
		options.dayMaxEvents = false;
		options.dayPopoverFormat = {month: 'long', day: 'numeric', year: 'numeric'};
		options.moreLinkContent = undefined;
		// Common options
		options.buttonText.dayGridMonth = 'month';
		options.theme.uniform = 'ec-uniform';
		options.theme.dayFoot = 'ec-day-foot';
		options.theme.month = 'ec-month';
		options.theme.popup = 'ec-popup';
		options.view = 'dayGridMonth';
		options.views.dayGridMonth = {
			component: View,
			dayHeaderFormat: {weekday: 'short'},
			displayEventEnd: false,
			duration: {months: 1},
			monthMode: true,
			titleFormat: {year: 'numeric', month: 'long'}
		};
	},

	createStores(state) {
		state._intlDayPopover = intl(state.locale, state.dayPopoverFormat);
	}
};

var css_248z = css`.ec-flex{display:flex}.ec-month .ec-body,.ec-days,.ec-day,.ec-day-title,.ec-resource{flex:1 1 0%;min-width:0;max-width:100%}.ec{display:flex;flex-direction:column}.ec ::-webkit-scrollbar{background:#fff}.ec ::-webkit-scrollbar-thumb{border:4px solid #fff;box-shadow:none;background:#dadce0;border-radius:8px;min-height:40px}.ec :hover::-webkit-scrollbar-thumb{background:#bdc1c6}.ec-hidden-scroll{display:none;overflow-y:scroll;visibility:hidden;flex-shrink:0}.ec-with-scroll .ec-hidden-scroll{display:block}.ec-toolbar{flex:0 0 auto;display:flex;justify-content:space-between;align-items:center;margin-bottom:1em}.ec-toolbar>*{margin-bottom:-0.5em}.ec-toolbar>*>*{margin-bottom:.5em}.ec-toolbar>*>*:not(:last-child){margin-right:.75em}.ec-title{margin:0}.ec-button{background-color:#fff;border:1px solid #ced4da;padding:.375rem .75rem;font-size:1rem;line-height:1.5;border-radius:.25rem}.ec-button:not(:disabled){color:#212529;cursor:pointer}.ec-button:not(:disabled):hover,.ec-button.ec-active{background-color:#ececec;border-color:#b1bbc4}.ec-button-group{display:inline-flex}.ec-button-group .ec-button:not(:first-child){border-top-left-radius:0;border-bottom-left-radius:0;margin-left:-1px}.ec-button-group .ec-button:not(:last-child){border-top-right-radius:0;border-bottom-right-radius:0}.ec-icon{display:inline-block;width:1em}.ec-icon.ec-prev:after,.ec-icon.ec-next:after{content:"";position:relative;width:.5em;height:.5em;border-top:2px solid #212529;border-right:2px solid #212529;display:inline-block}.ec-icon.ec-prev:after{transform:rotate(-135deg) translate(-2px, 2px)}.ec-icon.ec-next:after{transform:rotate(45deg) translate(-2px, 2px)}.ec-header,.ec-all-day,.ec-body,.ec-days,.ec-day{border:1px solid #dadce0}.ec-header{display:flex;flex-shrink:0}.ec-header .ec-resource{flex-direction:column}.ec-header .ec-resource .ec-days{border-top-style:solid}.ec-header .ec-days{border-bottom:none}.ec-header .ec-day{min-height:24px;line-height:24px;text-align:center;overflow:hidden;text-overflow:ellipsis}.ec-all-day{display:flex;flex-shrink:0;border-top:none}.ec-all-day .ec-days{border-bottom:none}.ec-all-day .ec-day{padding-bottom:4px}.ec-all-day .ec-event-time{display:none}.ec-body{position:relative;overflow-x:hidden;overflow-y:auto}.ec-body:not(.ec-list){border-top:none}.ec-sidebar{flex:0 0 auto;width:auto;max-width:100%;padding:0 4px 0 8px;display:flex;flex-direction:column;justify-content:center}.ec-sidebar-title{visibility:hidden;overflow-y:hidden;height:0}.ec-all-day .ec-sidebar-title{visibility:visible;height:auto;padding:8px 0}.ec-content{display:flex}.ec-month .ec-content{flex-direction:column;height:100%}.ec-month .ec-uniform .ec-content{overflow:hidden}.ec-list .ec-content{flex-direction:column}.ec-resource{display:flex}.ec-days{display:flex;border-style:none none solid}.ec-days:last-child{border-bottom:none}.ec-month .ec-days,.ec-resource .ec-days{flex:1 0 auto}.ec-month .ec-uniform .ec-days{flex:1 1 0%;min-height:0}.ec-day{border-style:none none none solid}.ec-day.ec-today{background-color:#fcf8e3}.ec-day.ec-highlight{background-color:#e5f7fe}.ec-month .ec-body .ec-day{min-height:5em;position:relative}.ec-month .ec-uniform .ec-day{min-height:0}.ec-month .ec-day:first-child{border-left:none}.ec-day.ec-other-month .ec-day-head{opacity:.3}.ec-list .ec-day{flex:1 0 auto;background-color:#fff;border-style:solid none;padding:8px 14px;font-weight:bold;position:-webkit-sticky;position:sticky;top:0;z-index:2}.ec-list .ec-day:first-child{border-top:none}.ec-month .ec-day-head{text-align:right;padding:4px 4px 3px}.ec-month .ec-day-foot{position:absolute;bottom:0;padding:2px;font-size:.85em}.ec-month .ec-day-foot a{cursor:pointer}.ec-list .ec-day-side{float:right}.ec-list .ec-no-events{text-align:center;padding:5em 0}.ec-events{margin:0 6px 0 0}.ec-week .ec-events,.ec-events.ec-preview{position:relative}.ec-event{display:flex;padding:2px;color:#fff;box-sizing:border-box;box-shadow:0 0 1px 0 #dadce0;background-color:#039be5;border-radius:3px;font-size:.85em;line-height:1.5;z-index:1}.ec-month .ec-event,.ec-all-day .ec-event{position:relative;flex-direction:row}.ec-week .ec-body .ec-event{position:absolute}.ec-list .ec-event{flex-direction:row;padding:8px 14px;color:inherit;background-color:rgba(0,0,0,0);border-radius:0}.ec-event.ec-preview{position:absolute;z-index:1000;width:100%;-webkit-user-select:none;user-select:none;opacity:.8}.ec-event.ec-pointer{color:inherit;pointer-events:none;-webkit-user-select:none;user-select:none;position:absolute;z-index:0;box-shadow:none;display:none}.ec-day:hover .ec-event.ec-pointer{display:flex}.ec-event-body{display:flex;flex-direction:column;width:100%}.ec-event-tag{width:4px;border-radius:2px;margin-right:8px}.ec-event-time{overflow:hidden;white-space:nowrap;margin:0 0 1px 0;flex-shrink:0}.ec-month .ec-event-time{margin:0 3px 0 0;max-width:100%;text-overflow:ellipsis}.ec-event-title{overflow:hidden}.ec-month .ec-event-title,.ec-all-day .ec-event-title{white-space:nowrap;text-overflow:ellipsis}.ec-week .ec-body .ec-event-title{position:-webkit-sticky;position:sticky;top:0}.ec-list .ec-event-title{font-size:1rem}.ec-draggable{cursor:pointer;-webkit-user-select:none;user-select:none;touch-action:none}.ec-ghost{opacity:.5;-webkit-user-select:none;user-select:none;touch-action:none}.ec-bg-events{position:relative}.ec-bg-event{position:absolute;background-color:#dadce0;opacity:.3;width:100%}.ec-hidden-times{visibility:hidden;overflow-y:hidden;height:0}.ec-time,.ec-line{height:24px}.ec-time{position:relative;line-height:24px;top:-12px;text-align:right;white-space:nowrap}.ec-lines{width:8px}.ec-line:not(:first-child):after{content:"";position:absolute;width:100%;border-bottom:1px solid #dadce0;pointer-events:none}.ec-body:not(.ec-compact) .ec-line:nth-child(even):after{border-bottom-style:dotted}.ec-popup{position:absolute;top:0;width:110%;min-width:180px;z-index:1010;padding:8px 10px 14px;background-color:#fff;border-radius:6px;outline:1px solid rgba(0,0,0,0);box-shadow:0 1px 3px 0 rgba(60,64,67,.3),0 4px 8px 3px rgba(60,64,67,.15)}.ec-popup .ec-day-head{text-align:left;display:flex;justify-content:space-between}.ec-popup .ec-day-head a{cursor:pointer;font-size:1.5em;line-height:.8}.ec-popup .ec-events{margin:0}.ec-extra{position:relative;height:100%;overflow:hidden;margin-left:-6.5px}.ec-now-indicator{position:absolute;z-index:1005;width:100%;border-top:#ea4335 solid 2px;pointer-events:none}.ec-now-indicator:before{background:#ea4335;border-radius:50%;content:"";position:absolute;height:12px;margin-top:-7px;width:12px;pointer-events:none}.ec-resizer{position:absolute;-webkit-user-select:none;user-select:none}.ec-month .ec-resizer,.ec-all-day .ec-resizer{top:0;right:0;bottom:0;width:50%;max-width:8px;cursor:ew-resize}.ec-week .ec-body .ec-resizer{left:0;right:0;bottom:0;height:50%;max-height:8px;cursor:ns-resize}.ec-dragging{cursor:pointer !important}.ec-resizing-y{cursor:ns-resize !important}.ec-resizing-x{cursor:ew-resize !important}`;

class EventCalendar extends LitElement {
    constructor() {
        super(...arguments);
        this.events = [];
        this.props = {};
    }
    firstUpdated() {
        this.calendar = new Calendar({
            target: this.calendarEl,
            props: {
                plugins: [index$3, index$4, index$2, index$1, index],
                options: Object.assign({ view: 'timeGridWeek', events: this.events, dateClick: (dateClickInfo) => {
                        this.dispatchEvent(new CustomEvent('date-clicked', {
                            bubbles: true,
                            composed: true,
                            detail: dateClickInfo,
                        }));
                    }, eventContent(eventInfo) {
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
                    } }, this.props),
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
EventCalendar.styles = [css_248z];
__decorate([
    property({ type: Object })
], EventCalendar.prototype, "events", void 0);
__decorate([
    query('#calendar')
], EventCalendar.prototype, "calendarEl", void 0);
__decorate([
    property({ type: Object })
], EventCalendar.prototype, "props", void 0);

export { EventCalendar };
//# sourceMappingURL=index.js.map
