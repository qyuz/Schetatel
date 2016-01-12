export class NavItem {
	constructor() {
	}
}

export class NavPill extends NavItem {
	constructor(public text: string, public active?: boolean, public badge?: string) {
		super();
	}
}

export class NavText extends NavItem {
	constructor(public text: string) {
		super();
	}
}
