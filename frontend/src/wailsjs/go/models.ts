export namespace main {
	
	export class Chart {
	    id: number;
	    title: string;
	    labels: string[];
	    max: number;
	
	    static createFrom(source: any = {}) {
	        return new Chart(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.title = source["title"];
	        this.labels = source["labels"];
	        this.max = source["max"];
	    }
	}
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

