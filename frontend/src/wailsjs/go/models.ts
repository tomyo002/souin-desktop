export namespace main {
	
	export class Instance {
	    id: number;
	    name: string;
	    baseUrl: string;
	    token: string;
	    type: string;
	    header?: string;
	
	    static createFrom(source: any = {}) {
	        return new Instance(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.name = source["name"];
	        this.baseUrl = source["baseUrl"];
	        this.token = source["token"];
	        this.type = source["type"];
	        this.header = source["header"];
	    }
	}

}

