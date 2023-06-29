import { Constructor } from "cc";
import { GComponent } from "./GComponent";
import { GObject } from "./GObject";
import { UIPackage } from "./UIPackage";

export class GObjectPool {
    private _pool: { [index: string]: Array<GObject> };
    private _count: number = 0;
    private _userClass: Constructor<GComponent>;

    public constructor() {
        this._pool = {};
    }

    public clear(): void {
        for (var i1 in this._pool) {
            var arr: Array<GObject> = this._pool[i1];
            var cnt: number = arr.length;
            for (var i: number = 0; i < cnt; i++)
                arr[i].dispose();
        }
        this._pool = {};
        this._count = 0;
    }

    public get count(): number {
        return this._count;
    }

    public setUserClass(userClass: Constructor<GComponent>) {
        this._userClass = userClass;
    }

    public getUserClass(): Constructor<GComponent>{
        return this._userClass;
    }

    public getObject(url: string): GObject {
        url = UIPackage.normalizeURL(url);
        if (url == null)
            return null;

        var arr: Array<GObject> = this._pool[url];
        if (arr && arr.length) {
            this._count--;
            return arr.shift();
        }

        var child: GObject = UIPackage.createObjectFromURL(url, this._userClass);
        return child;
    }

    public returnObject(obj: GObject): void {
        var url: string = obj.resourceURL;
        if (!url)
            return;

        var arr: Array<GObject> = this._pool[url];
        if (arr == null) {
            arr = new Array<GObject>();
            this._pool[url] = arr;
        }

        this._count++;
        arr.push(obj);
    }
}