export class NavItem {
	constructor(public type: string) {
	}
}

export class NavPill extends NavItem {
	constructor(public text: string, public active?: boolean, public badge?: string) {
	}
}

export class NavText extends NavItem {
	constructor(public text: string) {
	}
}
