var ClozeCard = function(text , cloze) {
		this.text = text;
		this.cloze = cloze;
		this.partial = this.text.replace(this.cloze, '...........');
}

//exports cloze constructor
module.exports = ClozeCard;