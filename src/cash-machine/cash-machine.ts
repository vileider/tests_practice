export class CashMachine {
	private totalAmount = 0;
	private notesInDeposit: Array<number> = [0];

	// TODO: Should be private? Edit: Yes
	private removingAmountOutOfNotesInDeposit(amount: number) {
		this.notesInDeposit.sort((a, b) => b - a);

		const debugingList = new Array(...this.notesInDeposit);

		for (let x = 0; x < debugingList.length - 1; x++) {
			if (amount >= debugingList[x]) {
				amount -= debugingList[x];
				// TODO: This will cause memory leak when we will fill machine with notes then withdraw then fill again and withdraw... 
				debugingList[x] = 0;
			}
		}
		
		return {
			_list: debugingList,
			_amount: amount
		};
		
	}

	getTotalAmount() {
		return this.totalAmount;
		
	}

	private fillTotalAmountCounter(notes: number[]) {
		notes.forEach(element => {
			this.totalAmount += element;
		});

	}

	private fillNotesInDepositCounter(notes: number[]) {
		this.notesInDeposit && this.notesInDeposit.push(...notes);

	}

	fillWithNotes(notes: number[]) {
		this.fillTotalAmountCounter(notes);
		this.fillNotesInDepositCounter(notes);
		
	}

	withdrawMoney(amount: number) {
		if (this.totalAmount < 1) {
			throw new Error('Not enough money available');
			
		}
		else {
			if (this.removingAmountOutOfNotesInDeposit(amount)._amount > 0) {
				throw new Error('error');
			} else {
				this.totalAmount -= amount;
				this.notesInDeposit = this.removingAmountOutOfNotesInDeposit(amount)._list;
	
			}
		}
	}
}