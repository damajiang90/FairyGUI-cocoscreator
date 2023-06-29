import { Constructor } from "cc";
import { GComponent } from "./GComponent";
import { GObject } from "./GObject";
export declare class GObjectPool {
    private _pool;
    private _count;
    private _userClass;
    constructor();
    clear(): void;
    get count(): number;
    setUserClass(userClass: Constructor<GComponent>): void;
    getUserClass(): Constructor<GComponent>;
    getObject(url: string): GObject;
    returnObject(obj: GObject): void;
}
