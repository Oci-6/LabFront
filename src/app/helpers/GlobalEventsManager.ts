import { Injectable, EventEmitter } from "@angular/core";

@Injectable()
export class GlobalEventsManager {
    public updateNavbar: EventEmitter<any> = new EventEmitter();
}