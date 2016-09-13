function randomBinary() {
	let min = 0	
	let max = 1

	return Math.floor(
		Math.random() * (max - min + 1)
	)
}

// create cells
for (let i = 0; i < 230; i++) {
	let div = document.createElement('div')
	document.querySelector('.row').appendChild(div)
}

function randomizeRow(rowDiv) {
	for (let i = 0; i < rowDiv.childNodes.length; i++) {

		let div = rowDiv.childNodes[i]
		div.classList
	       .add(randomBinary() ? 'active' : 'inactive' )
	}
}

randomizeRow(document.querySelector('.row'))

function duplicateRow() {
	let allRows = document.querySelectorAll('.row')
	let lastRow = allRows[allRows.length - 1]
	let clone = lastRow.cloneNode(true)

	document
	  .querySelector('.automaton')
	  .appendChild(clone)
	processRow(clone, lastRow)
}

duplicateRow()

function processRow(rowDiv, parentRowDiv) {
	for (let i = 0; i < rowDiv.childNodes.length; i++) {
		let target = rowDiv.childNodes[i]

		let prevSelf = parentRowDiv.childNodes[i]

		// the bars will handle the edge cases of the map
		let leftSibling = 
			prevSelf.previousElementSibling ||
			parentRowDiv.childNodes[parentRowDiv.childNodes.length - 1]
		let rightSibling = 
			prevSelf.nextElementSibling ||
			parentRowDiv.childNodes[0]

		let toggleClass = setActiveIfMatchesRule
			.bind(
				null, 
				target, 
				leftSibling, 
				prevSelf, 
				rightSibling
			)

		toggleClass([1,1,1], true)
		toggleClass([1,1,0], true)
		toggleClass([1,0,1], true)
		toggleClass([1,0,0], false)
		toggleClass([0,1,1], false)
		toggleClass([0,1,0], false)
		toggleClass([0,0,1], false)
		toggleClass([0,0,0], true)
	}
}

function setActiveIfMatchesRule(
	target,
	leftSibling,
	prevSelf,
	rightSibling,
	rule,
	ruleValue
	) {
	let matchesRule =
		state(leftSibling)  === rule[0] &&
		state(prevSelf)     === rule[1] &&
		state(rightSibling) === rule[2]
	if (matchesRule)
		setActive(target, ruleValue)
}

function state(cellDiv) {
	return cellDiv.classList.contains('active') ? 1 : 0
}

function setActive(cellDiv, isActive) {
	if(!!isActive) {
		cellDiv.classList.remove('inactive')
		cellDiv.classList.add('active')
	} else {
		cellDiv.classList.remove('active')
		cellDiv.classList.add('inactive')
	}
}

function scrollToBottom() {
	duplicateRow()

	// let x = 0
	// let y = document.height
	// window.scrollTo(x, y)

	window.scrollTo(0,document.body.scrollHeight);

}

setInterval(scrollToBottom, 1)