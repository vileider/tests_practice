import { CashMachine } from './cash-machine';

describe('Cash machine', () => {
	describe('when machine is empty', () => {
		it('should return zero for total amount', () => {
			// given
			const cashMachine = new CashMachine();

			// when
			const result = cashMachine.getTotalAmount();

			// then
			expect(result).toEqual(0);
		});

		it('should throw an error during withdrawal', () => {
			// given
			const cashMachine = new CashMachine();
			let error = null;

			// when
			try {
				cashMachine.withdrawMoney(100);
			} catch (e) {
				error = e;
			}

			// then
			expect(error).not.toBeNull();
		});
	});

	describe('when machine was filled with money', () => {
		it('should return total available amount', () => {
			// given
			const cashMachine = new CashMachine();
			cashMachine.fillWithNotes([20, 20, 50, 100]);

			// when
			const result = cashMachine.getTotalAmount();

			// then
			expect(result).toEqual(190);
		});

		it('should withdraw given amount', () => {
			// given
			const cashMachine = new CashMachine();
			cashMachine.fillWithNotes([20, 20, 50, 100]);

			// when
			cashMachine.withdrawMoney(50);

			// then
			expect(cashMachine.getTotalAmount()).toEqual(140);
		});

		describe('but the request amount is not dividable by notes in machine', () => {
			it('should throw an error', () => {
				// given
				const cashMachine = new CashMachine();
				let error = null;
				cashMachine.fillWithNotes([20, 20, 20, 20, 20]);

				// when
				try {
					cashMachine.withdrawMoney(50);
				} catch (e) {
					error = e;
				}

				// then
				expect(error).not.toBeNull();
			});
		});

		describe('and request amount is dividable by available notes', () => {
			it('should use the highest ones notes', () => {
				// given
				const cashMachine = new CashMachine();
				const notes = [10, 10, 10, 10, 10, 20, 20, 20, 20, 20, 50, 50, 100, 100, 200];
				const initialAmount = notes.reduce((accumulator, curr) => accumulator + curr);
				cashMachine.fillWithNotes(notes.slice());

				// when
				cashMachine.withdrawMoney(350);

				// then
				expect(cashMachine.getTotalAmount()).toEqual(initialAmount - 350);
				notes.filter(x => x === 10).forEach(() => cashMachine.withdrawMoney(10));
				notes.filter(x => x === 20).forEach(() => cashMachine.withdrawMoney(20));
				cashMachine.withdrawMoney(50);
				cashMachine.withdrawMoney(100);
			});
		});

		describe('and request amount is NOT dividable by available notes', () => {
			it('should leave notes in cash maching', () => {
				// given
				const cashMachine = new CashMachine();
				const notes = [10, 20, 50, 100, 200];
				const initialAmount = notes.reduce((accumulator, curr) => accumulator + curr);
				cashMachine.fillWithNotes(notes.slice());
				try {
					cashMachine.withdrawMoney(240);
				} catch (e) {
					// do nothing
				}

				// when
				cashMachine.withdrawMoney(200);

				// then
				expect(cashMachine.getTotalAmount()).toEqual(initialAmount - 200);
			});
		});
	});
});