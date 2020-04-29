const encrytptionAlgoSHA256 = require('js-sha256');

class Block {
	constructor(timestamp, lasthash, hash, P_ID, P_name, man_date, exp_date, company, stage) {
		this.timestamp = timestamp;
		this.lasthash = lasthash;
		this.hash = hash;
		this.P_ID = P_ID;
		this.P_name = P_name;
		this.man_date = man_date;
		this.exp_date = exp_date;
		this.company = company;
		this.stage = stage
	}

	toString() {
		return `
			Timestamp 			: ${Date(this.timestamp).toString()}
			Last Hash 			: ${this.lasthash}
			Hash 	  			: ${this.hash}
			Product ID			: ${this.P_ID}
			Product Name		: ${this.P_name}
			Manufacture Date	: ${this.man_date}
			Expiry Date 		: ${this.exp_date}
			Company 			: ${this.company}
			Stage				: ${this.stage}`;
	}

	static genesis() {
		const h = Block.hash(Date.now(), '-', 0);
		return new this(Date.now(), '-', h, 0, '-', '-', '-', '-', '-');
	}

	static mineBlock(lastBl, P_ID) {
		const timestamp = Date.now();
		const lasthash = lastBl.hash;
		const hash = Block.hash(timestamp, lasthash, P_ID);
		return new this(timestamp, lasthash, hash, P_ID);
	}

	static hash(timestamp, lasthash, P_ID) {
		return encrytptionAlgoSHA256(`${timestamp}${lasthash}${P_ID}`).toString();
	}

	static bhash(blk) {
		const { timestamp, lasthash, P_ID } = blk;
		return Block.hash(timestamp, lasthash, P_ID);
	}
}

module.exports = Block;
